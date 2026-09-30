import { unstable_cache } from "next/cache";
import type { Product } from "@/data/types";
import { placeholderFor } from "./placeholder";
const MAX_IMAGES = 6;

/** Páginas de busca/listagem não têm imagem do produto (só logo da loja): não extrair delas. */
function isSearchUrl(raw: string): boolean {
  try {
    const u = new URL(raw);
    const host = u.hostname;
    if (host.includes("amazon.") && u.pathname === "/s") return true;
    if (host.includes("ebay.") && u.pathname.startsWith("/sch/")) return true;
    if (host.startsWith("lista.")) return true;
    if (host.includes("shopee.") && u.pathname.startsWith("/search")) return true;
    return false;
  } catch {
    return true;
  }
}

const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&#x2F;/g, "/").replace(/&quot;/g, '"');
const attr = (tag: string, name: string) =>
  tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"))?.[1];

function collectJsonLdImages(node: unknown, out: string[], depth = 0): void {
  if (!node || depth > 6) return;
  if (Array.isArray(node)) return node.forEach((n) => collectJsonLdImages(n, out, depth + 1));
  if (typeof node !== "object") return;
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    if (key === "image") {
      const list = Array.isArray(value) ? value : [value];
      for (const item of list) {
        if (typeof item === "string") out.push(item);
        else if (item && typeof item === "object" && typeof (item as { url?: unknown }).url === "string") {
          out.push((item as { url: string }).url);
        }
      }
    } else {
      collectJsonLdImages(value, out, depth + 1);
    }
  }
}

function parseImages(html: string, pageUrl: string): string[] {
  const found: string[] = [];
  const META_KEYS = ["og:image", "og:image:url", "og:image:secure_url", "twitter:image", "twitter:image:src"];

  for (const tag of html.match(/<meta\s+[^>]*>/gi) ?? []) {
    const key = (attr(tag, "property") ?? attr(tag, "name") ?? "").toLowerCase();
    const content = attr(tag, "content");
    if (content && META_KEYS.includes(key)) found.push(content);
  }
  for (const tag of html.match(/<link\s+[^>]*>/gi) ?? []) {
    if ((attr(tag, "rel") ?? "").toLowerCase() === "image_src") {
      const href = attr(tag, "href");
      if (href) found.push(href);
    }
  }
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      collectJsonLdImages(JSON.parse(m[1]), found);
    } catch {
      /* JSON-LD inválido: ignora */
    }
  }

  const result: string[] = [];
  for (const raw of found) {
    try {
      const abs = new URL(decode(raw), pageUrl);
      if (abs.protocol !== "https:" && abs.protocol !== "http:") continue;
      if (/logo|favicon|sprite/i.test(abs.pathname)) continue;
      if (!result.includes(abs.href)) result.push(abs.href);
    } catch {
      /* URL inválida: ignora */
    }
  }
  return result.slice(0, MAX_IMAGES);
}

async function fetchImagesFromPage(url: string): Promise<string[]> {
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; AfiliadosShipBot/1.0)",
        accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok || !(res.headers.get("content-type") ?? "").includes("html")) return [];
    const html = (await res.text()).slice(0, 400_000);
    return parseImages(html, res.url || url);
  } catch {
    return [];
  }
}

// Cache de 24h por URL: evita buscar a página a cada request/build.
const cachedPageImages = unstable_cache(fetchImagesFromPage, ["page-images"], { revalidate: 86400 });

export interface ProductMedia {
  images: string[];
  /** true se há pelo menos uma imagem real (não é o placeholder). */
  hasReal: boolean;
}

/** Ordem: imagens manuais > imagens extraídas do link > placeholder genérico. */
export async function getProductMedia(product: Product): Promise<ProductMedia> {
  const manual = [product.image, ...(product.images ?? [])].filter((s): s is string => Boolean(s));
  // Amazon proíbe copiar/linkar imagens direto das páginas de produto: nunca extrair da Amazon.
  // IMAGE_SCRAPING=off desliga a extração para todas as lojas.
  const canScrape = product.platform !== "amazon" && process.env.IMAGE_SCRAPING !== "off";
  const scraped = !canScrape || isSearchUrl(product.productUrl) ? [] : await cachedPageImages(product.productUrl);
  const images = [...new Set([...manual, ...scraped])].slice(0, MAX_IMAGES);
  return images.length > 0 ? { images, hasReal: true } : { images: [placeholderFor(product)], hasReal: false };
}

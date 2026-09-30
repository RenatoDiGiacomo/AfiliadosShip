#!/usr/bin/env node
// Importa catalog/br.csv e catalog/us.csv para src/data/catalog.<mercado>.json
// Uso: npm run import            (os dois mercados)
//      npm run import -- br      (só um)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const categories = JSON.parse(fs.readFileSync(path.join(root, "src/data/categories.json"), "utf8"));

const MARKETS = {
  br: { currency: "BRL", platforms: ["mercadolivre", "shopee"] },
  us: { currency: "USD", platforms: ["amazon", "ebay"] },
};
const PLATFORM_ALIASES = {
  mercadolivre: "mercadolivre", "mercado livre": "mercadolivre", ml: "mercadolivre",
  shopee: "shopee", amazon: "amazon", ebay: "ebay",
};
const DOMAINS = {
  mercadolivre: /(^|\.)mercadolivre\.com\.br$/,
  shopee: /(^|\.)shopee\.com\.br$/,
  amazon: /(^|\.)amazon\.com$/,
  ebay: /(^|\.)ebay\.com$/,
};
// Nomes de coluna aceitos (português ou inglês) -> chave interna
const HEADER_ALIASES = {
  slug: "slug",
  titulo: "title", title: "title",
  plataforma: "platform", platform: "platform",
  categoria: "category", category: "category",
  link_produto: "productUrl", product_url: "productUrl",
  link_afiliado: "affiliateUrl", affiliate_url: "affiliateUrl",
  imagem: "image", image: "image",
  imagens_extras: "images", extra_images: "images",
  resumo: "summary", summary: "summary",
  positivos: "pros", pros: "pros",
  atencao: "cons", cons: "cons",
  preco: "price", price: "price",
  guias: "guides", guides: "guides",
};

const strip = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const slugify = (s) => strip(s).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const splitList = (s) => (s ?? "").split(/[|\n]/).map((x) => x.trim()).filter(Boolean);

function parseCsv(text) {
  text = text.replace(/^﻿/, "");
  const firstLine = text.split(/\r?\n/, 1)[0] ?? "";
  const delim = firstLine.split(";").length > firstLine.split(",").length ? ";" : ",";
  const rows = [];
  let row = [], field = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQuotes = false; }
      else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === delim) { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = ""; rows.push(row); row = [];
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((f) => f.trim() !== ""));
}

function normalizeUrl(platform, raw) {
  let u;
  try { u = new URL(raw); } catch { return { error: `link inválido: ${raw}` }; }
  if (!/^https?:$/.test(u.protocol)) return { error: `link precisa começar com http(s): ${raw}` };
  if (!DOMAINS[platform].test(u.hostname)) {
    return { warn: `o link não parece ser de ${platform} (${u.hostname}). Se for link curto de afiliado, ele deve ir em link_afiliado`, url: raw };
  }
  if (platform === "amazon") {
    const m = u.pathname.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i);
    if (m) return { url: `https://www.amazon.com/dp/${m[1].toUpperCase()}` };
  }
  if (platform === "ebay") {
    const m = u.pathname.match(/\/itm\/(?:[^/]+\/)?(\d{9,})/);
    if (m) return { url: `https://www.ebay.com/itm/${m[1]}` };
  }
  return { url: raw };
}

function isSearchUrl(u) {
  try {
    const x = new URL(u);
    return (
      (x.hostname.includes("amazon.") && x.pathname === "/s") ||
      (x.hostname.includes("ebay.") && x.pathname.startsWith("/sch/")) ||
      x.hostname.startsWith("lista.") ||
      (x.hostname.includes("shopee.") && x.pathname.startsWith("/search"))
    );
  } catch { return false; }
}

function importMarket(market) {
  const file = path.join(root, "catalog", `${market}.csv`);
  const out = path.join(root, "src", "data", `catalog.${market}.json`);
  if (!fs.existsSync(file)) return { market, skipped: true, errors: [], warnings: [] };
  const cfg = MARKETS[market];
  const cats = categories[market];
  const errors = [], warnings = [];
  const rows = parseCsv(fs.readFileSync(file, "utf8"));
  if (rows.length === 0) { fs.writeFileSync(out, "[]\n"); return { market, count: 0, errors, warnings }; }

  const keys = rows[0].map((h) => HEADER_ALIASES[strip(h).replace(/\s+/g, "_")]);
  rows[0].forEach((h, i) => { if (!keys[i]) warnings.push(`coluna ignorada: "${h}"`); });
  const today = new Date().toISOString().slice(0, 10);
  const seen = new Set();
  const products = [];

  rows.slice(1).forEach((cells, idx) => {
    const line = idx + 2;
    const r = {};
    keys.forEach((k, i) => { if (k) r[k] = (cells[i] ?? "").trim(); });
    const where = `linha ${line}${r.title ? ` (${r.title})` : ""}`;
    const err = (m) => errors.push(`${where}: ${m}`);
    const warn = (m) => warnings.push(`${where}: ${m}`);

    for (const f of ["title", "platform", "category", "productUrl", "summary"]) if (!r[f]) err(`falta "${f}"`);
    if (!r.title || !r.platform || !r.category || !r.productUrl || !r.summary) return;

    const platform = PLATFORM_ALIASES[strip(r.platform)];
    if (!platform || !cfg.platforms.includes(platform))
      return err(`plataforma "${r.platform}" não vale para o mercado ${market} (use: ${cfg.platforms.join(", ")})`);

    const cat = cats.find((c) => c.id === strip(r.category) || strip(c.name) === strip(r.category));
    if (!cat) return err(`categoria "${r.category}" não existe (use: ${cats.map((c) => c.id).join(", ")})`);

    const slug = r.slug ? slugify(r.slug) : slugify(r.title);
    if (!slug) return err("slug vazio");
    if (seen.has(slug)) return err(`slug repetido: ${slug}`);
    seen.add(slug);

    const nu = normalizeUrl(platform, r.productUrl);
    if (nu.error) return err(nu.error);
    if (nu.warn) warn(nu.warn);
    if (isSearchUrl(nu.url)) warn("link é página de busca/listagem: não terá foto do produto. Use o link da página do produto");

    if (r.affiliateUrl) {
      try { new URL(r.affiliateUrl); } catch { return err(`link_afiliado inválido: ${r.affiliateUrl}`); }
    } else if (platform === "mercadolivre" || platform === "shopee") {
      warn("sem link_afiliado: o botão levará à loja SEM comissão");
    }

    let price;
    if (r.price) {
      if (market === "us") warn("preço ignorado: Amazon/eBay não permitem exibir preço como se fosse em tempo real");
      else {
        price = Number(r.price.replace(/[^\d,.-]/g, "").replace(/\.(?=\d{3}\b)/g, "").replace(",", "."));
        if (!Number.isFinite(price)) { warn(`preço inválido "${r.price}" (ignorado)`); price = undefined; }
      }
    }

    const pros = splitList(r.pros), cons = splitList(r.cons);
    if (pros.length === 0 || cons.length === 0) warn("preencha positivos e atencao (ajuda o leitor e o SEO)");
    if (r.summary.length < 40) warn("resumo muito curto (recomendado: 1–2 frases com informação real)");
    if (platform === "amazon" && !r.image) warn("Amazon: a foto não é extraída automaticamente (regra do programa). Sem imagem própria, aparece a ilustração da categoria");

    const product = {
      id: `${market}-${slug}`,
      slug,
      market,
      platform,
      title: r.title,
      summary: r.summary,
      pros: pros.length ? pros : ["—"],
      cons: cons.length ? cons : ["—"],
      currency: cfg.currency,
      productUrl: nu.url,
      category: cat.name,
      categoryId: cat.id,
      updatedAt: today,
    };
    if (price !== undefined) product.price = price;
    if (r.affiliateUrl) product.affiliateUrl = r.affiliateUrl;
    if (r.image) product.image = r.image;
    const extra = splitList(r.images);
    if (extra.length) product.images = extra;
    const guides = (r.guides ?? "").split(/[|,]/).map((g) => slugify(g)).filter(Boolean);
    if (guides.length) product.guides = guides;
    products.push(product);
  });

  if (errors.length === 0) {
    // Mantém a data de atualização dos produtos que não mudaram desde a última importação.
    let previous = [];
    try { previous = JSON.parse(fs.readFileSync(out, "utf8")); } catch { /* primeira importação */ }
    const before = new Map(previous.map((p) => [p.id, p]));
    for (const p of products) {
      const old = before.get(p.id);
      if (old && JSON.stringify({ ...old, updatedAt: "" }) === JSON.stringify({ ...p, updatedAt: "" })) p.updatedAt = old.updatedAt;
    }
    fs.writeFileSync(out, JSON.stringify(products, null, 2) + "\n");
  }
  return { market, count: products.length, errors, warnings };
}

const arg = process.argv[2];
const targets = arg ? [arg] : Object.keys(MARKETS);
let failed = false;
for (const market of targets) {
  if (!MARKETS[market]) { console.error(`Mercado desconhecido: ${market} (use br ou us)`); process.exit(2); }
  const res = importMarket(market);
  if (res.skipped) { console.log(`[${market}] catalog/${market}.csv não encontrado: ignorado`); continue; }
  res.warnings.forEach((w) => console.log(`[${market}] aviso  ${w}`));
  res.errors.forEach((e) => console.log(`[${market}] ERRO   ${e}`));
  if (res.errors.length) { failed = true; console.log(`[${market}] nada foi gravado (corrija os erros acima)`); }
  else console.log(`[${market}] ${res.count} produto(s) gravado(s) em src/data/catalog.${market}.json${res.count === 0 ? " (vazio: o site usa os produtos de exemplo)" : ""}`);
}
process.exit(failed ? 1 : 0);

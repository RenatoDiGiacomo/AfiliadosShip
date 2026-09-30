import { isMarket } from "@/data/markets";
import type { Market } from "@/data/types";

export const MARKET_COOKIE = "market";

/** País do visitante pelos headers da hospedagem (Vercel ou Cloudflare). */
export function getCountry(headers: Headers): string | undefined {
  return headers.get("x-vercel-ip-country") ?? headers.get("cf-ipcountry") ?? undefined;
}

/**
 * Ordem: cookie (escolha manual) > país do IP > DEFAULT_MARKET (dev) > us.
 * BR -> br; qualquer outro país -> us.
 */
export function resolveMarket(cookie?: string, country?: string, fallback?: string): Market {
  if (isMarket(cookie)) return cookie;
  if (country) return country.toUpperCase() === "BR" ? "br" : "us";
  if (isMarket(fallback)) return fallback;
  return "us";
}

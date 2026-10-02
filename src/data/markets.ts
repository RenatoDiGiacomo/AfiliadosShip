import type { Currency, Market, Platform } from "./types";

export interface MarketConfig {
  id: Market;
  lang: string;
  currency: Currency;
  platforms: Platform[];
}

export const MARKETS: Record<Market, MarketConfig> = {
  br: { id: "br", lang: "pt-BR", currency: "BRL", platforms: ["mercadolivre", "shopee"] },
  us: { id: "us", lang: "en-US", currency: "USD", platforms: ["amazon", "ebay"] },
};

export const MARKET_IDS = Object.keys(MARKETS) as Market[];

export const PLATFORM_LABEL: Record<Platform, string> = {
  mercadolivre: "Mercado Livre",
  shopee: "Shopee",
  amazon: "Amazon",
  ebay: "eBay",
};

export function isMarket(value: unknown): value is Market {
  return typeof value === "string" && value in MARKETS;
}

// Endereço público: SITE_URL (se definida) > domínio de produção da Vercel (variável de sistema) > localhost (dev).
const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = (
  process.env.SITE_URL ?? (vercelProd ? `https://${vercelProd}` : "http://localhost:3000")
).replace(/\/+$/, "");

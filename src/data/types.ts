export type Market = "br" | "us";
export type Platform = "mercadolivre" | "shopee" | "amazon" | "ebay";
export type Currency = "BRL" | "USD";

export interface Product {
  id: string;
  slug: string;
  market: Market;
  platform: Platform;
  title: string;
  summary: string;
  pros: string[];
  cons: string[];
  /** Preço de referência (pode estar desatualizado). Não exibir para Amazon/eBay. */
  price?: number;
  currency: Currency;
  /** Imagem manual (tem prioridade sobre a extraída do link). */
  image?: string;
  /** Imagens extras manuais. */
  images?: string[];
  /** URL limpa do produto na loja (sem tag de afiliado). */
  productUrl: string;
  /** Link gerado no painel do programa (Mercado Livre/Shopee). Tem prioridade sobre productUrl. */
  affiliateUrl?: string;
  category: string;
  categoryId: string;
  /** Slugs dos guias em que o produto aparece (ordem = ordem no catálogo). */
  guides?: string[];
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export interface Guide {
  slug: string;
  market: Market;
  title: string;
  description: string;
  intro: string;
  updatedAt: string;
  /** "grid" = vitrine em grade (3 por linha); padrão = lista com análise. */
  layout?: "list" | "grid";
}

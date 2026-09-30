import type { Currency, Market, Platform, Product } from "./types";

/** URL de busca da loja (exemplo). Em produção, troque por URLs reais de produtos. */
export function searchUrl(platform: Platform, keyword: string): string {
  const words = keyword.trim().split(/\s+/);
  switch (platform) {
    case "amazon":
      return `https://www.amazon.com/s?k=${words.join("+")}`;
    case "ebay":
      return `https://www.ebay.com/sch/i.html?_nkw=${words.join("+")}`;
    case "mercadolivre":
      return `https://lista.mercadolivre.com.br/${words.join("-")}`;
    case "shopee":
      return `https://shopee.com.br/search?keyword=${encodeURIComponent(keyword)}`;
  }
}

export interface SampleRow {
  slug: string;
  categoryId: string;
  platform: Platform;
  title: string;
  summary: string;
  keyword: string;
}

export interface CategoryDefaults {
  name: string;
  pros: string[];
  cons: string[];
}

/** Monta produtos de EXEMPLO a partir de linhas compactas. Não use em produção. */
export function buildSamples(
  market: Market,
  currency: Currency,
  categories: Record<string, CategoryDefaults>,
  rows: SampleRow[],
  updatedAt: string,
): Product[] {
  return rows.map((r) => ({
    id: `${market}-${r.slug}`,
    slug: r.slug,
    market,
    platform: r.platform,
    title: r.title,
    summary: r.summary,
    pros: categories[r.categoryId].pros,
    cons: categories[r.categoryId].cons,
    currency,
    productUrl: searchUrl(r.platform, r.keyword),
    category: categories[r.categoryId].name,
    categoryId: r.categoryId,
    updatedAt,
  }));
}

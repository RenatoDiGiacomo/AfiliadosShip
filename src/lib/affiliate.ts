import type { Product } from "@/data/types";

function withParams(url: string, params: Record<string, string | undefined>): string {
  const u = new URL(url);
  for (const [key, value] of Object.entries(params)) {
    if (value) u.searchParams.set(key, value);
  }
  return u.toString();
}

/**
 * Monta o link final de afiliado. Confirme o formato de cada programa no painel antes de publicar.
 * - Amazon: parâmetro `tag` (Associates).
 * - eBay: parâmetros de campanha do EPN (`campid`).
 * - Mercado Livre / Shopee: o link é gerado no painel do programa; cole em `affiliateUrl`.
 */
export function buildAffiliateUrl(product: Product): string {
  switch (product.platform) {
    case "amazon":
      return withParams(product.productUrl, { tag: process.env.AMAZON_TAG });
    case "ebay": {
      const campid = process.env.EBAY_CAMPID;
      if (!campid) return product.productUrl;
      return withParams(product.productUrl, {
        mkcid: "1",
        mkrid: "711-53200-19255-0",
        siteid: "0",
        campid,
        toolid: "10001",
        mkevt: "1",
      });
    }
    case "mercadolivre":
    case "shopee":
      return product.affiliateUrl ?? product.productUrl;
  }
}

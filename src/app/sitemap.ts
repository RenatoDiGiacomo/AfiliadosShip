import type { MetadataRoute } from "next";
import { MARKET_IDS, SITE_URL } from "@/data/markets";
import { getCategories, getGuides, getProducts } from "@/lib/data";
import { legalPath } from "@/lib/paths";

const latest = (dates: string[]) => dates.sort().at(-1);

export default function sitemap(): MetadataRoute.Sitemap {
  return MARKET_IDS.filter((m) => getProducts(m).length > 0).flatMap((market) => {
    const products = getProducts(market);
    const guides = getGuides(market);
    const marketUpdated = latest(products.map((p) => p.updatedAt));
    return [
      { url: `${SITE_URL}/${market}`, lastModified: marketUpdated },
      ...getCategories(market).map((c) => ({
        url: `${SITE_URL}/${market}/categoria/${c.id}`,
        lastModified: latest(products.filter((p) => p.categoryId === c.id).map((p) => p.updatedAt)),
      })),
      ...guides.map((g) => ({ url: `${SITE_URL}/${market}/guia/${g.slug}`, lastModified: g.updatedAt })),
      ...products.map((p) => ({ url: `${SITE_URL}/${market}/produto/${p.slug}`, lastModified: p.updatedAt })),
      { url: `${SITE_URL}${legalPath(market, "privacy")}` },
      { url: `${SITE_URL}${legalPath(market, "terms")}` },
    ];
  });
}

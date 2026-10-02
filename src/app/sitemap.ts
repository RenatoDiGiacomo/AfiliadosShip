import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/markets";
import { getCategories, getGuides, getProducts } from "@/lib/data";
import { legalPath } from "@/lib/paths";

const latest = (dates: string[]) => dates.sort().at(-1);

export default function sitemap(): MetadataRoute.Sitemap {
  return (["br"] as const).filter((m) => getProducts(m).length > 0).flatMap((market) => {
    const products = getProducts(market);
    const guides = getGuides(market);
    const marketUpdated = latest(products.map((p) => p.updatedAt));
    return [
      { url: `${SITE_URL}`, lastModified: marketUpdated },
      { url: `${SITE_URL}/achados`, lastModified: marketUpdated },
      ...getCategories(market).map((c) => ({
        url: `${SITE_URL}/categoria/${c.id}`,
        lastModified: latest(products.filter((p) => p.categoryId === c.id).map((p) => p.updatedAt)),
      })),
      ...guides.map((g) => ({ url: `${SITE_URL}/guia/${g.slug}`, lastModified: g.updatedAt })),
      ...products.map((p) => ({ url: `${SITE_URL}/produto/${p.slug}`, lastModified: p.updatedAt })),
      { url: `${SITE_URL}${legalPath(market, "privacy")}` },
      { url: `${SITE_URL}${legalPath(market, "terms")}` },
    ];
  });
}

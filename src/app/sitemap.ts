import type { MetadataRoute } from "next";
import { MARKET_IDS, SITE_URL } from "@/data/markets";
import { getCategories, getGuides, getProducts } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return MARKET_IDS.flatMap((market) => [
    { url: `${SITE_URL}/${market}` },
    { url: `${SITE_URL}/${market}/privacidade` },
    { url: `${SITE_URL}/${market}/termos` },
    ...getCategories(market).map((c) => ({ url: `${SITE_URL}/${market}/categoria/${c.id}` })),
    ...getGuides(market).map((g) => ({ url: `${SITE_URL}/${market}/guia/${g.slug}`, lastModified: g.updatedAt })),
    ...getProducts(market).map((p) => ({ url: `${SITE_URL}/${market}/produto/${p.slug}`, lastModified: p.updatedAt })),
  ]);
}

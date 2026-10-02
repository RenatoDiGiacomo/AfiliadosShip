import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/markets";

export default function robots(): MetadataRoute.Robots {
  return {
    // /go/ = redirects de afiliado; /busca = resultados de busca interna (conteúdo fino).
    rules: { userAgent: "*", allow: "/", disallow: ["/go/", "/busca"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

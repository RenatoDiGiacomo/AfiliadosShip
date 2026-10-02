import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SITE_URL } from "@/data/markets";
import { JsonLd } from "@/components/JsonLd";
import { getProducts } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";
import { pageOpenGraph } from "@/lib/seo";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const market = await getMarket();
  const t = dict[market];
  return {
    title: t.allFindsTitle,
    description: t.allFindsIntro,
    alternates: { canonical: "/achados" },
    openGraph: pageOpenGraph(market, { title: t.allFindsTitle, description: t.allFindsIntro, path: "/achados" }),
  };
}

/** Lista completa de produtos, do mais novo (último do CSV) para o mais antigo. Link único para o perfil do canal. */
export default async function AllFindsPage() {
  const market = await getMarket();
  const t = dict[market];
  const products = getProducts(market);

  return (
    <div className="space-y-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t.allFindsTitle,
          url: `${SITE_URL}/achados`,
          hasPart: products.map((p) => ({ "@type": "WebPage", name: p.title, url: `${SITE_URL}/produto/${p.slug}` })),
        }}
      />
      <nav className="text-sm text-[var(--fg-soft)]">
        <Link href="/" className="hover:underline">
          {t.home}
        </Link>{" "}
        / {t.allFindsTitle}
      </nav>
      <header>
        <h1 className="text-3xl font-extrabold text-[var(--fg)]">{t.allFindsTitle}</h1>
        <p className="mt-2 max-w-2xl text-[var(--fg-muted)]">{t.allFindsIntro}</p>
        <p className="mt-2 text-xs text-[var(--fg-soft)]">{t.disclosure}</p>
      </header>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

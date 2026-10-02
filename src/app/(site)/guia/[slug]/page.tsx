import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProductRow } from "@/components/ProductRow";
import { SITE_URL } from "@/data/markets";
import { getGuide, getGuideProducts, getGuides } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";
import { pageOpenGraph } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;
export const revalidate = 86400;
export const generateStaticParams = () =>
  getGuides("br").map((g) => ({ slug: g.slug }));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const market = await getMarket();
  const { slug } = await params;
  const guide = getGuide(market, slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guia/${slug}` },
    openGraph: pageOpenGraph(market, { title: guide.title, description: guide.description, path: `/guia/${slug}` }),
  };
}

export default async function GuidePage({ params }: { params: Params }) {
  const market = await getMarket();
  const { slug } = await params;
  const guide = getGuide(market, slug);
  if (!guide) notFound();
  const t = dict[market];
  const products = getGuideProducts(guide);

  return (
    <article className="space-y-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: t.home, item: `${SITE_URL}` },
                { "@type": "ListItem", position: 2, name: guide.title, item: `${SITE_URL}/guia/${slug}` },
              ],
            },
            {
              "@type": "ItemList",
              name: guide.title,
              itemListElement: products.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.title,
                url: `${SITE_URL}/produto/${p.slug}`,
              })),
            },
          ],
        }}
      />
      <nav className="text-sm text-[var(--fg-soft)]">
        <Link href="/" className="hover:underline">
          {t.home}
        </Link>{" "}
        / {guide.title}
      </nav>
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold text-[var(--fg)]">{guide.title}</h1>
        <p className="mt-3 text-[var(--fg-muted)]">{guide.intro}</p>
        <p className="mt-2 text-xs text-[var(--fg-soft)]">{t.disclosure}</p>
        {t.amazonNotice && products.some((p) => p.platform === "amazon") && <p className="text-xs text-[var(--fg-soft)]">{t.amazonNotice}</p>}
      </header>
      <div className="space-y-4">
        {products.map((p, i) => (
          <ProductRow key={p.id} product={p} rank={i + 1} />
        ))}
      </div>
    </article>
  );
}

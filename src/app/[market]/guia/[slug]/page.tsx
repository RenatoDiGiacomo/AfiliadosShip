import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ProductRow } from "@/components/ProductRow";
import { MARKET_IDS, SITE_URL } from "@/data/markets";
import { getGuide, getGuideProducts, getGuides } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";

type Params = Promise<{ market: string; slug: string }>;

export const dynamicParams = false;
export const revalidate = 86400;
export const generateStaticParams = () =>
  MARKET_IDS.flatMap((market) => getGuides(market).map((g) => ({ market, slug: g.slug })));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const market = await getMarket(params);
  const { slug } = await params;
  const guide = getGuide(market, slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/${market}/guia/${slug}` },
  };
}

export default async function GuidePage({ params }: { params: Params }) {
  const market = await getMarket(params);
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
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: t.home, item: `${SITE_URL}/${market}` },
            { "@type": "ListItem", position: 2, name: guide.title, item: `${SITE_URL}/${market}/guia/${slug}` },
          ],
        }}
      />
      <nav className="text-sm text-slate-500">
        <Link href={`/${market}`} className="hover:underline">
          {t.home}
        </Link>{" "}
        / {guide.title}
      </nav>
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold text-slate-900">{guide.title}</h1>
        <p className="mt-3 text-slate-600">{guide.intro}</p>
        <p className="mt-2 text-xs text-slate-500">{t.disclosure}</p>
      </header>
      <div className="space-y-4">
        {products.map((p, i) => (
          <ProductRow key={p.id} product={p} rank={i + 1} />
        ))}
      </div>
    </article>
  );
}

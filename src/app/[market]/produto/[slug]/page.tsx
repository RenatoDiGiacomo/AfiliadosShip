import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateButton } from "@/components/AffiliateButton";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { JsonLd } from "@/components/JsonLd";
import { PLATFORM_LABEL, SITE_URL } from "@/data/markets";
import { getProduct, getProducts } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";
import { getProductMedia } from "@/lib/media";
import { placeholderFor } from "@/lib/placeholder";
import { MARKET_IDS } from "@/data/markets";

type Params = Promise<{ market: string; slug: string }>;

export const dynamicParams = false;
export const revalidate = 86400;
export const generateStaticParams = () =>
  MARKET_IDS.flatMap((market) => getProducts(market).map((p) => ({ market, slug: p.slug })));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const market = await getMarket(params);
  const { slug } = await params;
  const product = getProduct(market, slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.summary,
    alternates: { canonical: `/${market}/produto/${slug}` },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const market = await getMarket(params);
  const { slug } = await params;
  const product = getProduct(market, slug);
  if (!product) notFound();
  const t = dict[market];
  const url = `${SITE_URL}/${market}/produto/${slug}`;
  const { images, hasReal } = await getProductMedia(product);
  const related = getProducts(market)
    .filter((p) => p.id !== product.id)
    .sort((a, b) => Number(b.categoryId === product.categoryId) - Number(a.categoryId === product.categoryId))
    .slice(0, 4);

  return (
    <article className="space-y-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: t.home, item: `${SITE_URL}/${market}` },
                { "@type": "ListItem", position: 2, name: product.title, item: url },
              ],
            },
            {
              "@type": "Product",
              name: product.title,
              description: product.summary,
              category: product.category,
              ...(hasReal ? { image: images } : {}),
            },
          ],
        }}
      />
      <nav className="text-sm text-slate-500">
        <Link href={`/${market}`} className="hover:underline">
          {t.home}
        </Link>{" "}
        / {product.title}
      </nav>
      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery images={images} alt={product.title} fallback={placeholderFor(product)} />
        <header>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {product.category} · {PLATFORM_LABEL[product.platform]}
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">{product.title}</h1>
          <p className="mt-3 text-slate-600">{product.summary}</p>
          <div className="mt-6 space-y-3">
            <AffiliateButton product={product} />
            <p className="text-xs text-slate-500">{t.disclosure}</p>
          </div>
        </header>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <h2 className="font-semibold text-emerald-900">{t.pros}</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-900">
            {product.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h2 className="font-semibold text-amber-900">{t.cons}</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-900">
            {product.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      </div>

      <p className="text-xs text-slate-400">
        {t.updatedOn} {product.updatedAt}
      </p>

      <section>
        <h2 className="mb-4 text-xl font-semibold">{t.related}</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </article>
  );
}

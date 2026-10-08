import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateButton } from "@/components/AffiliateButton";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { JsonLd } from "@/components/JsonLd";
import { PlatformLogo } from "@/components/PlatformLogo";
import { PLATFORM_LABEL, SITE_URL } from "@/data/markets";
import { getProduct, getProducts } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";
import { getProductMedia } from "@/lib/media";
import { placeholderFor } from "@/lib/placeholder";
import { pageOpenGraph } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;
export const revalidate = 86400;
export const generateStaticParams = () =>
  getProducts("br").map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const market = await getMarket();
  const { slug } = await params;
  const product = getProduct(market, slug);
  if (!product) return {};
  // Prévia (WhatsApp, Pinterest, etc.): a foto do próprio produto, em endereço absoluto.
  const { images, hasReal } = await getProductMedia(product);
  const photo = hasReal && images[0] ? (images[0].startsWith("/") ? `${SITE_URL}${images[0]}` : images[0]) : undefined;
  return {
    title: product.title,
    description: product.summary,
    alternates: { canonical: `/produto/${slug}` },
    openGraph: pageOpenGraph(market, {
      title: product.title,
      description: product.summary,
      path: `/produto/${slug}`,
      images: photo ? [photo] : undefined,
    }),
    twitter: { card: "summary_large_image", title: product.title, description: product.summary, ...(photo ? { images: [photo] } : {}) },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const market = await getMarket();
  const { slug } = await params;
  const product = getProduct(market, slug);
  if (!product) notFound();
  const t = dict[market];
  const url = `${SITE_URL}/produto/${slug}`;
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
                { "@type": "ListItem", position: 1, name: t.home, item: `${SITE_URL}` },
                { "@type": "ListItem", position: 2, name: product.title, item: url },
              ],
            },
            {
              "@type": "Product",
              name: product.title,
              url,
              description: product.summary,
              category: product.category,
              ...(hasReal ? { image: images } : {}),
            },
          ],
        }}
      />
      <nav className="text-sm text-[var(--fg-soft)]">
        <Link href="/" className="hover:underline">
          {t.home}
        </Link>{" "}
        / {product.title}
      </nav>
      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery images={images} alt={product.title} fallback={placeholderFor(product)} />
        <header>
          <p className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--fg-soft)]">
            <PlatformLogo platform={product.platform} size={20} />
            {product.category} · {PLATFORM_LABEL[product.platform]}
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-[var(--fg)]">{product.title}</h1>
          <p className="mt-3 text-[var(--fg-muted)]">{product.summary}</p>
          <div className="mt-6 space-y-3">
            <AffiliateButton product={product} />
            <p className="text-xs text-[var(--fg-soft)]">{t.disclosure}</p>
            {t.amazonNotice && product.platform === "amazon" && <p className="text-xs text-[var(--fg-soft)]">{t.amazonNotice}</p>}
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

      <p className="text-xs text-[var(--fg-soft)]">
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

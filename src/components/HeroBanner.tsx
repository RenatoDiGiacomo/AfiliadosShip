import Link from "next/link";
import type { Market } from "@/data/types";
import { getGuides, getGuideProducts } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getProductMedia } from "@/lib/media";
import { placeholderFor } from "@/lib/placeholder";
import { ProductImage } from "./ProductImage";

/** Banner principal: chamada à esquerda e mosaico de fotos dos produtos do guia em destaque. */
export async function HeroBanner({ market }: { market: Market }) {
  const t = dict[market];
  const guide = getGuides(market)[0];
  const products = guide ? getGuideProducts(guide).slice(0, 4) : [];
  const media = await Promise.all(products.map((p) => getProductMedia(p)));

  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-dark)] text-white shadow-lg">
      <div className="grid items-center gap-8 p-6 sm:p-10 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            {t.heroBadge}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">{t.heroTitle}</h1>
          <p className="mt-3 max-w-md text-white/85">{t.heroSub}</p>
          {guide && (
            <Link
              href={`/${market}/guia/${guide.slug}`}
              className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--brand-dark)] transition hover:bg-slate-100"
            >
              {t.heroCta}
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {products.map((p, i) => (
            <Link
              key={p.id}
              href={`/${market}/produto/${p.slug}`}
              aria-label={p.title}
              className="aspect-square overflow-hidden rounded-2xl bg-white shadow-md transition hover:scale-[1.03]"
            >
              <ProductImage
                src={media[i].images[0]}
                alt={p.title}
                fallback={placeholderFor(p)}
                className="h-full w-full object-contain p-3"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

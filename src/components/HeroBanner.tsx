import Link from "next/link";
import { HERO_ESPECIAL } from "@/data/featured";
import type { Market } from "@/data/types";
import { getGuides, getProducts } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getProductMedia } from "@/lib/media";
import { placeholderFor } from "@/lib/placeholder";
import { AutoCarousel } from "./AutoCarousel";
import { ProductImage } from "./ProductImage";

/** Banner principal: chamada à esquerda e mosaico de fotos dos produtos do guia em destaque. */
export async function HeroBanner({ market }: { market: Market }) {
  const t = dict[market];
  const guide = getGuides(market)[0];
  // Sempre os 4 últimos itens adicionados (getProducts já devolve do mais novo para o mais antigo).
  // Prefere os que têm foto (no mercado US alguns usam só a ilustração da categoria).
  const newest = getProducts(market);
  // Campanha sazonal (Brasil): se o guia da campanha tem produtos, o hero mostra eles.
  const special = market === "br" ? newest.filter((p) => p.guides?.includes(HERO_ESPECIAL.guide)).slice(0, HERO_ESPECIAL.max) : [];
  const isSpecial = special.length > 0;
  const products = isSpecial
    ? special
    : [...newest.filter((p) => p.image), ...newest.filter((p) => !p.image)].slice(0, 4);
  const badge = isSpecial ? HERO_ESPECIAL.badge : t.heroBadge;
  const title = isSpecial ? HERO_ESPECIAL.title : t.heroTitle;
  const sub = isSpecial ? HERO_ESPECIAL.sub : t.heroSub;
  const ctaHref = isSpecial ? `/guia/${HERO_ESPECIAL.guide}` : guide ? `/guia/${guide.slug}` : undefined;
  const ctaLabel = isSpecial ? HERO_ESPECIAL.cta : t.heroCta;
  const media = await Promise.all(products.map((p) => getProductMedia(p)));

  if (isSpecial) {
    const deco = [
      { e: "🎈", c: "left-[4%] top-[8%] text-4xl", d: "0s" },
      { e: "⭐", c: "right-[6%] top-[6%] text-3xl", d: "0.8s" },
      { e: "🎁", c: "bottom-[8%] left-[42%] text-4xl", d: "1.4s" },
      { e: "🧸", c: "bottom-[6%] right-[4%] text-4xl", d: "0.4s" },
      { e: "🎉", c: "left-[46%] top-[4%] text-3xl", d: "2s" },
    ];
    return (
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-600 via-pink-500 to-amber-400 text-white shadow-xl">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(circle, #fff 2px, transparent 2.5px)", backgroundSize: "28px 28px" }}
          aria-hidden="true"
        />
        {deco.map((d) => (
          <span
            key={d.e}
            className={`kid-float pointer-events-none absolute select-none ${d.c}`}
            style={{ animationDelay: d.d }}
            aria-hidden="true"
          >
            {d.e}
          </span>
        ))}
        <div className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-6 p-5 sm:gap-8 sm:p-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="min-w-0">
            <span className="inline-block rounded-full bg-[#FFE14D] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#5b1456] shadow">
              🎉 {badge}
            </span>
            <h1 className="mt-4 text-3xl font-black leading-[1.08] drop-shadow-sm sm:text-6xl">{title}</h1>
            <p className="mt-3 max-w-md text-base text-white/95 sm:text-lg">{sub}</p>
            {ctaHref && (
              <Link
                href={ctaHref}
                className="mt-6 inline-block rounded-full bg-[#FFE14D] px-8 py-4 text-base font-extrabold text-[#5b1456] shadow-lg transition hover:rotate-2 hover:scale-105"
              >
                {ctaLabel} 🎁
              </Link>
            )}
          </div>
          <AutoCarousel label={badge} slideClassName="w-[58%] sm:w-[44%]">
            {products.map((p, i) => (
              <Link
                key={p.id}
                href={`/produto/${p.slug}`}
                aria-label={p.title}
                className={`block overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl transition hover:scale-[1.04] ${i % 2 ? "-rotate-2" : "rotate-2"} hover:rotate-0`}
              >
                <div className="relative aspect-square overflow-hidden">
                  <ProductImage
                    src={media[i].images[0]}
                    alt={p.title}
                    fallback={placeholderFor(p)}
                    className="absolute inset-0 h-full w-full object-contain p-2"
                  />
                </div>
                <p className="line-clamp-2 min-h-[2.6rem] bg-[#FFF3C4] px-3 py-2 text-center text-xs font-bold leading-tight text-[#5b1456] sm:text-sm">
                  {p.title}
                </p>
              </Link>
            ))}
          </AutoCarousel>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--hero-from)] to-[var(--brand-dark)] text-white shadow-lg">
      <div className="grid items-center gap-8 p-6 sm:p-10 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            {badge}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-3 max-w-md text-white/85">{sub}</p>
          {ctaHref && (
            <Link
              href={ctaHref}
              className="mt-6 inline-block rounded-full bg-[var(--cta-bg)] px-6 py-3 text-sm font-bold text-[var(--cta-fg)] transition hover:bg-[var(--cta-hover)]"
            >
              {ctaLabel}
            </Link>
          )}
        </div>
        <div className={`grid gap-3 ${isSpecial ? "grid-cols-3" : "grid-cols-2"}`}>
          {products.map((p, i) => (
            <Link
              key={p.id}
              href={`/produto/${p.slug}`}
              aria-label={p.title}
              className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-md transition hover:scale-[1.03]"
            >
              <ProductImage
                src={media[i].images[0]}
                alt={p.title}
                fallback={placeholderFor(p)}
                className={`absolute inset-0 h-full w-full object-contain ${isSpecial ? "p-1.5 sm:p-2" : "p-3"}`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

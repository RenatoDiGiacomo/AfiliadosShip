import Link from "next/link";
import { CAMPAIGN_PRODUCT_SLUG } from "@/data/featured";
import type { Market } from "@/data/types";
import { getProduct } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getProductMedia } from "@/lib/media";
import { placeholderFor } from "@/lib/placeholder";
import { ProductImage } from "./ProductImage";

/** Banner grande de campanha, acima do hero. Troque o produto em `src/data/featured.ts`. */
export async function CampaignBanner({ market }: { market: Market }) {
  const product = getProduct(market, CAMPAIGN_PRODUCT_SLUG);
  if (!product) return null;
  const t = dict[market];
  const media = await getProductMedia(product);
  const href = `/produto/${product.slug}`;

  return (
    <section
      aria-label={product.title}
      className="overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-600 via-violet-600 to-blue-600 text-white shadow-xl"
    >
      <div className="grid items-center gap-6 p-6 sm:p-10 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FFE14D] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#2b1055] shadow sm:text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-600" aria-hidden="true" />
            {t.heroFeaturedBadge}
          </span>
          <h2 className="mt-4 text-4xl font-black leading-[1.05] sm:text-6xl">{t.campaignTitle}</h2>
          <p className="mt-4 max-w-lg text-base text-white/90 sm:text-lg">{t.campaignSub}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {t.campaignChips.map((chip) => (
              <li key={chip} className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
                {chip}
              </li>
            ))}
          </ul>
          <Link
            href={href}
            className="mt-6 inline-block rounded-full bg-[#FFE14D] px-8 py-4 text-base font-extrabold text-[#2b1055] shadow-lg transition hover:scale-105"
          >
            {t.campaignCta}
          </Link>
        </div>
        <Link
          href={href}
          aria-label={product.title}
          className="mx-auto block aspect-square w-full max-w-sm rotate-2 overflow-hidden rounded-3xl bg-white shadow-2xl transition hover:rotate-0"
        >
          <ProductImage
            src={media.images[0]}
            alt={product.title}
            fallback={placeholderFor(product)}
            className="h-full w-full object-cover"
          />
        </Link>
      </div>
    </section>
  );
}

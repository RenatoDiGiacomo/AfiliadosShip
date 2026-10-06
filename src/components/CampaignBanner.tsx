import Link from "next/link";
import type { Campaign } from "@/data/featured";
import type { Market } from "@/data/types";
import { getProduct } from "@/lib/data";
import { getProductMedia } from "@/lib/media";
import { placeholderFor } from "@/lib/placeholder";
import { ProductImage } from "./ProductImage";

/** Banner de campanha. `compact` é a versão pequena (faixa horizontal). Configuração em `src/data/featured.ts`. */
export async function CampaignBanner({
  market,
  campaign,
  compact = false,
}: {
  market: Market;
  campaign: Campaign;
  compact?: boolean;
}) {
  const product = getProduct(market, campaign.slug);
  if (!product) return null;
  const media = await getProductMedia(product);
  const href = campaign.href ?? `/produto/${product.slug}`;
  const accent = { backgroundColor: campaign.accent, color: campaign.accentText };

  if (compact) {
    return (
      <section
        aria-label={campaign.title}
        className={`overflow-hidden rounded-2xl bg-gradient-to-r ${campaign.gradient} text-white shadow-md`}
      >
        <div className="flex items-center gap-4 p-4 sm:gap-6 sm:p-5">
          <Link
            href={href}
            aria-label={product.title}
            className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-white shadow-lg sm:h-28 sm:w-28"
          >
            <ProductImage
              src={media.images[0]}
              alt={product.title}
              fallback={placeholderFor(product)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <span className="inline-block rounded-full px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider" style={accent}>
              {campaign.badge}
            </span>
            <h2 className="mt-1.5 text-lg font-black leading-tight sm:text-2xl">{campaign.title}</h2>
            <p className="mt-1 hidden text-sm text-white/90 sm:block">{campaign.sub}</p>
            <Link
              href={href}
              className="mt-2 inline-block rounded-full px-5 py-2 text-sm font-extrabold shadow transition hover:scale-105"
              style={accent}
            >
              {campaign.cta}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label={campaign.title}
      className={`overflow-hidden rounded-3xl bg-gradient-to-br ${campaign.gradient} text-white shadow-xl`}
    >
      <div className="grid items-center gap-6 p-6 sm:p-10 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider shadow sm:text-sm"
            style={accent}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-current" aria-hidden="true" />
            {campaign.badge}
          </span>
          <h2 className="mt-4 text-4xl font-black leading-[1.05] sm:text-6xl">{campaign.title}</h2>
          <p className="mt-4 max-w-lg text-base text-white/90 sm:text-lg">{campaign.sub}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {campaign.chips.map((chip) => (
              <li key={chip} className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
                {chip}
              </li>
            ))}
          </ul>
          <Link
            href={href}
            className="mt-6 inline-block rounded-full px-8 py-4 text-base font-extrabold shadow-lg transition hover:scale-105"
            style={accent}
          >
            {campaign.cta}
          </Link>
        </div>
        <Link
          href={href}
          aria-label={product.title}
          className="relative mx-auto block aspect-square w-full max-w-sm rotate-2 overflow-hidden rounded-3xl bg-white shadow-2xl transition hover:rotate-0"
        >
          <ProductImage
            src={media.images[0]}
            alt={product.title}
            fallback={placeholderFor(product)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </Link>
      </div>
    </section>
  );
}

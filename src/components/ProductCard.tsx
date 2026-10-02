import Link from "next/link";
import { PLATFORM_LABEL } from "@/data/markets";
import type { Product } from "@/data/types";
import { dict } from "@/lib/i18n";
import { getProductMedia } from "@/lib/media";
import { placeholderFor } from "@/lib/placeholder";
import { AffiliateButton } from "./AffiliateButton";
import { PlatformLogo } from "./PlatformLogo";
import { ProductImage } from "./ProductImage";

const money = (p: Product) =>
  p.price !== undefined
    ? new Intl.NumberFormat(p.market === "br" ? "pt-BR" : "en-US", { style: "currency", currency: p.currency }).format(p.price)
    : undefined;

/** Card de vitrine: foto grande, loja, título, categoria e botão. */
export async function ProductCard({ product }: { product: Product }) {
  const t = dict[product.market];
  const { images } = await getProductMedia(product);
  const href = `/${product.market}/produto/${product.slug}`;
  // Preço de referência só para o Brasil e apenas se você o preencher manualmente (nunca Amazon/eBay).
  const price = product.market === "br" ? money(product) : undefined;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      <Link href={href} className="relative block aspect-square bg-slate-50" aria-label={product.title}>
        <span className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-[var(--fg-muted)] shadow">
          <PlatformLogo platform={product.platform} size={14} />
          {PLATFORM_LABEL[product.platform]}
        </span>
        <ProductImage
          src={images[0]}
          alt={product.title}
          fallback={placeholderFor(product)}
          className="h-full w-full object-contain p-3 transition group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-[var(--fg-soft)]">{product.category}</p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.75rem] font-semibold leading-snug text-[var(--fg)]">
          <Link href={href} className="hover:underline">
            {product.title}
          </Link>
        </h3>
        {price && (
          <p className="mt-2 text-lg font-bold text-[var(--fg)]">
            {price} <span className="text-[11px] font-normal text-[var(--fg-soft)]">{t.referencePrice}</span>
          </p>
        )}
        <div className="mt-auto pt-3">
          <AffiliateButton product={product} full />
        </div>
      </div>
    </article>
  );
}

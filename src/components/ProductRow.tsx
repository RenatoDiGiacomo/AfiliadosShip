import Link from "next/link";
import { PLATFORM_LABEL } from "@/data/markets";
import type { Product } from "@/data/types";
import { dict } from "@/lib/i18n";
import { getProductMedia } from "@/lib/media";
import { placeholderFor } from "@/lib/placeholder";
import { AffiliateButton } from "./AffiliateButton";
import { PlatformLogo } from "./PlatformLogo";
import { ProductImage } from "./ProductImage";

/** Linha de ranking (guias): imagem grande à esquerda, texto e ações à direita. */
export async function ProductRow({ product, rank }: { product: Product; rank: number }) {
  const t = dict[product.market];
  const { images } = await getProductMedia(product);
  const href = `/produto/${product.slug}`;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
      <Link
        href={href}
        aria-label={product.title}
        className="relative block aspect-square shrink-0 overflow-hidden rounded-xl bg-slate-50 sm:w-56"
      >
        <span className="absolute left-2 top-2 z-10 rounded-full bg-[var(--brand)] px-2.5 py-0.5 text-xs font-bold text-[var(--on-brand)]">
          #{rank}
        </span>
        <ProductImage
          src={images[0]}
          alt={product.title}
          fallback={placeholderFor(product)}
          className="h-full w-full object-contain p-3"
        />
      </Link>
      <div className="flex flex-1 flex-col">
        <p className="flex items-center gap-1.5 text-xs text-[var(--fg-soft)]">
          <PlatformLogo platform={product.platform} size={16} />
          {product.category} · {PLATFORM_LABEL[product.platform]}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-[var(--fg)]">{product.title}</h3>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">{product.summary}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-emerald-800">
          {product.pros.slice(0, 2).map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-4 pt-4">
          <AffiliateButton product={product} />
          <Link href={href} className="text-sm font-medium text-[var(--brand-text)] hover:underline">
            {t.readReview}
          </Link>
        </div>
      </div>
    </article>
  );
}

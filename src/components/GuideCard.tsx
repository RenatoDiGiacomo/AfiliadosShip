import Link from "next/link";
import type { Guide } from "@/data/types";
import { getGuideProducts } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getProductMedia } from "@/lib/media";
import { placeholderFor } from "@/lib/placeholder";
import { ProductImage } from "./ProductImage";

/** Card de guia com mosaico das imagens dos produtos incluídos. */
export async function GuideCard({ guide }: { guide: Guide }) {
  const t = dict[guide.market];
  const all = getGuideProducts(guide);
  const products = all.slice(0, 4);
  const media = await Promise.all(products.map((p) => getProductMedia(p)));

  return (
    <Link
      href={`/${guide.market}/guia/${guide.slug}`}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
    >
      <div className="grid grid-cols-4 gap-px bg-slate-200">
        {products.map((p, i) => (
          <div key={p.id} className="aspect-square bg-slate-50">
            <ProductImage
              src={media[i].images[0]}
              alt={p.title}
              fallback={placeholderFor(p)}
              className="h-full w-full object-contain p-1.5"
            />
          </div>
        ))}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-[var(--fg)]">{guide.title}</h3>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">{guide.description}</p>
        <p className="mt-3 text-xs font-medium text-[var(--brand-text)]">{t.productsCount(all.length)}</p>
      </div>
    </Link>
  );
}

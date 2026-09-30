import { PLATFORM_LABEL } from "@/data/markets";
import type { Product } from "@/data/types";
import { dict } from "@/lib/i18n";

export function AffiliateButton({ product, full = false }: { product: Product; full?: boolean }) {
  const t = dict[product.market];
  return (
    <a
      href={`/go/${product.platform}/${product.id}`}
      rel="sponsored nofollow noopener"
      target="_blank"
      className={`inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-700 ${
        full ? "w-full" : ""
      }`}
    >
      {t.buyOn(PLATFORM_LABEL[product.platform])}
    </a>
  );
}

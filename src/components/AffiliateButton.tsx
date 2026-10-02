import { PLATFORM_LABEL } from "@/data/markets";
import type { Product } from "@/data/types";
import { dict } from "@/lib/i18n";

/** Sem preço exibido (sempre na Amazon/eBay), o valor é destacado como "na loja" e o botão chama para ver o preço. */
export function AffiliateButton({ product, full = false }: { product: Product; full?: boolean }) {
  const t = dict[product.market];
  const store = PLATFORM_LABEL[product.platform];
  const showsPrice = product.market === "br" && product.price !== undefined;
  return (
    <div className={full ? "w-full" : "inline-flex flex-col items-stretch"}>
      {!showsPrice && (
        <p className="mb-1.5 rounded-md bg-amber-50 px-2 py-1 text-center text-xs font-bold text-amber-800 ring-1 ring-amber-200">
          💲 {t.priceOn(store)}
        </p>
      )}
      <a
        href={`/go/${product.platform}/${product.id}`}
        rel="sponsored nofollow noopener"
        target="_blank"
        className="inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-700"
      >
        {showsPrice ? t.buyOn(store) : t.checkPrice(store)}
      </a>
    </div>
  );
}

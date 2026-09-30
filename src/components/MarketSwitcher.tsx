import type { Market } from "@/data/types";
import { dict } from "@/lib/i18n";

// <a> comum (não <Link>): evita que o prefetch dispare o middleware e grave o cookie sem clique.
export function MarketSwitcher({ market }: { market: Market }) {
  const other: Market = market === "br" ? "us" : "br";
  return (
    <a href={`/?market=${other}`} className="text-sm text-slate-600 hover:underline" rel="nofollow">
      {dict[market].otherMarket}
    </a>
  );
}

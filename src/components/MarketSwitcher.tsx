import type { Market } from "@/data/types";
import { isActiveMarket } from "@/lib/active";
import { dict } from "@/lib/i18n";

// <a> comum (não <Link>): evita que o prefetch dispare o middleware e grave o cookie sem clique.
export function MarketSwitcher({ market }: { market: Market }) {
  const other: Market = market === "br" ? "us" : "br";
  if (!isActiveMarket(other)) return null;
  return (
    <a href={`/?market=${other}`} className="text-sm text-[var(--fg-muted)] hover:underline" rel="nofollow">
      {dict[market].otherMarket}
    </a>
  );
}

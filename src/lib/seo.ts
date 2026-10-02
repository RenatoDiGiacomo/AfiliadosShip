import type { Metadata } from "next";
import { MARKETS } from "@/data/markets";
import type { Market } from "@/data/types";
import { dict } from "@/lib/i18n";

/** Open Graph de página de conteúdo. type "article" permite Article Rich Pins no Pinterest. */
export const pageOpenGraph = (
  market: Market,
  o: { title: string; description: string; path: string },
): Metadata["openGraph"] => ({
  type: "article",
  title: o.title,
  description: o.description,
  url: o.path,
  siteName: dict[market].siteName,
  locale: MARKETS[market].lang.replace("-", "_"),
});

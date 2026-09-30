import { notFound } from "next/navigation";
import { isMarket } from "@/data/markets";
import type { Market } from "@/data/types";

export async function getMarket(params: Promise<{ market: string }>): Promise<Market> {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  return market;
}

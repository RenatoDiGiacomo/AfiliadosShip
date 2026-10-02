import active from "@/data/markets.active.json";
import type { Market } from "@/data/types";

/** Mercados com produtos (gerado por `npm run import`). Lista vazia = todos considerados ativos. */
export const ACTIVE_MARKETS = active as Market[];
export const isActiveMarket = (m: Market) => ACTIVE_MARKETS.length === 0 || ACTIVE_MARKETS.includes(m);

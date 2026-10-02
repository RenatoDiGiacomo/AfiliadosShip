import type { Market } from "@/data/types";

/** O site é só do Brasil: sem /br na URL, o mercado é sempre "br". (Argumento mantido para não mexer em todas as páginas.) */
export async function getMarket(_params?: unknown): Promise<Market> {
  return "br";
}

import type { Market } from "@/data/types";

/** Páginas legais: /us/privacy e /us/terms; /br/privacidade e /br/termos. */
export const legalPath = (market: Market, kind: "privacy" | "terms") =>
  market === "us" ? `/us/${kind}` : `/br/${kind === "privacy" ? "privacidade" : "termos"}`;

import type { Market } from "@/data/types";

/** Páginas legais do site (só Brasil): /privacidade e /termos. */
export const legalPath = (_market: Market, kind: "privacy" | "terms") => (kind === "privacy" ? "/privacidade" : "/termos");

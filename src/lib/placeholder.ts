import type { Product } from "@/data/types";

export const GENERIC_PLACEHOLDER = "/placeholders/generic.svg";

const WITH_ILLUSTRATION = new Set(["home", "tech", "beauty", "fitness", "fashion", "pets", "kids", "gadgets"]);

/** Imagem ilustrativa por categoria (usada quando não há foto real). Categoria nova usa a genérica. */
const ALIAS: Record<string, string> = { kitchen: "home", cozinha: "home", computers: "tech", "computers-accessories": "tech", eletronicos: "tech" };

export const placeholderFor = (product: Pick<Product, "categoryId">) => {
  const id = ALIAS[product.categoryId] ?? product.categoryId;
  return WITH_ILLUSTRATION.has(id) ? `/placeholders/${id}.svg` : GENERIC_PLACEHOLDER;
};

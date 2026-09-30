import type { Product } from "@/data/types";

export const GENERIC_PLACEHOLDER = "/placeholders/generic.svg";

const WITH_ILLUSTRATION = new Set(["home", "tech", "beauty", "fitness", "fashion", "pets", "kids", "gadgets"]);

/** Imagem ilustrativa por categoria (usada quando não há foto real). Categoria nova usa a genérica. */
export const placeholderFor = (product: Pick<Product, "categoryId">) =>
  WITH_ILLUSTRATION.has(product.categoryId) ? `/placeholders/${product.categoryId}.svg` : GENERIC_PLACEHOLDER;

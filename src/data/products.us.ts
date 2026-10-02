import catalog from "./catalog.us.json";
import type { Product } from "./types";

// Produtos vêm de catalog/us.csv -> `npm run import` -> catalog.us.json (não editar o JSON à mão).
export const productsUS = catalog as unknown as Product[];

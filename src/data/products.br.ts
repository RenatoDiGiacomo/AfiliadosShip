import catalog from "./catalog.br.json";
import type { Product } from "./types";

// Produtos vêm de catalog/br.csv -> `npm run import` -> catalog.br.json (não editar o JSON à mão).
// No Brasil, produto sem foto fica oculto do site (continua no CSV e volta quando a coluna `imagem` for preenchida).
export const productsBR = (catalog as unknown as Product[]).filter((p) => Boolean(p.image));

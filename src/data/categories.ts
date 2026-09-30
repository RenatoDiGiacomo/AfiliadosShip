import type { Category, Market } from "./types";
import categories from "./categories.json";

// Fonte: categories.json (edite lá). Ids são compartilhados entre mercados.
// Para nova categoria, crie também public/placeholders/<id>.svg (ou ela usa a imagem genérica).
export const CATEGORIES = categories as Record<Market, Category[]>;

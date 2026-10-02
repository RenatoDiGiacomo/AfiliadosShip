import type { Category, Market } from "./types";
import br from "./categories.br.generated.json";
import us from "./categories.us.generated.json";

// Categorias vêm do CSV (coluna "categoria"): o import grava estes arquivos. Não edite à mão.
export const CATEGORIES: Record<Market, Category[]> = { br, us };

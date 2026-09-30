import catalog from "./catalog.br.json";
import { buildSamples, type SampleRow } from "./sample";
import type { Product } from "./types";

// ATENÇÃO: catálogo de EXEMPLO. Os links são buscas nas lojas e os textos são genéricos.
// Quando catalog.br.json tiver produtos reais (npm run import), os exemplos saem do ar.
const CATEGORY_DEFAULTS = {
  home: { name: "Casa e cozinha", pros: ["Facilita a rotina da casa", "Boa variedade de preços"], cons: ["Meça o espaço antes de comprar", "Acabamento varia entre marcas"] },
  tech: { name: "Tecnologia", pros: ["Praticidade no dia a dia", "Muitas opções de marca"], cons: ["Confira compatibilidade com seu aparelho", "Qualidade varia: leia as avaliações"] },
  beauty: { name: "Beleza", pros: ["Ajuda a organizar e cuidar dos itens", "Custo baixo"], cons: ["Confira a procedência do vendedor", "Verifique validade e composição quando houver"] },
  fitness: { name: "Fitness", pros: ["Permite treinar em casa", "Fácil de guardar"], cons: ["Escolha o nível de resistência certo", "Modelos baratos podem desgastar rápido"] },
  fashion: { name: "Moda e acessórios", pros: ["Visual e praticidade", "Opções para vários estilos"], cons: ["Confira a tabela de medidas", "Cor pode variar da foto"] },
  pets: { name: "Pets", pros: ["Mais conforto e cuidado para o animal", "Fácil de usar"], cons: ["Escolha o tamanho adequado ao pet", "Observe a adaptação do animal"] },
  kids: { name: "Infantil", pros: ["Estimula a brincadeira", "Boa opção de presente"], cons: ["Confira a faixa etária indicada", "Verifique a certificação do produto"] },
  gadgets: { name: "Utilidades", pros: ["Resolve pequenos problemas do dia a dia", "Custo baixo"], cons: ["Prefira vendedores bem avaliados", "Confira o que vem na embalagem"] },
};

const rows: SampleRow[] = [
  { slug: "organizador-geladeira", categoryId: "home", platform: "mercadolivre", title: "Organizador de geladeira", keyword: "organizador de geladeira", summary: "Potes e divisórias para deixar a geladeira organizada e aproveitar melhor o espaço." },
  { slug: "fone-bluetooth", categoryId: "tech", platform: "shopee", title: "Fone de ouvido Bluetooth", keyword: "fone bluetooth", summary: "Fone sem fio para o dia a dia, com boa autonomia de bateria." },
  { slug: "organizador-maquiagem", categoryId: "beauty", platform: "mercadolivre", title: "Organizador de maquiagem", keyword: "organizador de maquiagem", summary: "Deixa pincéis e produtos à mão e protegidos do pó." },
  { slug: "kit-elasticos", categoryId: "fitness", platform: "shopee", title: "Kit de elásticos para exercício", keyword: "kit elastico exercicio", summary: "Treino em casa com níveis diferentes de resistência." },
  { slug: "necessaire-viagem", categoryId: "fashion", platform: "mercadolivre", title: "Necessaire de viagem", keyword: "necessaire viagem", summary: "Espaço para itens de higiene, prática de carregar na mala." },
  { slug: "fonte-agua-pet", categoryId: "pets", platform: "shopee", title: "Fonte de água para pets", keyword: "fonte de agua pet", summary: "Água corrente e filtrada para incentivar o pet a beber mais." },
  { slug: "quebra-cabeca-infantil", categoryId: "kids", platform: "mercadolivre", title: "Quebra-cabeça infantil", keyword: "quebra cabeca infantil", summary: "Brincadeira que estimula a coordenação e o raciocínio." },
  { slug: "lanterna-led", categoryId: "gadgets", platform: "shopee", title: "Lanterna LED recarregável", keyword: "lanterna led recarregavel", summary: "Lanterna compacta para emergências, viagens e pequenos reparos." },
];

// Se catalog.br.json tiver produtos (gerado por `npm run import`), ele substitui os exemplos.
const real = catalog as unknown as Product[];
export const productsBR = real.length > 0 ? real : buildSamples("br", "BRL", CATEGORY_DEFAULTS, rows, "2026-09-30");

import catalog from "./catalog.br.json";
import { buildSamples, type SampleRow } from "./sample";
import type { Product } from "./types";

// ATENÇÃO: catálogo de EXEMPLO (nicho home office). Os links são buscas nas lojas.
// Antes de publicar: troque por produtos reais (productUrl real + affiliateUrl do painel),
// com fotos (extraídas do link ou em image/images) e textos originais.
const CATEGORY_DEFAULTS = {
  peripherals: { name: "Periféricos", pros: ["Melhora o conforto no uso diário", "Boa variedade de faixas de preço"], cons: ["Compare modelos: qualidade varia bastante", "Confira compatibilidade com seu equipamento"] },
  ergonomics: { name: "Ergonomia", pros: ["Ajuda a manter uma postura melhor", "Útil para longas jornadas de trabalho"], cons: ["Exige ajuste até achar a posição ideal", "Modelos muito baratos podem ser instáveis"] },
  "video-audio": { name: "Vídeo e áudio", pros: ["Deixa reuniões e aulas mais claras", "Instalação simples (plug and play)"], cons: ["Qualidade cai com pouca luz ou ruído", "Verifique compatibilidade com seu sistema"] },
  lighting: { name: "Iluminação", pros: ["Reduz o cansaço visual", "Baixo consumo de energia"], cons: ["Modelos baratos podem piscar", "Ocupa espaço na mesa"] },
  organization: { name: "Organização", pros: ["Mesa mais limpa e funcional", "Fácil de instalar"], cons: ["Meça o espaço antes de comprar", "Acabamento varia entre marcas"] },
  accessories: { name: "Acessórios", pros: ["Resolve pequenos problemas do dia a dia", "Custo baixo"], cons: ["Prefira marcas com boa avaliação", "Cuidado com produtos sem certificação"] },
};

const rows: SampleRow[] = [
  { slug: "teclado-mecanico", categoryId: "peripherals", platform: "mercadolivre", title: "Teclado mecânico custo-benefício", keyword: "teclado mecanico", summary: "O que observar ao escolher seu primeiro teclado mecânico para trabalhar em casa." },
  { slug: "mouse-vertical", categoryId: "peripherals", platform: "shopee", title: "Mouse ergonômico vertical", keyword: "mouse vertical", summary: "Alternativa para quem passa horas no computador e sente desconforto no pulso." },
  { slug: "mouse-sem-fio", categoryId: "peripherals", platform: "mercadolivre", title: "Mouse sem fio silencioso", keyword: "mouse sem fio silencioso", summary: "Cliques discretos e sem cabo para deixar a mesa mais limpa." },
  { slug: "suporte-notebook", categoryId: "ergonomics", platform: "mercadolivre", title: "Suporte de notebook ajustável", keyword: "suporte notebook", summary: "Eleva a tela na altura dos olhos e melhora a postura no home office." },
  { slug: "apoio-punho", categoryId: "ergonomics", platform: "shopee", title: "Apoio de punho para teclado", keyword: "apoio de punho teclado", summary: "Deixa a digitação mais confortável em jornadas longas." },
  { slug: "apoio-pes", categoryId: "ergonomics", platform: "mercadolivre", title: "Apoio para os pés ajustável", keyword: "apoio para os pes escritorio", summary: "Ajuda a manter as pernas em posição confortável sentado." },
  { slug: "webcam-full-hd", categoryId: "video-audio", platform: "shopee", title: "Webcam Full HD", keyword: "webcam full hd", summary: "Imagem nítida para reuniões e aulas online sem câmera profissional." },
  { slug: "headset-usb", categoryId: "video-audio", platform: "mercadolivre", title: "Headset com microfone USB", keyword: "headset usb microfone", summary: "Áudio claro nas chamadas e isolamento básico de ruído." },
  { slug: "microfone-usb", categoryId: "video-audio", platform: "shopee", title: "Microfone USB para reuniões", keyword: "microfone usb", summary: "Voz mais limpa do que o microfone embutido do notebook." },
  { slug: "luminaria-led", categoryId: "lighting", platform: "mercadolivre", title: "Luminária de mesa LED", keyword: "luminaria mesa led", summary: "Iluminação que cansa menos a vista, com ajuste de brilho e cor." },
  { slug: "ring-light", categoryId: "lighting", platform: "shopee", title: "Ring light de mesa", keyword: "ring light mesa", summary: "Luz frontal uniforme para aparecer bem em videochamadas." },
  { slug: "fita-led", categoryId: "lighting", platform: "mercadolivre", title: "Fita LED para mesa", keyword: "fita led", summary: "Iluminação de fundo que valoriza o setup e reduz o contraste da tela." },
  { slug: "organizador-mesa", categoryId: "organization", platform: "shopee", title: "Organizador de mesa", keyword: "organizador de mesa escritorio", summary: "Canetas, papéis e pequenos itens no lugar certo." },
  { slug: "suporte-monitor", categoryId: "organization", platform: "mercadolivre", title: "Suporte elevado para monitor", keyword: "suporte monitor mesa", summary: "Sobe o monitor e libera espaço embaixo para guardar itens." },
  { slug: "organizador-cabos", categoryId: "organization", platform: "shopee", title: "Organizador de cabos", keyword: "organizador de cabos", summary: "Menos fio à mostra e mais fácil de limpar a mesa." },
  { slug: "hub-usb", categoryId: "accessories", platform: "mercadolivre", title: "Hub USB com várias portas", keyword: "hub usb", summary: "Mais portas para notebook com poucas entradas." },
  { slug: "mousepad-grande", categoryId: "accessories", platform: "shopee", title: "Mousepad grande", keyword: "mousepad grande", summary: "Cobre teclado e mouse, protege a mesa e melhora o deslize." },
  { slug: "filtro-de-linha", categoryId: "accessories", platform: "mercadolivre", title: "Filtro de linha com USB", keyword: "filtro de linha usb", summary: "Mais tomadas e carregamento de celular direto na mesa." },
];

// Se catalog.br.json tiver produtos (gerado por `npm run import`), ele substitui os exemplos.
const real = catalog as unknown as Product[];
export const productsBR = real.length > 0 ? real : buildSamples("br", "BRL", CATEGORY_DEFAULTS, rows, "2026-09-30");

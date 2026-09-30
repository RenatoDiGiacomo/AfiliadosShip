import catalog from "./catalog.us.json";
import { buildSamples, type SampleRow } from "./sample";
import type { Product } from "./types";

// ATENÇÃO: catálogo de EXEMPLO. Os links são buscas nas lojas e os textos são genéricos.
// Quando catalog.us.json tiver produtos reais (npm run import), os exemplos saem do ar.
// Não exiba preços de Amazon/eBay como se fossem em tempo real.
const CATEGORY_DEFAULTS = {
  home: { name: "Home & Kitchen", pros: ["Makes daily routines easier", "Wide range of prices"], cons: ["Measure your space first", "Finish varies between brands"] },
  tech: { name: "Tech", pros: ["Convenient for everyday use", "Many brands to choose from"], cons: ["Check compatibility with your device", "Quality varies: read the reviews"] },
  beauty: { name: "Beauty", pros: ["Helps you organize and care for your items", "Low cost"], cons: ["Check the seller's reputation", "Check ingredients and expiry where relevant"] },
  fitness: { name: "Fitness", pros: ["Lets you work out at home", "Easy to store"], cons: ["Pick the right resistance level", "Cheap models may wear out fast"] },
  fashion: { name: "Fashion & Accessories", pros: ["Style and convenience", "Options for many tastes"], cons: ["Check the size chart", "Color may differ from the photo"] },
  pets: { name: "Pets", pros: ["More comfort and care for your pet", "Easy to use"], cons: ["Choose the right size for your pet", "Watch how your pet adapts"] },
  kids: { name: "Kids", pros: ["Encourages play", "A good gift option"], cons: ["Check the recommended age range", "Check the product's safety certification"] },
  gadgets: { name: "Gadgets", pros: ["Solves small everyday problems", "Low cost"], cons: ["Prefer well-reviewed sellers", "Check what is included in the box"] },
};

const rows: SampleRow[] = [
  { slug: "fridge-organizer-bins", categoryId: "home", platform: "amazon", title: "Fridge organizer bins", keyword: "fridge organizer bins", summary: "Bins and dividers to keep the fridge tidy and use space better." },
  { slug: "bluetooth-earbuds", categoryId: "tech", platform: "ebay", title: "Bluetooth earbuds", keyword: "bluetooth earbuds", summary: "Wireless earbuds for everyday use, with good battery life." },
  { slug: "makeup-organizer", categoryId: "beauty", platform: "amazon", title: "Makeup organizer", keyword: "makeup organizer", summary: "Keeps brushes and products within reach and protected from dust." },
  { slug: "resistance-bands-set", categoryId: "fitness", platform: "ebay", title: "Resistance bands set", keyword: "resistance bands set", summary: "Home workouts with different resistance levels." },
  { slug: "travel-toiletry-bag", categoryId: "fashion", platform: "amazon", title: "Travel toiletry bag", keyword: "travel toiletry bag", summary: "Room for toiletries and easy to pack in a suitcase." },
  { slug: "pet-water-fountain", categoryId: "pets", platform: "ebay", title: "Pet water fountain", keyword: "pet water fountain", summary: "Flowing, filtered water to encourage your pet to drink more." },
  { slug: "kids-jigsaw-puzzle", categoryId: "kids", platform: "amazon", title: "Kids jigsaw puzzle", keyword: "kids jigsaw puzzle", summary: "Play that builds coordination and problem solving." },
  { slug: "rechargeable-led-flashlight", categoryId: "gadgets", platform: "ebay", title: "Rechargeable LED flashlight", keyword: "rechargeable led flashlight", summary: "Compact flashlight for emergencies, travel and small repairs." },
];

// Se catalog.us.json tiver produtos (gerado por `npm run import`), ele substitui os exemplos.
const real = catalog as unknown as Product[];
export const productsUS = real.length > 0 ? real : buildSamples("us", "USD", CATEGORY_DEFAULTS, rows, "2026-09-30");

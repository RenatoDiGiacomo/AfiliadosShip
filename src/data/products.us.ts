import catalog from "./catalog.us.json";
import { buildSamples, type SampleRow } from "./sample";
import type { Product } from "./types";

// ATENÇÃO: catálogo de EXEMPLO (nicho home office). Os links são buscas nas lojas.
// Antes de publicar: troque por produtos reais (Amazon.com / eBay.com) com fotos e textos originais.
// Não exiba preços de Amazon/eBay como se fossem em tempo real.
const CATEGORY_DEFAULTS = {
  peripherals: { name: "Peripherals", pros: ["Makes daily use more comfortable", "Wide range of price points"], cons: ["Quality varies: compare models", "Check compatibility with your setup"] },
  ergonomics: { name: "Ergonomics", pros: ["Helps you keep better posture", "Useful for long work days"], cons: ["Takes some tuning to find your position", "Very cheap models can be unstable"] },
  "video-audio": { name: "Video & Audio", pros: ["Makes meetings and classes clearer", "Simple plug-and-play setup"], cons: ["Quality drops in low light or noise", "Check compatibility with your system"] },
  lighting: { name: "Lighting", pros: ["Reduces eye strain", "Low power use"], cons: ["Cheap models may flicker", "Takes desk space"] },
  organization: { name: "Organization", pros: ["A cleaner, more functional desk", "Easy to set up"], cons: ["Measure your space first", "Finish varies between brands"] },
  accessories: { name: "Accessories", pros: ["Solves small everyday problems", "Low cost"], cons: ["Prefer well-reviewed brands", "Beware of uncertified products"] },
};

const rows: SampleRow[] = [
  { slug: "budget-mechanical-keyboard", categoryId: "peripherals", platform: "amazon", title: "Budget mechanical keyboard", keyword: "budget mechanical keyboard", summary: "What to look for in a first mechanical keyboard for a home office." },
  { slug: "vertical-ergonomic-mouse", categoryId: "peripherals", platform: "ebay", title: "Vertical ergonomic mouse", keyword: "vertical ergonomic mouse", summary: "An option for people who spend long hours at the computer and feel wrist strain." },
  { slug: "wireless-silent-mouse", categoryId: "peripherals", platform: "amazon", title: "Wireless silent mouse", keyword: "wireless silent mouse", summary: "Quiet clicks and no cable for a cleaner desk." },
  { slug: "laptop-stand", categoryId: "ergonomics", platform: "amazon", title: "Adjustable laptop stand", keyword: "adjustable laptop stand", summary: "Raises your screen to eye level and improves posture while working from home." },
  { slug: "wrist-rest", categoryId: "ergonomics", platform: "ebay", title: "Keyboard wrist rest", keyword: "keyboard wrist rest", summary: "Makes long typing sessions more comfortable." },
  { slug: "footrest", categoryId: "ergonomics", platform: "amazon", title: "Adjustable under-desk footrest", keyword: "under desk footrest", summary: "Helps keep your legs in a comfortable position while seated." },
  { slug: "1080p-webcam", categoryId: "video-audio", platform: "ebay", title: "1080p webcam", keyword: "1080p webcam", summary: "Sharp video for meetings and classes without a pro camera." },
  { slug: "usb-headset", categoryId: "video-audio", platform: "amazon", title: "USB headset with microphone", keyword: "usb headset microphone", summary: "Clear call audio and basic noise isolation." },
  { slug: "usb-microphone", categoryId: "video-audio", platform: "ebay", title: "USB microphone for meetings", keyword: "usb microphone", summary: "A cleaner voice than your laptop's built-in mic." },
  { slug: "led-desk-lamp", categoryId: "lighting", platform: "amazon", title: "LED desk lamp", keyword: "led desk lamp", summary: "Lighting that is easier on your eyes, with adjustable brightness and color." },
  { slug: "ring-light", categoryId: "lighting", platform: "ebay", title: "Desktop ring light", keyword: "desktop ring light", summary: "Even front lighting to look good on video calls." },
  { slug: "led-strip", categoryId: "lighting", platform: "amazon", title: "LED strip lights for desk", keyword: "led strip lights desk", summary: "Background lighting that adds ambience and softens screen contrast." },
  { slug: "desk-organizer", categoryId: "organization", platform: "ebay", title: "Desk organizer", keyword: "desk organizer", summary: "Pens, papers and small items in the right place." },
  { slug: "monitor-riser", categoryId: "organization", platform: "amazon", title: "Monitor riser with storage", keyword: "monitor stand riser", summary: "Lifts your monitor and frees up space underneath." },
  { slug: "cable-organizer", categoryId: "organization", platform: "ebay", title: "Cable organizer", keyword: "cable organizer", summary: "Less cable clutter and an easier desk to clean." },
  { slug: "usb-hub", categoryId: "accessories", platform: "amazon", title: "Multi-port USB hub", keyword: "usb hub", summary: "More ports for laptops with few connections." },
  { slug: "large-mouse-pad", categoryId: "accessories", platform: "ebay", title: "Large desk mouse pad", keyword: "large desk mouse pad", summary: "Covers keyboard and mouse, protects the desk and improves glide." },
  { slug: "surge-protector", categoryId: "accessories", platform: "amazon", title: "Surge protector with USB", keyword: "surge protector usb", summary: "More outlets and phone charging right at your desk." },
];

// Se catalog.us.json tiver produtos (gerado por `npm run import`), ele substitui os exemplos.
const real = catalog as unknown as Product[];
export const productsUS = real.length > 0 ? real : buildSamples("us", "USD", CATEGORY_DEFAULTS, rows, "2026-09-30");

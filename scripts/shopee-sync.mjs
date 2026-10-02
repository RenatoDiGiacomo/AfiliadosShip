#!/usr/bin/env node
/**
 * Preenche foto e link de afiliado dos produtos da Shopee em catalog/br.csv
 * usando a API aberta de afiliados da Shopee (oficial, sem raspar página, sem captcha).
 *
 * Uso:  npm run shopee            (preenche o que está vazio)
 *       npm run shopee -- --force (refaz tudo)
 *       npm run shopee -- --dry   (só mostra, não grava)
 * Depois: npm run import
 *
 * Credenciais (NUNCA no repositório): SHOPEE_APP_ID e SHOPEE_SECRET em .env.local
 * (painel de afiliados Shopee > API aberta). Cada linha precisa de link_produto
 * no formato https://shopee.com.br/product/<shopId>/<itemId> (ou ...-i.<shopId>.<itemId>).
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILE = path.join(root, "catalog", "br.csv");
const ENDPOINT = process.env.SHOPEE_API_URL || "https://open-api.affiliate.shopee.com.br/graphql";
const force = process.argv.includes("--force");
const dry = process.argv.includes("--dry");
// Lê .env.local (se existir) sem depender de flag do Node.
const envFile = path.join(root, ".env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const { SHOPEE_APP_ID: APP_ID, SHOPEE_SECRET: SECRET } = process.env;

if (!APP_ID || !SECRET) {
  console.error("Faltam SHOPEE_APP_ID e SHOPEE_SECRET.\nCrie o arquivo .env.local na raiz do projeto (ele não vai para o GitHub) com:\n  SHOPEE_APP_ID=seu_app_id\n  SHOPEE_SECRET=seu_secret\nAs duas chaves ficam no painel de afiliados da Shopee, na área de API aberta.");
  process.exit(2);
}

/* ---------- CSV (aspas e ; ou , suportados) ---------- */
function parseCsv(text) {
  const first = text.split(/\r?\n/, 1)[0] ?? "";
  const delim = first.split(";").length > first.split(",").length ? ";" : ",";
  const rows = [];
  let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === delim) { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some((x) => x.trim() !== "")) rows.push(row);
      row = [];
    } else cell += c;
  }
  row.push(cell);
  if (row.some((x) => x.trim() !== "")) rows.push(row);
  return { rows, delim };
}
const esc = (v, d) => (/["\n\r]/.test(v) || v.includes(d) ? `"${v.replace(/"/g, '""')}"` : v);
const strip = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/* ---------- API ---------- */
async function gql(query) {
  const payload = JSON.stringify({ query });
  const ts = Math.floor(Date.now() / 1000);
  const signature = crypto.createHash("sha256").update(`${APP_ID}${ts}${payload}${SECRET}`).digest("hex");
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `SHA256 Credential=${APP_ID}, Timestamp=${ts}, Signature=${signature}` },
    body: payload,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors ?? json).slice(0, 300) || `HTTP ${res.status}`);
  return json.data;
}

const ids = (url) => {
  const m = url.match(/shopee\.com\.br\/product\/(\d+)\/(\d+)/) || url.match(/-i\.(\d+)\.(\d+)/);
  return m ? { shopId: m[1], itemId: m[2] } : null;
};

async function offer({ shopId, itemId }) {
  const q = `{ productOfferV2(itemId: ${itemId}, shopId: ${shopId}, limit: 1) { nodes { itemId shopId productName imageUrl offerLink productLink } } }`;
  const data = await gql(q);
  return data?.productOfferV2?.nodes?.[0] ?? null;
}

async function shortLink(originUrl) {
  const q = `mutation { generateShortLink(input: { originUrl: ${JSON.stringify(originUrl)}, subIds: ["achadinhos"] }) { shortLink } }`;
  const data = await gql(q);
  return data?.generateShortLink?.shortLink ?? null;
}

/* ---------- Principal ---------- */
const { rows, delim } = parseCsv(fs.readFileSync(FILE, "utf8"));
const header = rows[0].map((h) => strip(h).replace(/\s+/g, "_"));
const col = (...names) => header.findIndex((h) => names.includes(h));
const iPlat = col("plataforma", "platform");
const iUrl = col("link_produto", "product_url", "url");
const iAff = col("link_afiliado", "affiliate_url");
const iImg = col("imagem", "image");
const iTitle = col("titulo", "title");
if ([iPlat, iUrl, iAff, iImg].includes(-1)) { console.error("Cabeçalho do br.csv não reconhecido."); process.exit(2); }

let changed = 0;
for (let r = 1; r < rows.length; r++) {
  const row = rows[r];
  if (strip(row[iPlat] ?? "") !== "shopee") continue;
  const name = row[iTitle] ?? `linha ${r + 1}`;
  const needImg = force || !row[iImg]?.trim();
  const needAff = force || !row[iAff]?.trim();
  if (!needImg && !needAff) continue;
  const id = ids(row[iUrl] ?? "");
  if (!id) { console.warn(`- ${name}: link_produto fora do formato /product/<loja>/<item>, pulei`); continue; }
  try {
    const o = await offer(id);
    if (!o) console.warn(`- ${name}: a API não retornou oferta para este item (pode estar fora do programa de afiliados)`);
    if (needImg && o?.imageUrl) { row[iImg] = o.imageUrl; changed++; console.log(`✓ ${name}: foto`); }
    if (needAff) {
      const link = (await shortLink(`https://shopee.com.br/product/${id.shopId}/${id.itemId}`)) || o?.offerLink;
      if (link) { row[iAff] = link; changed++; console.log(`✓ ${name}: link de afiliado`); }
      else console.warn(`- ${name}: não consegui gerar o link de afiliado`);
    }
  } catch (e) {
    console.error(`✗ ${name}: ${e.message}`);
  }
}

if (dry) console.log(`(dry) ${changed} campo(s) seriam gravados`);
else if (changed > 0) {
  fs.writeFileSync(FILE, rows.map((r) => r.map((v) => esc(v, ";")).join(";")).join("\n") + "\n");
  console.log(`\n${changed} campo(s) gravados em catalog/br.csv. Agora rode: npm run import`);
} else console.log("Nada a preencher.");

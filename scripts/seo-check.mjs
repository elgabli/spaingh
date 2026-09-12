// Comprobaciones SEO estructurales sobre dist/: canonical, hreflang recíproco,
// sitemap, JSON-LD, títulos/descriptions, imágenes sin alt, enlaces externos,
// _redirects. Salida: lista de incidencias (vacía = OK).
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://spaingh.com';
const pages = [];
(function walk(d, u) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p, `${u}${f}/`);
    else if (f === 'index.html') pages.push(u);
  }
})('dist', '/');

const issues = [];
const titles = new Map(); const descs = new Map();
const hreflangs = new Map(); // url -> Set(alt urls)
const attr = (tag, name) => (tag.match(new RegExp(`${name}="([^"]*)"`)) || [])[1];

for (const path of pages) {
  const html = readFileSync(`dist${path}index.html`, 'utf8');
  const url = SITE + path;
  const isRedirect = /http-equiv="refresh"/i.test(html);
  if (isRedirect || path === '/404/') continue;
  const canonical = attr(html.match(/<link[^>]*rel="canonical"[^>]*>/) ?.[0] || '', 'href');
  if (canonical !== url) issues.push(`${path}: canonical ${canonical}`);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  if (!title) issues.push(`${path}: sin title`); else if (title.length > 70) issues.push(`${path}: title ${title.length} chars`);
  titles.set(title, [...(titles.get(title) || []), path]);
  const desc = attr(html.match(/<meta[^>]*name="description"[^>]*>/)?.[0] || '', 'content') || '';
  if (!desc) issues.push(`${path}: sin description`); else if (desc.length < 70 || desc.length > 175) issues.push(`${path}: description ${desc.length} chars`);
  descs.set(desc, [...(descs.get(desc) || []), path]);
  const alts = [...html.matchAll(/<link[^>]*rel="alternate"[^>]*>/g)].map((m) => [attr(m[0], 'hreflang'), attr(m[0], 'href')]);
  const self = alts.find(([l, h]) => h === url);
  if (!self) issues.push(`${path}: hreflang sin self`);
  const lang = (html.match(/<html lang="(\w+)"/) || [])[1];
  if (self && self[0] !== lang) issues.push(`${path}: hreflang self ${self[0]} != html lang ${lang}`);
  hreflangs.set(url, new Set(alts.map(([, h]) => h)));
  if (alts.length > 1 && !alts.some(([l]) => l === 'x-default')) issues.push(`${path}: sin x-default`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length; if (h1 !== 1) issues.push(`${path}: ${h1} h1`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const j = JSON.parse(m[1]); const nodes = j['@graph'] || [j]; for (const n of nodes) if (!n['@type']) issues.push(`${path}: JSON-LD nodo sin @type`); }
    catch (e) { issues.push(`${path}: JSON-LD inválido ${e.message.slice(0, 40)}`); }
  }
  const main = (html.match(/<main[\s\S]*<\/main>/) || [''])[0];
  const noAlt = [...main.matchAll(/<img[^>]*>/g)].filter((m) => !/alt="/.test(m[0]) || /alt=""/.test(m[0])).length;
  if (noAlt) issues.push(`${path}: ${noAlt} img sin alt`);
  const ext = [...main.matchAll(/<a[^>]*href="https?:\/\/(?!spaingh\.com)[^"]*"[^>]*>/g)].filter((m) => /target="_blank"/.test(m[0]) && !/rel="[^"]*noopener/.test(m[0])).length;
  if (ext) issues.push(`${path}: ${ext} enlaces externos _blank sin noopener`);
  if (/https?:\/\/spaingh\.com\/wp-|wp-content|elementor/.test(main)) issues.push(`${path}: restos WordPress`);
  const og = attr(html.match(/<meta[^>]*property="og:image"[^>]*>/)?.[0] || '', 'content');
  if (!og) issues.push(`${path}: sin og:image`);
}
for (const [t, ps] of titles) if (ps.length > 1) issues.push(`title duplicado "${t}": ${ps.join(' ')}`);
for (const [d, ps] of descs) if (ps.length > 1) issues.push(`description duplicada: ${ps.join(' ')}`);
// hreflang recíproco: si A declara B, B debe declarar A
for (const [u, set] of hreflangs) for (const alt of set) {
  if (alt === u) continue;
  const back = hreflangs.get(alt);
  if (!back) issues.push(`hreflang ${u} → ${alt} (no existe o sin hreflang)`);
  else if (!back.has(u)) issues.push(`hreflang no recíproco ${u} ↔ ${alt}`);
}
// sitemap
const sm = readFileSync('dist/sitemap-0.xml', 'utf8');
const smUrls = new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
for (const p of pages) { const u = SITE + p; const html = readFileSync(`dist${p}index.html`, 'utf8'); const skip = /http-equiv="refresh"|name="robots" content="noindex/.test(html); if (!skip && !smUrls.has(u)) issues.push(`sitemap: falta ${u}`); if (skip && smUrls.has(u)) issues.push(`sitemap: no debería estar ${u}`); }
for (const u of smUrls) if (!pages.includes(u.replace(SITE, ''))) issues.push(`sitemap: URL inexistente ${u}`);
// _redirects: destino debe existir (o ser home)
const red = readFileSync('public/_redirects', 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#'));
for (const l of red) { const [from, to, code] = l.trim().split(/\s+/); if (!to || !to.startsWith('/')) { issues.push(`_redirects: línea rara "${l}"`); continue; } const t = to.split('?')[0]; if (!pages.includes(t) && !existsSync(`dist${t}`)) issues.push(`_redirects: destino inexistente ${from} → ${to}`); if (pages.includes(from)) issues.push(`_redirects: origen ${from} es una página real`); if (code && code !== '301' && code !== '302') issues.push(`_redirects: código ${code}`); }

console.log(`${pages.length} páginas, ${smUrls.size} en sitemap, ${red.length} redirects`);
console.log(issues.length ? issues.join('\n') : 'SIN INCIDENCIAS');

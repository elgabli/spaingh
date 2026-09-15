// Compara señales SEO/GEO de cada URL del sitemap de WordPress (producción)
// con su equivalente en la web nueva (pages.dev). Salida: scripts/compare.json + resumen.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
const OLD = 'https://spaingh.com', NEW = 'https://spaingh.pages.dev';
const urls = readFileSync('/tmp/claude-0/-root-spaingh/23007a87-9abf-4722-a94c-597e9e3bc18e/scratchpad/wp-urls.txt', 'utf8').trim().split('\n').map((u) => u.replace(OLD, ''));
const browser = await chromium.launch();
const ctx = await browser.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36' });
async function grab(base, path) {
  const page = await ctx.newPage();
  const chain = [];
  page.on('response', (r) => { if ([301, 302, 308].includes(r.status()) && r.url().startsWith(base)) chain.push(r.url().replace(base, '') + '→' + (r.headers()['location'] || '')); });
  let status = 0;
  try { const r = await page.goto(base + path, { waitUntil: 'domcontentloaded', timeout: 45000 }); status = r?.status() || 0; } catch (e) { await page.close(); return { status: -1, err: e.message.slice(0, 60) }; }
  await page.waitForTimeout(400);
  const d = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const txt = (el) => (el?.innerText || '').replace(/\s+/g, ' ').trim();
    const mainEl = q('main') || q('article') || q('.entry-content') || document.body;
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => { try { const j = JSON.parse(s.textContent); return j['@graph'] || [j]; } catch { return []; } });
    const types = ld.map((n) => Array.isArray(n['@type']) ? n['@type'].join('+') : n['@type']).filter(Boolean).sort();
    const ids = ld.map((n) => n['@id']).filter(Boolean);
    const faq = ld.filter((n) => n['@type'] === 'FAQPage').reduce((a, n) => a + (n.mainEntity || []).length, 0);
    const imgs = [...mainEl.querySelectorAll('img')].filter((i) => (i.getAttribute('src') || '').length > 5 && !/data:image/.test(i.getAttribute('src')));
    return {
      finalUrl: location.href, lang: document.documentElement.lang,
      title: document.title, desc: q('meta[name="description"]')?.content || '', canonical: q('link[rel="canonical"]')?.href || '',
      hreflang: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => l.hreflang).sort().join(','),
      robots: q('meta[name="robots"]')?.content || '', h1: txt(q('h1')), h1n: document.querySelectorAll('h1').length, h2n: mainEl.querySelectorAll('h2').length,
      words: txt(mainEl).split(' ').length, types, ids, faq, imgs: imgs.length, noalt: imgs.filter((i) => !i.getAttribute('alt')).length,
      links: [...mainEl.querySelectorAll('a[href]')].filter((a) => /^(\/|https?:\/\/(spaingh\.com|spaingh\.pages\.dev))/.test(a.getAttribute('href'))).length,
      ogImage: q('meta[property="og:image"]')?.content || '', dateMod: ld.find((n) => n.dateModified)?.dateModified || '',
    };
  });
  await page.close();
  return { status, chain, ...d };
}
const out = [];
for (const p of urls) {
  const o = await grab(OLD, p); const n = await grab(NEW, p);
  const row = { path: p, old: o, new: n, flags: [] };
  const nf = (n.finalUrl || '').replace(NEW, '');
  if (n.status !== 200) row.flags.push(`NUEVA status ${n.status}`);
  if (nf !== p) row.flags.push(`redirige a ${nf}`);
  if (o.status === 200 && n.status === 200) {
    if (o.words > 200 && n.words < o.words * 0.7) row.flags.push(`texto ${o.words}→${n.words} (-${Math.round(100 - n.words / o.words * 100)}%)`);
    if (o.faq && !n.faq) row.flags.push(`FAQPage perdido (${o.faq})`);
    for (const t of new Set(o.types)) if (!n.types.includes(t) && !['WebPage', 'WebSite', 'BreadcrumbList', 'ImageObject', 'ReadAction', 'SearchAction', 'CollectionPage', 'ItemList'].includes(t)) row.flags.push(`schema ${t} no está en la nueva`);
    if (o.hreflang && n.hreflang && o.hreflang.split(',').length > n.hreflang.split(',').length) row.flags.push(`hreflang ${o.hreflang}→${n.hreflang}`);
    if (!n.h1) row.flags.push('sin H1'); if (n.h1n > 1) row.flags.push(`${n.h1n} H1`);
    if (o.imgs > 0 && n.imgs === 0) row.flags.push(`imágenes ${o.imgs}→0`);
    if (n.noalt) row.flags.push(`${n.noalt} img sin alt`);
    if (n.robots.includes('noindex')) row.flags.push('NOINDEX');
    if (!n.canonical.startsWith('https://spaingh.com')) row.flags.push(`canonical ${n.canonical}`);
    if (o.lang !== n.lang) row.flags.push(`lang ${o.lang}→${n.lang}`);
  }
  out.push(row);
  console.log((row.flags.length ? '!! ' : 'ok ') + p + (row.flags.length ? '  ' + row.flags.join(' | ') : ` (${o.words}→${n.words} palabras, schema ${n.types.length})`));
}
writeFileSync('scripts/compare.json', JSON.stringify(out, null, 1));
await browser.close();

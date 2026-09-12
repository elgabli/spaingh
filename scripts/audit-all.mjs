// Barrido de todas las páginas del build: capturas escritorio+móvil y
// comprobaciones automáticas. Salida: scripts/audit/*.png y audit.json
import { chromium } from 'playwright';
import { readdirSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const base = process.argv[2] || 'http://127.0.0.1:4321';
const pages = [];
(function walk(d, u) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p, `${u}${f}/`);
    else if (f === 'index.html') pages.push(u);
  }
})('dist', '/');
mkdirSync('scripts/audit', { recursive: true });

const browser = await chromium.launch();
const results = [];
for (const path of pages) {
  const r = { path, issues: [] };
  for (const [name, vp] of [['d', { width: 1280, height: 900 }], ['m', { width: 390, height: 844 }]]) {
    const ctx = await browser.newContext({ viewport: vp, isMobile: name === 'm' });
    await ctx.addCookies([{ name: 'sgh_consent', value: 'denied', url: base }]);
    const page = await ctx.newPage();
    const errs = []; page.on('pageerror', (e) => errs.push(e.message));
    await page.goto(base + path, { waitUntil: 'load' });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(300);
    const info = await page.evaluate(() => {
      const main = document.querySelector('main');
      const txt = main?.innerText || '';
      const wide = [...document.querySelectorAll('body *')].filter((el) => { const r = el.getBoundingClientRect(); return r.right > window.innerWidth + 2 && r.width > 40 && getComputedStyle(el).position !== 'fixed'; }).slice(0, 5).map((el) => `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]}`);
      return {
        scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth,
        brokenImgs: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src')),
        entities: (txt.match(/&(amp|#8217|#8211|nbsp|quot|lt|gt);/g) || []).length,
        pendiente: /PENDIENTE:|PENDING:|\bTODO\b|lorem ipsum|sep-2026|⚠️|\[(Dirección|Adresse|Address|Número|Number)\]/.test(txt),
        wpRests: (main?.innerHTML.match(/elementor|wp-block|wpcf7|\[\/?[a-z_]+\]/gi) || []).slice(0, 3),
        inlineStyles: main ? main.querySelectorAll('[style]').length : 0,
        h1s: document.querySelectorAll('main h1').length,
        textLen: txt.length,
        wide,
        title: document.title,
      };
    });
    if (name === 'd') Object.assign(r, { title: info.title, h1s: info.h1s, textLen: info.textLen, inlineStyles: info.inlineStyles });
    if (info.scrollW > info.innerW + 2) r.issues.push(`${name}: overflow ${info.scrollW}>${info.innerW} ${info.wide.join(',')}`);
    if (info.brokenImgs.length) r.issues.push(`${name}: img rotas ${info.brokenImgs.join(',')}`);
    if (info.entities) r.issues.push(`${name}: ${info.entities} entidades HTML visibles`);
    if (info.pendiente) r.issues.push(`${name}: texto PENDIENTE/TODO`);
    if (info.wpRests.length) r.issues.push(`${name}: restos WP ${info.wpRests.join(',')}`);
    if (info.h1s !== 1 && name === 'd') r.issues.push(`h1 count ${info.h1s}`);
    if (errs.length) r.issues.push(`${name}: JS ${errs[0].slice(0, 80)}`);
    await page.screenshot({ path: `scripts/audit/${path.replace(/\//g, '_').replace(/^_|_$/g, '') || 'root'}-${name}.png`, fullPage: true });
    await ctx.close();
  }
  results.push(r);
  console.log(r.issues.length ? '!!' : 'ok', path, r.issues.join(' | '));
}
writeFileSync('scripts/audit/audit.json', JSON.stringify(results, null, 1));
await browser.close();

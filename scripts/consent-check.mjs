// Verifica banner de cookies + carga condicional de GA4 contra el preview.
// Uso: node scripts/consent-check.mjs [baseUrl]
import { chromium } from 'playwright';

const base = process.argv[2] || 'http://127.0.0.1:4321';
const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
const gaRequests = [];
page.on('request', (r) => { if (r.url().includes('googletagmanager.com')) gaRequests.push(r.url()); });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

await page.goto(`${base}/es/`, { waitUntil: 'networkidle' });
const visible1 = await page.locator('#sgh-cookies').isVisible();
const gaBefore = gaRequests.length;
await page.click('.sgh-cookies-accept');
await page.waitForTimeout(800);
const gaAfter = gaRequests.length;
const cookie = (await ctx.cookies()).find((c) => c.name === 'sgh_consent');
const visible2 = await page.locator('#sgh-cookies').isVisible();
await page.reload({ waitUntil: 'networkidle' });
const visible3 = await page.locator('#sgh-cookies').isVisible();
const gaReload = gaRequests.length;

// Segundo contexto limpio: rechazar → nunca carga GA
const ctx2 = await browser.newContext();
const p2 = await ctx2.newPage();
let ga2 = 0;
p2.on('request', (r) => { if (r.url().includes('googletagmanager.com')) ga2++; });
await p2.goto(`${base}/fr/`, { waitUntil: 'networkidle' });
const textFr = await p2.locator('#sgh-cookies p').innerText();
await p2.click('.sgh-cookies-reject');
await p2.reload({ waitUntil: 'networkidle' });
const visibleFr = await p2.locator('#sgh-cookies').isVisible();
await p2.screenshot({ path: 'scripts/out-consent-fr.png' });

console.log({ visible1, gaBefore, gaAfter, cookie: cookie?.value, visible2, visible3, gaReload, ga2, visibleFr, textFr: textFr.slice(0, 50), errors });
await browser.close();

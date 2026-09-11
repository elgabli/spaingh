import { chromium } from 'playwright';
const b = await chromium.launch(); const errs = [];
for (const [path, out] of [['/es/servicios/','services-es'],['/en/blog/','blog-en'],['/fr/blog/','blog-fr'],['/nope/','404']]) {
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } }); p.on('pageerror', e => errs.push(path + ': ' + e.message));
  const r = await p.goto('http://127.0.0.1:4321' + path, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.cookie = 'sgh_consent=denied; Path=/');
  console.log(path, r.status(), await p.title());
  await p.screenshot({ path: `scripts/out-${out}.png`, fullPage: true });
}
console.log('errors', errs); await b.close();

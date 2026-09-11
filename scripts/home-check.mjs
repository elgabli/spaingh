import { chromium } from 'playwright';
const base = process.argv[2] || 'http://127.0.0.1:4321';
const browser = await chromium.launch();
for (const l of ['es','en','fr']) {
  const p = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
  await p.goto(`${base}/${l}/`, { waitUntil: 'networkidle' });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0,0); }); await p.waitForTimeout(900);
  const info = await p.evaluate(() => {
    const main = document.querySelector('main');
    const first = main.firstElementChild;
    const cs = first ? getComputedStyle(first) : null;
    return { mainH: main.offsetHeight, kids: main.children.length, firstTag: first?.tagName + '.' + first?.className, firstH: first?.offsetHeight, op: cs?.opacity, vis: cs?.visibility, disp: cs?.display, h1: document.querySelector('main h1')?.textContent?.trim().slice(0,60), textLen: main.innerText.length };
  });
  await p.screenshot({ path: `scripts/out-home-${l}.png`, fullPage: true });
  console.log(l, JSON.stringify(info), errs.slice(0,3));
}
await browser.close();

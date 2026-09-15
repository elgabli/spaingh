import { chromium } from 'playwright';
const b = await chromium.launch(); const errs = [];
const runs = [['/en/how-to-get-spanish-citizenship/', ['none','other','5','no','yes','none'], 1280, 'cit-en'], ['/es/nacionalidad-espanola-por-residencia/', ['none','iberoamerican','2','no','yes','exempt'], 390, 'cit-es'], ['/fr/obtenir-nationalite-espagnole/', ['spanish-parent'], 1280, 'cit-fr']];
for (const [path, answers, w, name] of runs) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } }); p.on('pageerror', (e) => errs.push(path + ': ' + e.message));
  await p.goto('http://127.0.0.1:4321' + path, { waitUntil: 'load' }); await p.evaluate(() => (document.cookie = 'sgh_consent=denied; Path=/')); await p.reload({ waitUntil: 'load' });
  if (name === 'cit-en') await p.screenshot({ path: 'scripts/out-cit-en-top.png', clip: { x: 0, y: 0, width: 1280, height: 1400 } });
  for (const v of answers) { await p.click(`#citizenship-checker .question-card.active .option-btn[data-value="${v}"]`); await p.waitForTimeout(150); }
  const res = await p.locator('#cit-result').innerText();
  console.log(name, '→', res.split('\n').slice(0, 3).join(' | '));
  await p.locator('#cit-result').screenshot({ path: `scripts/out-${name}-result.png` });
  await p.close();
}
console.log('errors', errs); await b.close();

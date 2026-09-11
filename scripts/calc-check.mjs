// Prueba interactiva de la calculadora Beckham con Chromium headless:
// cambia comunidad y bonus, y comprueba que el panel de resultados REACCIONA
// (el bug que se vio en la captura del 12-sep-2026: resultados congelados
// en Madrid/41.952€ aunque el usuario había elegido Aragón + 63.000€ de bonus).
// Uso: node scripts/calc-check.mjs <url> <salida.png>
import { chromium } from 'playwright';

const [,, url = 'http://localhost:4321/es/calculadora-ley-beckham/', out = '/tmp/calc-check.png'] = process.argv;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(url, { waitUntil: 'networkidle' });

const read = async () => ({
  std: await page.textContent('#sghb-std-tax'),
  meta: await page.textContent('#sghb-std-meta'),
  bek: await page.textContent('#sghb-bek-tax'),
  save: await page.textContent('#sghb-save-amount'),
});

const before = await read();
await page.selectOption('#sghb-community', 'aragon');
await page.fill('#sghb-bonus', '63000');
await page.waitForTimeout(200);
const after = await read();
await page.locator('#sghb-results').scrollIntoViewIfNeeded();
await page.screenshot({ path: out, fullPage: false });

console.log('antes :', before);
console.log('después:', after);
const reacted = before.std !== after.std && /Aragón/.test(after.meta ?? '');
console.log(reacted ? 'OK: la calculadora reacciona al cambio de comunidad/bonus' : 'FALLO: resultados congelados');
console.log('errores JS:', errors.length ? errors : 'ninguno');
await browser.close();
process.exit(reacted && errors.length === 0 ? 0 : 1);

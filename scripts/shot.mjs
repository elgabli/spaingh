// Captura de pantalla + errores JS de una URL con Chromium headless (Playwright).
// Uso: node scripts/shot.mjs <url> <salida.png> [ancho] [alto] [--full]
// Ejemplo: node scripts/shot.mjs http://localhost:4321/es/ /tmp/es.png 1400 900 --full
//
// Existe porque este entorno no tiene navegador con el que "ver" la web:
// sin esto, bugs visuales (bloques de código con fondo negro, cabecera
// rota) solo se detectan cuando el usuario manda una captura.
import { chromium } from 'playwright';

const args = process.argv.slice(2);
const full = args.includes('--full');
const [url, out, w = '1400', h = '900'] = args.filter((a) => !a.startsWith('--'));
if (!url || !out) {
  console.error('Uso: node scripts/shot.mjs <url> <salida.png> [ancho] [alto] [--full]');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`console: ${m.text()}`);
});
page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url()} (${r.failure()?.errorText})`));

await page.goto(url, { waitUntil: 'networkidle' });
await page.screenshot({ path: out, fullPage: full });
console.log(`captura: ${out}`);
console.log('errores:', errors.length ? '\n  ' + errors.join('\n  ') : 'ninguno');
await browser.close();

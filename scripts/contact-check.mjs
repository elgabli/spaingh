// Prueba end-to-end del formulario contra `wrangler pages dev` (puerto 8788).
// Requiere build con PUBLIC_TURNSTILE_SITEKEY=1x00000000000000000000AA y
// .dev.vars con TURNSTILE_SECRET de test + CONTACT_DRY_RUN=1.
import { chromium } from 'playwright';

const base = process.argv[2] || 'http://127.0.0.1:8788';
const browser = await chromium.launch();
const out = {};

// 1) Función directa: validaciones
const post = (body) => fetch(`${base}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(async (r) => [r.status, await r.json()]);
out.missing = await post({ name: 'A' });
out.badEmail = await post({ name: 'A', email: 'x', phone: '1', reason: 'r', privacy: '1' });
out.noTurnstile = await post({ name: 'A', email: 'a@b.co', phone: '1', reason: 'r', privacy: '1' });
out.honeypot = await post({ website: 'spam' });
out.get = await fetch(`${base}/api/contact`).then((r) => r.status);

console.log('api', JSON.stringify(out));
// 2) Navegador: rellenar y enviar en FR
const page = await browser.newPage({ viewport: { width: 1000, height: 1100 } });
const errors = []; page.on('pageerror', (e) => errors.push(e.message));
await page.goto(`${base}/fr/contact/?origen=test`, { waitUntil: 'domcontentloaded' });
await page.evaluate(() => (document.cookie = 'sgh_consent=denied; Path=/'));
await page.fill('input[name=name]', 'Test Playwright');
await page.fill('input[name=email]', 'test@example.com');
await page.fill('input[name=phone]', '+33600000000');
await page.selectOption('select[name=nationality]', 'France');
await page.selectOption('select[name=reason]', { index: 1 });
await page.fill('textarea[name=message]', 'Mensaje de prueba');
await page.check('input[name=privacy]');
await page.waitForFunction(() => !!document.querySelector('input[name="cf-turnstile-response"]')?.value, null, { timeout: 15000 }).catch(() => (out.turnstileToken = 'TIMEOUT'));
await page.screenshot({ path: 'scripts/out-contact-form.png', fullPage: true });
const [resp] = await Promise.all([
  page.waitForResponse((r) => r.url().endsWith('/api/contact') && r.request().method() === 'POST', { timeout: 15000 }),
  page.click('.sgh-submit'),
]);
out.submit = [resp.status(), await resp.json()];
await page.waitForTimeout(400);
out.okVisible = await page.locator('#sgh-form-ok').isVisible();
out.formHidden = !(await page.locator('#sgh-contact-form').isVisible());
await page.screenshot({ path: 'scripts/out-contact-ok.png' });
out.errors = errors;
console.log(JSON.stringify(out, null, 1));
await browser.close();

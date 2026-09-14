// Prueba real del formulario en pages.dev (Turnstile real). Uso: node scripts/contact-live.mjs [base]
import { chromium } from 'playwright';
const base = process.argv[2] || 'https://spaingh.pages.dev';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1000, height: 1100 } });
const errs = []; p.on('pageerror', (e) => errs.push(e.message));
await p.goto(`${base}/es/contacto/?origen=test-live`, { waitUntil: 'domcontentloaded' });
await p.fill('input[name=name]', 'Prueba automática (borrar)'); await p.fill('input[name=email]', 'test@spaingh.com'); await p.fill('input[name=phone]', '+34600000000');
await p.selectOption('select[name=reason]', { index: 6 }); await p.fill('textarea[name=message]', 'Prueba end-to-end del formulario en pages.dev. Ignorar.'); await p.check('input[name=privacy]');
const tok = await p.waitForFunction(() => !!document.querySelector('input[name="cf-turnstile-response"]')?.value, null, { timeout: 25000 }).then(() => true).catch(() => false);
console.log('turnstile token:', tok);
if (tok) {
  const [resp] = await Promise.all([p.waitForResponse((r) => r.url().endsWith('/api/contact') && r.request().method() === 'POST', { timeout: 20000 }), p.click('.sgh-submit')]);
  console.log('api:', resp.status(), await resp.text());
  await p.waitForTimeout(500); console.log('ok visible:', await p.locator('#sgh-form-ok').isVisible());
} else { await p.screenshot({ path: 'scripts/out-contact-live.png' }); }
console.log('errors:', errs); await b.close();

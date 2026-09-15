import { chromium } from 'playwright';
const base = 'https://spaingh.pages.dev';
const b = await chromium.launch({ args: ['--disable-blink-features=AutomationControlled'] });
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, locale: 'es-ES', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36' });
const p = await ctx.newPage();
await p.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
await p.goto(`${base}/es/contacto/?origen=test-claude`, { waitUntil: 'domcontentloaded' });
await p.fill('input[name=name]', 'Prueba Claude (borrar)'); await p.fill('input[name=email]', 'test@spaingh.com'); await p.fill('input[name=phone]', '+34600000000');
await p.selectOption('select[name=reason]', { index: 6 }); await p.fill('textarea[name=message]', 'Prueba e2e KV. Ignorar.'); await p.check('input[name=privacy]');
const ok = await p.waitForFunction(() => !!document.querySelector('input[name="cf-turnstile-response"]')?.value, null, { timeout: 40000 }).then(() => true).catch(() => false);
console.log('turnstile token:', ok);
if (ok) { const [r] = await Promise.all([p.waitForResponse((x) => x.url().endsWith('/api/contact'), { timeout: 20000 }), p.click('.sgh-submit')]); console.log('api:', r.status(), await r.text()); }
else await p.screenshot({ path: 'scripts/out-turnstile.png' });
await b.close();

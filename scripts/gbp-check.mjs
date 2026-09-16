import { chromium } from 'playwright';
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 1000 }, locale: 'es-ES', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36' });
await ctx.addCookies([{ name: 'SOCS', value: 'CAESHAgBEhJnd3NfMjAyMzA4MTAtMF9SQzIaAmVzIAEaBgiA_LyaBg', domain: '.google.com', path: '/' }, { name: 'CONSENT', value: 'YES+cb', domain: '.google.com', path: '/' }]);
const p = await ctx.newPage();
await p.goto('https://www.google.com/search?kgmid=/g/11y9rpp1vj&hl=es-ES&q=Spain+Gh', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(2500);
const btn = p.locator('button:has-text("Aceptar todo"), button:has-text("Accept all")'); if (await btn.count()) { await btn.first().click(); await p.waitForTimeout(2500); }
const txt = await p.evaluate(() => { const kp = document.querySelector('[data-attrid="title"]')?.closest('div[jscontroller]') || document.querySelector('#rhs') || document.body; return (kp.innerText || '').replace(/\n{2,}/g, '\n'); });
console.log(txt.slice(0, 2500));
await p.screenshot({ path: 'scripts/out-gbp.png', fullPage: false });
await b.close();

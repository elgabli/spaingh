// Verifica header: selector de idioma, menú móvil, fuentes cargadas.
// Uso: node scripts/header-check.mjs [baseUrl]
import { chromium } from 'playwright';

const base = process.argv[2] || 'http://127.0.0.1:4321';
const browser = await chromium.launch();
const errors = [];

// Escritorio: enlaces del selector en una página con traducciones
const d = await (await browser.newContext({ viewport: { width: 1280, height: 720 } })).newPage();
d.on('pageerror', (e) => errors.push(e.message));
await d.goto(`${base}/es/calculadora-ley-beckham/`, { waitUntil: 'networkidle' });
await d.evaluate(() => document.cookie = 'sgh_consent=denied; Path=/');
const langLinks = await d.$$eval('#sghh-lang .lang-menu a', (as) => as.map((a) => [a.getAttribute('hreflang'), a.getAttribute('href'), a.classList.contains('on')]));
await d.click('#sghh-lang .lang-btn');
const menuVisible = await d.locator('#sghh-lang .lang-menu').isVisible();
const fonts = await d.evaluate(async () => {
  await document.fonts.ready;
  return [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight}`);
});
const bodyFont = await d.evaluate(() => getComputedStyle(document.body).fontFamily);
const brandFont = await d.evaluate(() => getComputedStyle(document.querySelector('.sghh .lg-t')).fontFamily);
await d.screenshot({ path: 'scripts/out-header-desktop.png', clip: { x: 0, y: 0, width: 1280, height: 200 } });

// Móvil: hamburguesa abre el menú, CTA dentro del menú, selector visible
const m = await (await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage();
m.on('pageerror', (e) => errors.push(e.message));
await m.goto(`${base}/fr/`, { waitUntil: 'networkidle' });
await m.evaluate(() => document.cookie = 'sgh_consent=denied; Path=/');
const navHiddenBefore = !(await m.locator('#sghh-nav').isVisible());
const burVisible = await m.locator('.sghh .bur').isVisible();
await m.click('.sghh .bur');
const navVisibleAfter = await m.locator('#sghh-nav').isVisible();
const ctaMenuVisible = await m.locator('.sghh .cta-menu').isVisible();
const navLinks = await m.$$eval('#sghh-nav ul a', (as) => as.map((a) => a.textContent.trim()));
const langVisibleMobile = await m.locator('#sghh-lang .lang-btn').isVisible();
await m.screenshot({ path: 'scripts/out-header-mobile.png', fullPage: false });

console.log({ langLinks, menuVisible, fonts, bodyFont, brandFont, navHiddenBefore, burVisible, navVisibleAfter, ctaMenuVisible, navLinks, langVisibleMobile, errors });
await browser.close();

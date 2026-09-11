import { chromium } from 'playwright';
const [,, src, out] = process.argv;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto('file://' + src); await p.screenshot({ path: out }); await b.close();

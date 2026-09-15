// Para cada URL antigua que se conserva (200 en la nueva): encabezados H2/H3 de la antigua
// (wp.spaingh.com) que no tienen equivalente en la nueva (spaingh.com), y viceversa.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
const urls = readFileSync('/tmp/claude-0/-root-spaingh/23007a87-9abf-4722-a94c-597e9e3bc18e/scratchpad/prod-check.txt','utf8').trim().split('\n').filter(l=>l.startsWith('200')).map(l=>l.trim().split(/\s+/).pop());
const b = await chromium.launch(); const ctx = await b.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0' });
const norm = (s) => s.toLowerCase().replace(/[¿?¡!:.,()]/g,'').replace(/\s+/g,' ').trim();
async function heads(u) { const p = await ctx.newPage(); try { await p.goto(u, { waitUntil: 'domcontentloaded', timeout: 45000 }); } catch { await p.close(); return null; }
  const r = await p.evaluate(() => { const m = document.querySelector('main') || document.body; return { h: [...m.querySelectorAll('h2,h3')].map(e => e.innerText.trim()).filter(t => t.length > 3 && t.length < 120), words: (m.innerText||'').split(/\s+/).length, ctas: [...m.querySelectorAll('a')].filter(a=>/contact|consulta|evaluaci|whatsapp|wa\.me|mailto/i.test(a.href+a.innerText)).length }; }); await p.close(); return r; }
const out = [];
for (const path of urls) {
  const o = await heads('https://wp.spaingh.com' + path); const n = await heads('https://spaingh.com' + path);
  if (!o || !n) { out.push({ path, err: true }); continue; }
  const nn = n.h.map(norm); const on = o.h.map(norm);
  const missing = o.h.filter((t) => !nn.some((x) => x.includes(norm(t).slice(0, 25)) || norm(t).includes(x.slice(0, 25))));
  const added = n.h.filter((t) => !on.some((x) => x.includes(norm(t).slice(0, 25)) || norm(t).includes(x.slice(0, 25))));
  out.push({ path, oldWords: o.words, newWords: n.words, oldCtas: o.ctas, newCtas: n.ctas, missing, added });
  console.log(`${path}  ${o.words}→${n.words} palabras · CTAs ${o.ctas}→${n.ctas}` + (missing.length ? `\n   FALTAN (${missing.length}): ${missing.slice(0, 8).join(' | ')}` : ''));
}
writeFileSync('scripts/sections-diff.json', JSON.stringify(out, null, 1)); await b.close();

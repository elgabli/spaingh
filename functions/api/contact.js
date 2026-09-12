// Cloudflare Pages Function: POST /api/contact
// 1) valida campos + honeypot, 2) verifica Turnstile, 3) envía email por Resend.
// Variables de entorno (Cloudflare Pages → Settings → Environment variables):
//   TURNSTILE_SECRET  (secreto del widget 0x4AAAAAACofoaNK9WWVMXhw)
//   RESEND_API_KEY    (Resend → API Keys, permiso Sending)
//   CONTACT_TO        (opcional, por defecto sgh@spaingh.com; varios separados por coma)
//   CONTACT_FROM      (opcional, por defecto "Spain Global Hub <web@spaingh.com>"; dominio verificado en Resend)
//   CONTACT_DRY_RUN   (opcional, "1" = no envía email; para pruebas locales con wrangler)

const MAX = { name: 200, email: 200, phone: 40, nationality: 80, reason: 80, message: 2000, origen: 60, page: 200, lang: 2 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

async function readBody(request) {
  const ct = request.headers.get('content-type') || '';
  if (ct.includes('application/json')) return await request.json();
  const fd = await request.formData();
  return Object.fromEntries(fd);
}

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await readBody(request); } catch { return json({ ok: false, error: 'bad_request' }, 400); }

  // Honeypot: los bots rellenan "website"; respondemos ok sin hacer nada.
  if (body.website) return json({ ok: true });

  const f = {};
  for (const [k, max] of Object.entries(MAX)) f[k] = String(body[k] ?? '').trim().slice(0, max);
  if (!f.name || !f.email || !f.phone || !f.reason) return json({ ok: false, error: 'required' }, 400);
  if (!EMAIL_RE.test(f.email)) return json({ ok: false, error: 'email' }, 400);
  if (!body.privacy) return json({ ok: false, error: 'privacy' }, 400);

  // Turnstile
  const token = String(body['cf-turnstile-response'] || '');
  if (!token || !env.TURNSTILE_SECRET) return json({ ok: false, error: 'turnstile' }, 400);
  const ip = request.headers.get('CF-Connecting-IP') || '';
  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip }),
  }).then((r) => r.json()).catch(() => ({ success: false }));
  if (!verify.success) return json({ ok: false, error: 'turnstile' }, 400);

  // Email
  const to = (env.CONTACT_TO || 'sgh@spaingh.com').split(',').map((s) => s.trim()).filter(Boolean);
  const from = env.CONTACT_FROM || 'Spain Global Hub <web@spaingh.com>';
  const subject = `[Web ${f.lang.toUpperCase() || 'ES'}] ${f.reason} — ${f.name}`;
  const rows = [
    ['Nombre', f.name], ['Email', f.email], ['Teléfono', f.phone], ['Nacionalidad', f.nationality || '—'],
    ['Motivo', f.reason], ['Idioma', f.lang], ['Origen', f.origen || '—'], ['Página', f.page || '—'], ['IP', ip || '—'],
  ];
  const html = `<h2 style="font-family:Arial,sans-serif">Nueva consulta desde spaingh.com</h2>
<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#666"><b>${k}</b></td><td style="padding:6px 0">${esc(v)}</td></tr>`).join('')}</table>
<h3 style="font-family:Arial,sans-serif">Mensaje</h3><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(f.message || '—')}</p>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nMensaje:\n${f.message || '—'}`;

  if (env.CONTACT_DRY_RUN === '1') return json({ ok: true, dryRun: true, subject, to });
  if (!env.RESEND_API_KEY) return json({ ok: false, error: 'not_configured' }, 500);

  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, reply_to: f.email, subject, html, text }),
  });
  if (!sent.ok) {
    console.error('resend', sent.status, await sent.text().catch(() => ''));
    return json({ ok: false, error: 'send_failed' }, 502);
  }
  return json({ ok: true });
}

export const onRequest = ({ request }) =>
  request.method === 'POST' ? undefined : json({ ok: false, error: 'method' }, 405);

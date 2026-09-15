// Cloudflare Pages Function: POST /api/contact
// 1) valida campos + honeypot, 2) verifica Turnstile, 3) envía email por Resend.
// Variables de entorno (Cloudflare Pages → Settings → Environment variables):
//   TURNSTILE_SECRET  (secreto del widget 0x4AAAAAAA1Feg9qMp2Iohqk)
//   RESEND_API_KEY    (Resend → API Keys, permiso Sending)
//   CONTACT_TO        (opcional, por defecto sgh@spaingh.com; varios separados por coma)
//   CONTACT_FROM      (opcional, por defecto "Spain Global Hub <web@spaingh.com>"; dominio verificado en Resend)
//   CONTACT_DRY_RUN   (opcional, "1" = no envía email; para pruebas locales con wrangler)
//   TG_BOT_TOKEN + TG_CHAT_ID (opcional): aviso inmediato por Telegram de cada lead
// Binding KV LEADS (namespace SGH_LEADS): copia de seguridad de cada consulta,
// clave lead:<ISO fecha>:<id>. Se guarda SIEMPRE, se envíe o no el email, para
// no perder ningún contacto (leer con `wrangler kv key list --namespace-id ...`).

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

  // Honeypot: los bots rellenan el campo oculto; respondemos ok sin hacer nada.
  // (Antes se llamaba "website" y el autocompletado de Chrome lo rellenaba
  // en humanos reales → leads perdidos en silencio. Ahora queda en el log.)
  if (body.sgh_x9 || body.website) {
    console.warn('honeypot', { field: body.sgh_x9 ? 'sgh_x9' : 'website', ua: request.headers.get('user-agent') || '' });
    return json({ ok: true });
  }

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

  // Copia en KV (nunca bloquea la respuesta). Se relee la clave para
  // confirmar que el binding escribe donde creemos.
  let stored = false; let key = '';
  if (env.LEADS) {
    try {
      key = `lead:${new Date().toISOString()}:${crypto.randomUUID()}`;
      await env.LEADS.put(key, JSON.stringify({ ...f, ip, ts: Date.now() }), { metadata: { reason: f.reason, lang: f.lang } });
      const back = await env.LEADS.get(key);
      stored = !!back;
      console.log('kv', { key, readBack: !!back });
    } catch (e) { console.error('kv', String(e)); }
  } else {
    console.warn('kv: binding LEADS ausente');
  }

  // Aviso por Telegram (opcional): TG_BOT_TOKEN + TG_CHAT_ID en Pages.
  let notified = false;
  if (env.TG_BOT_TOKEN && env.TG_CHAT_ID) {
    try {
      const tgText = `📩 Nuevo lead web (${f.lang || 'es'})\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMensaje:\n${(f.message || '—').slice(0, 800)}`;
      const tg = await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/sendMessage`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: env.TG_CHAT_ID, text: tgText, disable_web_page_preview: true }),
      });
      notified = tg.ok; if (!tg.ok) console.error('telegram', tg.status, await tg.text().catch(() => ''));
    } catch (e) { console.error('telegram', String(e)); }
  }

  if (env.CONTACT_DRY_RUN === '1') { console.log('branch: dryRun'); return json({ ok: true, dryRun: true, subject, to }); }
  // Sin proveedor de email configurado: el lead queda en KV (y/o Telegram) y se responde ok.
  if (!env.RESEND_API_KEY) {
    console.log('branch: sin RESEND_API_KEY', { stored, notified });
    return (stored || notified) ? json({ ok: true, stored, notified, key }) : json({ ok: false, error: 'not_configured' }, 500);
  }

  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, reply_to: f.email, subject, html, text }),
  });
  if (!sent.ok) {
    console.error('resend', sent.status, await sent.text().catch(() => ''));
    // El lead ya está en KV: no se muestra error al usuario si se guardó.
    return (stored || notified) ? json({ ok: true, stored, notified, key }) : json({ ok: false, error: 'send_failed' }, 502);
  }
  console.log('branch: resend ok', { stored, notified });
  return json({ ok: true, stored, notified, key, emailed: true });
}

export const onRequest = ({ request }) =>
  request.method === 'POST' ? undefined : json({ ok: false, error: 'method' }, 405);

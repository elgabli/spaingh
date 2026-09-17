<?php
// Puerto a PHP de functions/api/contact.js (Cloudflare Pages Function) para Hostinger.
// Recibe JSON (o form-data) del formulario, valida, verifica Turnstile, guarda el lead en
// ../../config/leads.log (sustituye al KV LEADS) y avisa por Telegram. Sin email (igual que en produccion).
declare(strict_types=1);
const MAX = ['name'=>200,'email'=>200,'phone'=>40,'nationality'=>80,'reason'=>80,'message'=>2000,'origen'=>60,'page'=>200,'lang'=>2];
const CONFIG_DIR = __DIR__ . '/../../config';
function out(array $body, int $status = 200): never { http_response_code($status); header('Content-Type: application/json; charset=utf-8'); header('Cache-Control: no-store'); echo json_encode($body, JSON_UNESCAPED_UNICODE); exit; }
function post_json(string $url, array $body, float $timeout = 8): array {
  $ch = curl_init($url); curl_setopt_array($ch, [CURLOPT_POST=>true, CURLOPT_HTTPHEADER=>['Content-Type: application/json'], CURLOPT_POSTFIELDS=>json_encode($body, JSON_UNESCAPED_UNICODE), CURLOPT_RETURNTRANSFER=>true, CURLOPT_TIMEOUT_MS=>(int)($timeout*1000), CURLOPT_CONNECTTIMEOUT_MS=>4000]);
  $raw = curl_exec($ch); $code = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE); curl_close($ch);
  $data = is_string($raw) ? json_decode($raw, true) : null; return [$code >= 200 && $code < 300, is_array($data) ? $data : []];
}
$env = is_file(CONFIG_DIR . '/secrets.php') ? (include CONFIG_DIR . '/secrets.php') : [];
$cfg = fn(string $k): string => (string) ($env[$k] ?? getenv($k) ?: '');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') out(['ok'=>false,'error'=>'method'], 405);
$ct = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
$raw = (string) file_get_contents('php://input');
if (strlen($raw) > 20000) out(['ok'=>false,'error'=>'bad_request'], 413);
$body = str_contains($ct, 'application/json') ? json_decode($raw, true) : $_POST;
if (!is_array($body)) out(['ok'=>false,'error'=>'bad_request'], 400);
// Honeypot: responder ok sin hacer nada (igual que la Function)
if (!empty($body['sgh_x9']) || !empty($body['website'])) { @file_put_contents(CONFIG_DIR . '/leads.log', json_encode(['ts'=>gmdate('c'),'honeypot'=>true,'ua'=>substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''),0,120)]) . "\n", FILE_APPEND|LOCK_EX); out(['ok'=>true]); }
$f = []; foreach (MAX as $k => $max) { $v = $body[$k] ?? ''; $f[$k] = mb_substr(trim(is_scalar($v) ? (string)$v : ''), 0, $max); }
if ($f['name'] === '' || $f['email'] === '' || $f['phone'] === '' || $f['reason'] === '') out(['ok'=>false,'error'=>'required'], 400);
if (!preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/', $f['email'])) out(['ok'=>false,'error'=>'email'], 400);
if (empty($body['privacy'])) out(['ok'=>false,'error'=>'privacy'], 400);
$token = (string) ($body['cf-turnstile-response'] ?? '');
if ($token === '' || $cfg('TURNSTILE_SECRET') === '') out(['ok'=>false,'error'=>'turnstile'], 400);
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
[$vok, $verify] = post_json('https://challenges.cloudflare.com/turnstile/v0/siteverify', ['secret'=>$cfg('TURNSTILE_SECRET'), 'response'=>$token, 'remoteip'=>$ip], 5);
if (!$vok || ($verify['success'] ?? false) !== true) out(['ok'=>false,'error'=>'turnstile'], 400);
$rows = [['Nombre',$f['name']],['Email',$f['email']],['Teléfono',$f['phone']],['Nacionalidad',$f['nationality'] ?: '—'],['Motivo',$f['reason']],['Idioma',$f['lang']],['Origen',$f['origen'] ?: '—'],['Página',$f['page'] ?: '—'],['IP',$ip ?: '—']];
// Copia del lead (sustituye al KV LEADS): fuera de public_html
$key = 'lead:' . gmdate('c') . ':' . bin2hex(random_bytes(8));
$stored = (bool) @file_put_contents(CONFIG_DIR . '/leads.log', json_encode(['key'=>$key] + $f + ['ip'=>$ip,'ts'=>time()], JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND|LOCK_EX);
// Aviso Telegram
$notified = false;
if ($cfg('TG_BOT_TOKEN') !== '' && $cfg('TG_CHAT_ID') !== '') {
  $text = "📩 Nuevo lead web (" . ($f['lang'] ?: 'es') . ")\n" . implode("\n", array_map(fn($r) => $r[0] . ': ' . $r[1], $rows)) . "\n\nMensaje:\n" . mb_substr($f['message'] ?: '—', 0, 800);
  [$tok, $tres] = post_json('https://api.telegram.org/bot' . $cfg('TG_BOT_TOKEN') . '/sendMessage', ['chat_id'=>$cfg('TG_CHAT_ID'), 'text'=>$text, 'disable_web_page_preview'=>true]);
  $notified = $tok && (($tres['ok'] ?? false) === true);
}
if ($stored || $notified) out(['ok'=>true,'stored'=>$stored,'notified'=>$notified,'key'=>$key]);
out(['ok'=>false,'error'=>'not_configured'], 500);

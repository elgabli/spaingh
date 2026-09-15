// Middleware global de Pages: evita que los hosts de vista previa
// (*.pages.dev) se indexen como duplicado de spaingh.com. En el dominio
// real no añade nada.
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const host = url.hostname;
  // www → dominio canónico (301), conservando ruta y query.
  if (host === 'www.spaingh.com') {
    url.hostname = 'spaingh.com';
    return Response.redirect(url.toString(), 301);
  }
  const res = await next();
  if (host.endsWith('.pages.dev')) {
    const h = new Headers(res.headers);
    h.set('X-Robots-Tag', 'noindex, nofollow');
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
  }
  return res;
}

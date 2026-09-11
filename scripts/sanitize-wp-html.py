#!/usr/bin/env python3
"""Deja SOLO contenido semántico del HTML copiado de WordPress.

Criterio (12-sep-2026, decisión del usuario): traer contenido, logo y lo
necesario — nada de diseño/código basura de WordPress/Elementor. Se conservan
títulos, párrafos, listas, enlaces, énfasis, tablas, imágenes, FAQ
(<details>), citas. Se ELIMINAN con su contenido: script, style, svg, iframe,
form, button, input, footer, header, nav (menús/footers incrustados en la
copia). Se DESENVUELVEN (queda solo el contenido): div, span, section,
article, figure... Se quitan todos los atributos salvo href/target/rel/src/
alt/width/height/colspan/id-de-encabezado, y las clases salvo prefijo sghb-
(calculadora) porque las estila components.css. También descodifica los
emails ofuscados por Cloudflare (data-cfemail).
Uso: python3 scripts/sanitize-wp-html.py <fichero.md|html> [...]
"""
import re, sys
from html.parser import HTMLParser
from html import escape

KEEP = {"h1","h2","h3","h4","p","ul","ol","li","a","strong","em","b","i","br","table","thead","tbody","tr","th","td",
        "details","summary","blockquote","img","hr","small","sup","sub","code","pre"}
DROP = {"script","style","svg","iframe","form","button","input","select","textarea","footer","header","nav","noscript","canvas","template"}
VOID = {"br","img","hr"}
ATTR_OK = {"a":{"href","target","rel"},"img":{"src","alt","width","height"},"td":{"colspan","rowspan"},"th":{"colspan","rowspan"}}
CLASS_OK_PREFIX = ("sghb-",)

def cf_decode(hexs):
    b = bytes.fromhex(hexs); k = b[0]
    return "".join(chr(c ^ k) for c in b[1:])

class Sanitizer(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.out = []; self.drop_depth = 0; self.stack = []; self.emails = 0
    def _attrs(self, tag, attrs):
        keep = []
        for k, v in attrs:
            if v is None: continue
            if k == "class":
                cls = [c for c in v.split() if c.startswith(CLASS_OK_PREFIX)]
                if cls: keep.append(("class", " ".join(cls)))
            elif k == "id" and tag in ("h2","h3","h4","p","table","tbody"):
                keep.append((k, v))  # anclas de secciones (#requirements, sghb-scen-body…)
            elif k in ATTR_OK.get(tag, ()):
                if k == "href" and v.startswith("/cdn-cgi/l/email-protection"):
                    continue
                keep.append((k, v))
        return "".join(f' {k}="{escape(v, quote=True)}"' for k, v in keep)
    def handle_starttag(self, tag, attrs):
        if self.drop_depth: 
            if tag not in VOID: self.drop_depth += 1
            return
        a = dict(attrs)
        if tag in DROP: 
            if tag not in VOID: self.drop_depth = 1
            return
        if "data-cfemail" in a:  # <a|span data-cfemail="HEX">[email protected]</a>
            e = cf_decode(a["data-cfemail"]); self.emails += 1
            self.out.append(f'<a href="mailto:{e}">{e}</a>'); self.stack.append(("_cf", tag)); return
        if tag in KEEP:
            self.out.append(f"<{tag}{self._attrs(tag, attrs)}>" if tag not in VOID else f"<{tag}{self._attrs(tag, attrs)} />")
            if tag not in VOID: self.stack.append((tag, tag))
        else:
            self.stack.append(("_unwrap", tag))
    def handle_startendtag(self, tag, attrs):
        if self.drop_depth or tag in DROP: return
        if tag in KEEP: self.out.append(f"<{tag}{self._attrs(tag, attrs)} />")
    def handle_endtag(self, tag):
        if self.drop_depth:
            if tag not in VOID: self.drop_depth -= 1
            return
        # cerrar hasta la apertura correspondiente (tolera </p></div> huérfanos)
        for i in range(len(self.stack) - 1, -1, -1):
            kind, t = self.stack[i]
            if t == tag:
                for kind2, t2 in reversed(self.stack[i:]):
                    if kind2 == kind2 and kind2 not in ("_unwrap", "_cf"): self.out.append(f"</{t2}>")
                del self.stack[i:]
                return
        # cierre sin apertura (wpautop): ignorar
    def handle_data(self, d):
        if not self.drop_depth: self.out.append(d)
    def handle_entityref(self, n):
        if not self.drop_depth: self.out.append(f"&{n};")
    def handle_charref(self, n):
        if not self.drop_depth: self.out.append(f"&#{n};")
    def handle_comment(self, d): pass
    def close(self):
        super().close()
        for kind, t in reversed(self.stack):
            if kind not in ("_unwrap", "_cf"): self.out.append(f"</{t}>")

def sanitize(html):
    s = Sanitizer(); s.feed(html); s.close()
    out = "".join(s.out)
    out = re.sub(r"<p>\s*(?:&nbsp;|\s)*</p>", "", out)           # párrafos vacíos
    out = re.sub(r"\n{3,}", "\n\n", out).strip()
    return out, s.emails

for path in sys.argv[1:]:
    raw = open(path, encoding="utf-8").read()
    if path.endswith(".md"):
        m = re.match(r"^(---\n.*?\n---\n)(.*)$", raw, re.S)
        fm, body = m.group(1), m.group(2)
    else:
        fm, body = "", raw
    clean, emails = sanitize(body)
    open(path, "w", encoding="utf-8").write(fm + "\n" + clean + "\n" if fm else clean + "\n")
    print(f"{path}: {len(body)} -> {len(clean)} chars, emails={emails}")

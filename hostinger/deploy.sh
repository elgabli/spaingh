#!/bin/bash
# Despliegue de spaingh.com en Hostinger: build de Astro + subida por rsync.
# Uso: bash hostinger/deploy.sh   (desde codigo/spaingh-astro; requiere clave SSH del CT en Hostinger)
set -euo pipefail
cd "$(dirname "$0")/.."
export PUBLIC_TURNSTILE_SITEKEY="${PUBLIC_TURNSTILE_SITEKEY:-0x4AAAAAAE6qf7nbe_UKW4mz}"   # widget "spaingh.com (Hostinger)"
npm run build >/dev/null
cp hostinger/.htaccess dist/.htaccess
mkdir -p dist/api && cp hostinger/api/contact.php dist/api/contact.php
rm -f dist/_redirects
# --delete no toca domains/ (docroot de wp.spaingh.com) ni error_log
rsync -az --delete --exclude '/domains' --exclude '/error_log' --exclude '/.well-known' -e 'ssh -p 65002' dist/ u614904184@45.13.252.40:domains/spaingh.com/public_html/
echo "desplegado $(date '+%F %T')"

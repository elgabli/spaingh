// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://spaingh.com',
  // Mismos prefijos que en WordPress (/es/, /en/, /fr/) para conservar las URLs actuales.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [sitemap(), mdx()],
});
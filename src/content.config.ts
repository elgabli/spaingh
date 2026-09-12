import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Idiomas soportados — única fuente de verdad, usada también en src/i18n/config.ts.
const LANGS = ['es', 'en', 'fr'] as const;

// Campos comunes a cualquier página indexable: lo mínimo para no repetir
// el bug de hoy (metas/hreflang/schema desincronizados entre idiomas).
const seoFields = {
  title: z.string(),
  description: z.string(),
  lang: z.enum(LANGS),
  // slug real de la URL, SIN el prefijo de idioma (ej: "calculadora-ley-beckham").
  // Se usa para construir la URL final y el mapa hreflang entre traducciones.
  slug: z.string(),
  // id común entre los N idiomas de la misma página (ej: "ley-beckham") —
  // permite generar el hreflang automáticamente sin mantenerlo a mano.
  translationGroup: z.string(),
  // fecha real, no placeholders tipo "[Fecha]" como el bug que arreglamos hoy.
  publishedDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  noindex: z.boolean().default(false),
  // Imagen destacada (ruta absoluta bajo /public, ej. "/img/foo.jpg"): se usa
  // en las tarjetas de listado, en la cabecera del artículo (si el cuerpo no
  // la incluye ya) y como og:image. Sin ella, la tarjeta usa una portada de marca.
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  // 'html' = cuerpo copiado tal cual de WordPress (ya renderizado): se inyecta
  // con set:html SIN pasar por Markdown. Si pasa por Markdown, el HTML
  // indentado de WordPress se convierte en bloques de código (<pre> con
  // fondo oscuro de Shiki) y se traga contenido real — bug del 12-sep-2026.
  // 'md' = contenido escrito a mano en Markdown (Beckham, Nómada).
  format: z.enum(['md', 'html']).default('md'),
};

const pilares = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pilares' }),
  schema: z.object({
    ...seoFields,
    pilar: z.enum(['ley-beckham', 'nomada-digital', 'profesional-cualificado', 'constitucion-empresas']),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    ...seoFields,
    // Prioridad de reescritura según el inventario GSC de la Fase 0 (ver
    // notas/docs/spaingh/migracion-astro-fase0-redirects.md).
    seoPriority: z.enum(['alta', 'normal']).default('normal'),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/legal' }),
  schema: z.object({
    ...seoFields,
    legalType: z.enum(['privacy', 'cookies', 'terms', 'about']),
  }),
});

export const collections = { pilares, blog, legal };
export { LANGS };

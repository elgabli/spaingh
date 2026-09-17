// Identidad de la organización y de la autora, definidas UNA vez.
//
// La auditoría del 10-sep-2026 encontró la organización repetida como
// "#organization", "#org" y "Corporation" sin ID unificado, y un autor
// "Elena_ar" (cuenta de pruebas) en vez de "Elena Mochales" en varias
// páginas. Ambos bugs vienen de construir el JSON-LD a mano, página a
// página. Aquí se importa siempre el mismo objeto.

const SITE_URL = 'https://spaingh.com';

export const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Spain Global Hub',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo-sgh.png`,
  },
  email: 'sgh@spaingh.com',
  telephone: '+34601555547',
  areaServed: { '@type': 'Country', name: 'España' },
  knowsLanguage: ['es', 'en', 'fr'],
  founder: { '@id': `${SITE_URL}/es/sobre-nosotros/#elena-mochales` },
  sameAs: ['https://www.trustpilot.com/review/spaingh.com'],
} as const;

export const author = {
  '@type': 'Person',
  '@id': `${SITE_URL}/es/sobre-nosotros/#elena-mochales`,
  name: 'Elena Mochales',
  givenName: 'Elena',
  familyName: 'Mochales Modroño',
  url: `${SITE_URL}/es/sobre-nosotros/`,
  image: `${SITE_URL}/img/elena-mochales.jpg`,
  jobTitle: 'Abogada de extranjería y nacionalidad',
  description: 'Abogada colegiada en el Ilustre Colegio de la Abogacía de Madrid (ICAM nº C69993) desde 2000, especializada en derecho de extranjería, nacionalidad española y movilidad internacional. Más de 20 años de ejercicio y clientes de más de 50 nacionalidades.',
  worksFor: { '@id': organization['@id'] },
  memberOf: { '@type': 'Organization', name: 'Ilustre Colegio de la Abogacía de Madrid (ICAM)', url: 'https://www.icam.es/' },
  identifier: { '@type': 'PropertyValue', propertyID: 'ICAM', value: 'C69993' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Universidad Pontificia Comillas (ICADE)' },
    { '@type': 'CollegeOrUniversity', name: 'Universidad Carlos III de Madrid' },
  ],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'Licenciatura en Derecho y Diplomatura en Ciencias Empresariales (ICADE)' },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'Máster en Derecho de Extranjería e Inmigración, Asilo y Derecho Humanitario (Universidad Carlos III de Madrid)' },
  ],
  knowsAbout: ['Spanish immigration law', 'Spanish nationality by residence', 'Beckham Law tax regime', 'Digital Nomad Visa Spain', 'Highly Qualified Professional visa'],
  knowsLanguage: ['es', 'en', 'ar'],
  sameAs: ['https://www.linkedin.com/in/elena-mochales-modro%C3%B1o-516151148/'],
} as const;

interface ArticleSchemaInput {
  url: string;
  headline: string;
  description: string;
  image?: string;
  datePublished: string; // ISO, nunca un placeholder tipo "[Fecha]"
  dateModified?: string;
}

export function articleSchema(input: ArticleSchemaInput) {
  return {
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
    headline: input.headline,
    description: input.description,
    image: input.image,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { '@id': author['@id'] },
    publisher: { '@id': organization['@id'] },
  };
}

interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

interface WebApplicationSchemaInput {
  url: string;
  name: string;
  description: string;
}

/** Para las calculadoras: WebApplication, NUNCA Product con reseñas
 * fabricadas (bug encontrado y corregido el 11-sep-2026 en la guía de
 * estudios — 5★/27 reseñas que no existían). */
export function webApplicationSchema(input: WebApplicationSchemaInput) {
  return {
    '@type': 'WebApplication',
    '@id': input.url,
    name: input.name,
    description: input.description,
    url: input.url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  };
}

// ---------------------------------------------------------------------------
// Grafo completo por página (paridad con lo que emitía Rank Math en WordPress:
// #organization, #website, <url>#webpage, autor Person, <url>#richSnippet,
// FAQPage). Verificado con scripts/compare-wp-astro.mjs el 2026-09-15.
// ---------------------------------------------------------------------------

export const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Spain Global Hub',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: ['es', 'en', 'fr'],
} as const;

interface WebPageInput {
  url: string;
  name: string;
  description: string;
  lang: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
}

export function webPageSchema(i: WebPageInput) {
  return {
    '@type': i.type ?? 'WebPage',
    '@id': `${i.url}#webpage`,
    url: i.url,
    name: i.name,
    description: i.description,
    inLanguage: i.lang,
    isPartOf: { '@id': website['@id'] },
    about: { '@id': organization['@id'] },
    ...(i.datePublished ? { datePublished: i.datePublished } : {}),
    ...(i.dateModified ? { dateModified: i.dateModified } : {}),
    ...(i.image ? { primaryImageOfPage: { '@type': 'ImageObject', url: i.image } } : {}),
  };
}

/** Article o BlogPosting con @id <url>#richSnippet (mismo que Rank Math). */
export function articleGraphSchema(input: ArticleSchemaInput & { type?: 'Article' | 'BlogPosting'; lang?: string }) {
  return {
    ...articleSchema(input),
    '@type': input.type ?? 'Article',
    '@id': `${input.url}#richSnippet`,
    mainEntityOfPage: { '@id': `${input.url}#webpage` },
    isPartOf: { '@id': `${input.url}#webpage` },
    ...(input.lang ? { inLanguage: input.lang } : {}),
  };
}

export function serviceSchema(i: { url: string; name: string; description: string; lang: string; serviceType: string }) {
  return {
    '@type': 'Service',
    '@id': `${i.url}#service`,
    name: i.name,
    description: i.description,
    serviceType: i.serviceType,
    url: i.url,
    inLanguage: i.lang,
    provider: { '@id': organization['@id'] },
    areaServed: { '@type': 'Country', name: 'Spain' },
  };
}

/** Extrae pares pregunta/respuesta del contenido (HTML o Markdown):
 *  1) <details><summary>P</summary>R</details>
 *  2) sección cuyo H2 sea "Preguntas frecuentes / FAQ / Questions fréquentes":
 *     cada H3 es la pregunta y el texto hasta el siguiente encabezado, la respuesta. */
export function extractFaq(raw: string): FaqItem[] {
  const clean = (s: string) =>
    s.replace(/<[^>]+>/g, ' ').replace(/[*_`#>]+/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#8217;|&rsquo;/g, '’')
      .replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
  const items: FaqItem[] = [];
  for (const m of raw.matchAll(/<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi)) {
    const q = clean(m[1]); const a = clean(m[2]).slice(0, 1200);
    if (q.length > 8 && a.length > 20) items.push({ question: q, answer: a });
  }
  if (items.length) return items;
  const secRe = /(?:<h2[^>]*>\s*([^<]*(?:preguntas frecuentes|frequently asked|questions fr[ée]quentes|questions fr[ée]quemment|quick questions|questions answered|\bfaq\b)[^<]*)<\/h2>|^##\s+(.*(?:preguntas frecuentes|frequently asked|questions fr[ée]quentes|questions fr[ée]quemment|quick questions|questions answered|\bfaq\b).*)$)/im;
  const start = raw.search(secRe);
  if (start < 0) return items;
  let section = raw.slice(start);
  section = section.replace(/^(<h2[^>]*>[\s\S]*?<\/h2>|##[^\n]*\n)/i, '');
  const end = section.search(/(<h2[^>]*>|^##\s)/im);
  if (end > 0) section = section.slice(0, end);
  const parts = section.split(/(?=<h3[^>]*>|^###\s)/im);
  for (const p of parts) {
    const m = p.match(/^(?:<h3[^>]*>([\s\S]*?)<\/h3>|###\s+([^\n]+)\n)([\s\S]*)$/i);
    if (!m) continue;
    const q = clean(m[1] ?? m[2] ?? ''); const a = clean(m[3] ?? '').slice(0, 1200);
    if (q.length > 8 && a.length > 20) items.push({ question: q, answer: a });
  }
  return items;
}

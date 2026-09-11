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
} as const;

export const author = {
  '@type': 'Person',
  '@id': `${SITE_URL}/es/sobre-nosotros/#elena-mochales`,
  name: 'Elena Mochales',
  url: `${SITE_URL}/es/sobre-nosotros/`,
  worksFor: { '@id': organization['@id'] },
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

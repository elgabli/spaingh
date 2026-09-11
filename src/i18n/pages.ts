// Textos de las páginas de listado (servicios, blog) y 404 por idioma.
import type { Lang } from './config';

export type Pilar = 'ley-beckham' | 'nomada-digital' | 'profesional-cualificado' | 'constitucion-empresas';
export const PILAR_ORDER: Pilar[] = ['ley-beckham', 'nomada-digital', 'profesional-cualificado', 'constitucion-empresas'];

export interface PagesText {
  services: { title: string; description: string; h1: string; intro: string; pilares: Record<Pilar, { name: string; text: string }>; soon: string };
  blog: { title: string; description: string; h1: string; intro: string; empty: string; readMore: string };
  notFound: { title: string; h1: string; text: string; home: string };
}

export const pagesText: Record<Lang, PagesText> = {
  es: {
    services: {
      title: 'Servicios | Spain Global Hub',
      description: 'Asesoría legal, fiscal y de residencia para expatriados e inversores en España: Ley Beckham, Nómada Digital, Profesional Altamente Cualificado y constitución de empresas.',
      h1: 'Servicios',
      intro: 'Cuatro áreas en las que acompañamos a quien se traslada o invierte en España, de la evaluación inicial a la resolución del expediente.',
      pilares: {
        'ley-beckham': { name: 'Ley Beckham', text: 'Régimen especial de impatriados: tributación al 24 % hasta 600.000 €. Evaluación, Modelo 149 y planificación.' },
        'nomada-digital': { name: 'Visado Nómada Digital', text: 'Residencia para teletrabajadores internacionales y sus familias.' },
        'profesional-cualificado': { name: 'Profesional Altamente Cualificado', text: 'Permiso de residencia y trabajo para directivos y perfiles cualificados contratados en España.' },
        'constitucion-empresas': { name: 'Constitución de Empresas', text: 'Creación de sociedades, estructura societaria y cumplimiento para operar en España.' },
      },
      soon: 'Página en español en preparación. Consúltenos directamente.',
    },
    blog: {
      title: 'Noticias | Spain Global Hub',
      description: 'Artículos sobre fiscalidad, visados e inversión para extranjeros en España.',
      h1: 'Noticias',
      intro: 'Guías y análisis del equipo sobre fiscalidad, residencia e inversión en España.',
      empty: 'Todavía no hay artículos en este idioma.',
      readMore: 'Leer más →',
    },
    notFound: { title: 'Página no encontrada | Spain Global Hub', h1: 'Página no encontrada', text: 'La página que busca no existe o ha cambiado de dirección.', home: 'Ir al inicio' },
  },
  en: {
    services: {
      title: 'Services | Spain Global Hub',
      description: 'Legal, tax and residency advisory for expats and investors in Spain: Beckham Law, Digital Nomad Visa, Highly Qualified Professional Visa and company formation.',
      h1: 'Services',
      intro: 'Four areas in which we support people relocating to or investing in Spain, from the initial assessment to the resolution of the file.',
      pilares: {
        'ley-beckham': { name: 'Beckham Law', text: 'Special impatriate regime: 24% flat tax up to €600,000. Assessment, Form 149 and planning.' },
        'nomada-digital': { name: 'Digital Nomad Visa', text: 'Residency for international remote workers and their families.' },
        'profesional-cualificado': { name: 'Highly Qualified Professional', text: 'Residence and work permit for executives and qualified profiles hired in Spain.' },
        'constitucion-empresas': { name: 'Company Formation', text: 'Incorporation, corporate structure and compliance to operate in Spain.' },
      },
      soon: 'Page in preparation. Contact us directly.',
    },
    blog: {
      title: 'Blog | Spain Global Hub',
      description: 'Articles on taxation, visas and investment for foreigners in Spain.',
      h1: 'Blog',
      intro: 'Guides and analysis from the team on taxation, residency and investment in Spain.',
      empty: 'No articles in this language yet.',
      readMore: 'Read more →',
    },
    notFound: { title: 'Page not found | Spain Global Hub', h1: 'Page not found', text: 'The page you are looking for does not exist or has moved.', home: 'Go to home' },
  },
  fr: {
    services: {
      title: 'Services | Spain Global Hub',
      description: 'Conseil juridique, fiscal et de résidence pour expatriés et investisseurs en Espagne : Loi Beckham, Visa Nomade Numérique, Professionnel Hautement Qualifié et création de sociétés.',
      h1: 'Services',
      intro: "Quatre domaines dans lesquels nous accompagnons ceux qui s'installent ou investissent en Espagne, de l'évaluation initiale à la résolution du dossier.",
      pilares: {
        'ley-beckham': { name: 'Loi Beckham', text: "Régime spécial des impatriés : imposition à 24 % jusqu'à 600 000 €. Évaluation, formulaire 149 et planification." },
        'nomada-digital': { name: 'Visa Nomade Numérique', text: 'Résidence pour télétravailleurs internationaux et leurs familles.' },
        'profesional-cualificado': { name: 'Professionnel Hautement Qualifié', text: 'Permis de séjour et de travail pour cadres et profils qualifiés recrutés en Espagne.' },
        'constitucion-empresas': { name: 'Création de Société', text: 'Constitution, structure sociétaire et conformité pour opérer en Espagne.' },
      },
      soon: 'Page en préparation. Contactez-nous directement.',
    },
    blog: {
      title: 'Actualités | Spain Global Hub',
      description: "Articles sur la fiscalité, les visas et l'investissement pour les étrangers en Espagne.",
      h1: 'Actualités',
      intro: "Guides et analyses de l'équipe sur la fiscalité, la résidence et l'investissement en Espagne.",
      empty: "Pas encore d'articles dans cette langue.",
      readMore: 'Lire la suite →',
    },
    notFound: { title: 'Page introuvable | Spain Global Hub', h1: 'Page introuvable', text: "La page que vous cherchez n'existe pas ou a changé d'adresse.", home: "Aller à l'accueil" },
  },
};

/** URLs de los listados por idioma (para hreflang entre ellos). */
export const listingUrls = {
  services: { es: '/es/servicios/', en: '/en/services/', fr: '/fr/services/' },
  blog: { es: '/es/noticias/', en: '/en/blog/', fr: '/fr/blog/' },
} as const;

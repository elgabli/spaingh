// Textos de las páginas de listado (servicios, blog) y 404 por idioma.
import type { Lang } from './config';

export type Pilar = 'ley-beckham' | 'nomada-digital' | 'profesional-cualificado' | 'constitucion-empresas';
export const PILAR_ORDER: Pilar[] = ['ley-beckham', 'nomada-digital', 'profesional-cualificado', 'constitucion-empresas'];

export interface PagesText {
  services: { title: string; description: string; h1: string; intro: string; pilares: Record<Pilar, { name: string; text: string }>; soon: string };
  blog: { title: string; description: string; h1: string; intro: string; empty: string; otherLangs: string; readMore: string; updated: string; published: string; readTime: string; back: string };
  notFound: { title: string; h1: string; text: string; home: string };
  article: { home: string; toc: string; toolBeckham: { title: string; text: string; button: string }; toolNomad: { title: string; text: string; button: string }; toolServices: { title: string; text: string; button: string }; contact: { title: string; text: string; button: string }; midCta: { title: string; text: string; button: string; wa: string }; author: { reviewed: string; role: string; bio: string; updated: string } };
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
      otherLangs: 'Mientras tanto, puede leer nuestros artículos en otros idiomas:',
      readMore: 'Leer más →',
      updated: 'Actualizado el',
      published: 'Publicado el',
      readTime: 'min de lectura',
      back: '← Todas las noticias',
    },
    notFound: { title: 'Página no encontrada | Spain Global Hub', h1: 'Página no encontrada', text: 'La página que busca no existe o ha cambiado de dirección.', home: 'Ir al inicio' },
    article: {
      home: 'Inicio', toc: 'En este artículo',
      toolBeckham: { title: 'Calculadora Ley Beckham', text: 'Compare el IRPF ordinario con el tipo del 24 % para su salario y comunidad.', button: 'Calcular mi ahorro' },
      toolNomad: { title: 'Verificador Visado Nómada Digital', text: 'Compruebe en 2 minutos si cumple los requisitos del visado.', button: 'Comprobar elegibilidad' },
      toolServices: { title: 'Nuestros servicios', text: 'Ley Beckham, Nómada Digital, Profesional Cualificado y creación de empresas.', button: 'Ver servicios' },
      contact: { title: '¿Hablamos?', text: 'Reserve una consulta personalizada. Respuesta en 24 h laborables.', button: 'Reservar consulta' },
      midCta: { title: '¿Le aplica a su caso?', text: 'Cuéntenos su situación y le decimos en 24 h laborables si cumple los requisitos y cuál es el siguiente paso. Sin compromiso.', button: 'Evaluación privada sin compromiso', wa: 'o escríbanos por WhatsApp' },
      author: { reviewed: 'Revisado por', role: 'Abogada · ICAM nº C69993 · colegiada desde 2000', bio: 'Especialista en extranjería y nacionalidad española (Derecho y Empresariales por ICADE; Máster en Derecho de Extranjería e Inmigración, Universidad Carlos III). Más de 20 años de ejercicio y clientes de más de 50 nacionalidades. Atiende en español, inglés y árabe.', updated: 'Última revisión' },
    },
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
      description: 'Articles and guides on taxation, visas, residency and investment for foreigners relocating to Spain.',
      h1: 'Blog',
      intro: 'Guides and analysis from the team on taxation, residency and investment in Spain.',
      empty: 'No articles in this language yet.',
      otherLangs: 'In the meantime, you can read our articles in other languages:',
      readMore: 'Read more →',
      updated: 'Updated on',
      published: 'Published on',
      readTime: 'min read',
      back: '← All articles',
    },
    notFound: { title: 'Page not found | Spain Global Hub', h1: 'Page not found', text: 'The page you are looking for does not exist or has moved.', home: 'Go to home' },
    article: {
      home: 'Home', toc: 'In this article',
      toolBeckham: { title: 'Beckham Law Calculator', text: 'Compare ordinary income tax with the 24% flat rate for your salary and region.', button: 'Calculate my savings' },
      toolNomad: { title: 'Digital Nomad Visa Checker', text: 'Find out in 2 minutes whether you meet the visa requirements.', button: 'Check eligibility' },
      toolServices: { title: 'Our services', text: 'Beckham Law, Digital Nomad Visa, Highly Qualified Professional and company formation.', button: 'View services' },
      contact: { title: 'Shall we talk?', text: 'Book a personalised consultation. Reply within 24 working hours.', button: 'Book a consultation' },
      midCta: { title: 'Does this apply to you?', text: 'Tell us your situation and within 24 working hours we will tell you whether you qualify and what the next step is. No obligation.', button: 'Private evaluation, no obligation', wa: 'or message us on WhatsApp' },
      author: { reviewed: 'Reviewed by', role: 'Lawyer · ICAM no. C69993 · registered since 2000', bio: 'Specialist in Spanish immigration and nationality law (Law and Business degrees, ICADE; Master\'s in Immigration and Asylum Law, Universidad Carlos III de Madrid). Over 20 years of practice with clients from more than 50 nationalities. Works in Spanish, English and Arabic.', updated: 'Last reviewed' },
    },
  },
  fr: {
    services: {
      title: 'Nos services | Spain Global Hub',
      description: 'Conseil juridique, fiscal et de résidence pour expatriés et investisseurs en Espagne : Loi Beckham, Visa Nomade Numérique, PHQ et création de sociétés.',
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
      otherLangs: 'En attendant, vous pouvez lire nos articles dans d’autres langues :',
      readMore: 'Lire la suite →',
      updated: 'Mis à jour le',
      published: 'Publié le',
      readTime: 'min de lecture',
      back: '← Toutes les actualités',
    },
    notFound: { title: 'Page introuvable | Spain Global Hub', h1: 'Page introuvable', text: "La page que vous cherchez n'existe pas ou a changé d'adresse.", home: "Aller à l'accueil" },
    article: {
      home: 'Accueil', toc: 'Dans cet article',
      toolBeckham: { title: 'Calculateur Loi Beckham', text: "Comparez l'IRPF ordinaire avec le taux de 24 % pour votre salaire et votre région.", button: 'Calculer mon économie' },
      toolNomad: { title: 'Vérificateur Visa Nomade Numérique', text: 'Vérifiez en 2 minutes si vous remplissez les conditions du visa.', button: "Vérifier l'éligibilité" },
      toolServices: { title: 'Nos services', text: 'Loi Beckham, Visa Nomade Numérique, Professionnel Hautement Qualifié et création de société.', button: 'Voir les services' },
      contact: { title: 'On en parle ?', text: 'Réservez une consultation personnalisée. Réponse sous 24 h ouvrées.', button: 'Réserver une consultation' },
      midCta: { title: 'Est-ce que cela s’applique à vous ?', text: 'Décrivez-nous votre situation : sous 24 h ouvrées, nous vous disons si vous remplissez les conditions et quelle est la prochaine étape. Sans engagement.', button: 'Évaluation privée sans engagement', wa: 'ou écrivez-nous sur WhatsApp' },
      author: { reviewed: 'Révisé par', role: 'Avocate · ICAM nº C69993 · inscrite depuis 2000', bio: 'Spécialiste du droit des étrangers et de la nationalité espagnole (Droit et Gestion, ICADE ; Master en droit de l’immigration et de l’asile, Universidad Carlos III de Madrid). Plus de 20 ans d’exercice et des clients de plus de 50 nationalités. Exerce en espagnol, anglais et arabe.', updated: 'Dernière révision' },
    },
  },
};

/** URLs de los listados por idioma (para hreflang entre ellos). */
export const listingUrls = {
  services: { es: '/es/servicios/', en: '/en/services/', fr: '/fr/services/' },
  blog: { es: '/es/noticias/', en: '/en/blog/', fr: '/fr/blog/' },
} as const;

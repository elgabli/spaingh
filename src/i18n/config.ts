// Única fuente de verdad para textos/enlaces de navegación por idioma.
//
// Por qué existe este fichero: en WordPress, el header y el footer vivían en
// dos mu-plugins PHP distintos, cada uno con su propio array por idioma
// (sgh-header-premium.php, sgh-footer-home.php). Se desincronizaron sin que
// nadie lo notara: el enlace "Nosotros" del footer FR apuntaba a Contacto
// duplicado, con la etiqueta "Notre équipe — nous contacter" pegada a mano.
// Aquí NO puede pasar: un solo objeto, tipado, usado por Header.astro Y
// Footer.astro. Si falta una clave para un idioma, TypeScript lo marca en
// build, no lo descubre un usuario francés en producción.

export type Lang = 'es' | 'en' | 'fr';

export const LANGS: Lang[] = ['es', 'en', 'fr'];
export const DEFAULT_LANG: Lang = 'es';

export interface NavLink {
  href: string; // ruta relativa SIN prefijo de idioma, ej: "/qui-sommes-nous/"
  label: string;
}

export interface LangConfig {
  code: Lang;
  locale: string; // para <html lang> y Open Graph
  name: string;
  nav: {
    home: NavLink;
    services: NavLink;
    blog: NavLink;
    about: NavLink;
    contact: NavLink;
  };
  footer: {
    rightsReserved: string;
    professionalNotice: string;
    privacy: NavLink;
    cookies: NavLink;
    terms: NavLink;
    tagline: string;
    colServices: string;
    colCompany: string;
    colTools: string;
    colContact: string;
    calculator: string;
    checker: string;
    email: string;
    whatsapp: string;
  };
  cta: {
    privateConsultation: string;
  };
  cookies: {
    text: string;
    more: string;
    accept: string;
    reject: string;
  };
}

export const i18nConfig: Record<Lang, LangConfig> = {
  es: {
    code: 'es',
    locale: 'es_ES',
    name: 'Español',
    nav: {
      home: { href: '/', label: 'Inicio' },
      services: { href: '/servicios/', label: 'Servicios' },
      blog: { href: '/noticias/', label: 'Noticias' },
      about: { href: '/sobre-nosotros/', label: 'Nosotros' },
      contact: { href: '/contacto/', label: 'Contacto' },
    },
    footer: {
      rightsReserved: '© 2026 Spain Global Hub. Todos los derechos reservados.',
      professionalNotice:
        'Spain Global Hub es una firma de servicios jurídicos y fiscales. La información contenida en esta web no sustituye el asesoramiento legal personalizado. SGH no se responsabiliza de las decisiones tomadas sin una consulta formal previa.',
      privacy: { href: '/politica-de-privacidad/', label: 'Privacidad' },
      cookies: { href: '/politica-de-cookies/', label: 'Cookies' },
      terms: { href: '/terminos-y-condiciones-de-uso/', label: 'Condiciones de uso' },
      tagline: 'Asesoría boutique jurídica y fiscal para inversores y expatriados que se trasladan a España o invierten en el país.',
      colServices: 'Servicios',
      colCompany: 'Empresa',
      colTools: 'Herramientas',
      colContact: 'Contacto',
      calculator: 'Calculadora Ley Beckham',
      checker: 'Verificador Visado Nómada Digital',
      email: 'Email',
      whatsapp: 'WhatsApp',
    },
    cta: { privateConsultation: 'Evaluación Privada' },
    cookies: {
      text: 'Usamos cookies analíticas (Google Analytics) para medir el uso de la web y mejorarla. No se activan hasta que las aceptes.',
      more: 'Política de cookies',
      accept: 'Aceptar',
      reject: 'Rechazar',
    },
  },
  en: {
    code: 'en',
    locale: 'en_GB',
    name: 'English',
    nav: {
      home: { href: '/', label: 'Home' },
      services: { href: '/services/', label: 'Services' },
      blog: { href: '/blog/', label: 'Blog' },
      about: { href: '/about-spain-global-hub/', label: 'About' },
      contact: { href: '/contact/', label: 'Contact' },
    },
    footer: {
      rightsReserved: '© 2026 Spain Global Hub. All rights reserved.',
      professionalNotice:
        'Spain Global Hub is a legal and tax advisory firm. The information on this website does not substitute personalized legal advice. SGH is not responsible for decisions made without prior formal consultation.',
      privacy: { href: '/privacy-policy/', label: 'Privacy' },
      cookies: { href: '/cookie-policy/', label: 'Cookies' },
      terms: { href: '/terms-of-use/', label: 'Terms of Use' },
      tagline: 'Boutique legal and tax advisory for investors and expats relocating to or investing in Spain.',
      colServices: 'Services',
      colCompany: 'Company',
      colTools: 'Tools',
      colContact: 'Contact',
      calculator: 'Beckham Law Calculator',
      checker: 'Digital Nomad Visa Checker',
      email: 'Email',
      whatsapp: 'WhatsApp',
    },
    cta: { privateConsultation: 'Request Private Evaluation' },
    cookies: {
      text: 'We use analytics cookies (Google Analytics) to measure how the site is used and improve it. They are not set until you accept.',
      more: 'Cookie policy',
      accept: 'Accept',
      reject: 'Reject',
    },
  },
  fr: {
    code: 'fr',
    locale: 'fr_FR',
    name: 'Français',
    nav: {
      home: { href: '/', label: 'Accueil' },
      services: { href: '/services/', label: 'Services' },
      blog: { href: '/blog/', label: 'Actualités' },
      about: { href: '/qui-sommes-nous/', label: 'Qui sommes-nous' },
      contact: { href: '/contact/', label: 'Contact' },
    },
    footer: {
      rightsReserved: '© 2026 Spain Global Hub. Tous droits réservés.',
      professionalNotice:
        'Spain Global Hub est un cabinet de conseil juridique et fiscal. Les informations de ce site ne remplacent pas un conseil juridique personnalisé. SGH ne peut être tenu responsable des décisions prises sans consultation formelle préalable.',
      privacy: { href: '/politique-de-confidentialite/', label: 'Confidentialité' },
      cookies: { href: '/politique-de-cookies/', label: 'Cookies' },
      terms: { href: '/conditions-utilisation/', label: "Conditions d'utilisation" },
      tagline: "Cabinet boutique de conseil juridique et fiscal pour investisseurs et expatriés qui s'installent ou investissent en Espagne.",
      colServices: 'Services',
      colCompany: 'Cabinet',
      colTools: 'Outils',
      colContact: 'Contact',
      calculator: 'Calculateur Loi Beckham',
      checker: 'Vérificateur Visa Nomade Numérique',
      email: 'Email',
      whatsapp: 'WhatsApp',
    },
    cta: { privateConsultation: 'Consultation Privée' },
    cookies: {
      text: "Nous utilisons des cookies analytiques (Google Analytics) pour mesurer l'utilisation du site et l'améliorer. Ils ne sont activés qu'après votre accord.",
      more: 'Politique de cookies',
      accept: 'Accepter',
      reject: 'Refuser',
    },
  },
};

/** Construye la URL absoluta con prefijo de idioma: withLangPrefix('fr', '/contact/') -> '/fr/contact/' */
export function withLangPrefix(lang: Lang, path: string): string {
  return `/${lang}${path}`;
}

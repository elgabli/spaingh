// Contenido de la home por idioma. Una sola estructura (Home.astro) y aquí
// solo textos y enlaces. Origen: home ES (.sgh2) y homes EN/FR (Elementor)
// de WordPress, reorientadas a los 4 pilares decididos: Ley Beckham, Nómada
// Digital, Profesional Altamente Cualificado y Constitución de Empresas.
// Los testimonios se mantienen literalmente como estaban en producción
// (pendiente de revisión por Elena: el de Golden Visa ya no aplica).
import type { Lang } from './config';

export interface HomeCard { title: string; text: string; href?: string; cta?: string }
export interface HomeContent {
  hero: { h1Pre: string; h1Em: string; h1Post: string; lead: string; ctaPrimary: string; ctaSecondary: string; ctaSecondaryHref: string };
  pillars: HomeCard[]; // 4
  trust: { kicker: string; h2: string; lead: string; items: HomeCard[] };
  challenges: { kicker: string; h2: string; lead: string; items: HomeCard[] };
  method: { kicker: string; h2: string; steps: HomeCard[] };
  testimonials: { kicker: string; h2: string; items: { text: string; name: string; role: string }[] };
  insights: { kicker: string; h2: string; lead: string; items: { title: string; meta: string; href: string }[] };
  cta: { kicker: string; h2: string; text: string; button: string; privacy: string };
  guarantee: HomeCard[];
}

export const homeContent: Record<Lang, HomeContent> = {
  es: {
    hero: {
      h1Pre: 'Asesoría Privada para ', h1Em: 'Inversores', h1Post: ' y Expatriados en España',
      lead: 'Soluciones legales y fiscales diseñadas a medida para proteger su patrimonio y optimizar su residencia en España.',
      ctaPrimary: 'Solicitar Evaluación Privada', ctaSecondary: 'Calcular ahorro fiscal', ctaSecondaryHref: '/es/calculadora-ley-beckham/',
    },
    pillars: [
      { title: 'Ley Beckham', text: 'Régimen de impatriados al 24 %: evaluación, solicitud (Modelo 149) y planificación fiscal completa.', href: '/es/servicios/asesoria-ley-beckham/', cta: 'Ver servicio →' },
      { title: 'Visado Nómada Digital', text: 'Residencia para teletrabajadores y sus familias: elegibilidad, expediente y seguimiento hasta la TIE.', href: '/es/visado-nomada-digital-elegibilidad/', cta: 'Comprobar elegibilidad →' },
      { title: 'Profesional Altamente Cualificado', text: 'Permiso de trabajo para directivos y perfiles cualificados contratados por empresas en España.', href: '/es/servicios/', cta: 'Consultar →' },
      { title: 'Constitución de Empresas', text: 'Creación de sociedades, estructura societaria y cumplimiento para operar en España desde el primer día.', href: '/es/servicios/creacion-de-empresas-en-espana/', cta: 'Ver servicio →' },
    ],
    trust: {
      kicker: 'Excelencia Contrastada', h2: '15 años asesorando a los perfiles más exigentes del mundo',
      lead: 'Un equipo boutique que combina rigor jurídico, visión internacional y absoluta discreción.',
      items: [
        { title: 'Seguridad Jurídica', text: 'Expertos en protección de inversión extranjera y cumplimiento normativo.' },
        { title: 'Movilidad Global', text: 'Gestión integral de Nómada Digital, Profesional Altamente Cualificado y Ley Beckham.' },
        { title: 'Especialistas Fiscales', text: 'Optimización fiscal patrimonial para estructuras internacionales complejas.' },
      ],
    },
    challenges: {
      kicker: 'Por qué elegirnos', h2: 'Los desafíos más comunes al establecerse o invertir en España',
      lead: 'Nos aseguramos de que cada paso de su transición sea seguro y eficiente.',
      items: [
        { title: 'Obstáculos legales complejos', text: 'SGH simplifica la burocracia mediante representación legal directa y experta ante todas las instituciones españolas.' },
        { title: 'Riesgos fiscales por desconocimiento', text: 'Diseñamos su estructura fiscal proactivamente para evitar sobrecostes y garantizar el cumplimiento internacional.' },
        { title: 'Problemas con visados o movilidad', text: 'Coordinamos su residencia y permisos para eliminar fricciones en su establecimiento.' },
      ],
    },
    method: {
      kicker: 'Metodología de Alto Rendimiento', h2: 'Su transición a España, bajo control absoluto',
      steps: [
        { title: 'Análisis de Perfil y Objetivos', text: 'Realizamos una evaluación global para diseñar una estrategia legal y fiscal personalizada que proteja sus intereses desde el primer día.' },
        { title: 'Planificación Legal y Fiscal', text: 'Ejecutamos la optimización de su residencia y su fiscalidad bajo la normativa española e internacional, garantizando eficiencia tributaria.' },
        { title: 'Gestión de Residencia y Empresa', text: 'Acompañamos la ejecución completa: visado, régimen fiscal y estructura societaria.' },
      ],
    },
    testimonials: {
      kicker: 'Historias de Éxito', h2: 'Clientes satisfechos que confían en nuestra experiencia',
      items: [
        { text: 'La gestión de mi Golden Visa fue impecable. SGH me proporcionó la seguridad jurídica que necesitaba para trasladar mi patrimonio a Madrid sin complicaciones.', name: 'Ahmed S.', role: 'Inversor Patrimonial, Dubái' },
        { text: 'Gracias a su asesoría en la Ley Beckham, logramos optimizar la carga fiscal de nuestros directivos en el desembarco de nuestra tecnológica en Barcelona.', name: 'Elena R.', role: 'Directiva, Sector Tecnológico' },
        { text: 'Su conocimiento del mercado inmobiliario y de la normativa española nos dio total confianza para invertir. Profesionales de primer nivel.', name: 'Javier M.', role: 'Inversor Internacional' },
      ],
    },
    insights: {
      kicker: 'Insights & Noticias', h2: 'Conocimiento al servicio de su inversión',
      lead: 'Guías y análisis de nuestro equipo sobre fiscalidad, residencia e inversión en España.',
      items: [
        { title: 'Ley Beckham 2026: requisitos y cómo aplicar', meta: 'Fiscalidad · Ver guía →', href: '/es/ley-beckham-2026-guia-completa/' },
        { title: 'Calcula tu ahorro fiscal con la Ley Beckham', meta: 'Herramienta · Probar →', href: '/es/calculadora-ley-beckham/' },
        { title: 'Últimas noticias y análisis del equipo', meta: 'Blog · Ver noticias →', href: '/es/noticias/' },
      ],
    },
    cta: {
      kicker: 'Estamos listos para ayudarle', h2: 'Solicite su consulta personalizada hoy mismo',
      text: 'Obtenga una hoja de ruta clara para su establecimiento en España. Nuestro equipo de expertos garantiza una gestión rápida, segura y bajo la más estricta confidencialidad profesional.',
      button: 'Solicitar Consulta', privacy: 'Respetamos su privacidad. Consulta inicial sin compromiso.',
    },
    guarantee: [
      { title: 'Confidencialidad absoluta', text: 'Su información y patrimonio protegidos bajo estricto secreto profesional.' },
      { title: 'Respuesta en 24 h', text: 'Gestionamos cada consulta con la máxima prioridad y rapidez.' },
      { title: 'Sin compromiso', text: 'Primera consulta y evaluación inicial totalmente gratuitas.' },
    ],
  },

  en: {
    hero: {
      h1Pre: 'Private Advisory for ', h1Em: 'Investors', h1Post: ' and Expats in Spain',
      lead: 'Tailor-made legal and tax solutions designed to protect your assets and optimize your residency in Spain.',
      ctaPrimary: 'Request Private Evaluation', ctaSecondary: 'Calculate your tax savings', ctaSecondaryHref: '/en/beckham-law-calculator/',
    },
    pillars: [
      { title: 'Beckham Law', text: '24% flat-rate impatriate regime: eligibility review, application (Form 149) and full tax planning.', href: '/en/services/beckham-law-tax-advisory/', cta: 'View service →' },
      { title: 'Digital Nomad Visa', text: 'Residency for remote workers and their families: eligibility, file preparation and follow-up through to the TIE card.', href: '/en/digital-nomad-visa-eligibility-checker/', cta: 'Check eligibility →' },
      { title: 'Highly Qualified Professional', text: 'Work permit for executives and qualified profiles hired by companies in Spain.', href: '/en/highly-qualified-professional-visa-spain/', cta: 'Read the guide →' },
      { title: 'Company Formation', text: 'Incorporation, corporate structure and compliance to operate in Spain from day one.', href: '/en/services/strategic-corporate-deployment-in-spain/', cta: 'View service →' },
    ],
    trust: {
      kicker: 'Proven Excellence', h2: "15 years advising the world's most demanding profiles",
      lead: 'A boutique team combining legal rigour, international vision and absolute discretion.',
      items: [
        { title: 'Legal Security', text: 'Experts in foreign investment protection and regulatory compliance.' },
        { title: 'Global Mobility', text: 'End-to-end management of Digital Nomad, Highly Qualified Professional and Beckham Law files.' },
        { title: 'Tax Specialists', text: 'Wealth tax optimization for complex international structures.' },
      ],
    },
    challenges: {
      kicker: 'Why choose us', h2: 'Common challenges when settling or investing in Spain',
      lead: 'We ensure every step of your transition is secure and efficient.',
      items: [
        { title: 'Complex legal obstacles', text: 'SGH simplifies the red tape through direct and expert legal representation before all Spanish institutions.' },
        { title: 'Tax risks from lack of knowledge', text: 'We design your tax structure proactively to avoid overpayment and guarantee international compliance.' },
        { title: 'Visa and mobility issues', text: 'We coordinate your residency and permits to remove friction from your relocation.' },
      ],
    },
    method: {
      kicker: 'High-Performance Methodology', h2: 'Your transition to Spain, under full control',
      steps: [
        { title: 'Profile & Goals Analysis', text: 'We carry out a global assessment to design a personalised legal and tax strategy that protects your interests from day one.' },
        { title: 'Legal & Tax Planning', text: 'We optimise your residency and taxation under Spanish and international rules, guaranteeing tax efficiency.' },
        { title: 'Residency & Company Execution', text: 'We handle the full execution: visa, tax regime and corporate structure.' },
      ],
    },
    testimonials: {
      kicker: 'Success Stories', h2: 'Satisfied clients who trust our expertise',
      items: [
        { text: 'My Golden Visa management was impeccable. SGH provided the legal security I needed to transfer my assets to Madrid without any complications.', name: 'Ahmed S.', role: 'Private Investor, Dubai' },
        { text: "Thanks to their Beckham Law advisory, we successfully optimized the tax burden for our executives during our tech company's launch in Barcelona.", name: 'Elena M.', role: 'Executive, Tech Sector' },
        { text: 'Their real estate due diligence was vital to avoid risks in a complex operation. They are, without a doubt, the ideal strategic partner in Spain.', name: 'James B.', role: 'International Investor' },
      ],
    },
    insights: {
      kicker: 'Insights & News', h2: 'Knowledge at the service of your investment',
      lead: 'Guides and analysis from our team on taxation, residency and investment in Spain.',
      items: [
        { title: 'Beckham Law Spain: complete 2026 guide', meta: 'Tax · Read guide →', href: '/en/beckham-law-spain-guide/' },
        { title: 'Calculate your tax savings under the Beckham Law', meta: 'Tool · Try it →', href: '/en/beckham-law-calculator/' },
        { title: 'Latest news and analysis from the team', meta: 'Blog · View posts →', href: '/en/blog/' },
      ],
    },
    cta: {
      kicker: 'We are ready to help', h2: 'Request your personalised consultation today',
      text: 'Get a clear roadmap for your establishment in Spain. Our team of experts guarantees fast, secure handling under the strictest professional confidentiality.',
      button: 'Request Consultation', privacy: 'We respect your privacy. Initial consultation with no obligation.',
    },
    guarantee: [
      { title: 'Absolute confidentiality', text: 'Your information and assets protected under strict professional secrecy.' },
      { title: 'Reply within 24 h', text: 'Every enquiry is handled with top priority and speed.' },
      { title: 'No obligation', text: 'First consultation and initial assessment completely free.' },
    ],
  },

  fr: {
    hero: {
      h1Pre: 'Conseil Privé pour ', h1Em: 'Investisseurs', h1Post: ' et Expatriés en Espagne',
      lead: 'Des solutions juridiques et fiscales sur mesure pour protéger votre patrimoine et optimiser votre résidence en Espagne.',
      ctaPrimary: 'Étude de Profil Privée', ctaSecondary: 'Calculer mon économie fiscale', ctaSecondaryHref: '/fr/calculateur-loi-beckham/',
    },
    pillars: [
      { title: 'Loi Beckham', text: "Régime des impatriés à 24 % : évaluation, demande (formulaire 149) et planification fiscale complète.", href: '/fr/services/loi-beckham-conseil-fiscal/', cta: 'Voir le service →' },
      { title: 'Visa Nomade Numérique', text: 'Résidence pour télétravailleurs et leurs familles : éligibilité, dossier et suivi jusqu’à la carte TIE.', href: '/fr/verificateur-visa-nomade-numerique/', cta: 'Vérifier mon éligibilité →' },
      { title: 'Professionnel Hautement Qualifié', text: 'Permis de travail pour cadres et profils qualifiés recrutés par des entreprises en Espagne.', href: '/fr/services/', cta: 'Nous consulter →' },
      { title: 'Création de Société', text: 'Constitution, structure sociétaire et conformité pour opérer en Espagne dès le premier jour.', href: '/fr/services/company-formation-spain-premium-investment/', cta: 'Voir le service →' },
    ],
    trust: {
      kicker: 'Excellence Reconnue', h2: '15 ans au service des profils les plus exigeants au monde',
      lead: 'Une équipe boutique alliant rigueur juridique, vision internationale et discrétion absolue.',
      items: [
        { title: 'Sécurité Juridique', text: 'Experts en protection des investissements étrangers et conformité réglementaire.' },
        { title: 'Mobilité Globale', text: 'Gestion intégrale du Visa Nomade Numérique, du Professionnel Hautement Qualifié et de la Loi Beckham.' },
        { title: 'Spécialistes Fiscaux', text: 'Optimisation fiscale patrimoniale pour structures internationales complexes.' },
      ],
    },
    challenges: {
      kicker: 'Pourquoi nous choisir', h2: "Les défis les plus courants lors d'une installation ou d'un investissement en Espagne",
      lead: 'Nous veillons à ce que chaque étape de votre transition soit sécurisée et efficace.',
      items: [
        { title: 'Obstacles juridiques complexes', text: 'SGH simplifie la bureaucratie grâce à une représentation légale directe et experte auprès de toutes les institutions espagnoles.' },
        { title: 'Risques fiscaux liés à la méconnaissance', text: 'Nous concevons votre structure fiscale de manière proactive pour éviter les surcoûts et garantir la conformité aux normes internationales.' },
        { title: 'Difficultés liées aux visas ou à la mobilité', text: 'Nous coordonnons votre résidence et vos permis pour éliminer toute friction dans votre installation.' },
      ],
    },
    method: {
      kicker: 'Méthodologie de Haute Performance', h2: 'Votre transition en Espagne, sous contrôle absolu',
      steps: [
        { title: 'Analyse de Profil et Objectifs', text: 'Nous réalisons une évaluation globale pour concevoir une stratégie juridique et fiscale personnalisée qui protège vos intérêts dès le premier jour.' },
        { title: 'Planification Juridique et Fiscale', text: "Nous optimisons votre résidence et votre fiscalité selon les normes espagnoles et internationales, garantissant une efficacité fiscale optimale." },
        { title: 'Gestion de la Résidence et de la Société', text: 'Nous accompagnons l’exécution complète : visa, régime fiscal et structure sociétaire.' },
      ],
    },
    testimonials: {
      kicker: 'Histoires de Réussite', h2: 'Des clients satisfaits qui font confiance à notre expertise',
      items: [
        { text: "La gestion de mon Golden Visa a été irréprochable. SGH m'a apporté la sécurité juridique dont j'avais besoin pour transférer mon patrimoine à Madrid sans complications.", name: 'Ahmed S.', role: 'Investisseur Patrimonial, Dubaï' },
        { text: "Grâce à leurs conseils sur la Loi Beckham, nous avons optimisé la charge fiscale de nos cadres lors de l'implantation de notre entreprise technologique à Barcelone.", name: 'Elena M.', role: 'COO, Tech Solutions' },
        { text: "Leur due diligence immobilière a été cruciale pour éviter les risques lors d'une opération complexe. Ils sont, sans aucun doute, le partenaire stratégique idéal en Espagne.", name: 'James B.', role: 'Directeur Général, Bennett Invest' },
      ],
    },
    insights: {
      kicker: 'Insights & Actualités', h2: 'Le savoir au service de votre investissement',
      lead: 'Guides et analyses de notre équipe sur la fiscalité, la résidence et l’investissement en Espagne.',
      items: [
        { title: 'Calculez votre économie fiscale avec la Loi Beckham', meta: 'Outil · Essayer →', href: '/fr/calculateur-loi-beckham/' },
        { title: 'Vérifiez votre éligibilité au Visa Nomade Numérique', meta: 'Outil · Vérifier →', href: '/fr/verificateur-visa-nomade-numerique/' },
        { title: 'Dernières actualités et analyses de l’équipe', meta: 'Blog · Voir →', href: '/fr/blog/' },
      ],
    },
    cta: {
      kicker: 'Nous sommes prêts à vous accompagner', h2: "Demandez votre consultation personnalisée dès aujourd'hui",
      text: "Obtenez une feuille de route claire pour votre installation en Espagne. Notre équipe d'experts garantit une gestion rapide, sécurisée et sous la plus stricte confidentialité professionnelle.",
      button: 'Demander une Consultation', privacy: 'Nous respectons votre vie privée. Consultation initiale sans engagement.',
    },
    guarantee: [
      { title: 'Confidentialité absolue', text: 'Vos informations et votre patrimoine protégés par le secret professionnel.' },
      { title: 'Réponse sous 24 h', text: 'Chaque demande est traitée avec la plus haute priorité et rapidité.' },
      { title: 'Sans engagement', text: 'Première consultation et évaluation initiale entièrement gratuites.' },
    ],
  },
};

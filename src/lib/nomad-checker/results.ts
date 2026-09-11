// Textos de la pantalla de resultado — extraídos de los 3 motores reales en
// producción el 12-sep-2026 (2 enlaces mal idiomados en ES ya corregidos:
// beckham-law-calculator -> calculadora-ley-beckham, services -> servicios).
import type { Lang } from '../../i18n/config';

export interface ResultStrings {
  eligibleTitle: string;
  eligibleDesc: string;
  eligibleBoxTitle: string;
  eligibleItems: string[];
  conditionalTitle: string;
  conditionalDesc: string;
  conditionalBoxTitle: string;
  blockedTitle: string;
  blockedDesc: string;
  blockedBoxTitle: string;
  additionalBoxTitle: string;
  scoreLabel: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  nextStepsTitle: string;
  nextSteps: { emoji: string; strong: string; text: string }[];
  restartBtn: string;
}

export const results: Record<Lang, ResultStrings> = {
  es: {
    eligibleTitle: '¡Parece que eres elegible!',
    eligibleDesc: 'Según tus respuestas, cumples los criterios principales para el Visado Nómada Digital de España.',
    eligibleBoxTitle: 'Lo que juega a tu favor:',
    eligibleItems: [
      'Sin residencia fiscal previa en España en los últimos 5 años',
      'Acuerdo de trabajo remoto con ingresos extranjeros',
      'Los ingresos cumplen o superan los requisitos mínimos',
      'Suficiente experiencia profesional o formación',
      'Cobertura de seguro médico planificada o en vigor',
      'Antecedentes penales limpios',
    ],
    conditionalTitle: 'Probablemente elegible, con condiciones',
    conditionalDesc: 'Según tus respuestas, cumples los requisitos básicos, pero hay puntos que debes resolver antes de solicitar.',
    conditionalBoxTitle: 'Puntos a resolver:',
    blockedTitle: 'Puede que no seas elegible',
    blockedDesc: 'Según tus respuestas, hay obstáculos importantes para poder solicitar el Visado Nómada Digital.',
    blockedBoxTitle: 'Obstáculos identificados:',
    additionalBoxTitle: 'Consideraciones adicionales:',
    scoreLabel: 'Puntuación de elegibilidad',
    ctaTitle: '¿Necesitas ayuda con tu solicitud?',
    ctaDesc: 'Spain Global Hub te conecta con abogados de inmigración verificados y especialistas en reubicación que gestionan solicitudes del Visado Nómada Digital cada día.',
    ctaPrimary: '📋 Obtén una revisión de elegibilidad gratuita',
    ctaPrimaryHref: '/es/contacto/?origen=nomad-checker',
    ctaSecondary: '🌍 Explora nuestros servicios de inmigración y fiscalidad',
    ctaSecondaryHref: '/es/servicios/',
    nextStepsTitle: '📋 Próximos pasos recomendados:',
    nextSteps: [
      { emoji: '1️⃣', strong: 'Recopila documentos:', text: 'Certificados de antecedentes penales, prueba de trabajo remoto, evidencia de ingresos, póliza de seguro médico, pasaporte y título universitario (si aplica).' },
      { emoji: '2️⃣', strong: 'Solicita en el consulado español', text: 'de tu país de residencia, o solicita desde España si ya estás presente legalmente.' },
      { emoji: '3️⃣', strong: 'Ten en cuenta la Ley Beckham:', text: 'Si cumples los requisitos para el Visado Nómada Digital, también puedes beneficiarte de la Ley Beckham de España para optimización fiscal. <a href="/es/calculadora-ley-beckham/">Calcula tu ahorro fiscal →</a>' },
    ],
    restartBtn: '🔄 Empezar de nuevo',
  },
  en: {
    eligibleTitle: 'You appear to be eligible!',
    eligibleDesc: "Based on your answers, you meet the main criteria for Spain's Digital Nomad Visa.",
    eligibleBoxTitle: 'What works in your favor:',
    eligibleItems: [
      'No prior Spanish tax residency in the last 5 years',
      'Remote work arrangement with foreign income',
      'Income meets or exceeds minimum requirements',
      'Sufficient professional experience or education',
      'Health insurance coverage planned or in place',
      'Clean criminal record',
    ],
    conditionalTitle: 'Likely eligible, with conditions',
    conditionalDesc: 'Based on your answers, you meet the core requirements, but there are items you should address before applying.',
    conditionalBoxTitle: 'Areas to address:',
    blockedTitle: 'You may not be eligible',
    blockedDesc: 'Based on your answers, there are significant obstacles to qualifying for the Digital Nomad Visa.',
    blockedBoxTitle: 'Blockers identified:',
    additionalBoxTitle: 'Additional considerations:',
    scoreLabel: 'Eligibility Score',
    ctaTitle: 'Need help with your application?',
    ctaDesc: 'Spain Global Hub connects you with verified immigration lawyers and relocation specialists who handle Digital Nomad Visa applications every day.',
    ctaPrimary: '📋 Get a free eligibility review',
    ctaPrimaryHref: '/en/contact/?origen=nomad-checker',
    ctaSecondary: '🌍 Explore our immigration & tax services',
    ctaSecondaryHref: '/en/services/',
    nextStepsTitle: '📋 Recommended next steps:',
    nextSteps: [
      { emoji: '1️⃣', strong: 'Gather documents:', text: 'Criminal record certificates, proof of remote work, income evidence, health insurance policy, passport, and university degree (if applicable).' },
      { emoji: '2️⃣', strong: 'Apply at the Spanish consulate', text: 'in your country of residence, or apply from within Spain if you are already legally present.' },
      { emoji: '3️⃣', strong: 'Consider the Beckham Law:', text: "If you qualify for the Digital Nomad Visa, you may also benefit from Spain's Beckham Law for tax optimization. <a href=\"/en/beckham-law-calculator/\">Check your tax savings →</a>" },
    ],
    restartBtn: '🔄 Start over',
  },
  fr: {
    eligibleTitle: 'Vous semblez être éligible !',
    eligibleDesc: "D'après vos réponses, vous remplissez les critères principaux pour le Visa Nomade Numérique espagnol.",
    eligibleBoxTitle: 'Ce qui joue en votre faveur :',
    eligibleItems: [
      "Aucune résidence fiscale antérieure en Espagne au cours des 5 dernières années",
      'Accord de télétravail avec des revenus étrangers',
      'Les revenus atteignent ou dépassent les exigences minimales',
      'Expérience professionnelle ou formation suffisante',
      "Couverture d'assurance santé prévue ou en vigueur",
      'Casier judiciaire vierge',
    ],
    conditionalTitle: 'Probablement éligible, sous conditions',
    conditionalDesc: "D'après vos réponses, vous remplissez les conditions de base, mais certains points doivent être résolus avant de faire votre demande.",
    conditionalBoxTitle: 'Points à résoudre :',
    blockedTitle: "Vous n'êtes peut-être pas éligible",
    blockedDesc: "D'après vos réponses, il existe des obstacles importants pour pouvoir demander le Visa Nomade Numérique.",
    blockedBoxTitle: 'Obstacles identifiés :',
    additionalBoxTitle: 'Considérations supplémentaires :',
    scoreLabel: "Score d'éligibilité",
    ctaTitle: "Besoin d'aide pour votre demande ?",
    ctaDesc: "Spain Global Hub vous met en contact avec des avocats en immigration vérifiés et des spécialistes de la relocalisation qui traitent des demandes de Visa Nomade Numérique chaque jour.",
    ctaPrimary: "📋 Obtenez une évaluation d'éligibilité gratuite",
    ctaPrimaryHref: '/fr/contact/?origen=nomad-checker',
    ctaSecondary: "🌍 Découvrez nos services d'immigration et de fiscalité",
    ctaSecondaryHref: '/fr/services/',
    nextStepsTitle: '📋 Prochaines étapes recommandées :',
    nextSteps: [
      { emoji: '1️⃣', strong: 'Rassemblez les documents :', text: "Certificats de casier judiciaire, preuve de télétravail, justificatifs de revenus, police d'assurance santé, passeport et diplôme universitaire (le cas échéant)." },
      { emoji: '2️⃣', strong: 'Déposez votre demande au consulat espagnol', text: 'de votre pays de résidence, ou depuis l\'Espagne si vous y êtes déjà légalement présent.' },
      { emoji: '3️⃣', strong: 'Pensez à la Loi Beckham :', text: "Si vous êtes éligible au Visa Nomade Numérique, vous pouvez aussi bénéficier de la Loi Beckham espagnole pour optimiser votre fiscalité. <a href=\"/fr/calculateur-loi-beckham/\">Calculez votre économie fiscale →</a>" },
    ],
    restartBtn: '🔄 Recommencer',
  },
};

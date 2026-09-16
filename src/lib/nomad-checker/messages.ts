// Traducción de los códigos de eligibility.ts a texto — extraído de los 3
// motores reales en producción (ES/EN/FR) el 12-sep-2026.
import type { MessageCode } from './eligibility';
import type { Lang } from '../../i18n/config';

export const messages: Record<Lang, Record<MessageCode, string>> = {
  es: {
    BLOCKER_TAX_RESIDENCY: 'Has sido residente fiscal en España en los últimos 5 años. Este es un requisito obligatorio.',
    BLOCKER_WORK_ARRANGEMENT: 'Tu situación laboral no cumple el requisito de trabajo remoto.',
    WARNING_MIXED_CLIENTS: 'Trabajas con algunos clientes españoles. Asegúrate de que al menos el 80% de tus ingresos provengan de fuera de España.',
    BLOCKER_INCOME_LOW: 'Tus ingresos están por debajo del requisito mínimo (aprox. 2.850 €/mes brutos en 2026).',
    WARNING_INCOME_BORDERLINE: 'Tus ingresos están en un rango límite. El mínimo es de aproximadamente 2.850 €/mes.',
    BLOCKER_NO_EXPERIENCE_NO_DEGREE: 'Te faltan tanto la experiencia profesional requerida (más de 3 años) como un título universitario.',
    WARNING_LIMITED_EXPERIENCE: 'Tienes un título pero experiencia limitada. Tu solicitud puede revisarse con más detenimiento.',
    WARNING_EXPERIENCE_1_TO_3: 'Tu experiencia es de entre 1 y 3 años. Un título universitario reforzaría tu solicitud.',
    WARNING_NO_INSURANCE: 'Necesitarás obtener un seguro médico privado integral antes de solicitar.',
    BLOCKER_CRIMINAL_RECORD: 'Unos antecedentes penales pueden descalificarte, según la gravedad y naturaleza del delito.',
  },
  en: {
    BLOCKER_TAX_RESIDENCY: 'You have been a Spanish tax resident in the last 5 years. This is a mandatory requirement.',
    BLOCKER_WORK_ARRANGEMENT: 'Your work arrangement does not meet the remote work requirement.',
    WARNING_MIXED_CLIENTS: 'You work with some Spanish clients. Make sure at least 80% of your income comes from outside Spain.',
    BLOCKER_INCOME_LOW: 'Your income is below the minimum requirement (approx. €2,850/month gross in 2026).',
    WARNING_INCOME_BORDERLINE: 'Your income is in a borderline range. The minimum is approximately €2,850/month.',
    BLOCKER_NO_EXPERIENCE_NO_DEGREE: 'You lack both the required professional experience (3+ years) and a university degree.',
    WARNING_LIMITED_EXPERIENCE: 'You have a degree but limited experience. Your application may be reviewed more carefully.',
    WARNING_EXPERIENCE_1_TO_3: 'Your experience is between 1-3 years. A university degree would strengthen your application.',
    WARNING_NO_INSURANCE: 'You will need to obtain comprehensive private health insurance before applying.',
    BLOCKER_CRIMINAL_RECORD: 'A criminal record may disqualify you, depending on the severity and nature of the offense.',
  },
  fr: {
    BLOCKER_TAX_RESIDENCY: "Vous avez été résident fiscal en Espagne au cours des 5 dernières années. Il s'agit d'une exigence obligatoire.",
    BLOCKER_WORK_ARRANGEMENT: 'Votre situation professionnelle ne remplit pas la condition de télétravail.',
    WARNING_MIXED_CLIENTS: "Vous travaillez avec des clients espagnols. Assurez-vous qu'au moins 80% de vos revenus proviennent de l'extérieur de l'Espagne.",
    BLOCKER_INCOME_LOW: 'Vos revenus sont inférieurs à l\'exigence minimale (environ 2 850 €/mois brut en 2026).',
    WARNING_INCOME_BORDERLINE: 'Vos revenus se situent dans une fourchette limite. Le minimum est d\'environ 2 850 €/mois.',
    BLOCKER_NO_EXPERIENCE_NO_DEGREE: "Vous manquez à la fois de l'expérience professionnelle requise (3 ans et plus) et d'un diplôme universitaire.",
    WARNING_LIMITED_EXPERIENCE: 'Vous avez un diplôme mais une expérience limitée. Votre demande peut être examinée plus attentivement.',
    WARNING_EXPERIENCE_1_TO_3: "Votre expérience se situe entre 1 et 3 ans. Un diplôme universitaire renforcerait votre demande.",
    WARNING_NO_INSURANCE: "Vous devrez obtenir une assurance santé privée complète avant de faire votre demande.",
    BLOCKER_CRIMINAL_RECORD: "Un casier judiciaire peut vous disqualifier, selon la gravité et la nature de l'infraction.",
  },
};

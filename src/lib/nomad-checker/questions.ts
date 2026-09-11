// Preguntas del wizard por idioma — extraídas y verificadas contra la web en
// producción el 12-sep-2026 (ES corregido hoy: 2 enlaces con slug en inglés).
// Generado automáticamente para evitar errores de transcripción manual.

export interface QuestionOption {
  answer: string;
  text: string;
}

export interface Question {
  step: number;
  title: string;
  desc: string;
  options: QuestionOption[];
  tip: string;
}

export const questions_es: Question[] = [
  {
    step: 1,
    title: `Residencia Actual`,
    desc: `¿Has sido residente fiscal en España en algún momento durante los últimos <strong>5 años</strong>?`,
    options: [
      { answer: 'no', text: `No — No he sido residente fiscal en España` },
      { answer: 'yes', text: `Sí — He sido residente fiscal en España` },
    ],
    tip: `Por qué importa:No debes haber sido residente fiscal en España en los 5 años anteriores a tu solicitud. Las visitas turísticas cortas no cuentan.`,
  },
  {
    step: 2,
    title: `Situación Laboral`,
    desc: `¿Cuál de las siguientes opciones describe mejor tu situación laboral actual?`,
    options: [
      { answer: 'remote_employee', text: `Empleado remoto de una empresa no española` },
      { answer: 'freelancer', text: `Freelance / autónomo con clientes extranjeros` },
      { answer: 'mixed', text: `Mixto — algunos clientes españoles, mayoritariamente extranjeros` },
      { answer: 'local_only', text: `Solo empresa española local` },
      { answer: 'unemployed', text: `No trabajo remotamente actualmente` },
    ],
    tip: `Regla clave:Debes trabajar remotamente para una empresa no española o tener clientes extranjeros. Si trabajas para una empresa española, al menos el 80% de tus ingresos deben provenir de fuera de España.`,
  },
  {
    step: 3,
    title: `Ingresos Mensuales`,
    desc: `¿Cuál es tu <strong>ingreso bruto mensual</strong> del trabajo remoto? (en EUR)`,
    options: [
      { answer: 'above_3000', text: `Más de 3.000€ al mes` },
      { answer: '2000_3000', text: `Entre 2.000€ y 3.000€ al mes` },
      { answer: 'below_2000', text: `Menos de 2.000€ al mes` },
    ],
    tip: `Requisito mínimo:Debes ganar al menos el 200% del salario mínimo interprofesional (SMI) de España. En 2026, esto es aproximadamente 2.400€/mes brutos. Por cada familiar que traigas, el requisito aumenta un 75% del SMI.`,
  },
  {
    step: 4,
    title: `Experiencia Profesional`,
    desc: `¿Cuánto tiempo llevas trabajando en tu campo profesional actual o para tu empleador actual?`,
    options: [
      { answer: 'more_than_3', text: `Más de 3 años en el mismo campo o con el mismo empleador` },
      { answer: '1_to_3', text: `Entre 1 y 3 años en el mismo campo o con el mismo empleador` },
      { answer: 'less_than_1', text: `Menos de 1 año en este campo o con este empleador` },
    ],
    tip: `Requisito de experiencia:Debes tener al menos 3 años de experiencia profesional en tu campo, O ser graduado/posgraduado de una universidad o escuela de negocios reconocida.`,
  },
  {
    step: 5,
    title: `Formación (Vía Alternativa)`,
    desc: `Si NO tienes más de 3 años de experiencia, ¿tienes un <strong>título universitario</strong> o <strong>titulación de posgrado</strong> de una institución reconocida?`,
    options: [
      { answer: 'yes_degree', text: `Sí — Tengo un título universitario o una titulación de posgrado` },
      { answer: 'no_degree', text: `No — No tengo un título universitario` },
      { answer: 'already_3years', text: `No aplica — Ya tengo más de 3 años de experiencia` },
    ],
    tip: `Alternativa:Si no tienes 3 años de experiencia, un título universitario o una titulación de posgrado de una institución reconocida puede satisfacer este requisito.`,
  },
  {
    step: 6,
    title: `Seguro de Salud`,
    desc: `¿Tienes (o estás dispuesto a obtener) un <strong>seguro médico privado integral</strong> que te cubra en España?`,
    options: [
      { answer: 'yes_insurance', text: `Sí — Tengo o conseguiré un seguro médico privado integral` },
      { answer: 'no_insurance', text: `No / No estoy seguro — Aún no tengo seguro médico privado` },
    ],
    tip: `Requerido:Debes tener un seguro médico privado completo con cobertura equivalente al sistema público de salud de España. El seguro de viaje generalmente no es suficiente.`,
  },
  {
    step: 7,
    title: `Antecedentes Penales`,
    desc: `¿Tienes <strong>antecedentes penales limpios</strong> en España y en cualquier país donde hayas residido en los últimos 5 años?`,
    options: [
      { answer: 'clean', text: `Sí — Mis antecedentes penales están limpios en todos los países relevantes` },
      { answer: 'not_clean', text: `No — Tengo antecedentes penales en España u otro país` },
    ],
    tip: `Requerido:Debes proporcionar un certificado de antecedentes penales limpio de tu país de origen y de cualquier país donde hayas vivido en los últimos 5 años. Ciertas faltas menores pueden no descalificarte, pero los delitos graves sí.`,
  },
];

export const questions_en: Question[] = [
  {
    step: 1,
    title: `Current Residence`,
    desc: `Have you been a tax resident in Spain at any point during the last <strong>5 years</strong>?`,
    options: [
      { answer: 'no', text: `No — I have not been a Spanish tax resident` },
      { answer: 'yes', text: `Yes — I have been a Spanish tax resident` },
    ],
    tip: `Why this matters:You must not have been a Spanish tax resident in the 5 years prior to your application. Short tourist visits do not count.`,
  },
  {
    step: 2,
    title: `Work Arrangement`,
    desc: `Which of the following best describes your current work situation?`,
    options: [
      { answer: 'remote_employee', text: `Remote employee of a non-Spanish company` },
      { answer: 'freelancer', text: `Freelancer / self-employed with foreign clients` },
      { answer: 'mixed', text: `Mixed — some Spanish clients, mostly foreign` },
      { answer: 'local_only', text: `Local Spanish company only` },
      { answer: 'unemployed', text: `Not currently working remotely` },
    ],
    tip: `Key rule:You must work remotely for a non-Spanish company or have foreign clients. If you work for a Spanish company, at least 80% of your income must come from outside Spain.`,
  },
  {
    step: 3,
    title: `Monthly Income`,
    desc: `What is your <strong>gross monthly income</strong> from remote work? (in EUR)`,
    options: [
      { answer: 'above_3000', text: `€3,000+ per month` },
      { answer: '2000_3000', text: `€2,000 – €3,000 per month` },
      { answer: 'below_2000', text: `Below €2,000 per month` },
    ],
    tip: `Minimum requirement:You must earn at least 200% of Spain's minimum wage (SMI). In 2026, this is approximately €2,400/month gross. For each family member you bring, the requirement increases by 75% of the SMI.`,
  },
  {
    step: 4,
    title: `Professional Experience`,
    desc: `How long have you been working in your current professional field or for your current employer?`,
    options: [
      { answer: 'more_than_3', text: `3+ years in the same field or with same employer` },
      { answer: '1_to_3', text: `1–3 years in the same field or with same employer` },
      { answer: 'less_than_1', text: `Less than 1 year in this field or with this employer` },
    ],
    tip: `Experience requirement:You must have at least 3 years of professional experience in your field, OR be a graduate/postgraduate from a recognized university or business school.`,
  },
  {
    step: 5,
    title: `Education (Alternative Path)`,
    desc: `If you do NOT have 3+ years of experience, do you hold a <strong>university degree</strong> or <strong>postgraduate qualification</strong> from a recognized institution?`,
    options: [
      { answer: 'yes_degree', text: `Yes — I have a university degree or postgraduate qualification` },
      { answer: 'no_degree', text: `No — I do not have a university degree` },
      { answer: 'already_3years', text: `Not applicable — I already have 3+ years of experience` },
    ],
    tip: `Alternative:If you don't have 3 years of experience, a university degree or postgraduate qualification from a recognized institution can satisfy this requirement.`,
  },
  {
    step: 6,
    title: `Health Insurance`,
    desc: `Do you have (or are you willing to obtain) <strong>comprehensive private health insurance</strong> that covers you in Spain?`,
    options: [
      { answer: 'yes_insurance', text: `Yes — I have or will get comprehensive private health insurance` },
      { answer: 'no_insurance', text: `No / Not sure — I don't have private health insurance yet` },
    ],
    tip: `Required:You must have full private health insurance with coverage equivalent to Spain's public healthcare system. Travel insurance is generally not sufficient.`,
  },
  {
    step: 7,
    title: `Criminal Record`,
    desc: `Do you have a <strong>clean criminal record</strong> in Spain and in any country where you have resided in the last 5 years?`,
    options: [
      { answer: 'clean', text: `Yes — My criminal record is clean in all relevant countries` },
      { answer: 'not_clean', text: `No — I have a criminal record in Spain or another country` },
    ],
    tip: `Required:You must provide a clean criminal record certificate from your country of origin and from any country where you have lived in the last 5 years. Certain minor offenses may not disqualify you, but serious crimes will.`,
  },
];

export const questions_fr: Question[] = [
  {
    step: 1,
    title: `Résidence Actuelle`,
    desc: `Avez-vous été résident fiscal en Espagne à un moment donné au cours des <strong>5 dernières années</strong> ?`,
    options: [
      { answer: 'no', text: `Non — Je n'ai pas été résident fiscal en Espagne` },
      { answer: 'yes', text: `Oui — J'ai été résident fiscal en Espagne` },
    ],
    tip: `Pourquoi c'est important :Vous ne devez pas avoir été résident fiscal en Espagne dans les 5 années précédant votre demande. Les courts séjours touristiques ne comptent pas.`,
  },
  {
    step: 2,
    title: `Situation Professionnelle`,
    desc: `Laquelle des options suivantes décrit le mieux votre situation professionnelle actuelle ?`,
    options: [
      { answer: 'remote_employee', text: `Employé à distance d'une entreprise non espagnole` },
      { answer: 'freelancer', text: `Freelance / indépendant avec des clients étrangers` },
      { answer: 'mixed', text: `Mixte — quelques clients espagnols, majoritairement étrangers` },
      { answer: 'local_only', text: `Uniquement une entreprise espagnole locale` },
      { answer: 'unemployed', text: `Pas de travail à distance actuellement` },
    ],
    tip: `Règle clé :Vous devez travailler à distance pour une entreprise non espagnole ou avoir des clients étrangers. Si vous travaillez pour une entreprise espagnole, au moins 80% de vos revenus doivent provenir de l'étranger.`,
  },
  {
    step: 3,
    title: `Revenus Mensuels`,
    desc: `Quel est votre <strong>revenu brut mensuel</strong> du travail à distance ? (en EUR)`,
    options: [
      { answer: 'above_3000', text: `Plus de 3 000 € par mois` },
      { answer: '2000_3000', text: `Entre 2 000 € et 3 000 € par mois` },
      { answer: 'below_2000', text: `Moins de 2 000 € par mois` },
    ],
    tip: `Exigence minimale :Vous devez gagner au moins 200% du salaire minimum interprofessionnel (SMI) espagnol. En 2026, cela représente environ 2 400 €/mois brut. Pour chaque membre de la famille que vous emmenez, l'exigence augmente de 75% du SMI.`,
  },
  {
    step: 4,
    title: `Expérience Professionnelle`,
    desc: `Depuis combien de temps travaillez-vous dans votre domaine professionnel actuel ou pour votre employeur actuel ?`,
    options: [
      { answer: 'more_than_3', text: `Plus de 3 ans dans le même domaine ou avec le même employeur` },
      { answer: '1_to_3', text: `Entre 1 et 3 ans dans le même domaine ou avec le même employeur` },
      { answer: 'less_than_1', text: `Moins de 1 an dans ce domaine ou avec cet employeur` },
    ],
    tip: `Exigence d'expérience :Vous devez avoir au moins 3 ans d'expérience professionnelle dans votre domaine, OU être diplômé/qualifié de troisième cycle d'une université ou école de commerce reconnue.`,
  },
  {
    step: 5,
    title: `Formation (Voie Alternative)`,
    desc: `Si vous n'avez PAS plus de 3 ans d'expérience, détenez-vous un <strong>diplôme universitaire</strong> ou une <strong>qualification de troisième cycle</strong> d'un établissement reconnu ?`,
    options: [
      { answer: 'yes_degree', text: `Oui — J'ai un diplôme universitaire ou une qualification de troisième cycle` },
      { answer: 'no_degree', text: `Non — Je n'ai pas de diplôme universitaire` },
      { answer: 'already_3years', text: `Sans objet — J'ai déjà plus de 3 ans d'expérience` },
    ],
    tip: `Alternative :Si vous n'avez pas 3 ans d'expérience, un diplôme universitaire ou une qualification de troisième cycle d'un établissement reconnu peut satisfaire cette exigence.`,
  },
  {
    step: 6,
    title: `Assurance Maladie`,
    desc: `Avez-vous (ou acceptez-vous d'obtenir) une <strong>assurance santé privée complète</strong> qui vous couvre en Espagne ?`,
    options: [
      { answer: 'yes_insurance', text: `Oui — J'ai ou j'obtiendrai une assurance santé privée complète` },
      { answer: 'no_insurance', text: `Non / Pas sûr — Je n'ai pas encore d'assurance santé privée` },
    ],
    tip: `Requis :Vous devez avoir une assurance santé privée complète avec une couverture équivalente au système de santé public espagnol. L'assurance voyage n'est généralement pas suffisante.`,
  },
  {
    step: 7,
    title: `Casier Judiciaire`,
    desc: `Avez-vous un <strong>casier judiciaire vierge</strong> en Espagne et dans tout pays où vous avez résidé au cours des 5 dernières années ?`,
    options: [
      { answer: 'clean', text: `Oui — Mon casier judiciaire est vierge dans tous les pays concernés` },
      { answer: 'not_clean', text: `Non — J'ai un casier judiciaire en Espagne ou dans un autre pays` },
    ],
    tip: `Requis :Vous devez fournir un certificat de casier judiciaire vierge de votre pays d'origine et de tout pays où vous avez vécu au cours des 5 dernières années. Certaines infractions mineures peuvent ne pas vous disqualifier, mais les crimes graves le feront.`,
  },
];


import type { Lang } from '../../i18n/config';
import type { Situation, OriginGroup, Residence, Spanish, RouteCode, FlagCode } from './route';

export interface Q<T extends string> { key: string; title: string; desc: string; options: { value: T; text: string }[]; tip?: string }
export interface CheckerStrings {
  title: string; subtitle: string; step: (s: number, t: number) => string;
  q: { situation: Q<Situation>; origin: Q<OriginGroup>; residence: Q<Residence>; absences: Q<'yes' | 'no'>; record: Q<'yes' | 'no'>; spanish: Q<Spanish> };
  routes: Record<RouteCode, string>;
  status: { origin: string; ready: string; pending: (n: number) => string; blocked: string };
  flags: Record<FlagCode, string>;
  yearsLine: (req: number, done: number) => string;
  checklistTitle: string; cta: string; ctaHref: string; ctaNote: string; restart: string; disclaimer: string;
}

export const strings: Record<Lang, CheckerStrings> = {
  en: {
    title: 'Which route to Spanish citizenship applies to you?', subtitle: 'Six questions, one minute, no personal data. Based on article 22 of the Spanish Civil Code.', step: (s, t) => `Question ${s} of ${t}`,
    q: {
      situation: { key: 'situation', title: 'Your personal situation', desc: 'Choose the first statement that is true for you.', options: [
        { value: 'spanish-parent', text: 'My mother or father was Spanish when I was born' },
        { value: 'spanish-ancestor', text: 'I was born abroad to a parent or grandparent who was originally Spanish' },
        { value: 'married', text: 'I am married to a Spanish citizen (for at least one year, living together in Spain)' },
        { value: 'born-in-spain', text: 'I was born in Spain to foreign parents' },
        { value: 'refugee', text: 'I have been granted refugee status in Spain' },
        { value: 'none', text: 'None of the above' } ], tip: 'Marriage only counts once it is registered in the Spanish Civil Registry.' },
      origin: { key: 'origin', title: 'Your nationality of origin', desc: 'Some nationalities have a shorter period and keep their original passport.', options: [
        { value: 'iberoamerican', text: 'Ibero-American country, Andorra, the Philippines, Equatorial Guinea or Portugal (or Sephardic origin)' },
        { value: 'other', text: 'Any other country (US, UK, EU, Morocco, China, India…)' } ] },
      residence: { key: 'residence', title: 'Years of legal residence in Spain', desc: 'Count from your first residence card (TIE). Tourist and student stays do not count.', options: [
        { value: '0', text: 'Less than 1 year (or not resident yet)' }, { value: '1', text: '1 year' }, { value: '2', text: '2 to 4 years' }, { value: '5', text: '5 to 9 years' }, { value: '10', text: '10 years or more' } ] },
      absences: { key: 'absences', title: 'Continuity', desc: 'During that period, have you been outside Spain for more than 6 months in a row, or more than a year in total?', options: [ { value: 'no', text: 'No, only short trips' }, { value: 'yes', text: 'Yes' } ], tip: 'The law sets no fixed limit, but long absences are the most common reason for refusal.' },
      record: { key: 'record', title: 'Criminal record', desc: 'Is your record clean in Spain and in every country where you have lived in the last 5 years?', options: [ { value: 'yes', text: 'Yes, clean' }, { value: 'no', text: 'No, or I am not sure' } ] },
      spanish: { key: 'spanish', title: 'Spanish language', desc: 'Applicants must prove A2 Spanish unless exempt.', options: [
        { value: 'exempt', text: 'Spanish is an official language of my country' }, { value: 'a2', text: 'I already hold DELE A2 or higher' }, { value: 'none', text: 'I still need to take the exam' } ] },
    },
    routes: { origin: 'Spanish by origin: no residence period required', option: 'Option or 1 year of residence (descendant of Spaniards)', 'residence-1': 'Citizenship by residence: 1 year', 'residence-2': 'Citizenship by residence: 2 years', 'residence-5': 'Citizenship by residence: 5 years (refugee)', 'residence-10': 'Citizenship by residence: 10 years (general rule)' },
    status: { origin: 'You do not need to accumulate residence: your nationality is declared by registering your birth (or by option). Check the deadlines with a lawyer.', ready: 'You appear to meet the residence period. You can prepare the file now.', pending: (n) => `You still need about ${n} ${n === 1 ? 'year' : 'years'} of legal, continuous residence.`, blocked: 'There is an obstacle to resolve before applying.' },
    flags: { 'exams-ccse': 'Pass the CCSE exam (Instituto Cervantes, €85).', 'exams-dele': 'Pass the DELE A2 Spanish exam (or higher).', 'dual-keep': 'You keep your original nationality: no renunciation required.', 'dual-renounce': 'You will have to declare renunciation of your previous nationality before the Civil Registry (whether it is actually lost depends on your country\'s law).', absences: 'Long absences break continuity: gather evidence of your life in Spain (work, lease, tax returns) or wait until a clean period is completed.', record: 'A criminal record, even minor, usually leads to refusal. Check cancellation of records before applying.', 'marriage-registered': 'The year only counts from the registration of the marriage in the Spanish Civil Registry, living together in Spain.', 'option-deadline': 'The right of option has deadlines; the Democratic Memory Law window closed in October 2025.' },
    yearsLine: (req, done) => `Required: ${req} ${req === 1 ? 'year' : 'years'} · Completed: ${done}${done >= 10 ? '+' : ''}`,
    checklistTitle: 'Your checklist', cta: 'Have a lawyer confirm your route', ctaHref: '/en/contact/?origen=citizenship-checker', ctaNote: 'No-obligation evaluation · reply within 24 working hours', restart: 'Start again',
    disclaimer: 'Indicative result based on your answers. The Ministry of Justice decides each file individually.',
  },
  es: {
    title: '¿Qué vía a la nacionalidad española le corresponde?', subtitle: 'Seis preguntas, un minuto, sin datos personales. Basado en el artículo 22 del Código Civil.', step: (s, t) => `Pregunta ${s} de ${t}`,
    q: {
      situation: { key: 'situation', title: 'Su situación personal', desc: 'Elija la primera afirmación que sea cierta en su caso.', options: [
        { value: 'spanish-parent', text: 'Mi madre o mi padre era español/a cuando nací' },
        { value: 'spanish-ancestor', text: 'Nací fuera de España de padre/madre o abuelo/a originariamente españoles' },
        { value: 'married', text: 'Estoy casado/a con ciudadano/a español/a (al menos un año, conviviendo en España)' },
        { value: 'born-in-spain', text: 'Nací en España de padres extranjeros' },
        { value: 'refugee', text: 'Tengo la condición de refugiado/a en España' },
        { value: 'none', text: 'Ninguna de las anteriores' } ], tip: 'El matrimonio solo cuenta desde su inscripción en el Registro Civil español.' },
      origin: { key: 'origin', title: 'Su nacionalidad de origen', desc: 'Algunas nacionalidades tienen un plazo más corto y conservan su pasaporte.', options: [
        { value: 'iberoamerican', text: 'País iberoamericano, Andorra, Filipinas, Guinea Ecuatorial o Portugal (o sefardí)' },
        { value: 'other', text: 'Cualquier otro país (EE. UU., Reino Unido, UE, Marruecos, China, India…)' } ] },
      residence: { key: 'residence', title: 'Años de residencia legal en España', desc: 'Cuente desde su primera tarjeta de residencia (TIE). Las estancias de turista y de estudiante no cuentan.', options: [
        { value: '0', text: 'Menos de 1 año (o aún no resido)' }, { value: '1', text: '1 año' }, { value: '2', text: 'De 2 a 4 años' }, { value: '5', text: 'De 5 a 9 años' }, { value: '10', text: '10 años o más' } ] },
      absences: { key: 'absences', title: 'Continuidad', desc: 'En ese período, ¿ha estado fuera de España más de 6 meses seguidos o más de un año en total?', options: [ { value: 'no', text: 'No, solo viajes cortos' }, { value: 'yes', text: 'Sí' } ], tip: 'La ley no fija un límite, pero las ausencias largas son la causa de denegación más habitual.' },
      record: { key: 'record', title: 'Antecedentes penales', desc: '¿Están limpios en España y en todos los países donde ha vivido los últimos 5 años?', options: [ { value: 'yes', text: 'Sí, limpios' }, { value: 'no', text: 'No, o no estoy seguro/a' } ] },
      spanish: { key: 'spanish', title: 'Idioma español', desc: 'Hay que acreditar un nivel A2 salvo exención.', options: [
        { value: 'exempt', text: 'El español es lengua oficial de mi país' }, { value: 'a2', text: 'Ya tengo el DELE A2 o superior' }, { value: 'none', text: 'Todavía tengo que examinarme' } ] },
    },
    routes: { origin: 'Español de origen: sin período de residencia', option: 'Opción o 1 año de residencia (descendiente de españoles)', 'residence-1': 'Nacionalidad por residencia: 1 año', 'residence-2': 'Nacionalidad por residencia: 2 años', 'residence-5': 'Nacionalidad por residencia: 5 años (refugiado)', 'residence-10': 'Nacionalidad por residencia: 10 años (regla general)' },
    status: { origin: 'No necesita acumular residencia: la nacionalidad se declara inscribiendo el nacimiento (o por opción). Revise los plazos con un abogado.', ready: 'Parece cumplir el período de residencia. Puede preparar el expediente ya.', pending: (n) => `Le faltan aproximadamente ${n} ${n === 1 ? 'año' : 'años'} de residencia legal y continuada.`, blocked: 'Hay un obstáculo que resolver antes de solicitar.' },
    flags: { 'exams-ccse': 'Aprobar el examen CCSE (Instituto Cervantes, 85 €).', 'exams-dele': 'Aprobar el DELE A2 de español (o superior).', 'dual-keep': 'Conserva su nacionalidad de origen: no hay que renunciar.', 'dual-renounce': 'Deberá declarar la renuncia a su nacionalidad anterior ante el Registro Civil (que se pierda de verdad depende de la ley de su país).', absences: 'Las ausencias largas rompen la continuidad: reúna pruebas de su vida en España (trabajo, alquiler, IRPF) o espere a completar un período limpio.', record: 'Un antecedente penal, aunque sea leve, suele suponer denegación. Compruebe la cancelación de antecedentes antes de solicitar.', 'marriage-registered': 'El año cuenta desde la inscripción del matrimonio en el Registro Civil español, conviviendo en España.', 'option-deadline': 'El derecho de opción tiene plazos; la ventana de la Ley de Memoria Democrática cerró en octubre de 2025.' },
    yearsLine: (req, done) => `Exigidos: ${req} ${req === 1 ? 'año' : 'años'} · Cumplidos: ${done}${done >= 10 ? '+' : ''}`,
    checklistTitle: 'Su lista de tareas', cta: 'Que un abogado confirme su vía', ctaHref: '/es/contacto/?origen=verificador-nacionalidad', ctaNote: 'Evaluación sin compromiso · respuesta en 24 h laborables', restart: 'Empezar de nuevo',
    disclaimer: 'Resultado orientativo según sus respuestas. El Ministerio de Justicia resuelve cada expediente individualmente.',
  },
  fr: {
    title: 'Quelle voie vers la nationalité espagnole vous correspond ?', subtitle: 'Six questions, une minute, aucune donnée personnelle. Fondé sur l’article 22 du Code civil espagnol.', step: (s, t) => `Question ${s} sur ${t}`,
    q: {
      situation: { key: 'situation', title: 'Votre situation personnelle', desc: 'Choisissez la première affirmation vraie dans votre cas.', options: [
        { value: 'spanish-parent', text: 'Ma mère ou mon père était espagnol(e) à ma naissance' },
        { value: 'spanish-ancestor', text: 'Je suis né(e) à l’étranger d’un parent ou grand-parent d’origine espagnole' },
        { value: 'married', text: 'Je suis marié(e) à un(e) citoyen(ne) espagnol(e) (depuis au moins un an, vivant ensemble en Espagne)' },
        { value: 'born-in-spain', text: 'Je suis né(e) en Espagne de parents étrangers' },
        { value: 'refugee', text: 'J’ai le statut de réfugié(e) en Espagne' },
        { value: 'none', text: 'Aucune de ces situations' } ], tip: 'Le mariage ne compte qu’à partir de son inscription au Registre civil espagnol.' },
      origin: { key: 'origin', title: 'Votre nationalité d’origine', desc: 'Certaines nationalités bénéficient d’un délai réduit et conservent leur passeport.', options: [
        { value: 'iberoamerican', text: 'Pays ibéro-américain, Andorre, Philippines, Guinée équatoriale ou Portugal (ou origine séfarade)' },
        { value: 'other', text: 'Tout autre pays (France, Belgique, Suisse, Maroc, États-Unis, Royaume-Uni…)' } ] },
      residence: { key: 'residence', title: 'Années de résidence légale en Espagne', desc: 'Comptez depuis votre première carte de résidence (TIE). Les séjours touristiques et étudiants ne comptent pas.', options: [
        { value: '0', text: 'Moins d’1 an (ou pas encore résident)' }, { value: '1', text: '1 an' }, { value: '2', text: 'De 2 à 4 ans' }, { value: '5', text: 'De 5 à 9 ans' }, { value: '10', text: '10 ans ou plus' } ] },
      absences: { key: 'absences', title: 'Continuité', desc: 'Pendant cette période, avez-vous quitté l’Espagne plus de 6 mois d’affilée ou plus d’un an au total ?', options: [ { value: 'no', text: 'Non, seulement des voyages courts' }, { value: 'yes', text: 'Oui' } ], tip: 'La loi ne fixe pas de limite, mais les absences longues sont la première cause de refus.' },
      record: { key: 'record', title: 'Casier judiciaire', desc: 'Est-il vierge en Espagne et dans tous les pays où vous avez vécu ces 5 dernières années ?', options: [ { value: 'yes', text: 'Oui, vierge' }, { value: 'no', text: 'Non, ou je ne suis pas sûr(e)' } ] },
      spanish: { key: 'spanish', title: 'Langue espagnole', desc: 'Il faut justifier un niveau A2 sauf exemption.', options: [
        { value: 'exempt', text: 'L’espagnol est langue officielle de mon pays' }, { value: 'a2', text: 'J’ai déjà le DELE A2 ou plus' }, { value: 'none', text: 'Je dois encore passer l’examen' } ] },
    },
    routes: { origin: 'Espagnol d’origine : aucune période de résidence', option: 'Option ou 1 an de résidence (descendant d’Espagnols)', 'residence-1': 'Nationalité par résidence : 1 an', 'residence-2': 'Nationalité par résidence : 2 ans', 'residence-5': 'Nationalité par résidence : 5 ans (réfugié)', 'residence-10': 'Nationalité par résidence : 10 ans (règle générale)' },
    status: { origin: 'Vous n’avez pas à cumuler de résidence : la nationalité se déclare par l’inscription de la naissance (ou par option). Vérifiez les délais avec un avocat.', ready: 'Vous semblez remplir la période de résidence. Vous pouvez préparer le dossier dès maintenant.', pending: (n) => `Il vous manque environ ${n} ${n === 1 ? 'an' : 'ans'} de résidence légale et continue.`, blocked: 'Un obstacle doit être levé avant de déposer la demande.' },
    flags: { 'exams-ccse': 'Réussir l’examen CCSE (Instituto Cervantes, 85 €).', 'exams-dele': 'Réussir le DELE A2 d’espagnol (ou plus).', 'dual-keep': 'Vous conservez votre nationalité d’origine : aucune renonciation.', 'dual-renounce': 'Vous devrez déclarer renoncer à votre nationalité antérieure devant le Registre civil (sa perte effective dépend de la loi de votre pays ; les Français conservent les deux depuis l’accord de 2021).', absences: 'Les absences longues rompent la continuité : rassemblez des preuves de votre vie en Espagne (travail, bail, impôts) ou attendez une période complète sans interruption.', record: 'Un antécédent judiciaire, même mineur, entraîne généralement un refus. Vérifiez l’effacement des antécédents avant de déposer.', 'marriage-registered': 'L’année ne compte qu’à partir de l’inscription du mariage au Registre civil espagnol, en vivant ensemble en Espagne.', 'option-deadline': 'Le droit d’option a des délais ; la fenêtre de la loi de Mémoire démocratique s’est fermée en octobre 2025.' },
    yearsLine: (req, done) => `Exigé : ${req} ${req === 1 ? 'an' : 'ans'} · Accompli : ${done}${done >= 10 ? '+' : ''}`,
    checklistTitle: 'Votre liste', cta: 'Faire confirmer votre voie par un avocat', ctaHref: '/fr/contact/?origen=verificateur-nationalite', ctaNote: 'Évaluation sans engagement · réponse sous 24 h ouvrées', restart: 'Recommencer',
    disclaimer: 'Résultat indicatif selon vos réponses. Le ministère de la Justice statue sur chaque dossier individuellement.',
  },
};

// Textos del formulario de contacto. Campos calcados del CF7 de producción
// (sgh_nombre, email, teléfono, nacionalidad, motivo, mensaje, privacidad);
// los motivos se reorientan a los 4 pilares.
import type { Lang } from './config';

export interface ContactText {
  title: string;
  description: string;
  h1: string;
  intro: string;
  direct: string;
  labels: { name: string; email: string; phone: string; nationality: string; reason: string; message: string; privacy: string; privacyLink: string; submit: string; sending: string };
  placeholders: { name: string; email: string; phone: string; message: string };
  reasons: string[];
  nationalities: string[];
  select: string;
  ok: { title: string; text: string };
  errors: { generic: string; required: string; email: string; privacy: string; turnstile: string };
}

export const contactText: Record<Lang, ContactText> = {
  es: {
    title: 'Contacto | Spain Global Hub',
    description: 'Contacta con Spain Global Hub para una evaluación privada de tu situación fiscal, de residencia o inversión en España.',
    h1: 'Solicite su evaluación privada',
    intro: 'Cuéntenos su caso y le respondemos en menos de 24 h laborables con una primera valoración y los siguientes pasos.',
    direct: 'También puede escribirnos directamente:',
    labels: { name: 'Nombre completo', email: 'Correo electrónico', phone: 'Teléfono', nationality: 'Nacionalidad', reason: 'Motivo de consulta', message: '¿En qué podemos ayudarle?', privacy: 'He leído y acepto la', privacyLink: 'Política de Privacidad', submit: 'Solicitar información', sending: 'Enviando…' },
    placeholders: { name: 'Ej. Elena Rodríguez', email: 'contacto@empresa.com', phone: '+34 600 000 000', message: 'Describa brevemente su caso…' },
    reasons: ['Ley Beckham', 'Visado Nómada Digital', 'Profesional Altamente Cualificado', 'Constitución de empresas', 'Otros visados y extranjería', 'Otro'],
    nationalities: ['España', 'Alemania', 'Arabia Saudí', 'Argentina', 'China', 'Colombia', 'Emiratos Árabes', 'Estados Unidos', 'Francia', 'Italia', 'Kuwait', 'Luxemburgo', 'México', 'Qatar', 'Reino Unido', 'Suiza', 'Otros'],
    select: 'Seleccione…',
    ok: { title: 'Mensaje recibido', text: 'Gracias. Le responderemos en menos de 24 h laborables.' },
    errors: { generic: 'No se ha podido enviar. Inténtelo de nuevo o escríbanos a sgh@spaingh.com.', required: 'Complete los campos obligatorios.', email: 'Revise el correo electrónico.', privacy: 'Debe aceptar la política de privacidad.', turnstile: 'Verificación anti-spam pendiente. Espere un segundo y reintente.' },
  },
  en: {
    title: 'Contact Us | Spain Global Hub',
    description: 'Contact Spain Global Hub for a private evaluation of your tax, residency or investment situation in Spain.',
    h1: 'Request your private evaluation',
    intro: 'Tell us about your case and we will reply within 24 working hours with a first assessment and next steps.',
    direct: 'You can also write to us directly:',
    labels: { name: 'Full name', email: 'Email address', phone: 'Phone', nationality: 'Nationality', reason: 'Reason for enquiry', message: 'How can we help you?', privacy: 'I have read and accept the', privacyLink: 'Privacy Policy', submit: 'Request information', sending: 'Sending…' },
    placeholders: { name: 'e.g. Sarah Johnson', email: 'contact@company.com', phone: '+44 7700 000000', message: 'Briefly describe your case…' },
    reasons: ['Beckham Law', 'Digital Nomad Visa', 'Highly Qualified Professional', 'Company formation', 'Other visas & immigration', 'Other'],
    nationalities: ['Spain', 'Germany', 'Saudi Arabia', 'Argentina', 'China', 'Colombia', 'United Arab Emirates', 'United States', 'France', 'Italy', 'Kuwait', 'Luxembourg', 'Mexico', 'Qatar', 'United Kingdom', 'Switzerland', 'Other'],
    select: 'Select…',
    ok: { title: 'Message received', text: 'Thank you. We will reply within 24 working hours.' },
    errors: { generic: 'Your message could not be sent. Please try again or email sgh@spaingh.com.', required: 'Please complete the required fields.', email: 'Please check the email address.', privacy: 'You must accept the privacy policy.', turnstile: 'Anti-spam check pending. Wait a second and try again.' },
  },
  fr: {
    title: 'Contactez-nous | Spain Global Hub',
    description: 'Contactez Spain Global Hub pour une évaluation privée de votre situation fiscale, de résidence ou d’investissement en Espagne.',
    h1: 'Demandez votre évaluation privée',
    intro: 'Décrivez-nous votre cas et nous vous répondons sous 24 h ouvrées avec une première analyse et les prochaines étapes.',
    direct: 'Vous pouvez aussi nous écrire directement :',
    labels: { name: 'Nom et prénom', email: 'Adresse e-mail', phone: 'Téléphone', nationality: 'Nationalité', reason: 'Motif de la demande', message: 'Comment pouvons-nous vous aider ?', privacy: "J'ai lu et j'accepte la", privacyLink: 'Politique de confidentialité', submit: 'Demander des informations', sending: 'Envoi…' },
    placeholders: { name: 'ex. Clara Rodriguez', email: 'contact@email.com', phone: '+33 6 00 00 00 00', message: 'Décrivez brièvement votre cas…' },
    reasons: ['Loi Beckham', 'Visa Nomade Numérique', 'Professionnel Hautement Qualifié', 'Création de société', 'Autres visas et immigration', 'Autre'],
    nationalities: ['Espagne', 'Allemagne', 'Arabie Saoudite', 'Argentine', 'Chine', 'Colombie', 'Émirats Arabes Unis', 'États-Unis', 'France', 'Italie', 'Koweït', 'Luxembourg', 'Mexique', 'Qatar', 'Royaume-Uni', 'Suisse', 'Autres'],
    select: 'Sélectionnez…',
    ok: { title: 'Message reçu', text: 'Merci. Nous vous répondrons sous 24 h ouvrées.' },
    errors: { generic: "Votre message n'a pas pu être envoyé. Réessayez ou écrivez à sgh@spaingh.com.", required: 'Veuillez remplir les champs obligatoires.', email: "Vérifiez l'adresse e-mail.", privacy: 'Vous devez accepter la politique de confidentialité.', turnstile: 'Vérification anti-spam en attente. Patientez une seconde et réessayez.' },
  },
};

export const contactUrls = { es: '/es/contacto/', en: '/en/contact/', fr: '/fr/contact/' } as const;

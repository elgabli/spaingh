// Verificador de vía a la nacionalidad española por residencia (art. 22 CC).
// Lógica pura, sin DOM. Los años exigidos dependen de la situación personal y
// del país de origen; el resto son requisitos comunes (continuidad, conducta,
// integración). Orientativo: la decisión es del Ministerio de Justicia.

export type Situation = 'spanish-parent' | 'spanish-ancestor' | 'married' | 'born-in-spain' | 'refugee' | 'none';
export type OriginGroup = 'iberoamerican' | 'other';
export type Residence = '0' | '1' | '2' | '5' | '10';
export type Spanish = 'exempt' | 'a2' | 'none';

export interface CitizenshipAnswers {
  situation: Situation;
  origin: OriginGroup;
  residence: Residence; // años completos de residencia LEGAL (no estancia)
  absences: boolean; // ausencias largas (> 6 meses seguidos o > 1 año acumulado)
  record: boolean; // antecedentes penales limpios
  spanish: Spanish;
}

export type RouteCode = 'origin' | 'option' | 'residence-1' | 'residence-2' | 'residence-5' | 'residence-10';
export type Status = 'ready' | 'pending-years' | 'blocked' | 'origin';
export type FlagCode = 'exams-ccse' | 'exams-dele' | 'dual-keep' | 'dual-renounce' | 'absences' | 'record' | 'marriage-registered' | 'option-deadline';

export interface CitizenshipResult {
  route: RouteCode;
  yearsRequired: number; // 0 = sin residencia
  yearsDone: number;
  yearsLeft: number;
  status: Status;
  flags: FlagCode[];
}

const YEARS: Record<Residence, number> = { '0': 0, '1': 1, '2': 2, '5': 5, '10': 10 };

export function assessCitizenship(a: CitizenshipAnswers): CitizenshipResult {
  const flags: FlagCode[] = [];
  if (a.situation === 'spanish-parent') return { route: 'origin', yearsRequired: 0, yearsDone: YEARS[a.residence], yearsLeft: 0, status: 'origin', flags };

  let route: RouteCode; let yearsRequired: number;
  if (a.situation === 'spanish-ancestor') { route = 'option'; yearsRequired = 1; flags.push('option-deadline'); }
  else if (a.situation === 'married') { route = 'residence-1'; yearsRequired = 1; flags.push('marriage-registered'); }
  else if (a.situation === 'born-in-spain') { route = 'residence-1'; yearsRequired = 1; }
  else if (a.situation === 'refugee') { route = 'residence-5'; yearsRequired = 5; }
  else if (a.origin === 'iberoamerican') { route = 'residence-2'; yearsRequired = 2; }
  else { route = 'residence-10'; yearsRequired = 10; }

  const yearsDone = YEARS[a.residence];
  const yearsLeft = Math.max(0, yearsRequired - yearsDone);

  flags.push('exams-ccse');
  if (a.spanish !== 'exempt') flags.push('exams-dele');
  flags.push(a.origin === 'iberoamerican' ? 'dual-keep' : 'dual-renounce');
  if (a.absences) flags.push('absences');
  if (!a.record) flags.push('record');

  const status: Status = !a.record ? 'blocked' : yearsLeft > 0 ? 'pending-years' : a.absences ? 'blocked' : 'ready';
  return { route, yearsRequired, yearsDone, yearsLeft, status, flags };
}

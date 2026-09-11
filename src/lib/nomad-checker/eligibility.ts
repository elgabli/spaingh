// Lógica de elegibilidad del checker de Nómada Digital — TypeScript puro, sin DOM.
//
// Portado el 11-sep-2026 desde el motor v3 en producción, y refactorizado
// el 12-sep-2026 para devolver CÓDIGOS en vez de texto en inglés fijo — el
// motor original de WordPress tenía 3 ficheros JS casi duplicados (uno por
// idioma) con la misma lógica repetida; aquí la lógica vive una sola vez y
// la traducción de los mensajes vive en la capa de UI (ver
// src/lib/nomad-checker/messages.ts).
//
// ⚠️ PENDIENTE DE CONFIRMACIÓN JURÍDICA (no corregido, ver
// rescate/NOTAS-SPAINGH.md y tanda-5-6-nomad-identidad-tecnico.md):
// el bloqueo de `step1` ("residente fiscal en España en los últimos 5
// años") es, según la auditoría del 10-sep-2026, un requisito del régimen
// fiscal Beckham (art. 93 LIRPF), NO del visado de teletrabajador
// internacional en sí. Se porta tal cual (fiel a producción) porque
// cambiar la lógica de elegibilidad requiere confirmación de Elena, no es
// una decisión técnica. NO tocar sin esa confirmación.

export interface NomadAnswers {
  step1: 'yes' | 'no'; // residente fiscal España últimos 5 años
  step2: 'remote_employee' | 'freelancer' | 'mixed' | 'local_only' | 'unemployed';
  step3: 'below_2000' | '2000_3000' | 'above_3000';
  step4: 'less_than_1' | '1_to_3' | 'more_than_3';
  step5?: 'no_degree' | 'yes_degree' | 'already_3years';
  step6: 'no_insurance' | 'yes_insurance';
  step7: 'not_clean' | 'clean';
}

export type Outcome = 'eligible' | 'conditional' | 'blocked';

export type MessageCode =
  | 'BLOCKER_TAX_RESIDENCY'
  | 'BLOCKER_WORK_ARRANGEMENT'
  | 'WARNING_MIXED_CLIENTS'
  | 'BLOCKER_INCOME_LOW'
  | 'WARNING_INCOME_BORDERLINE'
  | 'BLOCKER_NO_EXPERIENCE_NO_DEGREE'
  | 'WARNING_LIMITED_EXPERIENCE'
  | 'WARNING_EXPERIENCE_1_TO_3'
  | 'WARNING_NO_INSURANCE'
  | 'BLOCKER_CRIMINAL_RECORD';

export interface EligibilityResult {
  eligible: boolean;
  warnings: MessageCode[];
  blockers: MessageCode[];
  score: number;
  maxScore: number;
  outcome: Outcome;
}

const MAX_SCORE = 7;

export function evaluateEligibility(answers: NomadAnswers): EligibilityResult {
  let eligible = true;
  const warnings: MessageCode[] = [];
  const blockers: MessageCode[] = [];
  let score = 0;

  if (answers.step1 === 'yes') {
    eligible = false;
    blockers.push('BLOCKER_TAX_RESIDENCY');
  } else {
    score++;
  }

  if (answers.step2 === 'local_only' || answers.step2 === 'unemployed') {
    eligible = false;
    blockers.push('BLOCKER_WORK_ARRANGEMENT');
  } else if (answers.step2 === 'mixed') {
    warnings.push('WARNING_MIXED_CLIENTS');
    score++;
  } else {
    score++;
  }

  if (answers.step3 === 'below_2000') {
    eligible = false;
    blockers.push('BLOCKER_INCOME_LOW');
  } else if (answers.step3 === '2000_3000') {
    warnings.push('WARNING_INCOME_BORDERLINE');
    score++;
  } else {
    score++;
  }

  if (answers.step4 === 'less_than_1') {
    if (answers.step5 === 'no_degree') {
      eligible = false;
      blockers.push('BLOCKER_NO_EXPERIENCE_NO_DEGREE');
    } else if (answers.step5 === 'yes_degree') {
      warnings.push('WARNING_LIMITED_EXPERIENCE');
      score++;
    } else {
      score++;
    }
  } else if (answers.step4 === '1_to_3') {
    if (answers.step5 !== 'yes_degree' && answers.step5 !== 'already_3years') {
      warnings.push('WARNING_EXPERIENCE_1_TO_3');
    }
    score++;
  } else {
    score++;
  }

  if (answers.step6 === 'no_insurance') {
    warnings.push('WARNING_NO_INSURANCE');
  } else {
    score++;
  }

  if (answers.step7 === 'not_clean') {
    eligible = false;
    blockers.push('BLOCKER_CRIMINAL_RECORD');
  } else {
    score++;
  }

  const outcome: Outcome = blockers.length ? 'blocked' : warnings.length ? 'conditional' : 'eligible';

  return { eligible, warnings, blockers, score, maxScore: MAX_SCORE, outcome };
}

/** Paso siguiente del wizard — step4="more_than_3" salta el paso 5 (no aplica). */
export function nextStepAfter(step: number, answers: Partial<NomadAnswers>): number {
  let next = step + 1;
  if (next === 5 && answers.step4 === 'more_than_3') next = 6;
  return next;
}

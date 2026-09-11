import { describe, expect, it } from 'vitest';
import { evaluateEligibility, nextStepAfter, type NomadAnswers } from './eligibility';

const baseEligible: NomadAnswers = {
  step1: 'no',
  step2: 'freelancer',
  step3: 'above_3000',
  step4: 'more_than_3',
  step6: 'yes_insurance',
  step7: 'clean',
};

describe('evaluateEligibility', () => {
  it('caso ideal: elegible sin advertencias', () => {
    const r = evaluateEligibility(baseEligible);
    expect(r.outcome).toBe('eligible');
    expect(r.blockers).toHaveLength(0);
    expect(r.warnings).toHaveLength(0);
  });

  it('residencia fiscal en España en los últimos 5 años bloquea siempre', () => {
    const r = evaluateEligibility({ ...baseEligible, step1: 'yes' });
    expect(r.eligible).toBe(false);
    expect(r.outcome).toBe('blocked');
    expect(r.blockers).toContain('BLOCKER_TAX_RESIDENCY');
  });

  it('ingresos por debajo del mínimo bloquea', () => {
    const r = evaluateEligibility({ ...baseEligible, step3: 'below_2000' });
    expect(r.outcome).toBe('blocked');
  });

  it('ingresos en rango límite da advertencia, no bloqueo', () => {
    const r = evaluateEligibility({ ...baseEligible, step3: '2000_3000' });
    expect(r.eligible).toBe(true);
    expect(r.outcome).toBe('conditional');
  });

  it('menos de 1 año de experiencia sin título bloquea', () => {
    const r = evaluateEligibility({ ...baseEligible, step4: 'less_than_1', step5: 'no_degree' });
    expect(r.outcome).toBe('blocked');
  });

  it('menos de 1 año de experiencia con título da advertencia', () => {
    const r = evaluateEligibility({ ...baseEligible, step4: 'less_than_1', step5: 'yes_degree' });
    expect(r.eligible).toBe(true);
    expect(r.outcome).toBe('conditional');
  });

  it('antecedentes penales no limpios bloquea', () => {
    const r = evaluateEligibility({ ...baseEligible, step7: 'not_clean' });
    expect(r.outcome).toBe('blocked');
  });
});

describe('nextStepAfter', () => {
  it('salta el paso 5 si ya se declaró más de 3 años de experiencia en el paso 4', () => {
    expect(nextStepAfter(4, { step4: 'more_than_3' })).toBe(6);
  });

  it('no salta el paso 5 en el resto de casos', () => {
    expect(nextStepAfter(4, { step4: '1_to_3' })).toBe(5);
  });
});

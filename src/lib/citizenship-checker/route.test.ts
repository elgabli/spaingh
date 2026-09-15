import { describe, it, expect } from 'vitest';
import { assessCitizenship } from './route';
const base = { situation: 'none', origin: 'other', residence: '10', absences: false, record: true, spanish: 'a2' } as const;
describe('assessCitizenship', () => {
  it('regla general: 10 años', () => { const r = assessCitizenship({ ...base }); expect(r.route).toBe('residence-10'); expect(r.status).toBe('ready'); });
  it('iberoamericano: 2 años y conserva nacionalidad', () => { const r = assessCitizenship({ ...base, origin: 'iberoamerican', residence: '2' }); expect(r.route).toBe('residence-2'); expect(r.flags).toContain('dual-keep'); expect(r.status).toBe('ready'); });
  it('faltan años', () => { const r = assessCitizenship({ ...base, residence: '5' }); expect(r.yearsLeft).toBe(5); expect(r.status).toBe('pending-years'); });
  it('cónyuge: 1 año y matrimonio inscrito', () => { const r = assessCitizenship({ ...base, situation: 'married', residence: '1' }); expect(r.route).toBe('residence-1'); expect(r.flags).toContain('marriage-registered'); });
  it('refugiado: 5 años', () => { expect(assessCitizenship({ ...base, situation: 'refugee', residence: '5' }).yearsRequired).toBe(5); });
  it('hijo de español: origen, sin residencia', () => { const r = assessCitizenship({ ...base, situation: 'spanish-parent', residence: '0' }); expect(r.status).toBe('origin'); expect(r.yearsRequired).toBe(0); });
  it('antecedentes bloquean', () => { expect(assessCitizenship({ ...base, record: false }).status).toBe('blocked'); });
  it('ausencias largas bloquean aunque haya años', () => { const r = assessCitizenship({ ...base, absences: true }); expect(r.status).toBe('blocked'); expect(r.flags).toContain('absences'); });
  it('hispanohablante exento de DELE', () => { expect(assessCitizenship({ ...base, spanish: 'exempt' }).flags).not.toContain('exams-dele'); });
});

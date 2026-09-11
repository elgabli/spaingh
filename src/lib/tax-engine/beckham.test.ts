import { describe, expect, it } from 'vitest';
import { beckhamTax, compareBeckham, standardTax } from './beckham';

describe('beckhamTax', () => {
  it('24% plano hasta 600.000€', () => {
    expect(beckhamTax(120_000)).toBeCloseTo(28_800);
  });

  it('24% + 47% del exceso por encima de 600.000€', () => {
    expect(beckhamTax(700_000)).toBeCloseTo(600_000 * 0.24 + 100_000 * 0.47);
  });
});

describe('standardTax', () => {
  it('Madrid, 120.000€ — caso verificado en producción (rescate/NOTAS-SPAINGH.md)', () => {
    // Smoke test histórico: 41.952€ IRPF vs 28.800€ Beckham, ahorro +13.152€/año.
    const r = standardTax(120_000, 'madrid');
    expect(r.cuota).toBeCloseTo(41_952, -1); // tolerancia de redondeo
  });

  it('Ceuta aplica la deducción del 60% sobre la cuota (art. 68.4 LIRPF)', () => {
    const withoutDiscount = standardTax(100_000, 'madrid'); // referencia sin descuento, solo para el orden de magnitud
    const ceuta = standardTax(100_000, 'ceuta');
    expect(ceuta.region.discount).toBe(0.6);
    expect(ceuta.cuota).toBeLessThan(withoutDiscount.cuota);
  });

  it('Navarra usa tarifa foral propia, no combina con la escala estatal', () => {
    const r = standardTax(80_000, 'navarra');
    expect(r.region.own).toBe(true);
  });
});

describe('compareBeckham', () => {
  it('120.000€ en Madrid: Beckham ahorra dinero (caso probado en producción)', () => {
    const r = compareBeckham(120_000, 'madrid');
    expect(r.annualSavings).toBeGreaterThan(0);
    expect(r.beckham).toBeCloseTo(28_800);
  });
});

// Motor de cálculo Ley Beckham vs IRPF ordinario — TypeScript puro, sin DOM.
//
// Portado el 11-sep-2026 desde el motor real en producción
// (https://spaingh.com/es/calculadora-ley-beckham/, página WordPress 10704,
// JS servido en base64+eval dentro de un widget Elementor — ese truco
// existía solo para esquivar que wptexturize/KSES mutilara el `<script>` al
// guardar por WordPress; aquí no hace falta, se elimina).
//
// Escalas IRPF 2025/26: estatal (AEAT) + 19 CCAA + forales Navarra/País
// Vasco (tarifa propia, con deducción en cuota) + Ceuta/Melilla (deducción
// del 60% art. 68.4 LIRPF). Fuentes originales investigadas por 4
// subagentes (AEAT Manual Renta 2025, BOE, DOGV, BOPA, haciendas forales) —
// ver rescate/NOTAS-SPAINGH.md. Pendiente de verificar/actualizar:
// Comunidad Valenciana bajó al 29,35% en 2026 (Ley 5/2026, retroactiva a
// 1-1-2026) — la escala de abajo es la vigente en el motor de producción a
// 11-sep-2026, no incorpora todavía ese cambio.

export type RegionKey =
  | 'andalucia' | 'aragon' | 'asturias' | 'baleares' | 'canarias' | 'cantabria'
  | 'castilla_leon' | 'castilla_mancha' | 'cataluna' | 'ceuta' | 'melilla'
  | 'extremadura' | 'galicia' | 'rioja' | 'madrid' | 'murcia' | 'valencia'
  | 'navarra' | 'pvasco';

/** [límite superior del tramo, tipo marginal] */
type ScaleBand = [number, number];

export interface Region {
  name: string;
  scale: ScaleBand[];
  /** Comunidad foral con tarifa única propia (Navarra, País Vasco) — no se
   * combina con la escala estatal. */
  own?: boolean;
  /** Deducción en cuota fija (solo forales). */
  credit?: number;
  /** Deducción proporcional sobre la cuota (Ceuta/Melilla: 0.6 = 60%). */
  discount?: number;
  note?: string;
}

export const STATE_SCALE: ScaleBand[] = [
  [12450, 0.095],
  [20200, 0.12],
  [35200, 0.15],
  [60000, 0.185],
  [300000, 0.225],
  [Infinity, 0.245],
];

export const MINIMO_PERSONAL = 5550;
export const BECKHAM_LIMIT = 600_000;
export const BECKHAM_RATE_BASE = 0.24;
export const BECKHAM_RATE_EXCESS = 0.47;

export const REGIONS: Record<RegionKey, Region> = {
  andalucia: { name: 'Andalucía', scale: [[13000, 0.095], [21100, 0.12], [35200, 0.15], [60000, 0.185], [Infinity, 0.225]] },
  aragon: { name: 'Aragón', scale: [[13072.5, 0.095], [21210, 0.12], [36960, 0.15], [52500, 0.185], [60000, 0.205], [80000, 0.23], [90000, 0.24], [130000, 0.25], [Infinity, 0.255]] },
  asturias: { name: 'Asturias', scale: [[12450, 0.09], [17707.2, 0.12], [33007.2, 0.14], [53407.2, 0.192], [70000, 0.215], [90000, 0.225], [175000, 0.25], [Infinity, 0.26]] },
  baleares: { name: 'Islas Baleares', scale: [[10000, 0.09], [18000, 0.1125], [30000, 0.1425], [48000, 0.175], [70000, 0.19], [90000, 0.2175], [120000, 0.2275], [175000, 0.2375], [Infinity, 0.2475]] },
  canarias: { name: 'Canarias', scale: [[13748, 0.09], [19422, 0.115], [35924, 0.14], [57566, 0.185], [93268, 0.235], [123745, 0.25], [Infinity, 0.26]] },
  cantabria: { name: 'Cantabria', scale: [[13000, 0.085], [21000, 0.11], [35200, 0.145], [60000, 0.18], [90000, 0.225], [Infinity, 0.245]] },
  castilla_leon: { name: 'Castilla y León', scale: [[12450, 0.09], [20200, 0.12], [35200, 0.14], [53407.2, 0.185], [Infinity, 0.215]] },
  castilla_mancha: { name: 'Castilla-La Mancha', scale: [[12450, 0.095], [20200, 0.12], [35200, 0.15], [60000, 0.185], [Infinity, 0.225]] },
  cataluna: { name: 'Cataluña', scale: [[12500, 0.095], [22000, 0.125], [33000, 0.16], [53000, 0.19], [90000, 0.215], [120000, 0.235], [175000, 0.245], [Infinity, 0.255]] },
  ceuta: { name: 'Ceuta', scale: [[12450, 0.095], [20200, 0.12], [35200, 0.15], [60000, 0.185], [Infinity, 0.225]], discount: 0.6, note: 'Deducción del 60% de la cuota íntegra (art. 68.4 LIRPF).' },
  melilla: { name: 'Melilla', scale: [[12450, 0.095], [20200, 0.12], [35200, 0.15], [60000, 0.185], [Infinity, 0.225]], discount: 0.6, note: 'Deducción del 60% de la cuota íntegra (art. 68.4 LIRPF).' },
  extremadura: { name: 'Extremadura', scale: [[12450, 0.08], [20200, 0.1], [24200, 0.16], [35200, 0.175], [60000, 0.21], [80200, 0.235], [99200, 0.24], [120200, 0.245], [Infinity, 0.25]] },
  galicia: { name: 'Galicia', scale: [[12985.35, 0.09], [21068.6, 0.1165], [35200, 0.149], [60000, 0.184], [Infinity, 0.225]] },
  rioja: { name: 'La Rioja', scale: [[12450, 0.08], [20200, 0.106], [35200, 0.136], [40000, 0.178], [50000, 0.183], [60000, 0.19], [120000, 0.245], [Infinity, 0.27]] },
  madrid: { name: 'Madrid', scale: [[13362.22, 0.085], [19004.63, 0.107], [35425.68, 0.128], [57320.4, 0.174], [Infinity, 0.205]] },
  murcia: { name: 'Murcia', scale: [[12450, 0.095], [20200, 0.112], [34000, 0.133], [60000, 0.179], [Infinity, 0.225]] },
  // Escala actualizada el 11-sep-2026 tras la Ley 5/2026 (DOGV 10-ago-2026,
  // efectos retroactivos a 1-1-2026): bajada en los 11 tramos, del 9%-29,5%
  // anterior al 8,8%-29,35% actual. Verificado con 3 fuentes independientes
  // (guiafiscal.es tabla detallada + prensa + resumen Garrigues). El motor
  // de producción de origen (WordPress, a 11-sep-2026) TODAVÍA tenía la
  // escala vieja — corregido aquí, pendiente de desplegar también en
  // producción si se sigue usando mientras dure la migración.
  valencia: { name: 'Comunidad Valenciana', scale: [[12000, 0.088], [22000, 0.117], [32000, 0.146], [42000, 0.17], [52000, 0.194], [62000, 0.219], [72000, 0.244], [100000, 0.261], [150000, 0.2735], [200000, 0.2835], [Infinity, 0.2935]] },
  navarra: { name: 'Navarra (régimen foral)', own: true, scale: [[4458, 0.13], [10030, 0.22], [21175, 0.25], [35663, 0.28], [51266, 0.365], [66869, 0.415], [89159, 0.44], [139310, 0.47], [195034, 0.49], [334344, 0.505], [Infinity, 0.52]], credit: 1084, note: 'Tarifa única foral con deducción en cuota de 1.084 €. Régimen de impatriados equivalente (24%/47%).' },
  pvasco: { name: 'País Vasco (régimen foral)', own: true, scale: [[17720, 0.23], [35440, 0.28], [53160, 0.35], [75910, 0.4], [105130, 0.45], [140130, 0.46], [204270, 0.47], [Infinity, 0.49]], credit: 1583, note: 'Tarifa foral armonizada con minoración de cuota de 1.583 €. El régimen de impatriados vasco es distinto (exención del 30%).' },
};

interface ProgressiveResult {
  tax: number;
  bands: { min: number; max: number; rate: number; amt: number; tax: number }[];
  topRate: number;
}

export function progressive(base: number, scale: ScaleBand[]): ProgressiveResult {
  let tax = 0;
  let prev = 0;
  const bands: ProgressiveResult['bands'] = [];
  for (const [limit, rate] of scale) {
    if (base <= prev) break;
    const inBand = Math.min(base, limit) - prev;
    const t = inBand * rate;
    tax += t;
    bands.push({ min: prev, max: limit, rate, amt: inBand, tax: t });
    prev = limit;
  }
  return { tax, bands, topRate: bands.length ? bands[bands.length - 1].rate : 0 };
}

export function mergedMarginal(base: number, reg: Region): number {
  let s = 0;
  let r = 0;
  for (const [limit, rate] of STATE_SCALE) {
    if (base < limit) { s = rate; break; }
  }
  for (const [limit, rate] of reg.scale) {
    if (base < limit) { r = rate; break; }
  }
  return s + r;
}

export interface MergedBand { min: number; max: number; rate: number }

/** Escala combinada (estatal + autonómica) para mostrar el desglose por tramos. */
export function mergedScale(key: RegionKey): MergedBand[] {
  const reg = REGIONS[key];
  if (reg.own) {
    return reg.scale.map(([limit, rate], i) => ({
      min: i === 0 ? 0 : reg.scale[i - 1][0],
      max: limit,
      rate,
    }));
  }
  const bounds = [...STATE_SCALE.map((b) => b[0]), ...reg.scale.map((b) => b[0])]
    .filter((b) => isFinite(b))
    .sort((a, b) => a - b);
  const out: MergedBand[] = [];
  let prev = 0;
  for (const b of bounds) {
    if (b <= prev) continue;
    out.push({ min: prev, max: b, rate: mergedMarginal(prev, reg) });
    prev = b;
  }
  out.push({ min: prev, max: Infinity, rate: mergedMarginal(prev, reg) });
  return out;
}

export interface StandardTaxResult {
  cuota: number;
  credit: number;
  region: Region;
}

/** IRPF general (estatal + autonómico), incluyendo forales y descuento Ceuta/Melilla. */
export function standardTax(income: number, key: RegionKey): StandardTaxResult {
  const reg = REGIONS[key] ?? REGIONS.madrid;
  let cuota: number;
  let credit: number;
  if (reg.own) {
    const p = progressive(income, reg.scale);
    credit = reg.credit ?? 0;
    cuota = Math.max(0, p.tax - credit);
  } else {
    const st = progressive(income, STATE_SCALE);
    const au = progressive(income, reg.scale);
    const gross = st.tax + au.tax;
    credit = MINIMO_PERSONAL * (STATE_SCALE[0][1] + reg.scale[0][1]);
    cuota = Math.max(0, gross - credit);
    if (reg.discount) cuota *= 1 - reg.discount;
  }
  return { cuota, credit, region: reg };
}

/** Régimen especial de impatriados (Ley Beckham): 24% hasta 600.000€, 47% el exceso. */
export function beckhamTax(income: number): number {
  if (income <= BECKHAM_LIMIT) return income * BECKHAM_RATE_BASE;
  return BECKHAM_LIMIT * BECKHAM_RATE_BASE + (income - BECKHAM_LIMIT) * BECKHAM_RATE_EXCESS;
}

export interface BeckhamComparison {
  standard: StandardTaxResult;
  beckham: number;
  annualSavings: number;
}

export function compareBeckham(totalIncome: number, region: RegionKey): BeckhamComparison {
  const standard = standardTax(totalIncome, region);
  const beckham = beckhamTax(totalIncome);
  return { standard, beckham, annualSavings: standard.cuota - beckham };
}

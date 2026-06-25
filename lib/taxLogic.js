/**
 * taxLogic.js — Spanish tax calculations for the calculator UI.
 *
 * THESE ARE ILLUSTRATIVE ESTIMATES, not official figures. Brackets, rates and
 * minimums change yearly and vary by comunidad autónoma. Every value marked
 * // VERIFY is yours to confirm/adjust — you're the asesor.
 *
 * Pure functions, no framework, no imports — easy to test and reuse.
 */

// ---- Rates & brackets (general/illustrative) -------------------------------
export const IVA_TIPOS = [21, 10, 4, 0]; // VERIFY current IVA rates

// Combined (state + regional default) IRPF brackets. // VERIFY for the year + comunidad
export const IRPF_TRAMOS = [
  { hasta: 12450, tipo: 19 },
  { hasta: 20200, tipo: 24 },
  { hasta: 35200, tipo: 30 },
  { hasta: 60000, tipo: 37 },
  { hasta: 300000, tipo: 45 },
  { hasta: Infinity, tipo: 47 },
];

export const SS_TRABAJADOR_PCT = 6.47;   // VERIFY worker Social Security %
export const MINIMO_PERSONAL = 5550;     // VERIFY mínimo personal
export const PAGO_FRACCIONADO_PCT = 20;  // VERIFY modelo 130 %

// ---- 1) IVA ----------------------------------------------------------------
export function calcIVA(base, tipo) {
  base = Number(base) || 0;
  tipo = Number(tipo) || 0;
  const cuota = round2(base * tipo / 100);
  return { base: round2(base), tipo, cuota, total: round2(base + cuota) };
}

// ---- 2) Autónomo: IRPF pago fraccionado (modelo 130, simplified) ----------
export function calcAutonomoTrimestre(ingresos, gastos) {
  ingresos = Number(ingresos) || 0;
  gastos = Number(gastos) || 0;
  const beneficio = ingresos - gastos;
  const pago = round2(Math.max(0, beneficio) * PAGO_FRACCIONADO_PCT / 100);
  return { ingresos: round2(ingresos), gastos: round2(gastos), beneficio: round2(beneficio), pagoFraccionado: pago };
}

// ---- 3) Gross -> net salary (annual, simplified) --------------------------
export function calcSalarioNeto(brutoAnual) {
  brutoAnual = Number(brutoAnual) || 0;
  const ss = round2(brutoAnual * SS_TRABAJADOR_PCT / 100);
  const baseImponible = Math.max(0, brutoAnual - ss - MINIMO_PERSONAL);
  const irpf = round2(irpfProgresivo(baseImponible));
  const neto = round2(brutoAnual - ss - irpf);
  return {
    brutoAnual: round2(brutoAnual),
    seguridadSocial: ss,
    irpf,
    netoAnual: neto,
    netoMensual12: round2(neto / 12),
    netoMensual14: round2(neto / 14),
    tipoEfectivo: brutoAnual ? round2(irpf / brutoAnual * 100) : 0,
  };
}

// ---- helpers ---------------------------------------------------------------
export function irpfProgresivo(base) {
  let restante = base, anterior = 0, total = 0;
  for (const tramo of IRPF_TRAMOS) {
    const ancho = tramo.hasta - anterior;
    const gravable = Math.min(restante, ancho);
    if (gravable <= 0) break;
    total += gravable * tramo.tipo / 100;
    restante -= gravable;
    anterior = tramo.hasta;
  }
  return total;
}

function round2(n) { return Math.round((Number(n) + Number.EPSILON) * 100) / 100; }

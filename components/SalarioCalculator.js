'use client';
import { useState } from 'react';
import { calcSalarioNeto, SS_TRABAJADOR_PCT } from '../lib/taxLogic';
import ExplainButton from './ExplainButton';
import { Card, Field, NumberInput, ResultBox, ResultRow, Divider } from './ui';

const fmt = (n) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);

const fmtPct = (n) => `${n.toFixed(1)}%`;

export default function SalarioCalculator() {
  const [bruto, setBruto] = useState('');

  const result = calcSalarioNeto(bruto);
  const hasResult = Number(bruto) > 0;

  return (
    <Card
      icon="💼"
      iconBg="bg-emerald-50"
      accent="emerald"
      title="Salario bruto → neto"
      subtitle="Estimación anual IRPF + Seguridad Social"
    >
      <Field label="Salario bruto anual (€)">
        <NumberInput
          value={bruto}
          onChange={(e) => setBruto(e.target.value)}
          placeholder="30 000,00"
        />
      </Field>

      {hasResult && (
        <>
          <BreakdownBar result={result} />
          <ResultBox>
            <ResultRow label="Salario bruto" value={fmt(result.brutoAnual)} />
            <ResultRow
              label={`Seg. Social trabajador (${SS_TRABAJADOR_PCT}%)`}
              value={`− ${fmt(result.seguridadSocial)}`}
              color="text-rose-600"
            />
            <ResultRow
              label={`IRPF (tipo ef. ${fmtPct(result.tipoEfectivo)})`}
              value={`− ${fmt(result.irpf)}`}
              color="text-orange-500"
            />
            <Divider />
            <ResultRow label="Neto anual" value={fmt(result.netoAnual)} bold />
            <ResultRow
              label="Neto mensual · 12 pagas"
              value={fmt(result.netoMensual12)}
              color="text-emerald-700"
            />
            <ResultRow
              label="Neto mensual · 14 pagas"
              value={fmt(result.netoMensual14)}
              color="text-emerald-700"
            />
          </ResultBox>
        </>
      )}

      {hasResult && <ExplainButton calculation={result} kind="salario bruto→neto" />}
    </Card>
  );
}

function BreakdownBar({ result }) {
  const total = result.brutoAnual;
  const netoW  = ((result.netoAnual        / total) * 100).toFixed(1);
  const ssW    = ((result.seguridadSocial  / total) * 100).toFixed(1);
  const irpfW  = ((result.irpf             / total) * 100).toFixed(1);

  return (
    <div className="space-y-2 animate-fade-in-up">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Distribución</p>
      <div className="flex h-3 rounded-full overflow-hidden">
        <div
          style={{ width: `${netoW}%` }}
          className="bg-emerald-500 transition-all duration-700"
        />
        <div
          style={{ width: `${ssW}%` }}
          className="bg-rose-400 transition-all duration-700"
        />
        <div
          style={{ width: `${irpfW}%` }}
          className="bg-orange-400 transition-all duration-700"
        />
      </div>
      <div className="flex gap-4 flex-wrap">
        {[
          { color: 'bg-emerald-500', label: 'Neto',        pct: netoW },
          { color: 'bg-rose-400',    label: 'Seg. Social', pct: ssW   },
          { color: 'bg-orange-400',  label: 'IRPF',        pct: irpfW },
        ].map(({ color, label, pct }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-sm shrink-0 ${color}`} />
            <span className="text-xs text-slate-500">
              {label} <span className="font-semibold text-slate-700">{pct}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

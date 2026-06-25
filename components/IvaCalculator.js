'use client';
import { useState } from 'react';
import { calcIVA } from '../lib/taxLogic';
import ExplainButton from './ExplainButton';
import { Card, Field, NumberInput, ResultBox, ResultRow, Divider } from './ui';

const fmt = (n) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);

export default function IvaCalculator() {
  const [base, setBase] = useState('');
  const [tipo, setTipo] = useState(21);

  const result = calcIVA(base, tipo);
  const hasResult = Number(base) > 0;

  return (
    <Card icon="🧾" iconBg="bg-amber-50" accent="amber" title="IVA" subtitle="Impuesto sobre el Valor Añadido">
      <div className="space-y-3">
        <Field label="Base imponible (€)">
          <NumberInput
            value={base}
            onChange={(e) => setBase(e.target.value)}
            placeholder="1 000,00"
          />
        </Field>
        <Field label="Tipo de IVA">
          <select
            value={tipo}
            onChange={(e) => setTipo(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-white transition appearance-none cursor-pointer"
          >
            <option value={21}>21% — General</option>
            <option value={10}>10% — Reducido</option>
            <option value={4}>4% — Superreducido</option>
            <option value={0}>0% — Exento</option>
          </select>
        </Field>
      </div>

      {hasResult && (
        <ResultBox>
          <ResultRow label="Base imponible" value={fmt(result.base)} />
          <ResultRow
            label={`Cuota IVA (${result.tipo}%)`}
            value={fmt(result.cuota)}
            color="text-rose-600"
          />
          <Divider />
          <ResultRow label="Total con IVA" value={fmt(result.total)} bold />
        </ResultBox>
      )}

      {hasResult && <ExplainButton calculation={result} kind="IVA" />}
    </Card>
  );
}

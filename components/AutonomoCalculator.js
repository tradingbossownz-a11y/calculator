'use client';
import { useState } from 'react';
import { calcAutonomoTrimestre, PAGO_FRACCIONADO_PCT } from '../lib/taxLogic';
import ExplainButton from './ExplainButton';
import { Card, Field, NumberInput, ResultBox, ResultRow, Divider } from './ui';

const fmt = (n) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);

export default function AutonomoCalculator() {
  const [ingresos, setIngresos] = useState('');
  const [gastos, setGastos] = useState('');

  const result = calcAutonomoTrimestre(ingresos, gastos);
  const hasResult = Number(ingresos) > 0;

  return (
    <Card
      icon="📊"
      iconBg="bg-blue-50"
      accent="blue"
      title="Autónomo — Modelo 130"
      subtitle="Pago fraccionado IRPF trimestral"
    >
      <div className="space-y-3">
        <Field label="Ingresos del trimestre (€)">
          <NumberInput
            value={ingresos}
            onChange={(e) => setIngresos(e.target.value)}
            placeholder="5 000,00"
          />
        </Field>
        <Field label="Gastos deducibles (€)">
          <NumberInput
            value={gastos}
            onChange={(e) => setGastos(e.target.value)}
            placeholder="1 200,00"
          />
        </Field>
      </div>

      {hasResult && (
        <ResultBox>
          <ResultRow label="Ingresos" value={fmt(result.ingresos)} />
          <ResultRow
            label="Gastos deducibles"
            value={`− ${fmt(result.gastos)}`}
            color="text-rose-600"
          />
          <Divider />
          <ResultRow
            label="Beneficio neto"
            value={fmt(result.beneficio)}
            color={result.beneficio < 0 ? 'text-rose-600' : 'text-slate-700'}
          />
          <ResultRow
            label={`Pago a Hacienda (${PAGO_FRACCIONADO_PCT}%)`}
            value={fmt(result.pagoFraccionado)}
            bold
            color="text-indigo-600"
          />
        </ResultBox>
      )}

      {hasResult && <ExplainButton calculation={result} kind="autónomo modelo 130" />}
    </Card>
  );
}

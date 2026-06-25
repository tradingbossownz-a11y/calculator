import IvaCalculator from '../components/IvaCalculator';
import AutonomoCalculator from '../components/AutonomoCalculator';
import SalarioCalculator from '../components/SalarioCalculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* ── Header ── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-950 text-white">
        {/* Decorative glow blobs */}
        <div className="absolute -top-24 -right-16 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute -top-16 left-1/3 w-64 h-64 bg-indigo-400 rounded-full blur-3xl opacity-15 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
          <div className="flex items-start gap-4">
            <span className="text-4xl sm:text-5xl leading-none select-none mt-0.5">🇪🇸</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                Calculadora Fiscal ES
              </h1>
              <p className="mt-1.5 text-indigo-300 text-sm sm:text-base">
                IVA · Autónomo (modelo 130) · Salario bruto → neto
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-purple-200 bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  ✨ Explicaciones IA · 🇳🇱 🇪🇸 🇬🇧
                </span>
                <span className="inline-flex items-center text-xs text-indigo-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  Cifras orientativas
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Calculator grid ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-start">
          <IvaCalculator />
          <AutonomoCalculator />
          <SalarioCalculator />
        </div>
      </main>

      {/* ── Footer disclaimer ── */}
      <footer className="max-w-6xl w-full mx-auto px-5 sm:px-8 pb-10 pt-2">
        <p className="text-xs text-slate-400 text-center leading-relaxed">
          Las cifras son{' '}
          <strong className="text-slate-500 font-medium">estimaciones orientativas</strong>, no
          cálculos fiscales oficiales. Los tipos, tramos y mínimos varían por año y comunidad
          autónoma. Consulta a un asesor o gestor antes de tomar decisiones fiscales.
        </p>
      </footer>
    </div>
  );
}

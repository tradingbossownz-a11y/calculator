'use client';
import { useState } from 'react';

const LANGUAGES = [
  { code: 'nl', flag: '🇳🇱', label: 'NL' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
];

export default function ExplainButton({ calculation, kind }) {
  const [lang, setLang] = useState('es');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLang = (code) => {
    setLang(code);
    setExplanation('');
    setError('');
  };

  const explain = async () => {
    setLoading(true);
    setError('');
    setExplanation('');
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ calculation, kind, language: lang }),
      });
      const data = await res.json();
      if (res.status === 503) {
        setError(
          'El explicador IA no está configurado. Añade ANTHROPIC_API_KEY a .env.local para activar esta función.'
        );
      } else if (data.error) {
        setError(data.error);
      } else {
        setExplanation(data.explanation);
      }
    } catch {
      setError('Error de conexión. Comprueba tu red e inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-4 border-t border-slate-100 space-y-3">
      <div className="flex items-center gap-2">
        {/* Language toggle */}
        <div className="flex rounded-lg border border-slate-200 overflow-hidden text-xs font-medium shrink-0">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => handleLang(l.code)}
              className={`px-2.5 py-1.5 flex items-center gap-1 transition-colors ${
                lang === l.code
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>

        {/* Explain button */}
        <button
          type="button"
          onClick={explain}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          {loading ? (
            <>
              <Spinner />
              <span>Explicando…</span>
            </>
          ) : (
            <span>✨ Explicar</span>
          )}
        </button>
      </div>

      {explanation && (
        <div className="p-3.5 bg-indigo-50 rounded-xl text-sm text-slate-700 leading-relaxed border border-indigo-100">
          {explanation}
        </div>
      )}
      {error && (
        <div className="p-3.5 bg-amber-50 rounded-xl text-sm text-amber-800 leading-relaxed border border-amber-200">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

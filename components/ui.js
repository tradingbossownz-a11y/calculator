const ACCENT_BORDER = {
  amber:   'border-t-amber-400',
  blue:    'border-t-blue-400',
  emerald: 'border-t-emerald-500',
  indigo:  'border-t-indigo-500',
};

export function Card({ icon, iconBg = 'bg-indigo-50', title, subtitle, accent = 'indigo', children }) {
  const accentClass = ACCENT_BORDER[accent] ?? 'border-t-indigo-500';
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-slate-100 border-t-4 ${accentClass} p-6 flex flex-col gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center text-xl shrink-0`}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-800 leading-tight">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export function NumberInput({ value, onChange, placeholder = '0.00', ...rest }) {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min="0"
      step="any"
      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800 text-sm placeholder-slate-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
      {...rest}
    />
  );
}

export function ResultBox({ children }) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 space-y-2 animate-fade-in-up">
      {children}
    </div>
  );
}

export function ResultRow({ label, value, bold = false, color }) {
  return (
    <div className="flex justify-between items-baseline gap-3">
      <span className={`text-sm ${bold ? 'font-semibold text-slate-800' : 'text-slate-500'} leading-snug`}>
        {label}
      </span>
      <span
        className={`text-sm font-medium tabular-nums shrink-0 ${
          color ?? (bold ? 'text-slate-900' : 'text-slate-700')
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export function Divider() {
  return <div className="border-t border-slate-200 my-0.5" />;
}

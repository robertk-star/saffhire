export default function LanguageSwitch({ locale }: { locale: 'en' | 'es' }) {
  const base = 'rounded-md px-4 py-2 text-sm font-bold';
  return (
    <div className="mt-6 flex gap-3">
      <a href="/driver-pipeline/authorization" className={locale === 'en' ? `${base} bg-green-600 text-white` : `${base} border border-slate-300 bg-white text-slate-800`}>English</a>
      <a href="/driver-pipeline/authorization/es" className={locale === 'es' ? `${base} bg-green-600 text-white` : `${base} border border-slate-300 bg-white text-slate-800`}>Spanish</a>
    </div>
  );
}

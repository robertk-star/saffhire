import type { Metadata } from 'next';
import AuthorizationForm from '../AuthorizationForm';
import LanguageSwitch from '../LanguageSwitch';

export const metadata: Metadata = {
  title: 'Autorizacion de Driver Pipeline',
  description: 'Autorizacion electronica de verificacion de antecedentes y reporte de manejo para Driver Pipeline.',
  robots: { index: false, follow: false },
};

export default function DriverPipelineSpanishAuthorizationPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <LanguageSwitch locale="es" />
        <p className="mt-6 text-sm font-bold uppercase tracking-wider text-green-600">SaffHire para Driver Pipeline</p>
        <h1 className="mt-2 text-4xl font-black text-slate-900">Autorizacion de verificacion de antecedentes y reporte de manejo</h1>
        <p className="mt-3 text-slate-600">Complete este formulario para que Driver Pipeline pueda solicitar una verificacion de antecedentes penales y un reporte de vehiculo de motor por medio de SaffHire. Su firma y la hora de envio quedan guardadas con el formulario.</p>
        <div className="mt-8">
          <AuthorizationForm locale="es" />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import AuthorizationForm from './AuthorizationForm';
import LanguageSwitch from './LanguageSwitch';

export const metadata: Metadata = {
  title: 'Driver Pipeline Authorization',
  description: 'Electronic background screening and motor vehicle report authorization for Driver Pipeline.',
  robots: { index: false, follow: false },
};

export default function DriverPipelineAuthorizationPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <LanguageSwitch locale="en" />
        <p className="mt-6 text-sm font-bold uppercase tracking-wider text-green-600">SaffHire for Driver Pipeline</p>
        <h1 className="mt-2 text-4xl font-black text-slate-900">Background check and MVR authorization</h1>
        <p className="mt-3 text-slate-600">Complete this form so Driver Pipeline can request a criminal background screening and motor vehicle report through SaffHire. Your signature and the submission time are stored with the form.</p>
        <div className="mt-8">
          <AuthorizationForm locale="en" />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AuthorizationsAdmin from '@/app/admin/authorizations/AuthorizationsAdmin';
import { hasDriverPipelineSession } from '@/lib/driverPipelinePortal';

export const metadata: Metadata = {
  title: 'Driver Pipeline Authorizations',
  robots: { index: false, follow: false },
};

export default async function DriverPipelineAuthorizationsPage() {
  const signedIn = await hasDriverPipelineSession();
  if (!signedIn) redirect('/driver-pipeline/login');

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-green-600">Driver Pipeline</p>
            <h1 className="text-4xl font-black text-slate-900">Completed authorizations</h1>
            <p className="mt-2 text-gray-600">Search by name and download the signed PDF. This login only opens Driver Pipeline authorizations.</p>
          </div>
          <form action="/api/driver-pipeline/logout" method="post">
            <button className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">Log Out</button>
          </form>
        </div>
        <AuthorizationsAdmin listPath="/api/driver-pipeline/authorizations" pdfPath="/api/driver-pipeline/authorizations" />
      </div>
    </main>
  );
}

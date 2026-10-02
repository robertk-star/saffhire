import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AuthorizationsAdmin from '@/app/admin/authorizations/AuthorizationsAdmin';
import { getDriverPipelineSession, isPortalAdmin } from '@/lib/driverPipelinePortal';

export const metadata: Metadata = {
  title: 'Driver Pipeline Authorizations',
  robots: { index: false, follow: false },
};

export default async function DriverPipelineAuthorizationsPage() {
  const session = await getDriverPipelineSession();
  if (!session) redirect('/driver-pipeline/login');

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-green-600">Driver Pipeline</p>
            <h1 className="text-4xl font-black text-slate-900">Completed authorizations</h1>
            <p className="mt-2 text-gray-600">Search by name and download the signed PDF. Downloads are logged with the signed-in user and time.</p>
          </div>
          <div className="flex gap-3">
            <a href="/driver-pipeline/admin/log" className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700">{isPortalAdmin(session) ? 'Access log' : 'My log'}</a>
            {isPortalAdmin(session) ? <a href="/driver-pipeline/admin" className="rounded-md bg-slate-900 px-5 py-3 text-sm font-bold text-white">Admin</a> : null}
            <form action="/api/driver-pipeline/logout" method="post">
              <button className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">Log Out</button>
            </form>
          </div>
        </div>
        <AuthorizationsAdmin listPath="/api/driver-pipeline/authorizations" pdfPath="/api/driver-pipeline/authorizations" />
      </div>
    </main>
  );
}

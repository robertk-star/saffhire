import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AccessLog from './AccessLog';
import { getDriverPipelineSession, isPortalAdmin } from '@/lib/driverPipelinePortal';

export const metadata: Metadata = {
  title: 'Driver Pipeline Access Log',
  robots: { index: false, follow: false },
};

export default async function DriverPipelineAccessLogPage() {
  const session = await getDriverPipelineSession();
  if (!session) redirect('/driver-pipeline/login');
  if (!isPortalAdmin(session)) redirect('/driver-pipeline/authorizations');

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-green-600">Driver Pipeline</p>
            <h1 className="text-4xl font-black text-slate-900">Access log</h1>
            <p className="mt-2 text-gray-600">Who opened the list or downloaded a form, and when. Times are Central.</p>
          </div>
          <div className="flex gap-3">
            <a href="/driver-pipeline/admin" className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700">Admin</a>
            <a href="/driver-pipeline/authorizations" className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700">Authorizations</a>
          </div>
        </div>
        <AccessLog />
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import PortalAdmin from './PortalAdmin';
import { getDriverPipelineSession, isPortalAdmin } from '@/lib/driverPipelinePortal';

export const metadata: Metadata = {
  title: 'Driver Pipeline Portal Admin',
  robots: { index: false, follow: false },
};

export default async function DriverPipelineAdminPage() {
  const session = await getDriverPipelineSession();
  if (!session) redirect('/driver-pipeline/login');
  if (!isPortalAdmin(session)) redirect('/driver-pipeline/authorizations');

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-green-600">Driver Pipeline</p>
            <h1 className="text-4xl font-black text-slate-900">Portal admin</h1>
            <p className="mt-2 text-gray-600">Signed in as {session.displayName}. Create admins and users, and review who accessed applicant information.</p>
          </div>
          <div className="flex gap-3">
            <a href="/driver-pipeline/authorizations" className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700">Authorizations</a>
            <form action="/api/driver-pipeline/logout" method="post">
              <button className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700">Log Out</button>
            </form>
          </div>
        </div>
        <PortalAdmin />
      </div>
    </main>
  );
}

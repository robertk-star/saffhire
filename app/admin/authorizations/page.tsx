import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AuthorizationsAdmin from './AuthorizationsAdmin';
import { hasAdminPermission } from '@/lib/adminAuth';

export const metadata: Metadata = {
  title: 'Driver Pipeline Authorizations | SaffHire Admin',
  robots: { index: false, follow: false },
};

export default async function AdminAuthorizationsPage() {
  const canView = await hasAdminPermission('authorizations');
  if (!canView) redirect('/admin/login');

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-green-600">SaffHire Admin</p>
            <h1 className="text-4xl font-black text-slate-900">Driver Pipeline authorizations</h1>
            <p className="mt-2 text-gray-600">Search completed forms and download the signed PDF. Social Security numbers are masked in this list.</p>
          </div>
          <div className="flex gap-3">
            <a href="/admin" className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">Admin Home</a>
            <form action="/api/admin/logout" method="post">
              <button className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">Log Out</button>
            </form>
          </div>
        </div>
        <AuthorizationsAdmin />
      </div>
    </main>
  );
}

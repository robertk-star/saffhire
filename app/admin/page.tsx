import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminSessionDetails } from '@/lib/adminAuth';
import { adminPermissionOptions } from '@/lib/adminUsers';

export const metadata: Metadata = {
  title: 'SaffHire Admin',
  robots: { index: false, follow: false },
};

export default async function AdminHomePage() {
  const session = await getAdminSessionDetails();
  if (!session) redirect('/admin/login');

  const visibleTools = adminPermissionOptions.filter((tool) => session.role === 'admin' || session.permissions?.includes(tool.key));

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-green-600">SaffHire Admin</p>
            <h1 className="text-4xl font-black text-slate-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Choose the tool you want to open.</p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">Log Out</button>
          </form>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTools.map((tool) => (
            <a key={tool.key} href={tool.href} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-xl font-black text-slate-900">{tool.label}</div>
              <div className="mt-2 text-sm text-slate-500">Open {tool.label}</div>
              <div className="mt-5 inline-flex rounded-md bg-green-500 px-4 py-2 text-sm font-bold text-white">Open</div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

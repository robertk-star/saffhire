import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AdminUsersManager from '@/components/AdminUsersManager';
import { hasAdminPermission } from '@/lib/adminAuth';
import { getAdminUsers } from '@/lib/adminUsers';

export const metadata: Metadata = {
  title: 'Admin Users | SaffHire Admin',
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; updated?: string; error?: string }>;
}) {
  if (!(await hasAdminPermission('users'))) redirect('/admin/login');

  const params = await searchParams;
  const users = await getAdminUsers();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-green-600">SaffHire Admin</p>
            <h1 className="text-4xl font-black text-slate-900">Admin Users</h1>
            <p className="mt-2 text-gray-600">Create users, edit accounts, and choose which admin tools they can see.</p>
          </div>
          <a href="/admin" className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">Back to Admin</a>
        </div>

        {params.created ? <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">User created.</div> : null}
        {params.updated ? <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">User updated.</div> : null}
        {params.error ? <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{decodeURIComponent(params.error)}</div> : null}

        <AdminUsersManager initialUsers={users} />
      </div>
    </main>
  );
}

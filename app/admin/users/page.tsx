import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { hasAdminPermission } from '@/lib/adminAuth';
import { adminPermissionOptions, getAdminUsers } from '@/lib/adminUsers';

export const metadata: Metadata = {
  title: 'Admin Users | SaffHire Admin',
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ created?: string; error?: string }> }) {
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
            <p className="mt-2 text-gray-600">Create users and choose which admin tools they can see.</p>
          </div>
          <a href="/admin" className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">Back to Admin</a>
        </div>

        {params.created ? <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">User created.</div> : null}
        {params.error ? <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{decodeURIComponent(params.error)}</div> : null}

        <form action="/api/admin/users" method="post" className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Add user</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">Username</span>
              <input name="username" required className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">Display name</span>
              <input name="display_name" className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">Password</span>
              <input name="password" type="password" required minLength={8} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
            </label>
          </div>

          <div className="mt-5">
            <p className="mb-3 text-sm font-bold text-slate-700">What can this user see?</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {adminPermissionOptions.filter((option) => option.key !== 'users').map((option) => (
                <label key={option.key} className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm">
                  <input type="checkbox" name="permissions" value={option.key} className="h-4 w-4" />
                  {option.label}
                </label>
              ))}
              <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm">
                <input type="checkbox" name="permissions" value="users" className="h-4 w-4" />
                Admin Users
              </label>
            </div>
          </div>

          <button className="mt-6 rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600">Create user</button>
        </form>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-5 py-4 text-left">Username</th>
                <th className="px-5 py-4 text-left">Name</th>
                <th className="px-5 py-4 text-left">Permissions</th>
                <th className="px-5 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-500">No users created yet.</td></tr>
              ) : users.map((user) => (
                <tr key={user.id} className="border-t border-gray-100">
                  <td className="px-5 py-4 font-bold text-slate-900">{user.username}</td>
                  <td className="px-5 py-4 text-slate-600">{user.display_name || '-'}</td>
                  <td className="px-5 py-4 text-slate-600">{user.permissions.join(', ') || 'None'}</td>
                  <td className="px-5 py-4 text-slate-600">{user.is_active ? 'Active' : 'Inactive'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { adminPermissionOptions, type AdminUser } from '@/lib/adminUsers';

export default function AdminUsersManager({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <form action="/api/admin/users" method="post" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
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
            {adminPermissionOptions.map((option) => (
              <label key={option.key} className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm">
                <input type="checkbox" name="permissions" value={option.key} className="h-4 w-4" />
                {option.label}
              </label>
            ))}
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
              <th className="px-5 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-gray-500">No users created yet.</td>
              </tr>
            ) : (
              initialUsers.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  isEditing={editingId === user.id}
                  onEdit={() => setEditingId(user.id)}
                  onCancel={() => setEditingId(null)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserRow({
  user,
  isEditing,
  onEdit,
  onCancel,
}: {
  user: AdminUser;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
}) {
  if (isEditing) {
    return (
      <tr className="border-t border-gray-100 bg-slate-50">
        <td colSpan={5} className="px-5 py-5">
          <form action={`/api/admin/users/${user.id}`} method="post" className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-black text-slate-900">Edit user</h3>
              <button type="button" onClick={onCancel} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-gray-50">
                Cancel
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">Username</span>
                <input name="username" defaultValue={user.username} required className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">Display name</span>
                <input name="display_name" defaultValue={user.display_name || ''} className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">New password</span>
                <input name="password" type="password" minLength={8} className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm" placeholder="Leave blank to keep current" />
              </label>
            </div>

            <div>
              <p className="mb-3 text-sm font-bold text-slate-700">Permissions</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {adminPermissionOptions.map((option) => (
                  <label key={option.key} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm">
                    <input
                      type="checkbox"
                      name="permissions"
                      value={option.key}
                      defaultChecked={user.permissions.includes(option.key)}
                      className="h-4 w-4"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm">
              <input type="checkbox" name="is_active" value="true" defaultChecked={user.is_active} className="h-4 w-4" />
              Account is active
            </label>

            <button className="rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600">Save changes</button>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-t border-gray-100">
      <td className="px-5 py-4 font-bold text-slate-900">{user.username}</td>
      <td className="px-5 py-4 text-slate-600">{user.display_name || '-'}</td>
      <td className="px-5 py-4 text-slate-600">{user.permissions.join(', ') || 'None'}</td>
      <td className="px-5 py-4 text-slate-600">{user.is_active ? 'Active' : 'Inactive'}</td>
      <td className="px-5 py-4">
        <button type="button" onClick={onEdit} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-gray-50">
          Edit
        </button>
      </td>
    </tr>
  );
}

'use client';

import { FormEvent, useEffect, useState } from 'react';

type User = { id: string; username: string; display_name: string | null; email: string; role: string; is_active: boolean; created_at: string; last_login_at: string | null };
type Log = { id: string; username: string; display_name: string | null; role: string | null; action: string; authorization_id: string | null; ip_address: string | null; created_at: string };

export default function PortalAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [accessLog, setAccessLog] = useState<Log[]>([]);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({ username: '', displayName: '', email: '', role: 'user' });

  async function load() {
    const response = await fetch('/api/driver-pipeline/admin');
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(data.error || 'Unable to load portal admin.');
      return;
    }
    setUsers(data.users || []);
    setAccessLog(data.accessLog || []);
  }

  useEffect(() => { load(); }, []);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    setError('');
    setNotice('');
    const response = await fetch('/api/driver-pipeline/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(data.error || 'Unable to create user.');
      return;
    }
    setNotice(data.invited ? `Invite emailed to ${data.user.email}. Temporary password, if the email is delayed: ${data.temporaryPassword}` : `Email is not configured, so share this password with ${data.user.email} directly: ${data.temporaryPassword}`);
    setForm({ username: '', displayName: '', email: '', role: 'user' });
    load();
  }

  async function setActive(userId: string, isActive: boolean) {
    await fetch('/api/driver-pipeline/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'status', userId, isActive }),
    });
    load();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={onCreate} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">Create or invite a user</h2>
        <p className="mt-2 text-sm text-slate-600">Give Wes the Admin role so he can add people who can view and download authorizations. The invite and temporary password are emailed only to that person.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-bold text-slate-800">Name
            <input required value={form.displayName} onChange={(event) => setForm({ ...form, displayName: event.target.value })} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-normal" />
          </label>
          <label className="text-sm font-bold text-slate-800">Username
            <input required value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-normal" />
          </label>
          <label className="text-sm font-bold text-slate-800">Email
            <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-normal" />
          </label>
          <label className="text-sm font-bold text-slate-800">Access
            <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-normal">
              <option value="user">Can view and download</option>
              <option value="admin">Admin, can invite users</option>
            </select>
          </label>
        </div>
        <button className="mt-4 rounded-md bg-green-600 px-5 py-3 text-sm font-bold text-white">Create and invite</button>
        {notice ? <p className="mt-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-800">{notice}</p> : null}
        {error ? <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p> : null}
      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <h2 className="px-4 py-3 text-lg font-black text-slate-900">Users</h2>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600"><tr><th className="px-4 py-3">User</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Last login</th><th className="px-4 py-3">Status</th></tr></thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-100">
                <td className="px-4 py-3"><div className="font-bold">{user.display_name}</div><div className="text-slate-500">{user.username} · {user.email}</div></td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">{user.last_login_at ? new Date(user.last_login_at).toLocaleString('en-US', { timeZone: 'America/Chicago' }) : 'Never'}</td>
                <td className="px-4 py-3"><button className="font-bold text-green-700 underline" onClick={() => setActive(user.id, !user.is_active)}>{user.is_active ? 'Active' : 'Inactive'}</button></td>
              </tr>
            ))}
            {users.length === 0 ? <tr><td className="px-4 py-6 text-slate-500" colSpan={4}>No invited users yet.</td></tr> : null}
          </tbody>
        </table>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <h2 className="px-4 py-3 text-lg font-black text-slate-900">Access log</h2>
        <p className="px-4 pb-3 text-sm text-slate-500">Who opened the list or downloaded a form, and when. Times are Central.</p>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600"><tr><th className="px-4 py-3">When</th><th className="px-4 py-3">Who</th><th className="px-4 py-3">Action</th><th className="px-4 py-3">IP</th></tr></thead>
          <tbody>
            {accessLog.map((entry) => (
              <tr key={entry.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{new Date(entry.created_at).toLocaleString('en-US', { timeZone: 'America/Chicago' })}</td>
                <td className="px-4 py-3">{entry.display_name || entry.username} <span className="text-slate-400">({entry.role})</span></td>
                <td className="px-4 py-3">{entry.action.replaceAll('_', ' ')}{entry.authorization_id ? ` · ${entry.authorization_id.slice(0, 8)}` : ''}</td>
                <td className="px-4 py-3">{entry.ip_address || ''}</td>
              </tr>
            ))}
            {accessLog.length === 0 ? <tr><td className="px-4 py-6 text-slate-500" colSpan={4}>No access recorded yet.</td></tr> : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

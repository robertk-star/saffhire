'use client';

import { useEffect, useState } from 'react';

type Log = { id: string; username: string; display_name: string | null; role: string | null; action: string; authorization_id: string | null; ip_address: string | null; created_at: string };

export default function AccessLog() {
  const [accessLog, setAccessLog] = useState<Log[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/driver-pipeline/log')
      .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          setError(data.error || 'Unable to load the access log.');
          return;
        }
        setAccessLog(data.accessLog || []);
      });
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {error ? <p className="px-4 py-3 text-sm font-bold text-red-700">{error}</p> : null}
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
          {accessLog.length === 0 && !error ? <tr><td className="px-4 py-6 text-slate-500" colSpan={4}>No access recorded yet.</td></tr> : null}
        </tbody>
      </table>
    </div>
  );
}

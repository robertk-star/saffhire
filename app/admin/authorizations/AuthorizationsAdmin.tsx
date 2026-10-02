'use client';

import { useEffect, useState } from 'react';

type Row = {
  id: string;
  reference_code: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  phone: string | null;
  issuing_state: string;
  ssn_last4: string;
  signed_at: string;
};

export default function AuthorizationsAdmin() {
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handle = setTimeout(async () => {
      setLoading(true);
      const response = await fetch(`/api/admin/authorizations?q=${encodeURIComponent(query)}`);
      const data = await response.json().catch(() => ({}));
      setLoading(false);
      if (!response.ok) {
        setError(data.error || 'Unable to load authorizations.');
        return;
      }
      setError('');
      setRows(data.rows || []);
    }, 250);
    return () => clearTimeout(handle);
  }, [query]);

  return (
    <div>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by first name, last name, email, or reference"
        className="w-full rounded-md border border-slate-300 bg-white px-4 py-3"
      />
      {error ? <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p> : null}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Signed</th>
              <th className="px-4 py-3">License</th>
              <th className="px-4 py-3">SSN</th>
              <th className="px-4 py-3">PDF</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100">
                <td className="px-4 py-3">
                  <div className="font-bold text-slate-900">{row.last_name}, {row.first_name} {row.middle_name || ''}</div>
                  <div className="text-slate-500">{row.email}{row.phone ? ` · ${row.phone}` : ''}</div>
                  <div className="text-xs text-slate-400">{row.reference_code}</div>
                </td>
                <td className="px-4 py-3">{new Date(row.signed_at).toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT</td>
                <td className="px-4 py-3">{row.issuing_state}</td>
                <td className="px-4 py-3">***-**-{row.ssn_last4}</td>
                <td className="px-4 py-3">
                  <a className="font-bold text-green-700 underline" href={`/api/admin/authorizations/${row.id}/pdf`}>Download</a>
                </td>
              </tr>
            ))}
            {!loading && rows.length === 0 ? (
              <tr><td className="px-4 py-8 text-slate-500" colSpan={5}>No completed authorizations match that search.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

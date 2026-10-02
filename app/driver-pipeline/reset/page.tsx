import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Driver Pipeline Password',
  robots: { index: false, follow: false },
};

export default async function DriverPipelineResetPage({ searchParams }: { searchParams: Promise<{ token?: string; error?: string }> }) {
  const params = await searchParams;
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <form action="/api/driver-pipeline/reset/confirm" method="post" className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <p className="text-sm font-bold uppercase tracking-wider text-green-600 mb-3">Driver Pipeline</p>
        <h1 className="text-3xl font-black text-slate-900 mb-3">Set a new password</h1>
        <p className="text-gray-600 mb-6">Choose a password with at least 8 characters.</p>
        {params.error ? <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">This reset link is invalid or expired. Request a new one from the login page.</div> : null}
        <input type="hidden" name="token" value={params.token || ''} />
        <label className="block text-sm font-bold text-gray-700 mb-2">New password</label>
        <input type="password" name="password" minLength={8} required className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
        <button type="submit" className="mt-6 w-full rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white">Save password</button>
      </form>
    </main>
  );
}

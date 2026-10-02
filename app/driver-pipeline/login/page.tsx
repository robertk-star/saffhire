import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Driver Pipeline Login',
  robots: { index: false, follow: false },
};

export default async function DriverPipelineLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const hasError = params.error === '1';
  const missingConfig = params.error === 'config';

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <form action="/api/driver-pipeline/login" method="post" className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <p className="text-sm font-bold uppercase tracking-wider text-green-600 mb-3">Driver Pipeline</p>
        <h1 className="text-3xl font-black text-slate-900 mb-3">Authorization portal</h1>
        <p className="text-gray-600 mb-6">Log in to search completed authorizations and download signed PDFs.</p>
        {hasError ? (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Invalid login. Please try again.
          </div>
        ) : null}
        {missingConfig ? (
          <div className="mb-4 rounded-md border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800">
            This portal is not configured yet.
          </div>
        ) : null}
        <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
        <input
          type="text"
          name="username"
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
          autoComplete="username"
          required
        />
        <label className="mt-4 block text-sm font-bold text-gray-700 mb-2">Password</label>
        <input
          type="password"
          name="password"
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
          autoComplete="current-password"
          required
        />
        <button type="submit" className="mt-6 w-full rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600">
          Log In
        </button>
      </form>
    </main>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SaffHire App Links',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const appLinks = [
  {
    name: 'Monitoring App',
    description: 'SaffHire monitoring dashboard and safety performance tools.',
    href: 'https://monitoring-beta-one.vercel.app/',
    status: 'Beta',
  },
];

export default function AdminAppsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-green-700">Admin Tools</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">SaffHire App Links</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Internal link page for the apps being built for SaffHire. This page is set to noindex and nofollow.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {appLinks.map((app) => (
            <a
              key={app.href}
              href={app.href}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">{app.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{app.description}</p>
                </div>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 ring-1 ring-green-200">
                  {app.status}
                </span>
              </div>
              <div className="mt-5 text-sm font-bold text-green-700">Open app →</div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

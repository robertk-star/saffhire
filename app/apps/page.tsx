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

const apps = [
  {
    name: 'Monitoring App',
    description: 'SaffHire monitoring dashboard and safety performance tools.',
    url: 'https://monitoring-beta-one.vercel.app/',
  },
];

export default function AppsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-green-700">SaffHire</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">App Links</h1>
          <p className="mt-2 text-sm text-slate-600">
            Internal list of apps being built for SaffHire. This page is set to noindex and nofollow.
          </p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {apps.map((app) => (
            <a
              key={app.url}
              href={app.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-green-300 hover:shadow-md"
            >
              <h2 className="text-xl font-black text-slate-900">{app.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{app.description}</p>
              <div className="mt-5 text-sm font-bold text-green-700">Open app →</div>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}

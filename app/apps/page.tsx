import type { Metadata } from 'next';
import { appLinkCategories, getAppLinks } from '../../lib/appLinks';
import { getAdminSession } from '../../lib/adminAuth';

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

export const dynamic = 'force-dynamic';

export default async function AppsPage({ searchParams }: { searchParams?: Promise<{ error?: string; saved?: string; deleted?: string }> }) {
  const [result, isAdmin, params] = await Promise.all([
    getAppLinks(),
    getAdminSession(),
    searchParams || Promise.resolve({}),
  ]);

  const linksByCategory = appLinkCategories.map((category) => ({
    category,
    links: result.links.filter((link) => link.category === category),
  }));

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-green-700">SaffHire</p>
              <h1 className="mt-2 text-3xl font-black text-slate-900">App Links</h1>
              <p className="mt-2 text-sm text-slate-600">
                Internal list of apps being built. This page is set to noindex and nofollow.
              </p>
              {!isAdmin ? (
                <p className="mt-4 text-sm text-slate-500">
                  To add or delete links, log in at <a className="font-bold text-green-700 hover:underline" href="/admin/login">Admin Login</a>, then come back to this page.
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/apps/add"
                className="inline-flex rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600"
              >
                Add Links
              </a>
              {!isAdmin ? (
                <a
                  href="/admin/login"
                  className="inline-flex rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Admin Login
                </a>
              ) : null}
            </div>
          </div>
        </section>

        {result.usingFallback ? (
          <section className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-bold">Database table is not ready yet.</p>
            <p>{result.errorMessage || 'Run the app_links SQL migration in Supabase.'}</p>
          </section>
        ) : null}

        {params?.error ? (
          <section className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {params.error}
          </section>
        ) : null}

        {params?.saved ? (
          <section className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            Link saved.
          </section>
        ) : null}

        {params?.deleted ? (
          <section className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            Link deleted.
          </section>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {linksByCategory.map(({ category, links }) => (
            <section key={category} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-black text-slate-900">{category}</h2>
                <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500 ring-1 ring-slate-200">
                  {links.length} {links.length === 1 ? 'link' : 'links'}
                </span>
              </div>

              {links.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                  No links added yet.
                </div>
              ) : (
                <div className="grid gap-3">
                  {links.map((app) => (
                    <a
                      key={app.id}
                      href={app.url}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="block rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-green-300 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-black text-slate-900">{app.name}</h3>
                          {app.description ? <p className="mt-1 line-clamp-1 text-sm text-slate-600">{app.description}</p> : null}
                        </div>
                        <span className="shrink-0 text-lg font-black text-green-700">→</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

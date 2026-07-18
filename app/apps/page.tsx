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
      <div className="mx-auto max-w-5xl">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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

        {isAdmin ? (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">Add app link</h2>
            <form action="/api/admin/app-links" method="post" className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">Category</span>
                <select name="category" className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm" required>
                  {appLinkCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">Name</span>
                <input name="name" className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm" required placeholder="Example: Monitoring App" />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-bold text-slate-700">URL</span>
                <input name="url" type="url" className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm" required placeholder="https://example.vercel.app/" />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-bold text-slate-700">Description</span>
                <input name="description" className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm" placeholder="Short note about what this app does" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">Sort order</span>
                <input name="sort_order" type="number" defaultValue="100" className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm" />
              </label>
              <div className="flex items-end">
                <button className="rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600">
                  Add link
                </button>
              </div>
            </form>
          </section>
        ) : null}

        <div className="mt-8 grid gap-8">
          {linksByCategory.map(({ category, links }) => (
            <section key={category}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">{category}</h2>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 ring-1 ring-slate-200">
                  {links.length} {links.length === 1 ? 'link' : 'links'}
                </span>
              </div>

              {links.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
                  No links added yet.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {links.map((app) => (
                    <article key={app.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <a
                        href={app.url}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="block transition hover:text-green-700"
                      >
                        <h3 className="text-xl font-black text-slate-900">{app.name}</h3>
                        {app.description ? <p className="mt-2 text-sm leading-6 text-slate-600">{app.description}</p> : null}
                        <div className="mt-5 text-sm font-bold text-green-700">Open app →</div>
                      </a>

                      {isAdmin ? (
                        <form action="/api/admin/app-links/delete" method="post" className="mt-4 border-t border-slate-100 pt-4">
                          <input type="hidden" name="id" value={app.id} />
                          <button className="text-sm font-bold text-red-600 hover:underline">
                            Delete link
                          </button>
                        </form>
                      ) : null}
                    </article>
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

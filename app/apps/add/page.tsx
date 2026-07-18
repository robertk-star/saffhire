import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { appLinkCategories, getAppLinks } from '../../../lib/appLinks';
import { getAdminSession } from '../../../lib/adminAuth';

export const metadata: Metadata = {
  title: 'Manage App Links',
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

export default async function AddAppLinkPage() {
  const isAdmin = await getAdminSession();
  if (!isAdmin) redirect('/admin/login');

  const result = await getAppLinks();
  const linksByCategory = appLinkCategories.map((category) => ({
    category,
    links: result.links.filter((link) => link.category === category),
  }));

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-green-700">SaffHire</p>
              <h1 className="mt-2 text-3xl font-black text-slate-900">Manage App Links</h1>
              <p className="mt-2 text-sm text-slate-600">
                Add new shared links or remove links from the app links page.
              </p>
            </div>
            <a
              href="/apps"
              className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Back to Links
            </a>
          </div>
        </section>

        {result.usingFallback ? (
          <section className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-bold">Database table is not ready yet.</p>
            <p>{result.errorMessage || 'Run the app_links SQL migration in Supabase.'}</p>
          </section>
        ) : null}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Add new link</h2>
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
            <div className="flex items-end gap-3">
              <button className="rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600">
                Add link
              </button>
              <a href="/apps" className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
                Cancel
              </a>
            </div>
          </form>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Delete existing link</h2>
          <p className="mt-2 text-sm text-slate-600">Select the link you want to remove. This deletes it from Supabase and from the shared links page.</p>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {linksByCategory.map(({ category, links }) => (
              <div key={category} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-black text-slate-900">{category}</h3>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 ring-1 ring-slate-200">
                    {links.length}
                  </span>
                </div>

                {links.length === 0 ? (
                  <p className="text-sm text-slate-500">No links in this category.</p>
                ) : (
                  <div className="space-y-2">
                    {links.map((app) => (
                      <form key={app.id} action="/api/admin/app-links/delete" method="post" className="rounded-lg border border-slate-200 bg-white p-3">
                        <input type="hidden" name="id" value={app.id} />
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-black text-slate-900">{app.name}</p>
                            <p className="truncate text-xs text-slate-500">{app.url}</p>
                          </div>
                          <button className="shrink-0 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100">
                            Delete
                          </button>
                        </div>
                      </form>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

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

export default async function AddAppLinkPage({ searchParams }: { searchParams?: Promise<{ error?: string; saved?: string; deleted?: string; updated?: string }> }) {
  const [isAdmin, result, params] = await Promise.all([
    getAdminSession(),
    getAppLinks(),
    searchParams || Promise.resolve({}),
  ]);

  if (!isAdmin) redirect('/admin/login');

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-green-700">SaffHire</p>
              <h1 className="mt-2 text-3xl font-black text-slate-900">Manage App Links</h1>
              <p className="mt-2 text-sm text-slate-600">
                Add, edit, delete, and reorder shared app links. Changes save in Supabase and show on other devices.
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

        {params?.updated ? (
          <section className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            Link updated.
          </section>
        ) : null}

        {params?.deleted ? (
          <section className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            Link deleted.
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
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Edit existing links</h2>
              <p className="mt-1 text-sm text-slate-600">Lower sort numbers show first. Example: 10 appears before 100.</p>
            </div>
            <span className="text-sm font-bold text-slate-500">{result.links.length} total links</span>
          </div>

          {result.usingFallback ? (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <p className="font-bold">Database table is not ready yet.</p>
              <p>{result.errorMessage || 'Run the app_links SQL migration in Supabase.'}</p>
            </div>
          ) : null}

          <div className="mt-5 grid gap-4">
            {result.links.map((link) => (
              <form key={link.id} action="/api/admin/app-links/update" method="post" className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <input type="hidden" name="id" value={link.id} />
                <div className="grid gap-3 lg:grid-cols-[150px_1fr_1fr_110px]">
                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Category</span>
                    <select name="category" defaultValue={link.category} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" required>
                      {appLinkCategories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Name</span>
                    <input name="name" defaultValue={link.name} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" required />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">URL</span>
                    <input name="url" type="url" defaultValue={link.url} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" required />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Order</span>
                    <input name="sort_order" type="number" defaultValue={link.sort_order} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
                  </label>
                  <label className="block lg:col-span-4">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Description</span>
                    <input name="description" defaultValue={link.description || ''} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
                  </label>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">
                    Save changes
                  </button>
                  <button formAction="/api/admin/app-links/delete" className="rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50">
                    Delete link
                  </button>
                </div>
              </form>
            ))}

            {result.links.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                No links have been added yet.
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}

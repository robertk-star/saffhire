import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { appLinkCategories } from '../../../lib/appLinks';
import { getAdminSession } from '../../../lib/adminAuth';

export const metadata: Metadata = {
  title: 'Add App Link',
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

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-green-700">SaffHire</p>
              <h1 className="mt-2 text-3xl font-black text-slate-900">Add App Link</h1>
              <p className="mt-2 text-sm text-slate-600">
                Add a link to the shared app links page. New links are saved in Supabase and will show on other devices.
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

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">New link</h2>
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
      </div>
    </main>
  );
}

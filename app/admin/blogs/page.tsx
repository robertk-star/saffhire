import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminSession, isAdminConfigured } from '@/lib/adminAuth';
import { getBlogDrafts } from '@/lib/blogDrafts';

export const metadata: Metadata = {
  title: 'Blog Drafts Admin',
  robots: { index: false, follow: false },
};

function statusBadge(status: string) {
  const colors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    pending_review: 'bg-yellow-100 text-yellow-800',
    changes_requested: 'bg-orange-100 text-orange-800',
    approved: 'bg-blue-100 text-blue-800',
    published: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };
  return colors[status] || colors.draft;
}

export default async function BlogAdminPage() {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) redirect('/admin/login');

  const drafts = await getBlogDrafts();
  const configured = isAdminConfigured();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-green-600 mb-2">SaffHire Admin</p>
            <h1 className="text-4xl font-black text-slate-900">Blog Drafts</h1>
            <p className="text-gray-600 mt-2">Review, approve, and publish blog drafts.</p>
          </div>
          <div className="flex gap-3">
            <a href="/admin/blogs/new" className="rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600">
              New Draft
            </a>
            <form action="/api/admin/logout" method="post">
              <button className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">
                Log Out
              </button>
            </form>
          </div>
        </div>

        {!configured ? (
          <div className="mb-6 rounded-xl border border-orange-200 bg-orange-50 p-5 text-sm text-orange-800">
            Admin environment variables are not fully configured. Required: ADMIN_PASSWORD, ADMIN_SESSION_SECRET, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
          </div>
        ) : null}

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="text-left px-5 py-4">Title</th>
                <th className="text-left px-5 py-4">Status</th>
                <th className="text-left px-5 py-4">Updated</th>
                <th className="text-left px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {drafts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-gray-500">
                    No blog drafts yet. Create a new draft to start the approval workflow.
                  </td>
                </tr>
              ) : (
                drafts.map((draft) => (
                  <tr key={draft.id} className="border-t border-gray-100">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900">{draft.title}</div>
                      <div className="text-xs text-gray-500">/{draft.slug}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusBadge(draft.status)}`}>
                        {draft.status.replaceAll('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {new Date(draft.updated_at).toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <a href={`/admin/blogs/${draft.id}`} className="text-green-700 font-bold hover:underline">
                        Review
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

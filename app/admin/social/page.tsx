import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/adminAuth';
import { getPublishedBlogOptions, getSocialPostDrafts, platformLabel } from '@/lib/socialPostDrafts';

export const metadata: Metadata = {
  title: 'Social Post Drafts',
  robots: { index: false, follow: false },
};

function statusBadge(status: string) {
  const colors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    approved: 'bg-green-100 text-green-800',
    sent_to_publer: 'bg-blue-100 text-blue-800',
    scheduled: 'bg-purple-100 text-purple-800',
    failed: 'bg-red-100 text-red-800',
    rejected: 'bg-orange-100 text-orange-800',
  };
  return colors[status] || colors.draft;
}

export default async function SocialDraftsPage() {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) redirect('/admin/login');

  const blogs = await getPublishedBlogOptions();
  const drafts = await getSocialPostDrafts();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-green-600 mb-2">SaffHire Admin</p>
            <h1 className="text-4xl font-black text-slate-900">Blog Social Posts</h1>
            <p className="text-gray-600 mt-2">Generate, edit, and approve social media drafts from published blogs.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <form action="/api/admin/social/generate-missing-image" method="post">
              <button className="rounded-md bg-blue-500 px-5 py-3 text-sm font-bold text-white hover:bg-blue-600">
                Generate Missing AI Image
              </button>
            </form>
            <a href="/admin/blogs" className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">Back to Blogs</a>
          </div>
        </div>

        <form action="/api/admin/social/generate" method="post" className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <label className="block text-sm font-bold text-gray-700 mb-2">Choose a published blog</label>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4">
            <select name="blog_slug" required className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm">
              <option value="">Select a blog</option>
              {blogs.map((blog) => (
                <option key={blog.slug} value={blog.slug}>{blog.title}</option>
              ))}
            </select>
            <button className="rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600">Generate Social Posts</button>
          </div>
          <p className="text-xs text-gray-500 mt-3">This creates the social post text and attaches the blog image first. Use Generate Missing AI Image to create custom post images one at a time.</p>
        </form>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="text-left px-5 py-4">Image</th>
                <th className="text-left px-5 py-4">Blog</th>
                <th className="text-left px-5 py-4">Platform</th>
                <th className="text-left px-5 py-4">Status</th>
                <th className="text-left px-5 py-4">Updated</th>
                <th className="text-left px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {drafts.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-500">No social drafts yet.</td></tr>
              ) : drafts.map((draft) => (
                <tr key={draft.id} className="border-t border-gray-100">
                  <td className="px-5 py-4">
                    {draft.image_url ? (
                      <img src={draft.image_url} alt="Social post image" className="h-14 w-20 rounded-md object-cover border border-gray-200" />
                    ) : (
                      <span className="text-xs text-red-600 font-bold">No image</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900">{draft.blog_title}</div>
                    <div className="text-xs text-gray-500">/{draft.blog_slug}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-700">{platformLabel(draft.platform)}</td>
                  <td className="px-5 py-4"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusBadge(draft.status)}`}>{draft.status.replaceAll('_', ' ')}</span></td>
                  <td className="px-5 py-4 text-gray-600">{new Date(draft.updated_at).toLocaleString()}</td>
                  <td className="px-5 py-4"><a href={`/admin/social/${draft.id}`} className="text-green-700 font-bold hover:underline">Edit</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/adminAuth';
import { getSocialPostDraftById, imageSourceLabel, platformLabel } from '@/lib/socialPostDrafts';

export const metadata: Metadata = {
  title: 'Edit Social Post Draft',
  robots: { index: false, follow: false },
};

export default async function SocialDraftDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) redirect('/admin/login');

  const { id } = await params;
  const draft = await getSocialPostDraftById(id);
  if (!draft) notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <a href="/admin/social" className="text-sm font-bold text-green-700 hover:underline">Back to Social Posts</a>
        <div className="mt-4 mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-green-600 mb-2">Edit Social Draft</p>
          <h1 className="text-4xl font-black text-slate-900">{platformLabel(draft.platform)}</h1>
          <p className="mt-2 text-gray-600">{draft.blog_title}</p>
        </div>

        <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-black text-slate-900">AI Social Image</h2>
            <p className="text-sm text-slate-600 mt-1">Current image source: <strong>{imageSourceLabel(draft.image_source)}</strong></p>
            {draft.image_generated_at ? <p className="text-xs text-slate-500 mt-1">Generated: {new Date(draft.image_generated_at).toLocaleString()}</p> : null}
          </div>
          <form action={`/api/admin/social/${draft.id}/generate-image`} method="post">
            <button className="rounded-md bg-blue-500 px-5 py-3 text-sm font-bold text-white hover:bg-blue-600">
              Regenerate AI Image
            </button>
          </form>
        </div>

        {draft.image_generation_error ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800 break-words">
            <p className="font-bold mb-2">Last image generation error</p>
            <p>{draft.image_generation_error}</p>
          </div>
        ) : null}

        <form action={`/api/admin/social/${draft.id}`} method="post" className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700">
            <p><strong>Status:</strong> {draft.status.replaceAll('_', ' ')}</p>
            <p><strong>Platform:</strong> {platformLabel(draft.platform)}</p>
            <a href={draft.blog_url} target="_blank" rel="noreferrer" className="text-green-700 font-bold hover:underline">View blog</a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
              <input name="image_url" defaultValue={draft.image_url || ''} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
              <p className="text-xs text-gray-500 mt-2">This image will be sent with the social post in the Publer phase.</p>
            </div>
            <div>
              <p className="block text-sm font-bold text-gray-700 mb-2">Image Preview</p>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                {draft.image_url ? (
                  <img src={draft.image_url} alt="Social post image preview" className="h-44 w-full rounded-lg object-cover" />
                ) : (
                  <div className="h-44 w-full rounded-lg bg-white border border-dashed border-red-300 flex items-center justify-center text-sm font-bold text-red-600">No image attached</div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Post Text</label>
            <textarea name="post_text" rows={10} defaultValue={draft.post_text} required className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Hashtags</label>
            <input name="hashtags" defaultValue={draft.hashtags} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Notes</label>
            <textarea name="notes" rows={3} defaultValue={draft.notes || ''} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
          </div>

          <div className="flex flex-wrap gap-3">
            <button name="action" value="save" className="rounded-md bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">Save Draft</button>
            <button name="action" value="approve" className="rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600">Approve</button>
            <button name="action" value="reject" className="rounded-md bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">Reject</button>
          </div>
        </form>
      </div>
    </main>
  );
}

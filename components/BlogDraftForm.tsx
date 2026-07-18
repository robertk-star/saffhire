import { getBlogImageForCategory } from '../data/blogCategoryImages';
import type { BlogDraft } from '../lib/blogDrafts';

export default function BlogDraftForm({ draft }: { draft?: BlogDraft | null }) {
  const action = draft ? `/api/admin/blogs/${draft.id}` : '/api/admin/blogs';
  const category = draft?.category || 'Background Screening';
  const previewImage = draft?.image_url || getBlogImageForCategory(category);

  return (
    <form action={action} method="post" className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
          <input name="title" defaultValue={draft?.title || ''} required className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Slug</label>
          <input name="slug" defaultValue={draft?.slug || ''} required className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
          <input name="category" defaultValue={category} required className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
          <p className="text-xs text-gray-500 mt-2">If Image URL is blank, this category chooses the default image.</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Author</label>
          <input name="author" defaultValue={draft?.author || 'SaffHire Compliance Team'} required className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Read Time</label>
          <input name="read_time" defaultValue={draft?.read_time || '8 min read'} required className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
          <input name="image_url" defaultValue={draft?.image_url || ''} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
          <p className="text-xs text-gray-500 mt-2">Leave blank to use the category default image. Paste a full image URL here to override it.</p>
        </div>
        <div>
          <p className="block text-sm font-bold text-gray-700 mb-2">Current Image Preview</p>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
            <img src={previewImage} alt="Blog image preview" className="h-40 w-full rounded-lg object-cover" />
            <p className="text-xs text-gray-500 mt-2">
              {draft?.image_url ? 'Using custom image URL.' : `Using default image for ${category}.`}
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt</label>
        <textarea name="excerpt" rows={3} defaultValue={draft?.excerpt || ''} required className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Blog Content</label>
        <p className="text-xs text-gray-500 mb-2">Use plain text or simple Markdown-style paragraphs. This content publishes after approval.</p>
        <textarea name="content" rows={18} defaultValue={draft?.content || ''} required className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-mono" />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Review Notes</label>
        <textarea name="notes" rows={3} defaultValue={draft?.notes || ''} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
      </div>

      <div className="flex flex-wrap gap-3">
        <button name="action" value="save" className="rounded-md bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">
          Save Draft
        </button>
        <button name="action" value="pending_review" className="rounded-md bg-yellow-500 px-5 py-3 text-sm font-bold text-white hover:bg-yellow-600">
          Mark Pending Review
        </button>
        {draft ? (
          <>
            <button name="action" value="approve" className="rounded-md bg-blue-500 px-5 py-3 text-sm font-bold text-white hover:bg-blue-600">
              Approve
            </button>
            <button name="action" value="publish" className="rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600">
              Publish
            </button>
            <button name="action" value="changes_requested" className="rounded-md bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">
              Request Changes
            </button>
            <button name="action" value="reject" className="rounded-md bg-red-500 px-5 py-3 text-sm font-bold text-white hover:bg-red-600">
              Reject
            </button>
          </>
        ) : null}
      </div>
    </form>
  );
}

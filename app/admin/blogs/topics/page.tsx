import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminSession } from '../../../../lib/adminAuth';
import { getBlogGenerationTopicRecords } from '../../../../lib/blogGenerationTopicAdmin';

export const metadata: Metadata = {
  title: 'Blog Topic Settings',
  robots: { index: false, follow: false },
};

function keywordsToText(keywords: string[]) {
  return keywords.join(', ');
}

export default async function BlogTopicAdminPage() {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) redirect('/admin/login');

  const result = await getBlogGenerationTopicRecords();
  const topics = result.topics;
  const nextSortOrder = topics.length ? Math.max(...topics.map((topic) => topic.sort_order)) + 10 : 10;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-green-600 mb-2">SaffHire Admin</p>
            <h1 className="text-4xl font-black text-slate-900">Blog Topics</h1>
            <p className="text-gray-600 mt-2">Add, edit, pause, and reorder AI blog generation topics.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/admin/blogs" className="rounded-md bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">
              Back to Blog Drafts
            </a>
            <a href="/admin/blogs/schedule" className="rounded-md bg-purple-500 px-5 py-3 text-sm font-bold text-white hover:bg-purple-600">
              Schedule Settings
            </a>
          </div>
        </div>

        {result.usingFallback ? (
          <div className="mb-6 rounded-xl border border-orange-200 bg-orange-50 p-5 text-sm text-orange-800">
            <p className="font-bold">Admin topics table is not ready yet.</p>
            <p>{result.errorMessage || 'Run the SQL migration, then refresh this page.'}</p>
          </div>
        ) : null}

        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Add New Topic</h2>
          <p className="text-sm text-gray-600 mb-5">New topics are added to the rotation when active.</p>

          <form action="/api/admin/blogs/topics" method="post" className="grid grid-cols-1 gap-4">
            <input type="hidden" name="action" value="create" />
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Topic</label>
              <input name="topic" required className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" placeholder="Example: Background checks for construction companies" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Angle</label>
              <textarea name="angle" required rows={3} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" placeholder="Explain the specific angle the AI should write from." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <input name="category" required className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" placeholder="Hiring Risk" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Sort Order</label>
                <input name="sort_order" type="number" defaultValue={nextSortOrder} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
              </div>
              <label className="flex items-center gap-3 rounded-md border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700">
                <input type="checkbox" name="active" value="true" defaultChecked className="h-4 w-4" />
                Active
              </label>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Keywords</label>
              <textarea name="keywords" rows={2} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" placeholder="Separate keywords with commas or new lines." />
            </div>
            <button className="w-fit rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600">
              Add Topic
            </button>
          </form>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">Current Rotation</h2>
            <p className="text-sm text-gray-600">{topics.filter((topic) => topic.active).length} active / {topics.length} total</p>
          </div>

          {topics.map((topic) => (
            <form key={topic.id} action="/api/admin/blogs/topics" method="post" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <input type="hidden" name="id" value={topic.id} />
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${topic.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      {topic.active ? 'Active' : 'Paused'}
                    </span>
                    <span className="text-xs font-bold text-gray-500">Sort: {topic.sort_order}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">{topic.topic}</h3>
                  <p className="text-sm text-gray-500">{topic.category}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button name="action" value="update" className="rounded-md bg-green-500 px-4 py-2 text-sm font-bold text-white hover:bg-green-600">
                    Save
                  </button>
                  <button name="action" value="delete" className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-100">
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Topic</label>
                  <input name="topic" required defaultValue={topic.topic} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Angle</label>
                  <textarea name="angle" required rows={3} defaultValue={topic.angle} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                    <input name="category" required defaultValue={topic.category} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Sort Order</label>
                    <input name="sort_order" type="number" defaultValue={topic.sort_order} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
                  </div>
                  <label className="flex items-center gap-3 rounded-md border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700">
                    <input type="checkbox" name="active" value="true" defaultChecked={topic.active} className="h-4 w-4" />
                    Active
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Keywords</label>
                  <textarea name="keywords" rows={2} defaultValue={keywordsToText(topic.keywords)} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm" />
                </div>
              </div>
            </form>
          ))}
        </section>
      </div>
    </main>
  );
}

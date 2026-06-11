import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/adminAuth';
import { getBlogDraftById } from '@/lib/blogDrafts';
import BlogDraftForm from '@/components/BlogDraftForm';

export const metadata: Metadata = {
  title: 'Review Blog Draft',
  robots: { index: false, follow: false },
};

export default async function BlogDraftDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) redirect('/admin/login');

  const { id } = await params;
  const draft = await getBlogDraftById(id);
  if (!draft) notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <a href="/admin/blogs" className="text-sm font-bold text-green-700 hover:underline">Back to drafts</a>
        <div className="mt-4 mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-green-600 mb-2">Review Draft</p>
          <h1 className="text-4xl font-black text-slate-900">{draft.title}</h1>
          <p className="mt-2 text-gray-600">Status: {draft.status.replaceAll('_', ' ')}</p>
        </div>
        <BlogDraftForm draft={draft} />
      </div>
    </main>
  );
}

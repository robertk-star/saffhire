import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminSession } from '../../../../lib/adminAuth';
import BlogDraftForm from '../../../../components/BlogDraftForm';

export const metadata: Metadata = {
  title: 'New Blog Draft',
  robots: { index: false, follow: false },
};

export default async function NewBlogDraftPage() {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) redirect('/admin/login');

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <a href="/admin/blogs" className="text-sm font-bold text-green-700 hover:underline">Back to drafts</a>
        <h1 className="text-4xl font-black text-slate-900 mt-4 mb-8">New Blog Draft</h1>
        <BlogDraftForm />
      </div>
    </main>
  );
}

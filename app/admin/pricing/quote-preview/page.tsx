import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import PricingQuotePreview from '@/components/PricingQuotePreview';
import { getAdminSession } from '@/lib/adminAuth';

export const metadata: Metadata = {
  title: 'Quote Preview | SaffHire Admin',
  robots: { index: false, follow: false },
};

export default async function AdminQuotePreviewPage() {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) redirect('/admin/login');

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <PricingQuotePreview />
      </div>
    </main>
  );
}

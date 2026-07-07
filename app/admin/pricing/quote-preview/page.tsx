import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import PricingQuotePreview from '@/components/PricingQuotePreview';
import { hasAdminPermission } from '@/lib/adminAuth';

export const metadata: Metadata = {
  title: 'Quote Preview | SaffHire Admin',
  robots: { index: false, follow: false },
};

export default async function AdminQuotePreviewPage() {
  const canView = await hasAdminPermission('pricing');
  if (!canView) redirect('/admin/login');

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <PricingQuotePreview />
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import MultiPackageProposalPreview from '@/components/MultiPackageProposalPreview';
import { hasAdminPermission } from '@/lib/adminAuth';

export const metadata: Metadata = {
  title: 'Proposal Builder Preview | SaffHire Admin',
  robots: { index: false, follow: false },
};

export default async function AdminProposalBuilderPreviewPage() {
  const canView = await hasAdminPermission('proposals');
  if (!canView) redirect('/admin/login');

  return (
    <main className="proposal-print-root min-h-screen bg-slate-50 print:bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10 print:max-w-none print:px-0 print:py-0">
        <MultiPackageProposalPreview />
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ProposalPreview from '@/components/ProposalPreview';
import { hasAdminPermission } from '@/lib/adminAuth';

export const metadata: Metadata = {
  title: 'Proposal Preview | SaffHire Admin',
  robots: { index: false, follow: false },
};

export default async function AdminProposalPreviewPage() {
  const canView = await hasAdminPermission('proposals');
  if (!canView) redirect('/admin/login');

  return (
    <main className="proposal-print-root min-h-screen bg-slate-50 print:bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10 print:max-w-none print:px-0 print:py-0">
        <ProposalPreview />
      </div>
    </main>
  );
}

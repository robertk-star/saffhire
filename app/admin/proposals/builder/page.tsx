import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import MultiPackageProposalBuilder from '@/components/MultiPackageProposalBuilder';
import { hasAdminPermission, isAdminConfigured } from '@/lib/adminAuth';
import { getPricingItems } from '@/lib/pricingItems';
import { getProposalPricingPages } from '@/lib/proposalPricingPages';

export const metadata: Metadata = {
  title: 'Proposal Builder | SaffHire Admin',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AdminProposalBuilderPage() {
  const canView = await hasAdminPermission('proposals');
  if (!canView) redirect('/admin/login');

  const configured = isAdminConfigured();
  const [items, sheets] = await Promise.all([getPricingItems(), getProposalPricingPages()]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-green-600">SaffHire Admin</p>
            <h1 className="text-4xl font-black text-slate-900">Proposal Builder</h1>
            <p className="mt-2 text-gray-600">Build a multi-package proposal from a price sheet or pricing category, then preview and download a PDF.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/admin" className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">Admin Home</a>
            <a href="/admin/pricing" className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">Pricing Tool</a>
            <a href="/admin/proposals" className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">Create Proposal</a>
            <form action="/api/admin/logout" method="post">
              <button className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">Log Out</button>
            </form>
          </div>
        </div>

        {!configured ? (
          <div className="mb-6 rounded-xl border border-orange-200 bg-orange-50 p-5 text-sm text-orange-800">
            Admin environment variables are not fully configured. Required: ADMIN_PASSWORD and ADMIN_SESSION_SECRET.
          </div>
        ) : null}
        {items.length === 0 ? (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            No pricing items were found, so pricing categories have no prices. Saved price sheets still work.
          </div>
        ) : null}

        <MultiPackageProposalBuilder items={items} sheets={sheets} />
      </div>
    </main>
  );
}

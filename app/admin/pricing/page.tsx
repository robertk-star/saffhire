import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import PricingQuoteBuilder from '@/components/PricingQuoteBuilder';
import { getAdminSession, isAdminConfigured } from '@/lib/adminAuth';
import { getPricingItems } from '@/lib/pricingItems';

export const metadata: Metadata = {
  title: 'Pricing Quote Builder | SaffHire Admin',
  robots: { index: false, follow: false },
};

export default async function AdminPricingPage() {
  const isLoggedIn = await getAdminSession();
  if (!isLoggedIn) redirect('/admin/login');

  const configured = isAdminConfigured();
  const items = await getPricingItems();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-green-600">SaffHire Admin</p>
            <h1 className="text-4xl font-black text-slate-900">Pricing Quote Builder</h1>
            <p className="mt-2 text-gray-600">Build internal package pricing and generate a printable quote preview.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/admin/blogs" className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">Blog Admin</a>
            <form action="/api/admin/logout" method="post">
              <button className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50">Log Out</button>
            </form>
          </div>
        </div>

        {!configured ? (
          <div className="mb-6 rounded-xl border border-orange-200 bg-orange-50 p-5 text-sm text-orange-800">
            Admin environment variables are not fully configured. Required: ADMIN_PASSWORD and ADMIN_SESSION_SECRET. Pricing data also needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
          </div>
        ) : null}

        <PricingQuoteBuilder initialItems={items} />
      </div>
    </main>
  );
}

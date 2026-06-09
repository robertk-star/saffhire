import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SaffHire Account Setup',
  description: 'Contact SaffHire to set up a background screening account.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white py-24">
      <section className="mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-4xl font-bold text-slate-900">Account setup is handled directly by SaffHire.</h1>
        <p className="mt-4 text-lg text-slate-600">This test signup page is not part of the public SaffHire website. To start a background screening account, please contact SaffHire directly.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a className="rounded-md bg-[#0f5132] px-6 py-3 font-semibold text-white" href="tel:18885881733">Call 888-588-1733</a>
          <Link className="rounded-md border border-slate-300 px-6 py-3 font-semibold text-slate-900" href="/contact">Contact SaffHire</Link>
        </div>
      </section>
    </main>
  );
}

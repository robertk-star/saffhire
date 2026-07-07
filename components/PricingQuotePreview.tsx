'use client';

import { useEffect, useState } from 'react';

type QuotePreviewLine = {
  service: string;
  state: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

type QuotePreviewPackage = {
  name: string;
  total: number;
  lines: QuotePreviewLine[];
};

type QuotePreview = {
  clientName: string;
  contactName: string;
  state: string;
  selectedCategory: string;
  packages: QuotePreviewPackage[];
  quoteTotal: number;
  createdAt: string;
};

function money(value: number) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default function PricingQuotePreview() {
  const [quote, setQuote] = useState<QuotePreview | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('saffhire_quote_preview');
    if (!saved) return;
    try {
      setQuote(JSON.parse(saved));
    } catch {
      setQuote(null);
    }
  }, []);

  if (!quote) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
        No quote preview was found. Go back to the pricing builder and generate a quote preview first.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 print:hidden sm:flex-row sm:items-center sm:justify-between">
        <a href="/admin/pricing" className="text-sm font-bold text-green-700 hover:underline">Back to pricing builder</a>
        <button onClick={() => window.print()} className="rounded-md bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600">Print quote</button>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm print:border-0 print:shadow-none">
        <div className="flex flex-col gap-5 border-b border-gray-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-green-600">SaffHire</p>
            <h1 className="mt-2 text-4xl font-black text-slate-900">Background Screening Quote</h1>
            <p className="mt-2 text-gray-600">Prepared for {quote.clientName}</p>
          </div>
          <div className="text-sm text-slate-700 sm:text-right">
            <div><b>Contact:</b> {quote.contactName}</div>
            <div><b>Majority search state:</b> {quote.state}</div>
            <div><b>Pricing category:</b> {quote.selectedCategory}</div>
            <div><b>Date:</b> {new Date(quote.createdAt).toLocaleDateString()}</div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {quote.packages.map((quotePackage, index) => (
            <div key={`${quotePackage.name}-${index}`} className="overflow-hidden rounded-xl border border-gray-200">
              <div className="flex items-center justify-between bg-slate-900 px-5 py-4 text-white">
                <h2 className="text-lg font-black">{quotePackage.name}</h2>
                <div className="text-lg font-black">{money(quotePackage.total)}</div>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-5 py-3 text-left">Search</th>
                    <th className="px-5 py-3 text-left">State</th>
                    <th className="px-5 py-3 text-right">Qty</th>
                    <th className="px-5 py-3 text-right">Price</th>
                    <th className="px-5 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quotePackage.lines.map((line, lineIndex) => (
                    <tr key={`${line.service}-${lineIndex}`} className="border-t border-gray-100">
                      <td className="px-5 py-4 font-medium text-slate-900">{line.service}</td>
                      <td className="px-5 py-4 text-slate-600">{line.state}</td>
                      <td className="px-5 py-4 text-right text-slate-600">{line.quantity}</td>
                      <td className="px-5 py-4 text-right text-slate-600">{money(line.unitPrice)}</td>
                      <td className="px-5 py-4 text-right font-bold text-slate-900">{money(line.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <div className="w-full max-w-sm rounded-xl bg-green-50 p-5 text-right">
            <div className="text-sm font-bold uppercase tracking-wide text-green-700">Quote total</div>
            <div className="mt-2 text-4xl font-black text-slate-900">{money(quote.quoteTotal)}</div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-gray-200 bg-slate-50 p-5 text-sm text-slate-600">
          Pricing is based on the package selections and majority search state shown above. Final pricing is subject to SaffHire review and written agreement.
        </div>
      </section>
    </div>
  );
}

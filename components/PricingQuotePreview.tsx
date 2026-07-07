'use client';

import { useEffect, useState } from 'react';

type QuotePreviewLine = {
  service: string;
  state: string;
  quantity: number;
  unitPrice: number | null;
  total: number | null;
};

type QuotePreviewPackage = {
  name: string;
  description?: string;
  total: number;
  lines: QuotePreviewLine[];
};

type QuotePreview = {
  clientName: string;
  contactName: string;
  state: string;
  quoteNotes?: string;
  selectedCategory: string;
  packages: QuotePreviewPackage[];
  quoteTotal: number;
  createdAt: string;
};

function money(value: number) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function priceLabel(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return 'N/A';
  return money(Number(value));
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

      <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm print:border-0 print:p-0 print:shadow-none">
        <div className="rounded-2xl bg-slate-950 p-6 text-white print:rounded-none">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-green-300">SaffHire</p>
              <h1 className="mt-2 text-4xl font-black">Service Quote</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-300">A package-based pricing estimate prepared for discussion.</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 text-sm sm:text-right">
              <div><b>Prepared for:</b> {quote.clientName}</div>
              <div><b>Contact:</b> {quote.contactName}</div>
              <div><b>Date:</b> {new Date(quote.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Majority search state</div>
            <div className="mt-1 text-xl font-black text-slate-900">{quote.state}</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Selected pricing category</div>
            <div className="mt-1 text-xl font-black text-slate-900">{quote.selectedCategory}</div>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-green-700">Quote total</div>
            <div className="mt-1 text-3xl font-black text-slate-900">{money(quote.quoteTotal)}</div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {quote.packages.map((quotePackage, index) => (
            <div key={`${quotePackage.name}-${index}`} className="overflow-hidden rounded-xl border border-gray-200">
              <div className="bg-slate-900 px-5 py-4 text-white">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-black">{quotePackage.name}</h2>
                    {quotePackage.description ? <p className="mt-1 text-sm text-slate-300">{quotePackage.description}</p> : null}
                  </div>
                  <div className="text-lg font-black">{money(quotePackage.total)}</div>
                </div>
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
                      <td className="px-5 py-4 text-right text-slate-600">{priceLabel(line.unitPrice)}</td>
                      <td className="px-5 py-4 text-right font-bold text-slate-900">{priceLabel(line.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {quote.quoteNotes ? (
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
            <div className="text-sm font-bold uppercase tracking-wide text-slate-500">Notes</div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{quote.quoteNotes}</p>
          </div>
        ) : null}

        <div className="mt-8 flex justify-end">
          <div className="w-full max-w-sm rounded-xl bg-green-50 p-5 text-right">
            <div className="text-sm font-bold uppercase tracking-wide text-green-700">Quote total</div>
            <div className="mt-2 text-4xl font-black text-slate-900">{money(quote.quoteTotal)}</div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-gray-200 bg-slate-50 p-5 text-sm text-slate-600">
          Pricing is based on the package selections and majority search state shown above. This quote is intended for discussion and must be confirmed in a final client agreement.
        </div>
      </section>
    </div>
  );
}

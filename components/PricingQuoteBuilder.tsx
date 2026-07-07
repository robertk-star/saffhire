'use client';

import { useEffect, useMemo, useState } from 'react';

type PriceKey = 'church_price' | 'staffing_price' | 'trucking_price' | 'high_volume_price' | 'general_price';

type PricingItem = {
  id: string;
  service: string;
  state: string;
  church_price: number | null;
  staffing_price: number | null;
  trucking_price: number | null;
  high_volume_price: number | null;
  general_price: number | null;
};

type QuoteLine = {
  id: string;
  pricingItemId: string;
  quantity: number;
};

type QuotePackage = {
  id: string;
  name: string;
  lines: QuoteLine[];
};

const priceCategories: { key: PriceKey; label: string }[] = [
  { key: 'church_price', label: 'Church Price' },
  { key: 'staffing_price', label: 'Staffing Price' },
  { key: 'trucking_price', label: 'Trucking Price' },
  { key: 'high_volume_price', label: 'High Volume Price' },
  { key: 'general_price', label: 'General Price' },
];

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function money(value: number) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function newLine(): QuoteLine {
  return { id: makeId('line'), pricingItemId: '', quantity: 1 };
}

function newPackage(index = 1): QuotePackage {
  return { id: makeId('package'), name: index === 1 ? 'Basic Package' : `Package ${index}`, lines: [newLine()] };
}

export default function PricingQuoteBuilder({ initialItems }: { initialItems: PricingItem[] }) {
  const [items, setItems] = useState<PricingItem[]>(initialItems);
  const [isLoading, setIsLoading] = useState(initialItems.length === 0);
  const [clientName, setClientName] = useState('');
  const [contactName, setContactName] = useState('');
  const [state, setState] = useState('');
  const [selectedPriceKey, setSelectedPriceKey] = useState<PriceKey>('general_price');
  const [packages, setPackages] = useState<QuotePackage[]>([newPackage()]);

  useEffect(() => {
    let cancelled = false;
    async function loadItems() {
      try {
        const response = await fetch('/api/admin/pricing/items');
        if (!response.ok) return;
        const payload = await response.json();
        if (!cancelled && Array.isArray(payload.items)) setItems(payload.items);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    if (initialItems.length === 0) loadItems();
    else setIsLoading(false);
    return () => {
      cancelled = true;
    };
  }, [initialItems.length]);

  const states = useMemo(() => Array.from(new Set(items.map((item) => item.state).filter(Boolean))).sort(), [items]);
  const filteredItems = useMemo(() => items.filter((item) => item.state === state), [items, state]);
  const itemsById = useMemo(() => new Map(items.map((item) => [item.id, item])), [items]);

  const totals = useMemo(() => {
    const next = Object.fromEntries(priceCategories.map((category) => [category.key, 0])) as Record<PriceKey, number>;
    for (const quotePackage of packages) {
      for (const line of quotePackage.lines) {
        const item = itemsById.get(line.pricingItemId);
        if (!item) continue;
        for (const category of priceCategories) {
          next[category.key] += Number(item[category.key] || 0) * Math.max(0, Number(line.quantity || 0));
        }
      }
    }
    return next;
  }, [itemsById, packages]);

  function updatePackage(packageId: string, updates: Partial<QuotePackage>) {
    setPackages((current) => current.map((item) => (item.id === packageId ? { ...item, ...updates } : item)));
  }

  function updateLine(packageId: string, lineId: string, updates: Partial<QuoteLine>) {
    setPackages((current) =>
      current.map((quotePackage) =>
        quotePackage.id === packageId
          ? { ...quotePackage, lines: quotePackage.lines.map((line) => (line.id === lineId ? { ...line, ...updates } : line)) }
          : quotePackage,
      ),
    );
  }

  function addLine(packageId: string) {
    setPackages((current) => current.map((quotePackage) => (quotePackage.id === packageId ? { ...quotePackage, lines: [...quotePackage.lines, newLine()] } : quotePackage)));
  }

  function removeLine(packageId: string, lineId: string) {
    setPackages((current) =>
      current.map((quotePackage) =>
        quotePackage.id === packageId ? { ...quotePackage, lines: quotePackage.lines.filter((line) => line.id !== lineId) || [newLine()] } : quotePackage,
      ),
    );
  }

  function addPackage() {
    setPackages((current) => [...current, newPackage(current.length + 1)]);
  }

  function removePackage(packageId: string) {
    setPackages((current) => (current.length === 1 ? current : current.filter((quotePackage) => quotePackage.id !== packageId)));
  }

  function packageTotal(quotePackage: QuotePackage, key: PriceKey) {
    return quotePackage.lines.reduce((sum, line) => {
      const item = itemsById.get(line.pricingItemId);
      return sum + Number(item?.[key] || 0) * Math.max(0, Number(line.quantity || 0));
    }, 0);
  }

  function buildQuotePreview() {
    const selectedCategory = priceCategories.find((category) => category.key === selectedPriceKey) || priceCategories[4];
    const quotePackages = packages.map((quotePackage) => ({
      name: quotePackage.name,
      total: packageTotal(quotePackage, selectedPriceKey),
      lines: quotePackage.lines
        .map((line) => {
          const item = itemsById.get(line.pricingItemId);
          if (!item) return null;
          const unitPrice = Number(item[selectedPriceKey] || 0);
          return {
            service: item.service,
            state: item.state,
            quantity: Math.max(0, Number(line.quantity || 0)),
            unitPrice,
            total: unitPrice * Math.max(0, Number(line.quantity || 0)),
          };
        })
        .filter(Boolean),
    }));

    sessionStorage.setItem(
      'saffhire_quote_preview',
      JSON.stringify({
        clientName,
        contactName,
        state,
        selectedCategory: selectedCategory.label,
        packages: quotePackages,
        quoteTotal: totals[selectedPriceKey],
        createdAt: new Date().toISOString(),
      }),
    );
    window.location.href = '/admin/pricing/quote-preview';
  }

  const canPreview = Boolean(clientName.trim() && contactName.trim() && state && packages.some((quotePackage) => quotePackage.lines.some((line) => line.pricingItemId)));

  return (
    <div className="space-y-8">
      {items.length === 0 ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          No pricing items were found. Run the pricing_items SQL migration and import the SaffHire price sheet before building live quotes.
        </div>
      ) : null}

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Client name</span>
            <input value={clientName} onChange={(event) => setClientName(event.target.value)} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Contact name</span>
            <input value={contactName} onChange={(event) => setContactName(event.target.value)} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Majority search state</span>
            <select value={state} onChange={(event) => setState(event.target.value)} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none">
              <option value="">Select state</option>
              {states.map((stateName) => (
                <option key={stateName} value={stateName}>{stateName}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {packages.map((quotePackage, packageIndex) => (
        <section key={quotePackage.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="block flex-1">
              <span className="mb-2 block text-sm font-bold text-slate-700">Package name</span>
              <input value={quotePackage.name} onChange={(event) => updatePackage(quotePackage.id, { name: event.target.value })} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none" />
            </label>
            {packages.length > 1 ? (
              <button type="button" onClick={() => removePackage(quotePackage.id)} className="rounded-md border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-50">Remove package</button>
            ) : null}
          </div>

          <div className="space-y-3">
            {quotePackage.lines.map((line) => {
              const selectedItem = itemsById.get(line.pricingItemId);
              return (
                <div key={line.id} className="grid gap-3 rounded-xl border border-gray-100 bg-slate-50 p-4 md:grid-cols-[1fr_120px_110px]">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Search needed</span>
                    <select value={line.pricingItemId} onChange={(event) => updateLine(quotePackage.id, line.id, { pricingItemId: event.target.value })} disabled={!state} className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm focus:border-green-500 focus:outline-none disabled:bg-gray-100">
                      <option value="">{state ? 'Select search' : 'Select state first'}</option>
                      {filteredItems.map((item) => (
                        <option key={item.id} value={item.id}>{item.service}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Quantity</span>
                    <input type="number" min="0" value={line.quantity} onChange={(event) => updateLine(quotePackage.id, line.id, { quantity: Number(event.target.value) })} className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm focus:border-green-500 focus:outline-none" />
                  </label>
                  <div className="flex items-end">
                    <button type="button" onClick={() => removeLine(quotePackage.id, line.id)} className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-gray-50">Remove</button>
                  </div>
                  {selectedItem ? (
                    <div className="md:col-span-3 grid gap-2 text-xs text-slate-600 sm:grid-cols-5">
                      {priceCategories.map((category) => (
                        <div key={category.key} className="rounded-lg bg-white p-2"><b>{category.label}:</b> {money(Number(selectedItem[category.key] || 0))}</div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <button type="button" onClick={() => addLine(quotePackage.id)} className="mt-4 rounded-md bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800">Add search to package</button>

          <div className="mt-5 grid gap-3 sm:grid-cols-5">
            {priceCategories.map((category) => (
              <div key={category.key} className="rounded-xl border border-gray-200 bg-white p-3">
                <div className="text-xs font-bold uppercase tracking-wide text-slate-500">{category.label}</div>
                <div className="mt-1 text-lg font-black text-slate-900">{money(packageTotal(quotePackage, category.key))}</div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <button type="button" onClick={addPackage} className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:bg-gray-50">Add another package</button>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900">Quote totals</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-5">
          {priceCategories.map((category) => (
            <button key={category.key} type="button" onClick={() => setSelectedPriceKey(category.key)} className={`rounded-xl border p-4 text-left ${selectedPriceKey === category.key ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">{category.label}</div>
              <div className="mt-1 text-2xl font-black text-slate-900">{money(totals[category.key])}</div>
              <div className="mt-2 text-xs font-bold text-green-700">{selectedPriceKey === category.key ? 'Selected' : 'Use this price'}</div>
            </button>
          ))}
        </div>
        <button type="button" disabled={!canPreview || isLoading} onClick={buildQuotePreview} className="mt-6 rounded-md bg-green-500 px-6 py-3 text-sm font-bold text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-gray-300">Generate formal quote preview</button>
      </section>
    </div>
  );
}

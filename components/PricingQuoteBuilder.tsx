'use client';

import { useMemo, useState } from 'react';

type PriceKey = 'church_price' | 'staffing_price' | 'trucking_price' | 'high_volume_price' | 'general_price';

type PricingItem = {
  id: string;
  service: string;
  state: string;
  cost: number | null;
  total_cost: number | null;
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
  searchText: string;
};

type QuotePackage = {
  id: string;
  name: string;
  description: string;
  lines: QuoteLine[];
};

const priceCategories: { key: PriceKey; label: string }[] = [
  { key: 'church_price', label: 'Church Price' },
  { key: 'staffing_price', label: 'Staffing Price' },
  { key: 'trucking_price', label: 'Trucking Price' },
  { key: 'high_volume_price', label: 'High Volume Price' },
  { key: 'general_price', label: 'General Price' },
];

const salesCoverageMultiplier = 1.1;

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function money(value: number) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function priceLabel(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return 'N/A';
  return money(Number(value));
}

function applySalesCoverage(value: number, enabled: boolean) {
  if (!enabled) return value;
  return Number((value * salesCoverageMultiplier).toFixed(2));
}

function itemInternalCost(item: PricingItem) {
  return Number(item.total_cost ?? item.cost ?? 0);
}

function newLine(): QuoteLine {
  return { id: makeId('line'), pricingItemId: '', quantity: 1, searchText: '' };
}

function newPackage(index = 1): QuotePackage {
  return {
    id: makeId('package'),
    name: index === 1 ? 'Basic Package' : `Package ${index}`,
    description: '',
    lines: [newLine()],
  };
}

export default function PricingQuoteBuilder({ initialItems }: { initialItems: PricingItem[] }) {
  const [items] = useState<PricingItem[]>(initialItems);
  const [clientName, setClientName] = useState('');
  const [contactName, setContactName] = useState('');
  const [state, setState] = useState('');
  const [quoteNotes, setQuoteNotes] = useState('');
  const [selectedPriceKey, setSelectedPriceKey] = useState<PriceKey>('general_price');
  const [salesCoverageEnabled, setSalesCoverageEnabled] = useState(false);
  const [packages, setPackages] = useState<QuotePackage[]>([newPackage()]);

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
          const price = item[category.key];
          if (price !== null && price !== undefined) {
            next[category.key] += Number(price) * Math.max(0, Number(line.quantity || 0));
          }
        }
      }
    }
    return next;
  }, [itemsById, packages]);

  const quoteTotals = useMemo(() => {
    return Object.fromEntries(
      priceCategories.map((category) => [category.key, applySalesCoverage(totals[category.key], salesCoverageEnabled)]),
    ) as Record<PriceKey, number>;
  }, [salesCoverageEnabled, totals]);

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

  function handleStateChange(nextState: string) {
    setState(nextState);
    setPackages((current) =>
      current.map((quotePackage) => ({
        ...quotePackage,
        lines: quotePackage.lines.map((line) => ({ ...line, pricingItemId: '', searchText: '' })),
      })),
    );
  }

  function handleSearchTextChange(packageId: string, lineId: string, searchText: string) {
    updateLine(packageId, lineId, { searchText, pricingItemId: '' });
  }

  function addLine(packageId: string) {
    setPackages((current) => current.map((quotePackage) => (quotePackage.id === packageId ? { ...quotePackage, lines: [...quotePackage.lines, newLine()] } : quotePackage)));
  }

  function removeLine(packageId: string, lineId: string) {
    setPackages((current) =>
      current.map((quotePackage) => {
        if (quotePackage.id !== packageId) return quotePackage;
        const remainingLines = quotePackage.lines.filter((line) => line.id !== lineId);
        return { ...quotePackage, lines: remainingLines.length > 0 ? remainingLines : [newLine()] };
      }),
    );
  }

  function addPackage() {
    setPackages((current) => [...current, newPackage(current.length + 1)]);
  }

  function removePackage(packageId: string) {
    setPackages((current) => (current.length === 1 ? current : current.filter((quotePackage) => quotePackage.id !== packageId)));
  }

  function resetBuilder() {
    setClientName('');
    setContactName('');
    setState('');
    setQuoteNotes('');
    setSelectedPriceKey('general_price');
    setSalesCoverageEnabled(false);
    setPackages([newPackage()]);
    sessionStorage.removeItem('saffhire_quote_preview');
  }

  function packageTotal(quotePackage: QuotePackage, key: PriceKey, useSalesCoverage = false) {
    const baseTotal = quotePackage.lines.reduce((sum, line) => {
      const item = itemsById.get(line.pricingItemId);
      const price = item?.[key];
      if (price === null || price === undefined) return sum;
      return sum + Number(price) * Math.max(0, Number(line.quantity || 0));
    }, 0);
    return applySalesCoverage(baseTotal, useSalesCoverage);
  }

  function packageCostTotal(quotePackage: QuotePackage) {
    return quotePackage.lines.reduce((sum, line) => {
      const item = itemsById.get(line.pricingItemId);
      if (!item) return sum;
      return sum + itemInternalCost(item) * Math.max(0, Number(line.quantity || 0));
    }, 0);
  }

  function packageProfit(quotePackage: QuotePackage, key: PriceKey) {
    return packageTotal(quotePackage, key, salesCoverageEnabled) - packageCostTotal(quotePackage);
  }

  function lineCostTotal(item: PricingItem, line: QuoteLine) {
    return itemInternalCost(item) * Math.max(0, Number(line.quantity || 0));
  }

  function linePriceTotal(item: PricingItem, line: QuoteLine, key: PriceKey) {
    const price = item[key];
    if (price === null || price === undefined) return null;
    return applySalesCoverage(Number(price), salesCoverageEnabled) * Math.max(0, Number(line.quantity || 0));
  }

  function lineProfit(item: PricingItem, line: QuoteLine, key: PriceKey) {
    const price = linePriceTotal(item, line, key);
    if (price === null) return null;
    return price - lineCostTotal(item, line);
  }

  function buildQuotePreview() {
    const selectedCategory = priceCategories.find((category) => category.key === selectedPriceKey) || priceCategories[4];
    const quotePackages = packages.map((quotePackage) => ({
      name: quotePackage.name,
      description: quotePackage.description,
      total: packageTotal(quotePackage, selectedPriceKey, salesCoverageEnabled),
      lines: quotePackage.lines
        .map((line) => {
          const item = itemsById.get(line.pricingItemId);
          if (!item) return null;
          const rawPrice = item[selectedPriceKey];
          const baseUnitPrice = rawPrice === null || rawPrice === undefined ? null : Number(rawPrice);
          const unitPrice = baseUnitPrice === null ? null : applySalesCoverage(baseUnitPrice, salesCoverageEnabled);
          return {
            service: item.service,
            state: item.state,
            quantity: Math.max(0, Number(line.quantity || 0)),
            unitPrice,
            total: unitPrice === null ? null : unitPrice * Math.max(0, Number(line.quantity || 0)),
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
        quoteNotes,
        selectedCategory: selectedCategory.label,
        salesCoverageEnabled,
        packages: quotePackages,
        quoteTotal: quoteTotals[selectedPriceKey],
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
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Quote setup</h2>
            <p className="mt-1 text-sm text-slate-600">Enter the client information and choose the state that should drive pricing.</p>
          </div>
          <button type="button" onClick={resetBuilder} className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-gray-50">
            Reset / start over
          </button>
        </div>

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
            <select value={state} onChange={(event) => handleStateChange(event.target.value)} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none">
              <option value="">Select state</option>
              {states.map((stateName) => (
                <option key={stateName} value={stateName}>{stateName}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Quote notes</span>
          <textarea
            value={quoteNotes}
            onChange={(event) => setQuoteNotes(event.target.value)}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
            placeholder="Optional notes to show on the formal quote."
          />
        </label>
      </section>

      {packages.map((quotePackage) => (
        <section key={quotePackage.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="grid flex-1 gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">Package name</span>
                <input value={quotePackage.name} onChange={(event) => updatePackage(quotePackage.id, { name: event.target.value })} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">Package description</span>
                <input
                  value={quotePackage.description}
                  onChange={(event) => updatePackage(quotePackage.id, { description: event.target.value })}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
                  placeholder="Optional short description"
                />
              </label>
            </div>
            {packages.length > 1 ? (
              <button type="button" onClick={() => removePackage(quotePackage.id)} className="rounded-md border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-50">Remove package</button>
            ) : null}
          </div>

          <div className="space-y-3">
            {quotePackage.lines.map((line) => {
              const selectedItem = itemsById.get(line.pricingItemId);
              const query = line.searchText.trim().toLowerCase();
              const rawMatches = (query ? filteredItems.filter((item) => item.service.toLowerCase().includes(query)) : filteredItems).slice(0, 150);
              const lineMatches = selectedItem && !rawMatches.some((item) => item.id === selectedItem.id) ? [selectedItem, ...rawMatches] : rawMatches;
              const selectedLineCost = selectedItem ? lineCostTotal(selectedItem, line) : 0;
              return (
                <div key={line.id} className="grid gap-3 rounded-xl border border-gray-100 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_120px_110px]">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Search box</span>
                    <input
                      value={line.searchText}
                      onChange={(event) => handleSearchTextChange(quotePackage.id, line.id, event.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
                      placeholder={state ? 'Type county, federal, MVR, drug...' : 'Select state first'}
                    />
                    {!state ? <span className="mt-1 block text-xs text-slate-500">Select a state before choosing a search.</span> : null}
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Search needed</span>
                    <select value={line.pricingItemId} onChange={(event) => updateLine(quotePackage.id, line.id, { pricingItemId: event.target.value })} className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm focus:border-green-500 focus:outline-none">
                      <option value="">{state ? 'Select search' : 'Select state first'}</option>
                      {state ? lineMatches.map((item) => (
                        <option key={item.id} value={item.id}>{item.service}</option>
                      )) : null}
                    </select>
                    {state && lineMatches.length >= 150 ? <span className="mt-1 block text-xs text-slate-500">Showing first 150 matches. Keep typing to narrow the list.</span> : null}
                    {state && lineMatches.length === 0 ? <span className="mt-1 block text-xs text-red-600">No matches found for this state/search text.</span> : null}
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Quantity</span>
                    <input type="number" min="0" value={line.quantity} onChange={(event) => updateLine(quotePackage.id, line.id, { quantity: Number(event.target.value) })} className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm focus:border-green-500 focus:outline-none" />
                  </label>
                  <div className="flex items-end">
                    <button type="button" onClick={() => removeLine(quotePackage.id, line.id)} className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-gray-50">Remove</button>
                  </div>
                  {selectedItem ? (
                    <div className="md:col-span-4 grid gap-2 text-xs text-slate-600 sm:grid-cols-5">
                      {priceCategories.map((category) => {
                        const basePrice = selectedItem[category.key];
                        const adjustedPrice = basePrice === null || basePrice === undefined ? null : applySalesCoverage(Number(basePrice), salesCoverageEnabled);
                        const displayPrice = linePriceTotal(selectedItem, line, category.key);
                        const displayProfit = lineProfit(selectedItem, line, category.key);
                        return (
                          <div key={category.key} className={`rounded-lg p-2 ${selectedPriceKey === category.key ? 'bg-green-50 ring-1 ring-green-200' : 'bg-white'}`}>
                            <div className="font-bold text-slate-700">{category.label}: {priceLabel(displayPrice)}</div>
                            <div className="mt-1">Cost: {money(selectedLineCost)}</div>
                            <div className="font-bold text-slate-800">Profit: {displayProfit === null ? 'N/A' : money(displayProfit)}</div>
                            {Number(line.quantity || 0) > 1 ? <div className="mt-1 text-[11px] text-slate-500">Unit: {salesCoverageEnabled ? priceLabel(adjustedPrice) : priceLabel(basePrice)}</div> : null}
                            {salesCoverageEnabled && selectedPriceKey === category.key ? <div className="mt-1 text-[11px] font-bold text-green-700">Includes 10% sales coverage</div> : null}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <button type="button" onClick={() => addLine(quotePackage.id)} className="mt-4 rounded-md bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800">Add search to package</button>

          <div className="mt-5 grid gap-3 sm:grid-cols-5">
            {priceCategories.map((category) => {
              const displayPrice = salesCoverageEnabled ? packageTotal(quotePackage, category.key, true) : packageTotal(quotePackage, category.key);
              const displayCost = packageCostTotal(quotePackage);
              const displayProfit = packageProfit(quotePackage, category.key);
              return (
                <div key={category.key} className={`rounded-xl border p-3 ${selectedPriceKey === category.key ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}`}>
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-500">{category.label}</div>
                  <div className="mt-1 text-lg font-black text-slate-900">{money(displayPrice)}</div>
                  <div className="mt-2 text-sm text-slate-600">Cost: {money(displayCost)}</div>
                  <div className="text-sm font-bold text-slate-800">Profit: {money(displayProfit)}</div>
                  {salesCoverageEnabled ? <div className="mt-1 text-xs text-slate-500">Base: {money(packageTotal(quotePackage, category.key))}</div> : null}
                  {selectedPriceKey === category.key ? <div className="mt-1 text-xs font-bold text-green-700">Selected category</div> : null}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <button type="button" onClick={addPackage} className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:bg-gray-50">Add another package</button>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Quote totals</h2>
            <p className="mt-1 text-sm text-slate-600">Choose the price category that should be used on the formal quote.</p>
          </div>
          <div className="rounded-xl bg-slate-900 px-5 py-3 text-white">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-300">Selected total</div>
            <div className="text-2xl font-black">{money(quoteTotals[selectedPriceKey])}</div>
            {salesCoverageEnabled ? <div className="mt-1 text-xs text-slate-300">Base: {money(totals[selectedPriceKey])}</div> : null}
          </div>
        </div>

        <label className="mt-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-slate-800">
          <input
            type="checkbox"
            checked={salesCoverageEnabled}
            onChange={(event) => setSalesCoverageEnabled(event.target.checked)}
            className="mt-1 h-4 w-4"
          />
          <span>
            <span className="block font-bold text-slate-900">Add 10% sales coverage</span>
            <span className="block text-slate-600">Use this when the quote needs to cover salesperson cost. The formal quote will show only the final client price.</span>
          </span>
        </label>

        <div className="mt-5 grid gap-3 sm:grid-cols-5">
          {priceCategories.map((category) => (
            <button key={category.key} type="button" onClick={() => setSelectedPriceKey(category.key)} className={`rounded-xl border p-4 text-left ${selectedPriceKey === category.key ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">{category.label}</div>
              <div className="mt-1 text-2xl font-black text-slate-900">{money(quoteTotals[category.key])}</div>
              {salesCoverageEnabled ? <div className="mt-1 text-xs text-slate-500">Base: {money(totals[category.key])}</div> : null}
              <div className="mt-2 text-xs font-bold text-green-700">{selectedPriceKey === category.key ? 'Selected for quote' : 'Use this price'}</div>
            </button>
          ))}
        </div>
        <button type="button" disabled={!canPreview} onClick={buildQuotePreview} className="mt-6 rounded-md bg-green-500 px-6 py-3 text-sm font-bold text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-gray-300">Generate formal quote preview</button>
      </section>
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';

type SectionKey =
  | 'cover'
  | 'whySaffhire'
  | 'services'
  | 'packages'
  | 'pricing'
  | 'process';

type PriceRow = {
  id: string;
  label: string;
  price: string;
};

type PricingPreset = {
  id: string;
  name: string;
  description: string;
  minimumPackage: PriceRow[];
  individual: PriceRow[];
};

const sectionOptions: { key: SectionKey; label: string; description: string }[] = [
  { key: 'cover', label: 'Cover page', description: 'Title page with SaffHire branding' },
  { key: 'whySaffhire', label: 'Why SaffHire', description: 'Mission, veteran-owned commitment, and differentiators' },
  { key: 'services', label: 'Our Services', description: 'Full list of screening and verification services' },
  { key: 'packages', label: 'Service Packages', description: 'Basic, Professional, Healthcare, DOT, Executive packages' },
  { key: 'pricing', label: 'Pricing', description: 'Selected price sheet for this proposal' },
  { key: 'process', label: 'Process & Support', description: 'Ordering process and customer support contacts' },
];

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function row(label: string, price: string): PriceRow {
  return { id: makeId('price'), label, price };
}

const pricingPresets: PricingPreset[] = [
  {
    id: 'direct',
    name: 'SaffHire Direct Pricing',
    description: 'Standard direct client pricing from the sample proposal.',
    minimumPackage: [
      row('Social Security Trace', '$5.00'),
      row('Sex Offender Registry', 'Included'),
      row('Global Security Watch List', 'Included'),
      row('National Database Search', 'Included'),
    ],
    individual: [
      row('Federal Search', '$5.00'),
      row('MVR', '$4.50'),
      row('Safety Performance', '$10.00'),
      row('DOT Verification', '$5.00'),
      row('1 County Criminal Search', '$6.00'),
      row('3 County Criminal Searches', '$16.50'),
      row('Civil Search Upper Only', '$6.50'),
      row('Civil Search Lower Only', '$6.50'),
      row('Civil Search Upper & Lower', '$11.00'),
      row('Education Verification', '$9.00'),
      row('Employment Verification', '$9.00'),
      row('WOTC', '$5.00'),
      row('Drug Screening', '$28.50'),
      row('State Database Search', '$3.00'),
      row('Healthcare/MedEx/OIG', '$8.00'),
      row('Medical License Verification', '$9.00'),
      row('Continuous Monitoring', '$2.00'),
    ],
  },
  {
    id: 'staffing',
    name: 'Staffing Company Pricing',
    description: 'Pricing oriented for staffing company clients.',
    minimumPackage: [
      row('Social Security Trace', '$5.00'),
      row('Sex Offender Registry', 'Included'),
      row('Global Security Watch List', 'Included'),
      row('National Database Search', 'Included'),
    ],
    individual: [
      row('Federal Search', '$5.00'),
      row('MVR', '$4.50'),
      row('Safety Performance', '$10.00'),
      row('DOT Verification', '$5.00'),
      row('1 County Criminal Search', '$6.00'),
      row('3 County Criminal Searches', '$16.50'),
      row('Civil Search Upper Only', '$6.50'),
      row('Civil Search Lower Only', '$6.50'),
      row('Civil Search Upper & Lower', '$11.00'),
      row('Education Verification', '$9.00'),
      row('Employment Verification', '$9.00'),
      row('WOTC', '$5.00'),
      row('Drug Screening', '$28.50'),
      row('State Database Search', '$3.00'),
      row('Healthcare/MedEx/OIG', '$8.00'),
      row('Medical License Verification', '$9.00'),
      row('Continuous Monitoring', '$2.00'),
    ],
  },
  {
    id: 'staffing-sales',
    name: 'Staffing + 10% Sales Coverage',
    description: 'Staffing pricing with a 10% uplift to cover salesperson cost.',
    minimumPackage: [
      row('Social Security Trace', '$5.50'),
      row('Sex Offender Registry', 'Included'),
      row('Global Security Watch List', 'Included'),
      row('National Database Search', 'Included'),
    ],
    individual: [
      row('Federal Search', '$5.50'),
      row('MVR', '$4.95'),
      row('Safety Performance', '$11.00'),
      row('DOT Verification', '$5.50'),
      row('1 County Criminal Search', '$6.60'),
      row('3 County Criminal Searches', '$18.15'),
      row('Civil Search Upper Only', '$7.15'),
      row('Civil Search Lower Only', '$7.15'),
      row('Civil Search Upper & Lower', '$12.10'),
      row('Education Verification', '$9.90'),
      row('Employment Verification', '$9.90'),
      row('WOTC', '$5.50'),
      row('Drug Screening', '$31.35'),
      row('State Database Search', '$3.30'),
      row('Healthcare/MedEx/OIG', '$8.80'),
      row('Medical License Verification', '$9.90'),
      row('Continuous Monitoring', '$2.20'),
    ],
  },
];

export default function ProposalBuilder() {
  const [clientName, setClientName] = useState('');
  const [contactName, setContactName] = useState('');
  const [proposalNotes, setProposalNotes] = useState('');
  const [selectedSections, setSelectedSections] = useState<Record<SectionKey, boolean>>({
    cover: true,
    whySaffhire: true,
    services: true,
    packages: true,
    pricing: true,
    process: true,
  });
  const [presetId, setPresetId] = useState(pricingPresets[0].id);
  const [minimumPackage, setMinimumPackage] = useState<PriceRow[]>(pricingPresets[0].minimumPackage);
  const [individualPricing, setIndividualPricing] = useState<PriceRow[]>(pricingPresets[0].individual);

  const activePreset = useMemo(() => pricingPresets.find((preset) => preset.id === presetId) || pricingPresets[0], [presetId]);

  function toggleSection(key: SectionKey) {
    setSelectedSections((current) => ({ ...current, [key]: !current[key] }));
  }

  function applyPreset(nextPresetId: string) {
    const preset = pricingPresets.find((item) => item.id === nextPresetId) || pricingPresets[0];
    setPresetId(preset.id);
    setMinimumPackage(preset.minimumPackage.map((item) => ({ ...item, id: makeId('price') })));
    setIndividualPricing(preset.individual.map((item) => ({ ...item, id: makeId('price') })));
  }

  function updateMinimumRow(id: string, updates: Partial<PriceRow>) {
    setMinimumPackage((current) => current.map((rowItem) => (rowItem.id === id ? { ...rowItem, ...updates } : rowItem)));
  }

  function updateIndividualRow(id: string, updates: Partial<PriceRow>) {
    setIndividualPricing((current) => current.map((rowItem) => (rowItem.id === id ? { ...rowItem, ...updates } : rowItem)));
  }

  function addMinimumRow() {
    setMinimumPackage((current) => [...current, row('New line item', '')]);
  }

  function addIndividualRow() {
    setIndividualPricing((current) => [...current, row('New service', '')]);
  }

  function removeMinimumRow(id: string) {
    setMinimumPackage((current) => (current.length <= 1 ? current : current.filter((rowItem) => rowItem.id !== id)));
  }

  function removeIndividualRow(id: string) {
    setIndividualPricing((current) => (current.length <= 1 ? current : current.filter((rowItem) => rowItem.id !== id)));
  }

  function resetBuilder() {
    setClientName('');
    setContactName('');
    setProposalNotes('');
    setSelectedSections({
      cover: true,
      whySaffhire: true,
      services: true,
      packages: true,
      pricing: true,
      process: true,
    });
    applyPreset('direct');
    sessionStorage.removeItem('saffhire_proposal_preview');
  }

  function buildPreview() {
    const sections = sectionOptions.filter((section) => selectedSections[section.key]).map((section) => section.key);
    sessionStorage.setItem(
      'saffhire_proposal_preview',
      JSON.stringify({
        clientName: clientName.trim(),
        contactName: contactName.trim(),
        proposalNotes: proposalNotes.trim(),
        sections,
        pricingPresetName: activePreset.name,
        minimumPackage: minimumPackage.filter((item) => item.label.trim()),
        individualPricing: individualPricing.filter((item) => item.label.trim()),
        createdAt: new Date().toISOString(),
      }),
    );
    window.location.href = '/admin/proposals/preview';
  }

  const selectedCount = Object.values(selectedSections).filter(Boolean).length;
  const canPreview = selectedCount > 0;

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Proposal setup</h2>
            <p className="mt-1 text-sm text-slate-600">Optional client details appear on the proposal when provided.</p>
          </div>
          <button type="button" onClick={resetBuilder} className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-gray-50">
            Reset / start over
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Client / company name</span>
            <input value={clientName} onChange={(event) => setClientName(event.target.value)} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none" placeholder="Optional" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Contact name</span>
            <input value={contactName} onChange={(event) => setContactName(event.target.value)} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none" placeholder="Optional" />
          </label>
        </div>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Notes (optional)</span>
          <textarea
            value={proposalNotes}
            onChange={(event) => setProposalNotes(event.target.value)}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
            placeholder="Internal notes or client-specific language to show on the proposal."
          />
        </label>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900">Select proposal sections</h2>
        <p className="mt-1 text-sm text-slate-600">Turn pages on or off. Only selected sections will appear in the generated proposal.</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sectionOptions.map((section) => (
            <label key={section.key} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${selectedSections[section.key] ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
              <input type="checkbox" checked={selectedSections[section.key]} onChange={() => toggleSection(section.key)} className="mt-1 h-4 w-4" />
              <span>
                <span className="block font-bold text-slate-900">{section.label}</span>
                <span className="mt-1 block text-sm text-slate-600">{section.description}</span>
              </span>
            </label>
          ))}
        </div>
      </section>

      {selectedSections.pricing ? (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Pricing page</h2>
              <p className="mt-1 text-sm text-slate-600">Choose a price sheet template, then edit any line items before generating the proposal.</p>
            </div>
            <label className="block min-w-[260px]">
              <span className="mb-2 block text-sm font-bold text-slate-700">Price sheet</span>
              <select value={presetId} onChange={(event) => applyPreset(event.target.value)} className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none">
                {pricingPresets.map((preset) => (
                  <option key={preset.id} value={preset.id}>{preset.name}</option>
                ))}
              </select>
            </label>
          </div>

          <p className="mb-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">{activePreset.description}</p>

          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Minimum package</h3>
              <button type="button" onClick={addMinimumRow} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-gray-50">Add row</button>
            </div>
            <div className="space-y-2">
              {minimumPackage.map((item) => (
                <div key={item.id} className="grid gap-2 rounded-xl border border-gray-100 bg-slate-50 p-3 md:grid-cols-[1fr_160px_100px]">
                  <input value={item.label} onChange={(event) => updateMinimumRow(item.id, { label: event.target.value })} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none" placeholder="Line item" />
                  <input value={item.price} onChange={(event) => updateMinimumRow(item.id, { price: event.target.value })} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none" placeholder="Price" />
                  <button type="button" onClick={() => removeMinimumRow(item.id)} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-gray-50">Remove</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Individual pricing</h3>
              <button type="button" onClick={addIndividualRow} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-gray-50">Add row</button>
            </div>
            <div className="space-y-2">
              {individualPricing.map((item) => (
                <div key={item.id} className="grid gap-2 rounded-xl border border-gray-100 bg-slate-50 p-3 md:grid-cols-[1fr_160px_100px]">
                  <input value={item.label} onChange={(event) => updateIndividualRow(item.id, { label: event.target.value })} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none" placeholder="Service" />
                  <input value={item.price} onChange={(event) => updateIndividualRow(item.id, { price: event.target.value })} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none" placeholder="Price" />
                  <button type="button" onClick={() => removeIndividualRow(item.id)} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-gray-50">Remove</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Generate proposal</h2>
            <p className="mt-1 text-sm text-slate-600">{selectedCount} section{selectedCount === 1 ? '' : 's'} selected. Open the preview, review it, then use Print to save as PDF.</p>
          </div>
          <button type="button" disabled={!canPreview} onClick={buildPreview} className="rounded-md bg-green-500 px-6 py-3 text-sm font-bold text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-gray-300">
            Preview proposal
          </button>
        </div>
      </section>
    </div>
  );
}

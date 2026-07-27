'use client';

import { useMemo, useState } from 'react';
import type { PriceRow as StoredPriceRow, ProposalPricingPage } from '@/lib/proposalPricingPages';

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

function toEditableRows(rows: StoredPriceRow[]): PriceRow[] {
  return (rows || []).map((item) => ({
    id: makeId('price'),
    label: item.label,
    price: item.price,
  }));
}

function toStoredRows(rows: PriceRow[]): StoredPriceRow[] {
  return rows
    .map((item) => ({ label: item.label.trim(), price: item.price.trim() }))
    .filter((item) => item.label);
}

function blankRows(): PriceRow[] {
  return [{ id: makeId('price'), label: '', price: '' }];
}

export default function ProposalBuilder({ initialPricingPages }: { initialPricingPages: ProposalPricingPage[] }) {
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

  const [pricingPages, setPricingPages] = useState<ProposalPricingPage[]>(initialPricingPages);
  const [presetId, setPresetId] = useState(initialPricingPages[0]?.id || '');
  const [pageName, setPageName] = useState(initialPricingPages[0]?.name || '');
  const [pageDescription, setPageDescription] = useState(initialPricingPages[0]?.description || '');
  const [minimumPackage, setMinimumPackage] = useState<PriceRow[]>(
    initialPricingPages[0] ? toEditableRows(initialPricingPages[0].minimum_package) : blankRows(),
  );
  const [individualPricing, setIndividualPricing] = useState<PriceRow[]>(
    initialPricingPages[0] ? toEditableRows(initialPricingPages[0].individual_pricing) : blankRows(),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const activePage = useMemo(
    () => pricingPages.find((page) => page.id === presetId) || pricingPages[0] || null,
    [pricingPages, presetId],
  );

  const isPersistedPage = Boolean(activePage && !['direct', 'staffing', 'staffing-sales'].includes(activePage.id));

  function toggleSection(key: SectionKey) {
    setSelectedSections((current) => ({ ...current, [key]: !current[key] }));
  }

  function loadPage(page: ProposalPricingPage) {
    setPresetId(page.id);
    setPageName(page.name);
    setPageDescription(page.description || '');
    setMinimumPackage(toEditableRows(page.minimum_package));
    setIndividualPricing(toEditableRows(page.individual_pricing));
    setStatusMessage('');
    setErrorMessage('');
  }

  function applyPage(nextId: string) {
    const page = pricingPages.find((item) => item.id === nextId);
    if (!page) return;
    loadPage(page);
  }

  function startNewPage() {
    setPresetId('');
    setPageName('');
    setPageDescription('');
    setMinimumPackage(blankRows());
    setIndividualPricing(blankRows());
    setStatusMessage('Editing a new pricing page. Save to keep it.');
    setErrorMessage('');
  }

  function updateMinimumRow(id: string, updates: Partial<PriceRow>) {
    setMinimumPackage((current) => current.map((rowItem) => (rowItem.id === id ? { ...rowItem, ...updates } : rowItem)));
  }

  function updateIndividualRow(id: string, updates: Partial<PriceRow>) {
    setIndividualPricing((current) => current.map((rowItem) => (rowItem.id === id ? { ...rowItem, ...updates } : rowItem)));
  }

  function addMinimumRow() {
    setMinimumPackage((current) => [...current, { id: makeId('price'), label: '', price: '' }]);
  }

  function addIndividualRow() {
    setIndividualPricing((current) => [...current, { id: makeId('price'), label: '', price: '' }]);
  }

  function removeMinimumRow(id: string) {
    setMinimumPackage((current) => (current.length <= 1 ? current : current.filter((rowItem) => rowItem.id !== id)));
  }

  function removeIndividualRow(id: string) {
    setIndividualPricing((current) => (current.length <= 1 ? current : current.filter((rowItem) => rowItem.id !== id)));
  }

  async function savePricingPage() {
    setIsSaving(true);
    setStatusMessage('');
    setErrorMessage('');

    try {
      const payload = {
        name: pageName.trim(),
        description: pageDescription.trim(),
        minimum_package: toStoredRows(minimumPackage),
        individual_pricing: toStoredRows(individualPricing),
      };

      if (!payload.name) throw new Error('Pricing page name is required.');

      const isUpdate = Boolean(presetId && isPersistedPage);
      const response = await fetch(
        isUpdate ? `/api/admin/proposals/pricing-pages/${presetId}` : '/api/admin/proposals/pricing-pages',
        {
          method: isUpdate ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to save pricing page.');

      const saved = data.page as ProposalPricingPage;
      setPricingPages((current) => {
        const without = current.filter((page) => page.id !== saved.id && !['direct', 'staffing', 'staffing-sales'].includes(page.id));
        const next = [...without, saved].sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name));
        return next;
      });
      loadPage(saved);
      setStatusMessage(isUpdate ? 'Pricing page updated.' : 'Pricing page created.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save pricing page.');
    } finally {
      setIsSaving(false);
    }
  }

  async function deletePricingPage() {
    if (!presetId || !isPersistedPage) return;
    if (!window.confirm(`Delete pricing page "${pageName || 'Untitled'}"? This cannot be undone.`)) return;

    setIsDeleting(true);
    setStatusMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`/api/admin/proposals/pricing-pages/${presetId}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to delete pricing page.');

      const remaining = pricingPages.filter((page) => page.id !== presetId);
      setPricingPages(remaining);
      if (remaining[0]) {
        loadPage(remaining[0]);
      } else {
        startNewPage();
      }
      setStatusMessage('Pricing page deleted.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to delete pricing page.');
    } finally {
      setIsDeleting(false);
    }
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
    if (pricingPages[0]) loadPage(pricingPages[0]);
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
        pricingPresetName: pageName.trim() || activePage?.name || 'Pricing',
        minimumPackage: toStoredRows(minimumPackage),
        individualPricing: toStoredRows(individualPricing),
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
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Pricing pages</h2>
              <p className="mt-1 text-sm text-slate-600">Create, edit, or delete reusable price sheets for proposals.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <label className="block min-w-[240px]">
                <span className="mb-2 block text-sm font-bold text-slate-700">Saved price sheet</span>
                <select
                  value={presetId}
                  onChange={(event) => applyPage(event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
                >
                  <option value="">New unsaved page</option>
                  {pricingPages.map((page) => (
                    <option key={page.id} value={page.id}>{page.name}</option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={startNewPage} className="rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-gray-50">
                New pricing page
              </button>
            </div>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">Pricing page name</span>
              <input
                value={pageName}
                onChange={(event) => setPageName(event.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
                placeholder="e.g. Healthcare Pricing"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">Description</span>
              <input
                value={pageDescription}
                onChange={(event) => setPageDescription(event.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
                placeholder="Optional short description"
              />
            </label>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={savePricingPage}
              disabled={isSaving}
              className="rounded-md bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isSaving ? 'Saving...' : isPersistedPage ? 'Save changes' : 'Save as new pricing page'}
            </button>
            {isPersistedPage ? (
              <button
                type="button"
                onClick={deletePricingPage}
                disabled={isDeleting}
                className="rounded-md border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? 'Deleting...' : 'Delete pricing page'}
              </button>
            ) : null}
          </div>

          {statusMessage ? <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{statusMessage}</div> : null}
          {errorMessage ? <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{errorMessage}</div> : null}

          {!isPersistedPage && presetId ? (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              This is a built-in starter sheet. Click <b>Save as new pricing page</b> to create an editable copy in the database.
            </div>
          ) : null}

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

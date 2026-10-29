'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BaseSheet,
  BaseSource,
  BuilderLine,
  BuilderPackage,
  BuilderProposal,
  CatalogEntry,
  CatalogPricingItem,
  IndividualRow,
  PriceKey,
  buildCatalog,
  buildClientPreview,
  calcLine,
  duplicatePackage,
  emptyProposal,
  individualBaseUnit,
  individualUnit,
  lineBaseUnitPrice,
  makeId,
  money,
  moveItem,
  newLine,
  newPackage,
  normalizeProposal,
  packageToSheetRows,
  priceCategories,
  proposalTotals,
  seedIndividual,
  findIndividualSeedSheet,
  coverageWarnings,
  coverageApplies,
  baseIncludesCoverage,
  linePreCoveragePrice,
  individualPreCoverage,
  sectionOptions,
} from '@/lib/proposalBuilder';

export const BUILDER_PREVIEW_KEY = 'saffhire_proposal_builder_preview';
const LOCAL_DRAFTS_KEY = 'saffhire_proposal_builder_local_drafts';
const WORKING_KEY = 'saffhire_proposal_builder_working';

type DraftSummary = { id: string; name: string; client_name: string; updated_at: string; local?: boolean };
type LocalDraft = DraftSummary & { data: BuilderProposal };

const input = 'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none';
const btn = 'rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50';
const card = 'rounded-2xl border border-gray-200 bg-white p-6 shadow-sm';

function normLabel(value: string) {
  return value.toLowerCase().replace(/seaarch/g, 'search').replace(/[^a-z0-9]+/g, ' ').trim();
}

function readLocalDrafts(): LocalDraft[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(LOCAL_DRAFTS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function defaultBase(_sheets: BaseSheet[]): BaseSource {
  return { kind: 'category', priceKey: 'staffing_price' };
}

export default function MultiPackageProposalBuilder({ items, sheets: initialSheets }: { items: CatalogPricingItem[]; sheets: BaseSheet[] }) {
  const [sheets, setSheets] = useState<BaseSheet[]>(initialSheets);
  const [proposal, setProposal] = useState<BuilderProposal>(() => emptyProposal(defaultBase(initialSheets)));
  const [draftId, setDraftId] = useState<string>('');
  const [draftName, setDraftName] = useState('');
  const [drafts, setDrafts] = useState<DraftSummary[]>([]);
  const [serverDrafts, setServerDrafts] = useState(true);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const states = useMemo(() => Array.from(new Set(items.map((item) => item.state).filter(Boolean))).sort(), [items]);
  const catalogList = useMemo(() => buildCatalog(proposal.base, sheets, items, proposal.state), [proposal.base, sheets, items, proposal.state]);
  const catalog = useMemo(() => new Map(catalogList.map((entry) => [entry.key, entry])), [catalogList]);
  // 10% sales coverage is applied at most once: never when the base sheet already includes it.
  const coverageInSheet = useMemo(() => baseIncludesCoverage(proposal, sheets), [proposal, sheets]);
  const coverage = useMemo(() => coverageApplies(proposal, sheets), [proposal, sheets]);
  const totals = useMemo(() => proposalTotals(proposal, catalog, sheets), [proposal, catalog, sheets]);
  const fallbackSheet = useMemo(() => findIndividualSeedSheet(sheets), [sheets]);
  const warnings = useMemo(() => coverageWarnings(proposal, sheets, Boolean(proposal.aLaCarteOnly)), [proposal, sheets]);

  const baseLabel = useMemo(() => {
    const base = proposal.base;
    const name = base.kind === 'sheet' ? sheets.find((s) => s.id === base.sheetId)?.name || 'Price sheet' : `${priceCategories.find((c) => c.key === base.priceKey)?.label || ''} pricing`;
    return name;
  }, [proposal.base, sheets]);

  // Restore the working copy (so Back from preview keeps edits) and load drafts.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(WORKING_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setProposal(normalizeProposal(parsed.proposal, defaultBase(initialSheets)));
        setDraftId(parsed.draftId || '');
        setDraftName(parsed.draftName || '');
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
    void refreshDrafts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(WORKING_KEY, JSON.stringify({ proposal, draftId, draftName }));
  }, [proposal, draftId, draftName, hydrated]);

  // Seed the individual table the first time a catalog is available.
  useEffect(() => {
    if (!hydrated || proposal.individual.length) return;
    const seeded = seedIndividual(proposal.base, sheets, catalogList, fallbackSheet);
    if (seeded.length) setProposal((current) => (current.individual.length ? current : { ...current, individual: seeded }));
  }, [hydrated, catalogList, proposal.base, proposal.individual.length, sheets, fallbackSheet]);

  async function refreshDrafts() {
    const local = readLocalDrafts().map(({ data, ...rest }) => ({ ...rest, local: true }));
    try {
      const response = await fetch('/api/admin/proposals/drafts', { cache: 'no-store' });
      const body = await response.json();
      if (response.status === 503) {
        setServerDrafts(false);
        setDrafts(local);
        return;
      }
      if (!response.ok) throw new Error(body.error || 'Unable to load drafts.');
      setServerDrafts(true);
      setDrafts([...(body.drafts || []), ...local]);
    } catch (reason) {
      setServerDrafts(false);
      setDrafts(local);
      setError(reason instanceof Error ? reason.message : 'Unable to load drafts.');
    }
  }

  function update(patch: Partial<BuilderProposal>) {
    setProposal((current) => ({ ...current, ...patch }));
  }

  function remapToCatalog(next: BuilderProposal): BuilderProposal {
    const list = buildCatalog(next.base, sheets, items, next.state);
    const byLabel = new Map(list.map((entry) => [normLabel(entry.label), entry]));
    const keys = new Set(list.map((entry) => entry.key));
    const remap = (line: BuilderLine): BuilderLine => {
      if (!line.catalogKey || keys.has(line.catalogKey)) return line;
      const entry = byLabel.get(normLabel(line.label));
      return { ...line, catalogKey: entry ? entry.key : '' };
    };
    return {
      ...next,
      packages: next.packages.map((pkg) => ({ ...pkg, minimumItems: pkg.minimumItems.map(remap), lines: pkg.lines.map(remap) })),
      individual: next.individual.map((row) => {
        if (row.catalogKey && keys.has(row.catalogKey)) return row;
        const label = normLabel(row.label);
        const entry = byLabel.get(label) || (label === '1 county criminal search' ? byLabel.get('county criminal search') : undefined);
        return { ...row, catalogKey: entry ? entry.key : '' };
      }),
    };
  }

  function changeBase(base: BaseSource) {
    setProposal((current) => remapToCatalog({ ...current, base }));
  }

  function changeState(state: string) {
    setProposal((current) => remapToCatalog({ ...current, state }));
  }

  function resetAll() {
    if (!window.confirm('Reset the builder and start over? Unsaved changes will be lost.')) return;
    setProposal(emptyProposal(defaultBase(sheets)));
    setDraftId('');
    setDraftName('');
    setStatus('Builder reset.');
    setError('');
    sessionStorage.removeItem(BUILDER_PREVIEW_KEY);
  }

  // ---------- packages ----------
  function updatePackage(id: string, patch: Partial<BuilderPackage>) {
    setProposal((current) => ({ ...current, packages: current.packages.map((pkg) => (pkg.id === id ? { ...pkg, ...patch } : pkg)) }));
  }

  function updateLine(pkgId: string, list: 'minimumItems' | 'lines', lineId: string, patch: Partial<BuilderLine>) {
    setProposal((current) => ({
      ...current,
      packages: current.packages.map((pkg) => (pkg.id === pkgId ? { ...pkg, [list]: pkg[list].map((line) => (line.id === lineId ? { ...line, ...patch } : line)) } : pkg)),
    }));
  }

  function addLine(pkgId: string, list: 'minimumItems' | 'lines') {
    setProposal((current) => ({
      ...current,
      packages: current.packages.map((pkg) => (pkg.id === pkgId ? { ...pkg, [list]: [...pkg[list], newLine()] } : pkg)),
    }));
  }

  function removeLine(pkgId: string, list: 'minimumItems' | 'lines', lineId: string) {
    setProposal((current) => ({
      ...current,
      packages: current.packages.map((pkg) => (pkg.id === pkgId ? { ...pkg, [list]: pkg[list].filter((line) => line.id !== lineId) } : pkg)),
    }));
  }

  function pickItem(pkgId: string, list: 'minimumItems' | 'lines', line: BuilderLine, key: string) {
    if (key === '__custom') {
      updateLine(pkgId, list, line.id, { catalogKey: '', label: line.label || '', priceOverride: line.priceOverride ?? 0, included: false });
      return;
    }
    const entry = catalog.get(key);
    updateLine(pkgId, list, line.id, { catalogKey: key, label: entry?.label || '', priceOverride: null, included: Boolean(entry?.included) || list === 'minimumItems' && line.included });
  }

  function addPackage() {
    setProposal((current) => ({ ...current, packages: [...current.packages, newPackage(current.packages.length + 1)] }));
  }

  function movePackage(index: number, delta: number) {
    setProposal((current) => ({ ...current, packages: moveItem(current.packages, index, delta) }));
  }

  function dupPackage(index: number) {
    setProposal((current) => {
      const next = current.packages.slice();
      next.splice(index + 1, 0, duplicatePackage(current.packages[index]));
      return { ...current, packages: next };
    });
  }

  function removePackage(id: string) {
    setProposal((current) => (current.packages.length <= 1 ? current : { ...current, packages: current.packages.filter((pkg) => pkg.id !== id) }));
  }

  // ---------- individual ----------
  function updateIndividual(id: string, patch: Partial<IndividualRow>) {
    setProposal((current) => ({ ...current, individual: current.individual.map((row) => (row.id === id ? { ...row, ...patch } : row)) }));
  }

  function reseedIndividual() {
    if (proposal.individual.length && !window.confirm('Replace the individual pricing table with the rows from the selected base?')) return;
    update({ individual: seedIndividual(proposal.base, sheets, catalogList, fallbackSheet) });
  }

  // ---------- drafts ----------
  async function saveDraft(asNew = false) {
    const name = draftName.trim() || [proposal.clientName.trim(), 'proposal'].filter(Boolean).join(' ');
    if (!name.trim()) {
      setError('Enter a draft name.');
      return;
    }
    setBusy(true);
    setError('');
    setStatus('');
    const payload = { name, clientName: proposal.clientName, data: proposal };
    try {
      const isLocal = draftId.startsWith('local-');
      if (serverDrafts && !isLocal) {
        const response = await fetch(draftId && !asNew ? `/api/admin/proposals/drafts/${draftId}` : '/api/admin/proposals/drafts', {
          method: draftId && !asNew ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const body = await response.json();
        if (response.status !== 503) {
          if (!response.ok) throw new Error(body.error || 'Unable to save draft.');
          setDraftId(body.draft.id);
          setDraftName(body.draft.name);
          setStatus(`Draft "${body.draft.name}" saved.`);
          await refreshDrafts();
          return;
        }
        setServerDrafts(false);
      }
      const local = readLocalDrafts();
      const id = draftId && isLocal && !asNew ? draftId : `local-${makeId('draft')}`;
      const entry: LocalDraft = { id, name, client_name: proposal.clientName, updated_at: new Date().toISOString(), data: proposal };
      localStorage.setItem(LOCAL_DRAFTS_KEY, JSON.stringify([entry, ...local.filter((d) => d.id !== id)].slice(0, 50)));
      setDraftId(id);
      setDraftName(name);
      setStatus(`Draft "${name}" saved in this browser (server draft storage is not installed yet).`);
      await refreshDrafts();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to save draft.');
    } finally {
      setBusy(false);
    }
  }

  async function loadDraft(id: string) {
    if (!id) return;
    setBusy(true);
    setError('');
    setStatus('');
    try {
      let data: unknown;
      let name = '';
      if (id.startsWith('local-')) {
        const found = readLocalDrafts().find((d) => d.id === id);
        if (!found) throw new Error('Draft not found in this browser.');
        data = found.data;
        name = found.name;
      } else {
        const response = await fetch(`/api/admin/proposals/drafts/${id}`, { cache: 'no-store' });
        const body = await response.json();
        if (!response.ok) throw new Error(body.error || 'Unable to load draft.');
        data = body.draft.data;
        name = body.draft.name;
      }
      setProposal(normalizeProposal(data, defaultBase(sheets)));
      setDraftId(id);
      setDraftName(name);
      setStatus(`Loaded draft "${name}".`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to load draft.');
    } finally {
      setBusy(false);
    }
  }

  async function savePackagesAsSheets() {
    const label = proposal.clientName.trim() || draftName.trim() || 'Proposal';
    if (!window.confirm(`Create ${proposal.packages.length} new saved price sheet(s), one per package, named "${label} – <package>"? Existing price sheets are not changed.`)) return;
    setBusy(true);
    setError('');
    setStatus('');
    try {
      const individual = proposal.includeIndividual
        ? proposal.individual
            .filter((row) => row.label.trim())
            .map((row) => {
              const unit = individualUnit(row, catalog, coverage);
              return { label: row.label.trim(), price: unit === null ? '' : money(unit) };
            })
        : [];
      const created: BaseSheet[] = [];
      for (const pkg of proposal.packages) {
        const response = await fetch('/api/admin/proposals/pricing-pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `${label} – ${pkg.name.trim() || 'Package'}`,
            description: pkg.description.trim() || `Created from the proposal builder (${baseLabel}${coverage ? '; includes 10% sales coverage' : ''}).`,
            minimum_package: packageToSheetRows(pkg, catalog, coverage),
            // The saved prices already contain the 10% whenever it was applied here or came from the base sheet.
            includes_sales_coverage: coverage || coverageInSheet,
            individual_pricing: individual,
          }),
        });
        const body = await response.json();
        if (!response.ok) throw new Error(body.error || 'Unable to create price sheet.');
        created.push(body.page);
      }
      setSheets((current) => [...current, ...created]);
      setStatus(`Created ${created.length} new price sheet(s).`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to create price sheets.');
    } finally {
      setBusy(false);
    }
  }

  function openPreview() {
    const preview = buildClientPreview(proposal, catalog, baseLabel, new Date(), sheets);
    sessionStorage.setItem(BUILDER_PREVIEW_KEY, JSON.stringify(preview));
    window.location.href = '/admin/proposals/builder/preview';
  }

  const needsState = proposal.base.kind === 'category' && !proposal.state;
  const alacarte = Boolean(proposal.aLaCarteOnly);
  const sectionCount = sectionOptions.filter((s) => proposal.sections[s.key] && !(alacarte && s.key === 'packages')).length;

  function renderLines(pkg: BuilderPackage, list: 'minimumItems' | 'lines') {
    const rows = pkg[list];
    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="text-left text-xs font-bold uppercase tracking-wide text-slate-500">
              <th className="py-2 pr-2">Search / item</th>
              <th className="w-20 py-2 pr-2">Qty</th>
              <th className="w-44 py-2 pr-2">Client unit price</th>
              <th className="w-20 py-2 pr-2">Included</th>
              <th className="w-24 py-2 pr-2 text-right">Total</th>
              <th className="w-32 py-2 pr-2 text-right text-amber-700">Cost / profit</th>
              <th className="w-20 py-2" />
            </tr>
          </thead>
          <tbody>
            {rows.map((line) => {
              const entry = catalog.get(line.catalogKey);
              const calc = calcLine(line, entry, coverage);
              const baseUnit = lineBaseUnitPrice(entry, false);
              const preCoverage = linePreCoveragePrice(line, entry);
              const missing = line.catalogKey && !entry;
              return (
                <tr key={line.id} className="border-t border-gray-100 align-top" data-line-label={line.label}>
                  <td className="py-2 pr-2">
                    <select value={line.catalogKey || (line.label || line.priceOverride !== null ? '__custom' : '')} onChange={(e) => pickItem(pkg.id, list, line, e.target.value)} className={input} aria-label="Select search">
                      <option value="">{needsState ? 'Select majority state first' : 'Select search'}</option>
                      {catalogList.map((c) => (
                        <option key={c.key} value={c.key}>{c.label}{c.included ? ' (Included)' : c.basePrice === null ? ' (no price)' : ''}</option>
                      ))}
                      <option value="__custom">Custom item…</option>
                    </select>
                    {!line.catalogKey && (line.label || line.priceOverride !== null) ? (
                      <input value={line.label} onChange={(e) => updateLine(pkg.id, list, line.id, { label: e.target.value })} className={`${input} mt-1`} placeholder="Custom item name" />
                    ) : null}
                    {missing ? <div className="mt-1 text-xs text-red-600">Not in the current base; set a price manually.</div> : null}
                  </td>
                  <td className="py-2 pr-2">
                    <input type="number" min="0" value={line.quantity} onChange={(e) => updateLine(pkg.id, list, line.id, { quantity: Math.max(0, Number(e.target.value) || 0) })} className={input} aria-label="Quantity" />
                  </td>
                  <td className="py-2 pr-2">
                    {line.included ? (
                      <div className="px-1 py-2 text-slate-500">Included</div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={preCoverage ?? ''}
                          onChange={(e) => updateLine(pkg.id, list, line.id, { priceOverride: e.target.value === '' ? null : Number(e.target.value) })}
                          className={`${input} ${calc.edited ? 'border-amber-400 bg-amber-50' : ''}`}
                          aria-label="Client unit price"
                        />
                        {calc.edited && line.catalogKey ? (
                          <button type="button" title={`Reset to base ${baseUnit === null ? '' : money(baseUnit)}`} onClick={() => updateLine(pkg.id, list, line.id, { priceOverride: null })} className="shrink-0 rounded border border-amber-300 px-1.5 py-1 text-[11px] font-bold text-amber-800">↺</button>
                        ) : null}
                      </div>
                    )}
                    {calc.edited ? <div className="mt-1 text-[11px] font-bold text-amber-700" data-edited="true">edited{baseUnit !== null && line.catalogKey ? ` · base ${money(baseUnit)}` : ''}</div> : null}
                    {!line.included && coverage && calc.unit !== null ? <div className="mt-1 text-[11px] text-slate-500" data-client-unit>Client price {money(calc.unit)}</div> : null}
                  </td>
                  <td className="py-2 pr-2 text-center">
                    <input type="checkbox" checked={line.included} onChange={(e) => updateLine(pkg.id, list, line.id, { included: e.target.checked })} className="mt-2 h-4 w-4" aria-label="Included" />
                  </td>
                  <td className="py-2 pr-2 text-right font-bold text-slate-900">{line.included ? 'Included' : money(calc.total)}</td>
                  <td className="py-2 pr-2 text-right text-xs text-amber-800">
                    {calc.cost === null ? '—' : (
                      <>
                        <div>{money(calc.cost)}</div>
                        <div className="font-bold">{money(calc.total - calc.cost)}</div>
                      </>
                    )}
                  </td>
                  <td className="py-2 text-right">
                    <button type="button" onClick={() => removeLine(pkg.id, list, line.id)} className={btn}>Remove</button>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 ? (
              <tr><td colSpan={7} className="py-3 text-sm text-slate-500">{list === 'minimumItems' ? 'No minimum package items (optional).' : 'No line items yet.'}</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className={card}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-1 flex-wrap items-end gap-3">
            <label className="block min-w-[240px] flex-1">
              <span className="mb-2 block text-sm font-bold text-slate-700">Draft name</span>
              <input value={draftName} onChange={(e) => setDraftName(e.target.value)} className={input} placeholder="e.g. Corporate Talent Finder – Oct 2026" />
            </label>
            <button type="button" disabled={busy} onClick={() => saveDraft(false)} className="rounded-md bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800 disabled:bg-gray-300">{draftId ? 'Save draft' : 'Save new draft'}</button>
            {draftId ? <button type="button" disabled={busy} onClick={() => saveDraft(true)} className={btn}>Save as copy</button> : null}
          </div>
          <label className="block min-w-[260px]">
            <span className="mb-2 block text-sm font-bold text-slate-700">Load draft</span>
            <select value="" onChange={(e) => loadDraft(e.target.value)} className={input} disabled={busy}>
              <option value="">{drafts.length ? 'Choose a saved draft…' : 'No saved drafts yet'}</option>
              {drafts.map((d) => (
                <option key={d.id} value={d.id}>{d.name}{d.local ? ' (this browser)' : ''} · {new Date(d.updated_at).toLocaleDateString()}</option>
              ))}
            </select>
          </label>
        </div>
        {!serverDrafts ? <p className="mt-3 text-xs text-amber-700">Server draft storage is not installed yet, so drafts are saved in this browser only.</p> : null}
        {status ? <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800" role="status">{status}</div> : null}
        {error ? <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{error}</div> : null}
      </section>

      <section className={card}>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Proposal setup</h2>
            <p className="mt-1 text-sm text-slate-600">Client details appear on the cover when provided.</p>
          </div>
          <button type="button" onClick={resetAll} className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-gray-50">Reset / start over</button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Client / company name</span>
            <input value={proposal.clientName} onChange={(e) => update({ clientName: e.target.value })} className={input} name="clientName" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Contact name</span>
            <input value={proposal.contactName} onChange={(e) => update({ contactName: e.target.value })} className={input} name="contactName" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Majority search state</span>
            <select value={proposal.state} onChange={(e) => changeState(e.target.value)} className={input} name="state">
              <option value="">Select state</option>
              {states.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
        </div>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-bold text-slate-700">Notes (shown on the cover)</span>
          <textarea value={proposal.notes} onChange={(e) => update({ notes: e.target.value })} rows={3} className={input} name="notes" />
        </label>
      </section>

      <section className={`${card} ${alacarte ? 'border-green-500 ring-1 ring-green-200' : ''}`}>
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" name="aLaCarteOnly" checked={alacarte} onChange={(e) => update({ aLaCarteOnly: e.target.checked })} className="mt-1.5 h-5 w-5" />
          <span>
            <span className="block text-2xl font-black text-slate-900">À la carte price list only</span>
            <span className="mt-1 block text-sm text-slate-600">Send just the individual price list. Packages are hidden and not required, and the Service Packages page, package pricing tables and package totals are left out of the preview and PDF. Cover and the other sections still follow the toggles below.</span>
          </span>
        </label>
      </section>

      <section className={card}>
        <h2 className="text-2xl font-black text-slate-900">Proposal sections</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sectionOptions.map((section) => {
            const off = alacarte && section.key === 'packages';
            return (
            <label key={section.key} className={`flex items-start gap-3 rounded-xl border p-4 ${off ? 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-60' : proposal.sections[section.key] ? 'cursor-pointer border-green-500 bg-green-50' : 'cursor-pointer border-gray-200 bg-white hover:bg-gray-50'}`}>
              <input type="checkbox" disabled={off} checked={off ? false : proposal.sections[section.key]} onChange={() => update({ sections: { ...proposal.sections, [section.key]: !proposal.sections[section.key] } })} className="mt-1 h-4 w-4" />
              <span>
                <span className="block font-bold text-slate-900">{section.label}</span>
                <span className="mt-1 block text-sm text-slate-600">{off ? 'Not used in à la carte mode' : section.key === 'pricing' && alacarte ? 'Individual (à la carte) price list' : section.description}</span>
              </span>
            </label>
            );
          })}
        </div>
      </section>

      <section className={card}>
        <h2 className="text-2xl font-black text-slate-900">Base pricing</h2>
        <p className="mt-1 text-sm text-slate-600">Line prices auto-fill from this base. You can still edit any price below.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className={`block rounded-xl border p-4 ${proposal.base.kind === 'category' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
            <span className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <input type="radio" name="baseKind" checked={proposal.base.kind === 'category'} onChange={() => changeBase({ kind: 'category', priceKey: 'staffing_price' })} />
              Pricing category (uses the majority search state)
            </span>
            <select
              value={proposal.base.kind === 'category' ? proposal.base.priceKey : ''}
              onChange={(e) => changeBase({ kind: 'category', priceKey: e.target.value as PriceKey })}
              className={`${input} mt-3`}
              name="priceCategory"
            >
              {proposal.base.kind !== 'category' ? <option value="">Choose a category</option> : null}
              {priceCategories.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
            {needsState ? <span className="mt-2 block text-xs font-bold text-amber-700">Select the majority search state to load category prices.</span> : null}
          </label>
          <label className={`block rounded-xl border p-4 ${proposal.base.kind === 'sheet' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
            <span className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <input type="radio" name="baseKind" checked={proposal.base.kind === 'sheet'} onChange={() => changeBase({ kind: 'sheet', sheetId: sheets[0]?.id || '' })} disabled={!sheets.length} />
              Saved price sheet
            </span>
            <select
              value={proposal.base.kind === 'sheet' ? proposal.base.sheetId : ''}
              onChange={(e) => changeBase({ kind: 'sheet', sheetId: e.target.value })}
              className={`${input} mt-3`}
              name="priceSheet"
            >
              {proposal.base.kind !== 'sheet' ? <option value="">Choose a price sheet</option> : null}
              {sheets.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>
        </div>
        <label className="mt-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-slate-800">
          <input
            type="checkbox"
            checked={coverageInSheet || proposal.salesCoverage}
            disabled={coverageInSheet}
            onChange={(e) => update({ salesCoverage: e.target.checked })}
            className="mt-1 h-4 w-4"
            name="salesCoverage"
            aria-describedby="sales-coverage-help"
          />
          <span>
            <span className="block font-bold text-slate-900">Add 10% sales coverage</span>
            {coverageInSheet ? (
              <span id="sales-coverage-help" className="block font-bold text-green-800" data-coverage-locked>Already included in this price sheet</span>
            ) : (
              <span id="sales-coverage-help" className="block text-slate-600">Multiplies client prices by 1.10, once, including prices you edit (type the price before the 10%). Internal cost is unchanged.</span>
            )}
          </span>
        </label>
        {warnings.map((w) => (
          <div key={w} role="alert" data-coverage-warning className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <span className="block font-bold">Check sales coverage</span>
            <span className="block">{w}</span>
          </div>
        ))}
      </section>

      {!alacarte && proposal.packages.map((pkg, index) => {
        const t = totals.perPackage[index];
        return (
          <section key={pkg.id} className={card} data-package-index={index}>
            <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="grid flex-1 gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">Package {index + 1} name</span>
                  <input value={pkg.name} onChange={(e) => updatePackage(pkg.id, { name: e.target.value })} className={input} name={`package-${index}-name`} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">Description</span>
                  <input value={pkg.description} onChange={(e) => updatePackage(pkg.id, { description: e.target.value })} className={input} name={`package-${index}-description`} />
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className={btn} onClick={() => movePackage(index, -1)} disabled={index === 0} aria-label="Move package up">↑</button>
                <button type="button" className={btn} onClick={() => movePackage(index, 1)} disabled={index === proposal.packages.length - 1} aria-label="Move package down">↓</button>
                <button type="button" className={btn} onClick={() => dupPackage(index)}>Duplicate</button>
                <button type="button" className="rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-bold text-red-700 hover:bg-red-50 disabled:opacity-50" onClick={() => removePackage(pkg.id)} disabled={proposal.packages.length <= 1}>Remove</button>
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">Minimum package items <span className="text-sm font-normal text-slate-500">(optional)</span></h3>
                <button type="button" onClick={() => addLine(pkg.id, 'minimumItems')} className={btn}>Add minimum item</button>
              </div>
              {renderLines(pkg, 'minimumItems')}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">Line items</h3>
                <button type="button" onClick={() => addLine(pkg.id, 'lines')} className="rounded-md bg-slate-900 px-3 py-2 text-sm font-bold text-white hover:bg-slate-800">Add search</button>
              </div>
              {renderLines(pkg, 'lines')}
            </div>

            <div className="mt-5 flex flex-wrap items-end justify-end gap-6 border-t border-gray-100 pt-4">
              <div className="text-right text-xs text-amber-800">
                <div className="font-bold uppercase tracking-wide">Internal (admin only)</div>
                <div>Cost: {t.cost === null ? 'partly unknown' : money(t.cost)}</div>
                <div className="font-bold">Profit: {t.profit === null ? '—' : money(t.profit)}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold uppercase tracking-wide text-slate-500">Package total</div>
                <div className="text-2xl font-black text-slate-900" data-package-total={index}>{money(t.total)}</div>
              </div>
            </div>
          </section>
        );
      })}

      {alacarte ? null : <button type="button" onClick={addPackage} className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:bg-gray-50">Add another package</button>}

      <section className={card}>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-3">
            {alacarte ? null : <input type="checkbox" checked={proposal.includeIndividual} onChange={(e) => update({ includeIndividual: e.target.checked })} className="h-4 w-4" />}
            <span className="text-2xl font-black text-slate-900">Individual (à la carte) pricing</span>
          </label>
          <div className="flex gap-2">
            <button type="button" className={btn} onClick={reseedIndividual}>Reload from base</button>
            <button type="button" className={btn} onClick={() => update({ individual: [...proposal.individual, { id: makeId('ind'), label: '', catalogKey: '', priceOverride: 0 }] })}>Add row</button>
          </div>
        </div>
        {proposal.base.kind === 'category' && fallbackSheet ? (
          <p className="mb-3 text-xs text-slate-500" data-individual-seed>Seeded from the “{fallbackSheet.name}” price sheet{proposal.individual.some((r) => r.coverageIncluded) ? ' (prices already include 10% sales coverage)' : ''}. Use “Reload from base” to reseed.</p>
        ) : null}
        {alacarte || proposal.includeIndividual ? (
          <div className="space-y-2" data-individual-table>
            {proposal.individual.map((row) => {
              const entry = catalog.get(row.catalogKey);
              const base = individualBaseUnit(row, catalog, false);
              const pre = individualPreCoverage(row, catalog);
              const unit = individualUnit(row, catalog, coverage);
              const edited = row.priceOverride !== null && base !== null;
              return (
                <div key={row.id} className="grid items-center gap-2 rounded-xl border border-gray-100 bg-slate-50 p-3 md:grid-cols-[1fr_180px_auto_90px]">
                  <input value={row.label} onChange={(e) => updateIndividual(row.id, { label: e.target.value })} className={input} placeholder="Service" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={pre ?? ''}
                    onChange={(e) => updateIndividual(row.id, { priceOverride: e.target.value === '' ? null : Number(e.target.value) })}
                    className={`${input} ${edited ? 'border-amber-400 bg-amber-50' : ''}`}
                    aria-label="Individual price"
                  />
                  <div className="text-xs">
                    {edited ? (
                      <button type="button" onClick={() => updateIndividual(row.id, { priceOverride: null })} className="font-bold text-amber-700">edited · reset to {base === null ? 'base' : money(base)}</button>
                    ) : entry ? <span className="text-slate-500">from base</span> : base !== null ? <span className="text-slate-500">from sheet</span> : <span className="text-slate-500">manual</span>}
                    {unit !== null && pre !== null && unit !== pre ? <span className="ml-2 text-slate-500" data-client-unit>client {money(unit)}</span> : null}
                    {entry && entry.internalCost !== null && unit !== null ? <span className="ml-2 text-amber-800">cost {money(entry.internalCost)} · profit {money(unit - entry.internalCost)}</span> : null}
                  </div>
                  <button type="button" onClick={() => update({ individual: proposal.individual.filter((r) => r.id !== row.id) })} className={btn}>Remove</button>
                </div>
              );
            })}
            {!proposal.individual.length ? <p className="text-sm text-slate-500">No individual rows. Use Reload from base or Add row.</p> : null}
          </div>
        ) : <p className="text-sm text-slate-500">Individual pricing will not appear on the proposal.</p>}
      </section>

      <section className={card}>
        {alacarte ? (
          <div>
            <h2 className="text-2xl font-black text-slate-900">À la carte price list</h2>
            <p className="mt-1 text-sm text-slate-600">{proposal.individual.filter((r) => r.label.trim()).length} services will be listed. No package totals are shown in this mode.</p>
          </div>
        ) : (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Totals</h2>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {proposal.packages.map((pkg, i) => (
                <li key={pkg.id}>{pkg.name || `Package ${i + 1}`}: <b>{money(totals.perPackage[i].total)}</b></li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-amber-800">Internal: cost {totals.cost === null ? 'partly unknown' : money(totals.cost)} · profit {totals.profit === null ? '—' : money(totals.profit)} (never shown to the client)</p>
          </div>
          <div className="rounded-xl bg-slate-900 px-6 py-4 text-white">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-300">Overall total</div>
            <div className="text-3xl font-black" data-overall-total>{money(totals.total)}</div>
            {coverage || coverageInSheet ? <div className="mt-1 text-xs text-slate-300">Includes 10% sales coverage</div> : null}
          </div>
        </div>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" disabled={!sectionCount} onClick={openPreview} className="rounded-md bg-[#17843f] px-6 py-3 text-sm font-bold text-white hover:bg-[#116b32] disabled:bg-gray-300">Preview proposal</button>
          {alacarte ? null : <button type="button" disabled={busy} onClick={savePackagesAsSheets} className={btn}>Save packages as new price sheet(s)</button>}
        </div>
      </section>
    </div>
  );
}

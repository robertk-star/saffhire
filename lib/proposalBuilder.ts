// Pure helpers and types for the multi-package proposal builder (/admin/proposals/builder).
// No server imports here so the client component and tests can share it.

export type PriceKey = 'church_price' | 'staffing_price' | 'trucking_price' | 'high_volume_price' | 'general_price';

export const priceCategories: { key: PriceKey; label: string }[] = [
  { key: 'church_price', label: 'Church' },
  { key: 'staffing_price', label: 'Staffing' },
  { key: 'trucking_price', label: 'Trucking' },
  { key: 'high_volume_price', label: 'High Volume' },
  { key: 'general_price', label: 'General' },
];

export const SALES_COVERAGE_MULTIPLIER = 1.1;

export type SectionKey = 'cover' | 'whySaffhire' | 'services' | 'packages' | 'pricing' | 'process';

export const sectionOptions: { key: SectionKey; label: string; description: string }[] = [
  { key: 'cover', label: 'Cover page', description: 'Title page with SaffHire branding' },
  { key: 'whySaffhire', label: 'Why SaffHire', description: 'Mission, veteran-owned commitment, and differentiators' },
  { key: 'services', label: 'Our Services', description: 'Full list of screening and verification services' },
  { key: 'packages', label: 'Service Packages', description: 'The custom packages built below' },
  { key: 'pricing', label: 'Pricing', description: 'One pricing table per package plus individual pricing' },
  { key: 'process', label: 'Process & Support', description: 'Ordering process and customer support contacts' },
];

export function allSectionsOn(): Record<SectionKey, boolean> {
  return { cover: true, whySaffhire: true, services: true, packages: true, pricing: true, process: true };
}

export type CatalogPricingItem = {
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

export type SheetRow = { label: string; price: string };
export type BaseSheet = {
  id: string;
  name: string;
  description: string;
  minimum_package: SheetRow[];
  individual_pricing: SheetRow[];
  /** Explicit flag: the sheet's prices already include the 10% sales coverage. Wins over name/description hints when set. */
  includes_sales_coverage?: boolean | null;
};

export type BaseSource = { kind: 'sheet'; sheetId: string } | { kind: 'category'; priceKey: PriceKey };

/** A catalog entry resolved from the selected base. basePrice excludes sales coverage. */
export type CatalogEntry = {
  key: string;
  label: string;
  basePrice: number | null;
  included: boolean;
  internalCost: number | null;
};

export type BuilderLine = {
  id: string;
  catalogKey: string;
  label: string;
  quantity: number;
  /** Unit price typed by the admin, before sales coverage. null = use base. The 10% is added once on top when it applies. */
  priceOverride: number | null;
  /** Shown as "Included" and adds nothing to the total. */
  included: boolean;
};

export type BuilderPackage = {
  id: string;
  name: string;
  description: string;
  minimumItems: BuilderLine[];
  lines: BuilderLine[];
};

export type IndividualRow = {
  id: string;
  label: string;
  catalogKey: string;
  /** Base price taken from the seed sheet when no catalog entry matches (sales coverage still applies). */
  fallbackPrice?: number | null;
  /** Price typed by the admin, before sales coverage. null = use base. The 10% is added once on top when it applies. */
  priceOverride: number | null;
  /** True when fallbackPrice came from a sheet that already includes 10% sales coverage; the checkbox is not applied again. */
  coverageIncluded?: boolean;
};

export type BuilderProposal = {
  version: 1;
  clientName: string;
  contactName: string;
  notes: string;
  state: string;
  sections: Record<SectionKey, boolean>;
  base: BaseSource;
  salesCoverage: boolean;
  packages: BuilderPackage[];
  includeIndividual: boolean;
  /** "À la carte price list only": no packages; the Pricing page shows only the individual table. */
  aLaCarteOnly?: boolean;
  individual: IndividualRow[];
};

export function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(16).slice(2, 8)}`;
}

export function round2(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function money(value: number) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function parsePrice(text: string): { price: number | null; included: boolean } {
  const raw = String(text || '').trim();
  if (/^included$/i.test(raw)) return { price: 0, included: true };
  const n = Number(raw.replace(/[$,\s]/g, ''));
  return Number.isFinite(n) && raw !== '' ? { price: n, included: false } : { price: null, included: false };
}

export function applyCoverage(value: number, enabled: boolean) {
  return enabled ? round2(value * SALES_COVERAGE_MULTIPLIER) : round2(value);
}

function normName(value: string) {
  return value.toLowerCase().replace(/seaarch/g, 'search').replace(/[^a-z0-9]+/g, ' ').trim();
}

function itemCost(item: CatalogPricingItem | undefined) {
  if (!item) return null;
  const value = item.total_cost ?? item.cost;
  return value === null || value === undefined ? null : Number(value);
}

/** Build the selectable catalog for the current base + state. */
export function buildCatalog(base: BaseSource, sheets: BaseSheet[], items: CatalogPricingItem[], state: string): CatalogEntry[] {
  const stateItems = state ? items.filter((item) => item.state === state) : [];
  const byName = new Map(stateItems.map((item) => [normName(item.service), item]));
  if (base.kind === 'category') {
    return stateItems.map((item) => {
      const raw = item[base.priceKey];
      return {
        key: `item:${item.id}`,
        label: item.service,
        basePrice: raw === null || raw === undefined ? null : Number(raw),
        included: false,
        internalCost: itemCost(item),
      };
    });
  }
  const sheet = sheets.find((s) => s.id === base.sheetId);
  if (!sheet) return [];
  const seen = new Set<string>();
  const entries: CatalogEntry[] = [];
  for (const row of [...sheet.minimum_package, ...sheet.individual_pricing]) {
    const key = `sheet:${normName(row.label)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const parsed = parsePrice(row.price);
    entries.push({ key, label: row.label, basePrice: parsed.price, included: parsed.included, internalCost: itemCost(byName.get(normName(row.label))) });
  }
  return entries;
}

/**
 * Client unit price for a line. `coverage` = "apply the 10% multiplier" (see coverageApplies); it is applied exactly
 * once, to the base price or to the admin's edited price, and never when the base sheet already includes it.
 */
export function lineUnitPrice(line: { priceOverride: number | null; included?: boolean }, entry: CatalogEntry | undefined, coverage: boolean): number | null {
  if (line.included) return 0;
  if (line.priceOverride !== null && line.priceOverride !== undefined) return applyCoverage(line.priceOverride, coverage);
  if (!entry || entry.basePrice === null) return null;
  return applyCoverage(entry.basePrice, coverage);
}

/** Price before sales coverage: the edited price, else the base price. This is what the price input shows. */
export function linePreCoveragePrice(line: { priceOverride: number | null }, entry: CatalogEntry | undefined): number | null {
  if (line.priceOverride !== null && line.priceOverride !== undefined) return round2(line.priceOverride);
  if (!entry || entry.basePrice === null) return null;
  return round2(entry.basePrice);
}

export function lineBaseUnitPrice(entry: CatalogEntry | undefined, coverage: boolean) {
  if (!entry || entry.basePrice === null) return null;
  return applyCoverage(entry.basePrice, coverage);
}

export type LineCalc = { unit: number | null; total: number; cost: number | null; edited: boolean };

export function calcLine(line: BuilderLine, entry: CatalogEntry | undefined, coverage: boolean): LineCalc {
  const qty = Math.max(0, Number(line.quantity) || 0);
  const unit = lineUnitPrice(line, entry, coverage);
  const total = line.included || unit === null ? 0 : round2(unit * qty);
  const cost = entry && entry.internalCost !== null ? round2(entry.internalCost * qty) : null;
  return { unit, total, cost, edited: !line.included && line.priceOverride !== null && line.priceOverride !== undefined };
}

export function packageTotals(pkg: BuilderPackage, catalog: Map<string, CatalogEntry>, coverage: boolean) {
  let total = 0;
  let cost = 0;
  let costKnown = true;
  for (const line of [...pkg.minimumItems, ...pkg.lines]) {
    if (!line.catalogKey && !line.label) continue;
    const calc = calcLine(line, catalog.get(line.catalogKey), coverage);
    total += calc.total;
    if (calc.cost === null) {
      if (!line.included) costKnown = false;
    } else cost += calc.cost;
  }
  total = round2(total);
  cost = round2(cost);
  return { total, cost: costKnown ? cost : null, profit: costKnown ? round2(total - cost) : null };
}

export function proposalTotals(p: BuilderProposal, catalog: Map<string, CatalogEntry>, sheets: BaseSheet[] = []) {
  const coverage = coverageApplies(p, sheets);
  const perPackage = p.packages.map((pkg) => ({ id: pkg.id, ...packageTotals(pkg, catalog, coverage) }));
  const total = round2(perPackage.reduce((sum, item) => sum + item.total, 0));
  const anyUnknown = perPackage.some((item) => item.cost === null);
  const cost = anyUnknown ? null : round2(perPackage.reduce((sum, item) => sum + (item.cost || 0), 0));
  return { perPackage, total, cost, profit: cost === null ? null : round2(total - cost) };
}

export function newLine(entry?: CatalogEntry): BuilderLine {
  return { id: makeId('line'), catalogKey: entry?.key || '', label: entry?.label || '', quantity: 1, priceOverride: null, included: Boolean(entry?.included) };
}

export function newPackage(index: number): BuilderPackage {
  return { id: makeId('pkg'), name: `Package ${index}`, description: '', minimumItems: [], lines: [] };
}

export function duplicatePackage(pkg: BuilderPackage): BuilderPackage {
  const clone = (line: BuilderLine) => ({ ...line, id: makeId('line') });
  return { ...pkg, id: makeId('pkg'), name: `${pkg.name} (copy)`, minimumItems: pkg.minimumItems.map(clone), lines: pkg.lines.map(clone) };
}

export function moveItem<T>(list: T[], index: number, delta: number): T[] {
  const target = index + delta;
  if (target < 0 || target >= list.length) return list;
  const next = list.slice();
  const [item] = next.splice(index, 1);
  next.splice(target, 0, item);
  return next;
}

export const COVERAGE_SEED_SHEET_NAME = 'Staffing + 10% Sales Coverage';

/** True when a sheet *name* says its prices already include the 10% sales coverage uplift. */
export function nameIndicatesCoverage(name: string | undefined | null) {
  const n = String(name || '');
  return /\+\s*10\s*%/.test(n) || /10\s*%\s*sales/i.test(n) || /sales\s+coverage/i.test(n);
}

/** Description wording used by the seed sheet ("10% uplift to cover salesperson cost") and by sheets saved from the builder. */
function descriptionIndicatesCoverage(description: string | undefined | null) {
  const d = String(description || '');
  return /10\s*%\s*(sales\s+coverage|uplift)/i.test(d) || /includes?\s+(the\s+)?10\s*%/i.test(d);
}

/**
 * True when a price sheet's prices already include the 10% sales coverage.
 * Order: explicit `includes_sales_coverage` flag (when the row has one), then the name, then the description.
 * Production sheets have no flag column today, so the name/description hints are what decide.
 */
export function sheetIncludesCoverage(sheet: string | Pick<BaseSheet, 'name' | 'description' | 'includes_sales_coverage'> | undefined | null) {
  if (!sheet) return false;
  if (typeof sheet === 'string') return nameIndicatesCoverage(sheet);
  if (typeof sheet.includes_sales_coverage === 'boolean') return sheet.includes_sales_coverage;
  return nameIndicatesCoverage(sheet.name) || descriptionIndicatesCoverage(sheet.description);
}

/** The selected base sheet already includes the 10%: the checkbox shows checked + locked and no multiplier is added. */
export function baseIncludesCoverage(p: Pick<BuilderProposal, 'base'>, sheets: BaseSheet[]) {
  if (p.base.kind !== 'sheet') return false;
  const id = p.base.sheetId;
  return sheetIncludesCoverage(sheets.find((s) => s.id === id));
}

/** Apply the ×1.10 multiplier? Only when the box is on and the base sheet does not already include it. */
export function coverageApplies(p: Pick<BuilderProposal, 'base' | 'salesCoverage'>, sheets: BaseSheet[]) {
  return Boolean(p.salesCoverage) && !baseIncludesCoverage(p, sheets);
}

export const COVERAGE_NOTE = 'All prices include 10% sales coverage.';
export const INDIVIDUAL_COVERAGE_NOTE = 'Individual (à la carte) prices include 10% sales coverage.';

/** The one sales-coverage note for the quote (preview/PDF), or null. Never repeated per package. */
export function coverageNoteFor(p: Pick<BuilderProposal, 'base' | 'salesCoverage' | 'individual' | 'aLaCarteOnly' | 'includeIndividual'>, sheets: BaseSheet[]): string | null {
  if (coverageApplies(p, sheets) || baseIncludesCoverage(p, sheets)) return COVERAGE_NOTE;
  const showsIndividual = Boolean(p.aLaCarteOnly) || p.includeIndividual;
  if (showsIndividual && p.individual.some((r) => r.coverageIncluded && r.label.trim())) return INDIVIDUAL_COVERAGE_NOTE;
  return null;
}

/**
 * Sheet that seeds the Individual (à la carte) table in category mode: "Staffing + 10% Sales Coverage" by name,
 * then any sheet whose name indicates +10%/sales coverage, then SaffHire Direct Pricing, then the first sheet.
 */
export function findIndividualSeedSheet(sheets: BaseSheet[]): BaseSheet | undefined {
  const norm = (v: string) => v.toLowerCase().replace(/\s+/g, ' ').trim();
  const withRows = sheets.filter((s) => (s.individual_pricing || []).length);
  const pool = withRows.length ? withRows : sheets;
  return (
    pool.find((s) => norm(s.name) === norm(COVERAGE_SEED_SHEET_NAME)) ||
    pool.find((s) => nameIndicatesCoverage(s.name)) ||
    pool.find((s) => /direct/i.test(s.name)) ||
    pool[0]
  );
}

/**
 * Non-blocking info notes about sales coverage. The 10% can no longer be applied twice: a sheet that already includes it
 * locks the checkbox and adds no multiplier (see coverageApplies).
 */
export function coverageWarnings(p: Pick<BuilderProposal, 'base' | 'salesCoverage' | 'individual'>, sheets: BaseSheet[], aLaCarteOnly = false): string[] {
  if (!p.salesCoverage) return [];
  const out: string[] = [];
  if (p.base.kind === 'sheet') {
    return out;
  } else if (p.individual.some((r) => r.coverageIncluded)) {
    out.push(`The Individual (à la carte) prices are seeded from a sheet that already includes 10% sales coverage, so the checkbox is not applied to them again (typed prices in those rows are used as entered)${aLaCarteOnly ? '' : '; it only raises package prices'}.`);
  }
  return out;
}

/** Individual (a la carte) rows seeded from the base sheet (or the default sheet when a category is the base). */
export function seedIndividual(base: BaseSource, sheets: BaseSheet[], catalog: CatalogEntry[], fallbackSheet: BaseSheet | undefined = findIndividualSeedSheet(sheets)): IndividualRow[] {
  const sheet = base.kind === 'sheet' ? sheets.find((s) => s.id === base.sheetId) : fallbackSheet;
  // Category mode + a coverage-inclusive seed sheet: use that sheet's prices as-is (coverage already in them).
  const useSheetPrices = base.kind === 'category' && sheetIncludesCoverage(sheet);
  const rows = sheet?.individual_pricing || [];
  const byLabel = new Map(catalog.map((entry) => [normName(entry.label), entry]));
  return rows.map((row) => {
    const entry = byLabel.get(normName(row.label)) || (normName(row.label) === '1 county criminal search' ? byLabel.get('county criminal search') : undefined);
    const parsed = parsePrice(row.price);
    if (useSheetPrices && parsed.price !== null) {
      return { id: makeId('ind'), label: row.label, catalogKey: entry?.key || '', fallbackPrice: parsed.price, priceOverride: null, coverageIncluded: true };
    }
    // When no catalog entry matches, the sheet price becomes the row's base price.
    return { id: makeId('ind'), label: row.label, catalogKey: entry?.key || '', fallbackPrice: parsed.price, priceOverride: null };
  });
}

export function individualBaseUnit(row: IndividualRow, catalog: Map<string, CatalogEntry>, coverage: boolean): number | null {
  if (row.coverageIncluded && row.fallbackPrice !== null && row.fallbackPrice !== undefined) return round2(row.fallbackPrice);
  const entry = catalog.get(row.catalogKey);
  if (entry && entry.basePrice !== null) return applyCoverage(entry.basePrice, coverage);
  if (row.fallbackPrice !== null && row.fallbackPrice !== undefined) return applyCoverage(row.fallbackPrice, coverage);
  return null;
}

/** Price before coverage for an individual row (what the input shows). */
export function individualPreCoverage(row: IndividualRow, catalog: Map<string, CatalogEntry>): number | null {
  if (row.priceOverride !== null && row.priceOverride !== undefined) return round2(row.priceOverride);
  return individualBaseUnit(row, catalog, false);
}

/**
 * Client price for an individual row. Rows seeded from a coverage-inclusive sheet never get the multiplier (their sheet
 * already has it); other rows get it once, on the base or on the edited price, when `coverage` applies.
 */
export function individualUnit(row: IndividualRow, catalog: Map<string, CatalogEntry>, coverage: boolean) {
  const apply = coverage && !row.coverageIncluded;
  if (row.priceOverride !== null && row.priceOverride !== undefined) return applyCoverage(row.priceOverride, apply);
  return individualBaseUnit(row, catalog, apply);
}

/** Client-safe payload for preview/PDF. Contains no internal cost or profit. */
export type ClientPreview = {
  clientName: string;
  contactName: string;
  notes: string;
  sections: SectionKey[];
  baseLabel: string;
  mode: 'packages' | 'alacarte';
  packages: {
    name: string;
    description: string;
    includes: string[];
    rows: { label: string; quantity: number; unit: string; total: string; included: boolean }[];
    total: number;
  }[];
  individual: { label: string; price: string }[];
  grandTotal: number;
  /** Single sales-coverage note shown once on the Pricing page (never per package). null = no note. */
  coverageNote: string | null;
  createdAt: string;
};

export function buildClientPreview(p: BuilderProposal, catalog: Map<string, CatalogEntry>, baseLabel: string, now = new Date(), sheets: BaseSheet[] = []): ClientPreview {
  const alacarte = Boolean(p.aLaCarteOnly);
  const coverage = coverageApplies(p, sheets);
  const packages = alacarte ? [] : p.packages.map((pkg) => {
    const all = [...pkg.minimumItems, ...pkg.lines].filter((line) => line.label.trim());
    const rows = all.map((line) => {
      const calc = calcLine(line, catalog.get(line.catalogKey), coverage);
      const qty = Math.max(0, Number(line.quantity) || 0);
      return {
        label: line.label.trim(),
        quantity: qty,
        included: line.included,
        unit: line.included ? 'Included' : calc.unit === null ? 'N/A' : money(calc.unit),
        total: line.included ? 'Included' : money(calc.total),
      };
    });
    return {
      name: pkg.name.trim() || 'Package',
      description: pkg.description.trim(),
      includes: all.map((line) => line.label.trim()),
      rows,
      total: packageTotals(pkg, catalog, coverage).total,
    };
  });
  const individual = alacarte || p.includeIndividual
    ? p.individual
        .filter((row) => row.label.trim())
        .map((row) => {
          const unit = individualUnit(row, catalog, coverage);
          return { label: row.label.trim(), price: unit === null ? 'N/A' : money(unit) };
        })
    : [];
  return {
    clientName: p.clientName.trim(),
    contactName: p.contactName.trim(),
    notes: p.notes.trim(),
    sections: sectionOptions.filter((s) => p.sections[s.key] && !(alacarte && s.key === 'packages')).map((s) => s.key),
    baseLabel,
    mode: alacarte ? 'alacarte' : 'packages',
    packages,
    individual,
    grandTotal: round2(packages.reduce((sum, pkg) => sum + pkg.total, 0)),
    coverageNote: coverageNoteFor(p, sheets),
    createdAt: now.toISOString(),
  };
}

/** Rows for the "save packages as new price sheet" action (one sheet per package). */
export function packageToSheetRows(pkg: BuilderPackage, catalog: Map<string, CatalogEntry>, coverage: boolean): SheetRow[] {
  return [...pkg.minimumItems, ...pkg.lines]
    .filter((line) => line.label.trim())
    .map((line) => {
      const calc = calcLine(line, catalog.get(line.catalogKey), coverage);
      const qty = Math.max(0, Number(line.quantity) || 0);
      const label = qty > 1 ? `${line.label.trim()} (x${qty})` : line.label.trim();
      return { label, price: line.included ? 'Included' : calc.unit === null ? '' : money(calc.unit) };
    });
}

export function emptyProposal(base: BaseSource): BuilderProposal {
  return {
    version: 1,
    clientName: '',
    contactName: '',
    notes: '',
    state: '',
    sections: allSectionsOn(),
    base,
    salesCoverage: false,
    packages: [newPackage(1)],
    includeIndividual: true,
    aLaCarteOnly: false,
    individual: [],
  };
}

/** Defensive parse of a stored draft. */
export function normalizeProposal(value: unknown, fallbackBase: BaseSource): BuilderProposal {
  const v = (value && typeof value === 'object' ? value : {}) as Partial<BuilderProposal>;
  const str = (x: unknown) => (typeof x === 'string' ? x : '');
  const num = (x: unknown) => (x === null || x === undefined || x === '' ? null : Number.isFinite(Number(x)) ? Number(x) : null);
  const line = (l: any): BuilderLine => ({
    id: str(l?.id) || makeId('line'),
    catalogKey: str(l?.catalogKey),
    label: str(l?.label),
    quantity: Math.max(0, Number(l?.quantity) || 0),
    priceOverride: num(l?.priceOverride),
    included: Boolean(l?.included),
  });
  const base: BaseSource =
    v.base && (v.base as any).kind === 'sheet' && str((v.base as any).sheetId)
      ? { kind: 'sheet', sheetId: str((v.base as any).sheetId) }
      : v.base && (v.base as any).kind === 'category' && priceCategories.some((c) => c.key === (v.base as any).priceKey)
        ? { kind: 'category', priceKey: (v.base as any).priceKey }
        : fallbackBase;
  const sections = allSectionsOn();
  for (const s of sectionOptions) if (v.sections && typeof (v.sections as any)[s.key] === 'boolean') sections[s.key] = (v.sections as any)[s.key];
  const packages = Array.isArray(v.packages) && v.packages.length
    ? v.packages.map((p: any, i: number) => ({
        id: str(p?.id) || makeId('pkg'),
        name: str(p?.name) || `Package ${i + 1}`,
        description: str(p?.description),
        minimumItems: Array.isArray(p?.minimumItems) ? p.minimumItems.map(line) : [],
        lines: Array.isArray(p?.lines) ? p.lines.map(line) : [],
      }))
    : [newPackage(1)];
  return {
    version: 1,
    clientName: str(v.clientName),
    contactName: str(v.contactName),
    notes: str(v.notes),
    state: str(v.state),
    sections,
    base,
    salesCoverage: Boolean(v.salesCoverage),
    packages,
    includeIndividual: v.includeIndividual === undefined ? true : Boolean(v.includeIndividual),
    aLaCarteOnly: Boolean(v.aLaCarteOnly),
    individual: Array.isArray(v.individual)
      ? v.individual.map((r: any) => ({ id: str(r?.id) || makeId('ind'), label: str(r?.label), catalogKey: str(r?.catalogKey), fallbackPrice: num(r?.fallbackPrice), priceOverride: num(r?.priceOverride), ...(r?.coverageIncluded ? { coverageIncluded: true } : {}) }))
      : [],
  };
}

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

/**
 * Company type asked in Proposal setup (Robert, Oct 29 2026: "The pricing should be determined by that unless we authorize
 * an override or update the individual prices ourselves for that proposal"). Each type defaults both the packages and the
 * Individual (à la carte) table to its pricing category (per-state prices in public.pricing_items).
 */
export type CompanyType = 'staffing' | 'trucking' | 'church' | 'high_volume' | 'general';

export const companyTypes: { key: CompanyType; label: string; priceKey: PriceKey }[] = [
  { key: 'staffing', label: 'Staffing', priceKey: 'staffing_price' },
  { key: 'trucking', label: 'Trucking', priceKey: 'trucking_price' },
  { key: 'church', label: 'Church', priceKey: 'church_price' },
  { key: 'high_volume', label: 'High Volume', priceKey: 'high_volume_price' },
  { key: 'general', label: 'General', priceKey: 'general_price' },
];

export function isCompanyType(value: unknown): value is CompanyType {
  return companyTypes.some((t) => t.key === value);
}

export function companyTypeLabel(type: CompanyType | '' | undefined) {
  return companyTypes.find((t) => t.key === type)?.label || '';
}

/** Default pricing base for a company type: its pricing category. */
export function companyTypeBase(type: CompanyType): BaseSource {
  const found = companyTypes.find((t) => t.key === type);
  return { kind: 'category', priceKey: found ? found.priceKey : 'general_price' };
}

export function companyTypeForPriceKey(key: PriceKey): CompanyType | '' {
  return companyTypes.find((t) => t.priceKey === key)?.key || '';
}

export function sameBase(a: BaseSource, b: BaseSource) {
  if (a.kind === 'category' && b.kind === 'category') return a.priceKey === b.priceKey;
  if (a.kind === 'sheet' && b.kind === 'sheet') return a.sheetId === b.sheetId;
  return false;
}

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
  /** Database flag (proposal_pricing_pages.includes_sales_coverage): the sheet's prices already include the 10% sales coverage. */
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
  /** Company type asked in setup; '' = not chosen yet. Drives the default base (see companyTypeBase). */
  companyType?: CompanyType | '';
  /** True when an admin deliberately picked a base other than the company type default (explicit override). */
  baseOverride?: boolean;
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

/**
 * True when a price sheet's prices already include the 10% sales coverage. Uses the database flag
 * `proposal_pricing_pages.includes_sales_coverage` only (migration 014); names and descriptions are not inspected.
 */
export function sheetIncludesCoverage(sheet: Pick<BaseSheet, 'includes_sales_coverage'> | undefined | null) {
  return Boolean(sheet && sheet.includes_sales_coverage === true);
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

/**
 * Client output must never mention the sales coverage (it covers SaffHire's referral fee cost; Robert, Oct 29 2026).
 * Strips "10%" / "sales coverage" / "coverage" wording from any text that reaches the preview or PDF.
 */
export const CLIENT_FORBIDDEN_WORDING = /10\s*%|sales\s*coverage|coverage/i;
export function clientSafeText(text: string | undefined | null) {
  let t = String(text || '');
  if (!CLIENT_FORBIDDEN_WORDING.test(t)) return t.trim();
  t = t
    .replace(/[(\[]?\s*(?:\+|with|incl(?:\.|udes?|uding)?|plus)?\s*(?:a\s+|the\s+)?10\s*%\s*(?:sales\s*coverage|coverage|uplift|markup|mark-up)?\s*[)\]]?/gi, ' ')
    .replace(/[(\[]?\s*(?:\+|with|incl(?:\.|udes?|uding)?|plus)?\s*(?:sales\s*)?coverage\s*[)\]]?/gi, ' ')
    .replace(/\s*[;:,+–-]\s*(?=[.)]|$)/g, '')
    .replace(/\(\s*\)/g, '')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
  return CLIENT_FORBIDDEN_WORDING.test(t) ? '' : t;
}

/**
 * Sheet that supplies the Individual (à la carte) row list in category mode, and the price of rows that have no
 * category price (3 County Criminal Searches, WOTC). It never already includes the 10% (the 10% comes only from the
 * checkbox, once): "Saffhire Pricing", then SaffHire Direct Pricing, then any sheet without the flag, then any sheet.
 */
export function findIndividualSeedSheet(sheets: BaseSheet[]): BaseSheet | undefined {
  const norm = (v: string) => v.toLowerCase().replace(/\s+/g, ' ').trim();
  const withRows = sheets.filter((s) => (s.individual_pricing || []).length);
  const pool = withRows.length ? withRows : sheets;
  const plain = pool.filter((s) => !sheetIncludesCoverage(s));
  return (
    plain.find((s) => norm(s.name) === 'saffhire pricing') ||
    plain.find((s) => /direct/i.test(s.name)) ||
    plain[0] ||
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

/** Point package lines and individual rows at the catalog for the proposal's current base + state (matched by label). */
export function remapToCatalog(next: BuilderProposal, sheets: BaseSheet[], items: CatalogPricingItem[]): BuilderProposal {
  const list = buildCatalog(next.base, sheets, items, next.state);
  const byLabel = new Map(list.map((entry) => [normName(entry.label), entry]));
  const keys = new Set(list.map((entry) => entry.key));
  const remap = (line: BuilderLine): BuilderLine => {
    if (!line.catalogKey || keys.has(line.catalogKey)) return line;
    const entry = byLabel.get(normName(line.label));
    return { ...line, catalogKey: entry ? entry.key : '' };
  };
  return {
    ...next,
    packages: next.packages.map((pkg) => ({ ...pkg, minimumItems: pkg.minimumItems.map(remap), lines: pkg.lines.map(remap) })),
    individual: next.individual.map((row) => {
      if (row.catalogKey && keys.has(row.catalogKey)) return row;
      const label = normName(row.label);
      const entry = byLabel.get(label) || (label === '1 county criminal search' ? byLabel.get('county criminal search') : undefined);
      return { ...row, catalogKey: entry ? entry.key : '' };
    }),
  };
}

/** Prices the admin typed or custom items/rows added for this proposal. These always win over the company type default. */
export function manualPriceEdits(p: Pick<BuilderProposal, 'packages' | 'individual'>) {
  let lines = 0;
  for (const pkg of p.packages) {
    for (const line of [...pkg.minimumItems, ...pkg.lines]) {
      if (line.included) continue;
      if (line.priceOverride !== null && line.priceOverride !== undefined) lines += 1;
    }
  }
  const individual = p.individual.filter((r) => r.priceOverride !== null && r.priceOverride !== undefined).length;
  return { lines, individual, any: lines + individual > 0 };
}

export type CompanyTypeChange = { proposal: BuilderProposal; redefaulted: boolean; note: string };

/**
 * Selecting a company type picks the default base for both the packages and the Individual table. When the admin has
 * set an explicit override or typed prices for this proposal, nothing is re-priced: the edits are kept and an admin-only
 * note explains how to apply the company type pricing (applyCompanyTypePricing).
 */
export function changeCompanyType(p: BuilderProposal, type: CompanyType, sheets: BaseSheet[], items: CatalogPricingItem[]): CompanyTypeChange {
  const label = companyTypeLabel(type);
  const edits = manualPriceEdits(p);
  if (p.baseOverride || edits.any) {
    const reasons = [
      p.baseOverride ? 'an override base is set for this proposal' : '',
      edits.lines ? `${edits.lines} package price${edits.lines === 1 ? ' was' : 's were'} edited` : '',
      edits.individual ? `${edits.individual} individual price${edits.individual === 1 ? ' was' : 's were'} edited` : '',
    ].filter(Boolean).join(' and ');
    return {
      proposal: { ...p, companyType: type },
      redefaulted: false,
      note: `Company type set to ${label}, but pricing was not changed because ${reasons}. Use "Apply ${label} pricing" to switch the base to ${label} pricing (edited prices are kept).`,
    };
  }
  return { proposal: applyCompanyTypePricing({ ...p, companyType: type }, sheets, items), redefaulted: true, note: '' };
}

/**
 * Re-default to the company type: base = its pricing category, override cleared, Individual table reseeded.
 * Typed prices are kept (package lines keep priceOverride; individual rows keep it by label; custom rows are kept).
 */
export function applyCompanyTypePricing(p: BuilderProposal, sheets: BaseSheet[], items: CatalogPricingItem[]): BuilderProposal {
  if (!p.companyType) return p;
  const base = companyTypeBase(p.companyType);
  const moved = remapToCatalog({ ...p, base, baseOverride: false }, sheets, items);
  const catalog = buildCatalog(base, sheets, items, p.state);
  const seeded = seedIndividual(base, sheets, catalog);
  const edited = new Map(
    p.individual.filter((r) => r.priceOverride !== null && r.priceOverride !== undefined).map((r) => [normName(r.label), r.priceOverride]),
  );
  const seededLabels = new Set(seeded.map((r) => normName(r.label)));
  const custom = p.individual.filter((r) => r.label.trim() && !seededLabels.has(normName(r.label)) && !r.catalogKey && (r.fallbackPrice === null || r.fallbackPrice === undefined));
  const individual = [
    ...seeded.map((r) => (edited.has(normName(r.label)) ? { ...r, priceOverride: edited.get(normName(r.label)) ?? null } : r)),
    ...custom,
  ];
  return { ...moved, individual };
}

/** Admin-only description of where prices come from (never shown to the client). */
export function pricingSourceNote(p: Pick<BuilderProposal, 'base' | 'companyType' | 'baseOverride'>, sheets: BaseSheet[]) {
  const baseName = p.base.kind === 'sheet'
    ? sheets.find((s) => s.id === (p.base as { sheetId: string }).sheetId)?.name || 'a saved price sheet'
    : `${priceCategories.find((c) => c.key === (p.base as { priceKey: PriceKey }).priceKey)?.label || ''} pricing`;
  if (!p.companyType) return p.baseOverride ? `No company type chosen; prices come from ${baseName}.` : 'Choose the company type to set pricing.';
  const label = companyTypeLabel(p.companyType);
  if (sameBase(p.base, companyTypeBase(p.companyType))) return `Prices default to ${label} pricing for the ${label} company type.`;
  return `Override: prices come from ${baseName} instead of the ${label} default.`;
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
        label: clientSafeText(line.label),
        quantity: qty,
        included: line.included,
        unit: line.included ? 'Included' : calc.unit === null ? 'N/A' : money(calc.unit),
        total: line.included ? 'Included' : money(calc.total),
      };
    });
    return {
      name: clientSafeText(pkg.name) || 'Package',
      description: clientSafeText(pkg.description),
      includes: all.map((line) => clientSafeText(line.label)),
      rows,
      total: packageTotals(pkg, catalog, coverage).total,
    };
  });
  const individual = alacarte || p.includeIndividual
    ? p.individual
        .filter((row) => row.label.trim())
        .map((row) => {
          const unit = individualUnit(row, catalog, coverage);
          return { label: clientSafeText(row.label), price: unit === null ? 'N/A' : money(unit) };
        })
    : [];
  return {
    clientName: clientSafeText(p.clientName),
    contactName: clientSafeText(p.contactName),
    notes: clientSafeText(p.notes),
    sections: sectionOptions.filter((s) => p.sections[s.key] && !(alacarte && s.key === 'packages')).map((s) => s.key),
    baseLabel: clientSafeText(baseLabel),
    mode: alacarte ? 'alacarte' : 'packages',
    packages,
    individual,
    grandTotal: round2(packages.reduce((sum, pkg) => sum + pkg.total, 0)),
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

export function emptyProposal(base: BaseSource, companyType: CompanyType | '' = ''): BuilderProposal {
  return {
    version: 1,
    clientName: '',
    contactName: '',
    notes: '',
    state: '',
    sections: allSectionsOn(),
    base: companyType ? companyTypeBase(companyType) : base,
    companyType,
    baseOverride: false,
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
  // Drafts saved before the company type existed: a category base implies its type; a chosen sheet counts as an override.
  const legacy = v.companyType === undefined;
  const companyType: CompanyType | '' = isCompanyType(v.companyType)
    ? v.companyType
    : legacy && base.kind === 'category' ? companyTypeForPriceKey(base.priceKey) : '';
  const baseOverride = typeof v.baseOverride === 'boolean'
    ? v.baseOverride
    : legacy ? base.kind === 'sheet' : companyType ? !sameBase(base, companyTypeBase(companyType)) : false;
  return {
    version: 1,
    clientName: str(v.clientName),
    contactName: str(v.contactName),
    notes: str(v.notes),
    state: str(v.state),
    sections,
    base,
    companyType,
    baseOverride,
    salesCoverage: Boolean(v.salesCoverage),
    packages,
    includeIndividual: v.includeIndividual === undefined ? true : Boolean(v.includeIndividual),
    aLaCarteOnly: Boolean(v.aLaCarteOnly),
    individual: Array.isArray(v.individual)
      ? v.individual.map((r: any) => ({ id: str(r?.id) || makeId('ind'), label: str(r?.label), catalogKey: str(r?.catalogKey), fallbackPrice: num(r?.fallbackPrice), priceOverride: num(r?.priceOverride), ...(r?.coverageIncluded ? { coverageIncluded: true } : {}) }))
      : [],
  };
}

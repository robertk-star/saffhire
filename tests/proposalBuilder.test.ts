// Run: npx --yes tsx --test tests/proposalBuilder.test.ts
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BaseSheet,
  CatalogPricingItem,
  buildCatalog,
  buildClientPreview,
  calcLine,
  emptyProposal,
  normalizeProposal,
  packageToSheetRows,
  proposalTotals,
  seedIndividual,
  moveItem,
  duplicatePackage,
  individualUnit,
  findIndividualSeedSheet,
  sheetIncludesCoverage,
  coverageWarnings,
} from '../lib/proposalBuilder';

const items: CatalogPricingItem[] = [
  { id: 'a', service: 'County Criminal Search', state: 'Texas', cost: 2, total_cost: 3, church_price: 5, staffing_price: 6, trucking_price: 7, high_volume_price: 4, general_price: 8 },
  { id: 'b', service: 'Federal Search', state: 'Texas', cost: 1, total_cost: 1.5, church_price: 4, staffing_price: 5, trucking_price: 5, high_volume_price: 3, general_price: 6 },
  { id: 'c', service: 'MVR', state: 'Ohio', cost: 2, total_cost: 2, church_price: 4, staffing_price: 4.5, trucking_price: 4, high_volume_price: 3, general_price: 5 },
];
const sheet: BaseSheet = {
  id: 's1',
  name: 'Staffing Company Pricing',
  description: '',
  minimum_package: [{ label: 'Social Security Trace', price: '$5.00' }, { label: 'Sex Offender Registry', price: 'Included' }],
  individual_pricing: [{ label: 'Federal Search', price: '$5.00' }, { label: '1 County Criminal Search', price: '$6.00' }, { label: '3 County Criminal Searches', price: '$16.50' }],
};

test('category catalog uses the selected state and price column', () => {
  const cat = buildCatalog({ kind: 'category', priceKey: 'staffing_price' }, [sheet], items, 'Texas');
  assert.equal(cat.length, 2);
  assert.deepEqual(cat.map((c) => c.basePrice), [6, 5]);
  assert.equal(buildCatalog({ kind: 'category', priceKey: 'staffing_price' }, [sheet], items, '').length, 0);
});

test('sheet catalog parses prices and Included rows', () => {
  const cat = buildCatalog({ kind: 'sheet', sheetId: 's1' }, [sheet], items, 'Texas');
  const sex = cat.find((c) => c.label === 'Sex Offender Registry')!;
  assert.equal(sex.included, true);
  assert.equal(cat.find((c) => c.label === 'Federal Search')!.internalCost, 1.5);
});

test('10% sales coverage applies to client prices only, once, including edited prices', () => {
  const cat = buildCatalog({ kind: 'category', priceKey: 'staffing_price' }, [sheet], items, 'Texas');
  const county = cat[0];
  const base = calcLine({ id: 'l', catalogKey: county.key, label: county.label, quantity: 2, priceOverride: null, included: false }, county, true);
  assert.equal(base.unit, 6.6);
  assert.equal(base.total, 13.2);
  assert.equal(base.cost, 6); // cost not marked up
  assert.equal(base.edited, false);
  const edited = calcLine({ id: 'l', catalogKey: county.key, label: county.label, quantity: 2, priceOverride: 7.25, included: false }, county, true);
  assert.equal(edited.unit, 7.98); // 7.25 typed, +10% once
  assert.equal(edited.total, 15.96);
  const editedOff = calcLine({ id: 'l', catalogKey: county.key, label: county.label, quantity: 2, priceOverride: 7.25, included: false }, county, false);
  assert.equal(editedOff.unit, 7.25);
  assert.equal(edited.edited, true);
  const included = calcLine({ id: 'l', catalogKey: county.key, label: county.label, quantity: 1, priceOverride: null, included: true }, county, true);
  assert.equal(included.total, 0);
});

test('totals per package and overall; client preview has no cost or profit', () => {
  const p = emptyProposal({ kind: 'category', priceKey: 'staffing_price' });
  p.state = 'Texas';
  p.salesCoverage = true;
  p.clientName = 'Corporate Talent Finder';
  const cat = buildCatalog(p.base, [sheet], items, p.state);
  const map = new Map(cat.map((c) => [c.key, c]));
  p.packages[0].lines = [
    { id: '1', catalogKey: cat[0].key, label: cat[0].label, quantity: 1, priceOverride: null, included: false },
    { id: '2', catalogKey: cat[1].key, label: cat[1].label, quantity: 1, priceOverride: null, included: false },
  ];
  p.packages[0].minimumItems = [{ id: '3', catalogKey: '', label: 'Sex Offender Registry', quantity: 1, priceOverride: null, included: true }];
  p.packages.push(duplicatePackage(p.packages[0]));
  p.packages[1].lines[0].priceOverride = 10;
  const t = proposalTotals(p, map);
  assert.equal(t.perPackage[0].total, 12.1);
  assert.equal(t.perPackage[1].total, 16.5); // edited 10 -> 11 (+10% once) + Federal 5.5
  assert.equal(t.total, 28.6);
  const preview = buildClientPreview(p, map, 'Staffing pricing');
  const json = JSON.stringify(preview);
  assert.ok(!/cost|profit|internal/i.test(json), 'client preview must not include internal fields');
  assert.equal(preview.grandTotal, 28.6);
  assert.ok(!/10\s*%|coverage/i.test(json), 'no coverage wording for clients');
  assert.equal(preview.packages[0].rows[0].total, 'Included');
  assert.equal(preview.packages[0].includes[0], 'Sex Offender Registry');
});

test('individual table seeds from sheet; 3-county row keeps sheet price', () => {
  const cat = buildCatalog({ kind: 'category', priceKey: 'staffing_price' }, [sheet], items, 'Texas');
  const rows = seedIndividual({ kind: 'category', priceKey: 'staffing_price' }, [sheet], cat, sheet);
  assert.equal(rows.length, 3);
  assert.ok(rows[0].catalogKey && rows[0].priceOverride === null);
  assert.ok(rows[1].catalogKey); // 1 County -> County Criminal Search
  assert.equal(rows[2].catalogKey, '');
  assert.equal(rows[2].priceOverride, null);
  assert.equal(rows[2].fallbackPrice, 16.5);
  const map = new Map(cat.map((c) => [c.key, c]));
  assert.equal(individualUnit(rows[2], map, true), 18.15); // sheet price still gets sales coverage
  assert.equal(individualUnit(rows[0], map, true), 5.5); // Federal staffing 5 * 1.1
});

test('reorder, sheet rows and draft normalization', () => {
  assert.deepEqual(moveItem([1, 2, 3], 0, 1), [2, 1, 3]);
  assert.deepEqual(moveItem([1, 2, 3], 0, -1), [1, 2, 3]);
  const p = normalizeProposal({ clientName: 'X', packages: [{ name: 'A', lines: [{ label: 'MVR', quantity: '2', priceOverride: '4.5' }] }] }, { kind: 'category', priceKey: 'general_price' });
  assert.equal(p.packages[0].lines[0].quantity, 2);
  assert.equal(p.packages[0].lines[0].priceOverride, 4.5);
  assert.equal(p.sections.cover, true);
  assert.deepEqual(packageToSheetRows(p.packages[0], new Map(), false), [{ label: 'MVR (x2)', price: '$4.50' }]);
});

test('à la carte only: no packages, no Service Packages section, individual table with coverage, no cost', () => {
  const p = emptyProposal({ kind: 'category', priceKey: 'staffing_price' });
  p.state = 'Texas';
  p.salesCoverage = true;
  p.aLaCarteOnly = true;
  p.includeIndividual = false; // ignored in à la carte mode
  const cat = buildCatalog(p.base, [sheet], items, p.state);
  const map = new Map(cat.map((c) => [c.key, c]));
  p.packages[0].lines = [{ id: '1', catalogKey: cat[0].key, label: cat[0].label, quantity: 1, priceOverride: null, included: false }];
  p.individual = seedIndividual(p.base, [sheet], cat, sheet);
  p.individual[1].priceOverride = 9.99; // edited row: +10% once -> 10.99
  const preview = buildClientPreview(p, map, 'Staffing pricing');
  assert.equal(preview.mode, 'alacarte');
  assert.equal(preview.packages.length, 0);
  assert.ok(!preview.sections.includes('packages'));
  assert.ok(preview.sections.includes('cover') && preview.sections.includes('pricing'));
  assert.deepEqual(preview.individual, [
    { label: 'Federal Search', price: '$5.50' },
    { label: '1 County Criminal Search', price: '$10.99' },
    { label: '3 County Criminal Searches', price: '$18.15' },
  ]);
  assert.equal(preview.grandTotal, 0);
  assert.ok(!/cost|profit|internal/i.test(JSON.stringify(preview)));
  // Section toggles still apply
  p.sections.cover = false;
  assert.ok(!buildClientPreview(p, map, 'x').sections.includes('cover'));
  // Mode persists through draft JSON
  const restored = normalizeProposal(JSON.parse(JSON.stringify(p)), p.base);
  assert.equal(restored.aLaCarteOnly, true);
  assert.equal(normalizeProposal({}, p.base).aLaCarteOnly, false);
  // Package mode unchanged
  p.aLaCarteOnly = false;
  assert.equal(buildClientPreview(p, map, 'x').mode, 'packages');
});

test('coverage seed sheet: lookup by name, graceful fallback, no double coverage, warnings', () => {
  const mk = (id: string, name: string, price: string): BaseSheet => ({ id, name, description: '', minimum_package: [], individual_pricing: [{ label: 'Federal Search', price }, { label: 'Drug Screen', price: 'Included' }] });
  const direct = mk('d', 'SaffHire Direct Pricing', '$5.00');
  const cov = { ...mk('c', 'Staffing + 10% Sales Coverage', '$6.05'), includes_sales_coverage: true };
  const other = { ...mk('o', 'Church Pricing (+10%)', '$7.00'), includes_sales_coverage: true };
  // Oct 29 2026 (company type pricing): the seed sheet never already includes the 10%; "Saffhire Pricing" first.
  const saffhire = mk('s', 'Saffhire Pricing', '$5.00');
  assert.equal(findIndividualSeedSheet([direct, other, cov, saffhire])?.id, 's');
  assert.equal(findIndividualSeedSheet([direct, other, cov])?.id, 'd');
  assert.equal(findIndividualSeedSheet([other, cov])?.id, 'o'); // only coverage sheets left: first one (legacy path)
  assert.equal(findIndividualSeedSheet([mk('x', 'Zeta', '$1'), direct])?.id, 'd');
  assert.equal(findIndividualSeedSheet([])?.id, undefined);
  assert.ok(sheetIncludesCoverage(cov) && !sheetIncludesCoverage(mk('n', 'X +10%', '$1')) && !sheetIncludesCoverage(direct));

  const base = { kind: 'category' as const, priceKey: 'staffing_price' as const };
  const cat = buildCatalog(base, [direct, cov], items, 'Texas');
  const map = new Map(cat.map((c) => [c.key, c]));
  const rows = seedIndividual(base, [cov], cat); // only a coverage sheet exists (legacy drafts)
  assert.equal(rows[0].coverageIncluded, true);
  // Sheet price used as-is, checkbox on or off: no double coverage.
  assert.equal(individualUnit(rows[0], map, false), 6.05);
  assert.equal(individualUnit(rows[0], map, true), 6.05);
  // Fallback to Direct pricing keeps old behaviour (coverage applied by checkbox).
  const dRows = seedIndividual(base, [direct], cat);
  assert.ok(!dRows[0].coverageIncluded);
  assert.equal(individualUnit(dRows[0], map, true), 5.5);

  // Warnings
  assert.deepEqual(coverageWarnings({ base, salesCoverage: false, individual: rows }, [cov]), []);
  assert.equal(coverageWarnings({ base, salesCoverage: true, individual: dRows }, [direct]).length, 0);
  assert.match(coverageWarnings({ base, salesCoverage: true, individual: rows }, [cov])[0], /already includes 10%/);
  // A coverage-inclusive base sheet no longer warns: the checkbox is locked and no second multiplier is applied.
  assert.deepEqual(coverageWarnings({ base: { kind: 'sheet', sheetId: 'c' }, salesCoverage: true, individual: [] }, [cov]), []);
  assert.equal(coverageWarnings({ base: { kind: 'sheet', sheetId: 'd' }, salesCoverage: true, individual: [] }, [direct]).length, 0);
  // Persisted through drafts
  const p = emptyProposal(base); p.individual = rows;
  assert.equal(normalizeProposal(JSON.parse(JSON.stringify(p)), base).individual[0].coverageIncluded, true);
});

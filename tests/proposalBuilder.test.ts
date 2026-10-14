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

test('10% sales coverage applies to client prices only; overrides are used as typed', () => {
  const cat = buildCatalog({ kind: 'category', priceKey: 'staffing_price' }, [sheet], items, 'Texas');
  const county = cat[0];
  const base = calcLine({ id: 'l', catalogKey: county.key, label: county.label, quantity: 2, priceOverride: null, included: false }, county, true);
  assert.equal(base.unit, 6.6);
  assert.equal(base.total, 13.2);
  assert.equal(base.cost, 6); // cost not marked up
  assert.equal(base.edited, false);
  const edited = calcLine({ id: 'l', catalogKey: county.key, label: county.label, quantity: 2, priceOverride: 7.25, included: false }, county, true);
  assert.equal(edited.unit, 7.25);
  assert.equal(edited.total, 14.5);
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
  assert.equal(t.perPackage[1].total, 15.5);
  assert.equal(t.total, 27.6);
  const preview = buildClientPreview(p, map, 'Staffing pricing');
  const json = JSON.stringify(preview);
  assert.ok(!/cost|profit|internal/i.test(json), 'client preview must not include internal fields');
  assert.equal(preview.grandTotal, 27.6);
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
  assert.equal(rows[2].priceOverride, 16.5);
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

// Run: npx --yes tsx --test tests/proposalCompanyType.test.ts
// Robert (Oct 29 2026, 10:32 AM CT): "Don't you ask what type of company the proposal is for? The pricing should be determined
// by that unless we authorize an override or update the individual prices ourselves for that proposal."
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BuilderProposal, CLIENT_FORBIDDEN_WORDING, CatalogEntry, CompanyType, PriceKey, applyCompanyTypePricing, buildCatalog,
  buildClientPreview, changeCompanyType, companyTypeBase, companyTypes, coverageApplies, emptyProposal, individualUnit,
  manualPriceEdits, newLine, normalizeProposal, pricingSourceNote, proposalTotals, remapToCatalog, round2,
} from '../lib/proposalBuilder';
import { productionSheets } from './fixtures/productionPriceSheets';
import { texasItems } from './fixtures/productionPricingItemsTexas';

const sheets = productionSheets;
const items = texasItems;
const PKG = ['Federal Search', 'County Criminal Search', 'MVR', 'Drug Screening'];
const price = (service: string, key: PriceKey) => Number(items.find((i) => i.service === service)![key]);

function catalogOf(p: BuilderProposal) {
  const list = buildCatalog(p.base, sheets, items, p.state);
  return { list, map: new Map<string, CatalogEntry>(list.map((c) => [c.key, c])) };
}

/** New proposal in Texas, one package, company type picked in setup (no edits yet). */
function proposalFor(type: CompanyType, box = false) {
  let p = emptyProposal({ kind: 'category', priceKey: 'staffing_price' });
  p.state = 'Texas';
  p.salesCoverage = box;
  p = changeCompanyType(p, type, sheets, items).proposal;
  const { list } = catalogOf(p);
  p.packages[0].lines = PKG.map((label) => newLine(list.find((c) => c.label === label)));
  return p;
}

test('company type picks the default base for packages AND the Individual table (all five types)', () => {
  for (const t of companyTypes) {
    const p = proposalFor(t.key);
    assert.deepEqual(p.base, { kind: 'category', priceKey: t.priceKey });
    assert.equal(p.companyType, t.key);
    assert.equal(p.baseOverride, false);
    const { map } = catalogOf(p);
    const expectedPkg = round2(PKG.reduce((s, l) => s + price(l, t.priceKey), 0));
    assert.equal(proposalTotals(p, map, sheets).total, expectedPkg, `${t.label} package total`);
    const ind = new Map(p.individual.map((r) => [r.label, individualUnit(r, map, false)]));
    assert.equal(ind.get('Federal Search'), price('Federal Search', t.priceKey));
    assert.equal(ind.get('MVR'), price('MVR', t.priceKey));
    assert.equal(ind.get('1 County Criminal Search'), price('County Criminal Search', t.priceKey));
    assert.equal(ind.get('Drug Screening'), price('Drug Screening', t.priceKey));
    assert.equal(ind.get('Civil Search Lower Only'), price('Civil Seaarch Lower Only', t.priceKey));
    // No category price exists for these two: the plain "Saffhire Pricing" sheet price is used (never a coverage sheet).
    assert.equal(ind.get('3 County Criminal Searches'), 16.5);
    assert.equal(ind.get('WOTC'), 5);
    assert.ok(p.individual.every((r) => !r.coverageIncluded));
    assert.match(pricingSourceNote(p, sheets), new RegExp(`default to ${t.label} pricing`));
  }
});

test('trucking vs staffing (Texas, production prices): before = Individual from "Staffing + 10%" sheet, after = company type', () => {
  const truck = proposalFor('trucking');
  const staff = proposalFor('staffing');
  const tm = catalogOf(truck).map;
  const sm = catalogOf(staff).map;
  assert.equal(proposalTotals(truck, tm, sheets).total, 53.5); // 10 + 9 + 4.50 + 30
  assert.equal(proposalTotals(staff, sm, sheets).total, 54); // 6.50 + 7 + 5.50 + 35
  const fed = (p: BuilderProposal, m: Map<string, CatalogEntry>) => individualUnit(p.individual.find((r) => r.label === 'Federal Search')!, m, coverageApplies(p, sheets));
  assert.equal(fed(truck, tm), 10);
  assert.equal(fed(staff, sm), 6.5);
});

test('10% box: applied once on packages and Individual rows, never compounded, never shown to the client', () => {
  for (const t of companyTypes) for (const box of [false, true]) for (const edit of [false, true]) {
    const p = proposalFor(t.key, box);
    if (edit) { p.packages[0].lines[0].priceOverride = 12.34; p.individual[0].priceOverride = 7.77; }
    const { map } = catalogOf(p);
    const base = round2(PKG.reduce((s, l, i) => s + (edit && i === 0 ? 12.34 : price(l, t.priceKey)), 0));
    const total = proposalTotals(p, map, sheets).total;
    const expected = box ? round2(p.packages[0].lines.reduce((s, l, i) => s + round2((edit && i === 0 ? 12.34 : price(PKG[i], t.priceKey)) * 1.1), 0)) : base;
    assert.equal(total, expected);
    assert.ok(total <= round2(base * 1.1) + 0.01);
    const ind0 = individualUnit(p.individual[0], map, coverageApplies(p, sheets));
    const ind0Base = edit ? 7.77 : price('Federal Search', t.priceKey);
    assert.equal(ind0, box ? round2(ind0Base * 1.1) : ind0Base);
    const preview = buildClientPreview(p, map, `${t.label} pricing`, new Date(0), sheets);
    assert.ok(!CLIENT_FORBIDDEN_WORDING.test(JSON.stringify(preview)), 'no 10% / coverage wording for clients');
    assert.ok(!/cost|profit|internal|override|company type/i.test(JSON.stringify(preview)));
  }
});

test('changing the company type re-defaults when nothing was edited', () => {
  const p = proposalFor('staffing');
  const r = changeCompanyType(p, 'trucking', sheets, items);
  assert.equal(r.redefaulted, true);
  assert.equal(r.note, '');
  assert.deepEqual(r.proposal.base, companyTypeBase('trucking'));
  const { map } = catalogOf(r.proposal);
  assert.equal(proposalTotals(r.proposal, map, sheets).total, 53.5); // package lines remapped to trucking prices
  assert.equal(individualUnit(r.proposal.individual.find((x) => x.label === 'Federal Search')!, map, false), 10);
});

test('manual edits are kept on a company type change, with an admin-only note; Apply re-defaults but keeps the edits', () => {
  const p = proposalFor('staffing');
  p.packages[0].lines[0].priceOverride = 6; // typed price
  p.individual.find((r) => r.label === 'MVR')!.priceOverride = 3.25;
  p.individual.push({ id: 'custom', label: 'Fingerprinting', catalogKey: '', priceOverride: 15 });
  assert.deepEqual(manualPriceEdits(p), { lines: 1, individual: 2, any: true });
  const r = changeCompanyType(p, 'trucking', sheets, items);
  assert.equal(r.redefaulted, false);
  assert.equal(r.proposal.companyType, 'trucking');
  assert.deepEqual(r.proposal.base, { kind: 'category', priceKey: 'staffing_price' }); // untouched
  assert.deepEqual(r.proposal.individual, p.individual);
  assert.match(r.note, /1 package price was edited and 2 individual prices were edited/);
  assert.ok(!CLIENT_FORBIDDEN_WORDING.test(JSON.stringify(buildClientPreview(r.proposal, catalogOf(r.proposal).map, 'x', new Date(0), sheets))));
  assert.match(pricingSourceNote(r.proposal, sheets), /^Override: prices come from Staffing pricing instead of the Trucking default/);

  const applied = applyCompanyTypePricing(r.proposal, sheets, items);
  assert.deepEqual(applied.base, companyTypeBase('trucking'));
  const { map } = catalogOf(applied);
  assert.equal(applied.packages[0].lines[0].priceOverride, 6); // edit kept
  assert.equal(proposalTotals(applied, map, sheets).total, round2(6 + 9 + 4.5 + 30));
  assert.equal(individualUnit(applied.individual.find((x) => x.label === 'MVR')!, map, false), 3.25);
  assert.equal(individualUnit(applied.individual.find((x) => x.label === 'Federal Search')!, map, false), 10);
  assert.ok(applied.individual.some((x) => x.label === 'Fingerprinting' && x.priceOverride === 15));
});

test('an explicit override base is kept on a company type change', () => {
  let p = proposalFor('trucking');
  const sheetBase = { kind: 'sheet' as const, sheetId: 'c42d6dcc' };
  p = remapToCatalog({ ...p, base: sheetBase, baseOverride: true }, sheets, items);
  const r = changeCompanyType(p, 'church', sheets, items);
  assert.equal(r.redefaulted, false);
  assert.deepEqual(r.proposal.base, sheetBase);
  assert.match(r.note, /override base is set/);
  assert.match(pricingSourceNote(r.proposal, sheets), /Override: prices come from Saffhire Pricing instead of the Church default/);
  const applied = applyCompanyTypePricing(r.proposal, sheets, items);
  assert.deepEqual(applied.base, companyTypeBase('church'));
  assert.equal(applied.baseOverride, false);
});

test('coverage sheet as override: checkbox stays locked, no second 10% (PR #34 unchanged)', () => {
  const p = proposalFor('staffing', true);
  const over = remapToCatalog({ ...p, base: { kind: 'sheet', sheetId: 'd1024696' }, baseOverride: true }, sheets, items);
  assert.equal(coverageApplies(over, sheets), false);
});

test('drafts: company type persists; legacy drafts infer it from a category base, a sheet base counts as an override', () => {
  const p = proposalFor('high_volume');
  const restored = normalizeProposal(JSON.parse(JSON.stringify(p)), p.base);
  assert.equal(restored.companyType, 'high_volume');
  assert.equal(restored.baseOverride, false);
  const legacyCat = normalizeProposal({ base: { kind: 'category', priceKey: 'trucking_price' } }, p.base);
  assert.equal(legacyCat.companyType, 'trucking');
  assert.equal(legacyCat.baseOverride, false);
  const legacySheet = normalizeProposal({ base: { kind: 'sheet', sheetId: 'd1024696' } }, p.base);
  assert.equal(legacySheet.companyType, '');
  assert.equal(legacySheet.baseOverride, true);
  const fresh = emptyProposal({ kind: 'category', priceKey: 'staffing_price' });
  assert.equal(fresh.companyType, '');
  assert.equal(pricingSourceNote(fresh, sheets), 'Choose the company type to set pricing.');
});

test('company-type packages offer the Saffhire Pricing minimum-package items at sheet prices; 10% once; Included stays $0', () => {
  const MIN_ITEMS = ['Social Security Trace', 'Sex Offender Registry', 'Global Security Watch List', 'National Database Search'];
  const plain = sheets.find((s) => s.name === 'Saffhire Pricing')!;
  for (const t of companyTypes) for (const box of [false, true]) {
    const p = proposalFor(t.key, box);
    const { list } = catalogOf(p);
    for (const label of MIN_ITEMS) {
      const e = list.find((c) => c.label === label);
      assert.ok(e, `${t.label}: ${label} offered`);
      const sheetRow = plain.minimum_package.find((r) => r.label === label)!;
      assert.equal(e!.included, sheetRow.price === 'Included');
      if (!e!.included) assert.equal(e!.basePrice, Number(sheetRow.price.replace(/[$,]/g, '')));
    }
    p.packages[0].minimumItems = MIN_ITEMS.map((label) => newLine(list.find((c) => c.label === label)));
    const { map } = catalogOf(p);
    const base = round2(5 + PKG.reduce((s, l) => s + price(l, t.priceKey), 0));
    const expected = box ? round2(5.5 + PKG.reduce((s, l) => s + round2(price(l, t.priceKey) * 1.1), 0)) : base;
    assert.equal(proposalTotals(p, map, sheets).total, expected, `${t.label} box ${box}`);
    const preview = buildClientPreview(p, map, `${t.label} pricing`, new Date(0), sheets);
    const rows = preview.packages[0].rows;
    assert.equal(rows.find((r) => r.label === 'Social Security Trace')!.unit, box ? '$5.50' : '$5.00');
    for (const label of MIN_ITEMS.slice(1)) assert.equal(rows.find((r) => r.label === label)!.total, 'Included');
    assert.ok(!CLIENT_FORBIDDEN_WORDING.test(JSON.stringify(preview)), 'no 10% / coverage wording for clients');
    // Not in the Individual table (Robert: no National Criminal Alias Search row either).
    assert.ok(!p.individual.some((r) => r.label === 'National Criminal Alias Search' || r.label === 'Social Security Trace'));
  }
});

test('minimum-package items never come from a sheet that already includes the 10%', () => {
  const onlyCoverage = sheets.filter((s) => s.includes_sales_coverage);
  const list = buildCatalog(companyTypeBase('trucking'), onlyCoverage, items, 'Texas');
  assert.ok(!list.some((c) => c.label === 'Social Security Trace'));
});

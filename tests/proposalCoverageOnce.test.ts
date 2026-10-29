// Run: npx --yes tsx --test tests/proposalCoverageOnce.test.ts
// Robert (Oct 29, 2026): "Only show 10% once." The 10% sales coverage is applied at most once per quote and never mentioned to clients
// (Robert, 9:58 AM CT: "Absolutely not. That covers our referral fee cost."). Coverage sheets are flagged in the database.
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BaseSheet, BuilderLine, BuilderProposal, CatalogPricingItem, CLIENT_FORBIDDEN_WORDING, clientSafeText,
  baseIncludesCoverage, buildCatalog, buildClientPreview, coverageApplies, emptyProposal, newLine,
  packageToSheetRows, proposalTotals, round2, sheetIncludesCoverage,
} from '../lib/proposalBuilder';
import { IND, IND_COV, MIN, MIN_COV, productionSheets } from './fixtures/productionPriceSheets';

const savedFromBuilderNoBox: BaseSheet = { id: 'saved-a', name: 'Acme – Basic', description: 'Created from the proposal builder (Staffing + 10% Sales Coverage).', minimum_package: MIN_COV, individual_pricing: IND_COV, includes_sales_coverage: true };
const savedFromBuilderBox: BaseSheet = { id: 'saved-b', name: 'Acme – Standard', description: 'Created from the proposal builder (Saffhire Pricing; includes 10% sales coverage).', minimum_package: MIN_COV, individual_pricing: IND_COV, includes_sales_coverage: true };
const flaggedOn: BaseSheet = { id: 'flag-on', name: 'Client X special', description: '', minimum_package: MIN_COV, individual_pricing: IND_COV, includes_sales_coverage: true };
const flaggedOff: BaseSheet = { id: 'flag-off', name: 'Old +10% Sales Coverage sheet (repriced)', description: 'with a 10% uplift', minimum_package: MIN, individual_pricing: IND, includes_sales_coverage: false };
const sheets = [...productionSheets, savedFromBuilderNoBox, savedFromBuilderBox, flaggedOn, flaggedOff];
const COVERAGE_SHEETS = new Set(['d1024696', 'saved-a', 'saved-b', 'flag-on']);

// Category-mode fixture: staffing_price equal to the Saffhire Pricing sheet for these services.
const items: CatalogPricingItem[] = [
  { id: 'f', service: 'Federal Search', state: 'Texas', cost: 1, total_cost: 1.5, church_price: 4, staffing_price: 5, trucking_price: 5, high_volume_price: 3, general_price: 6 },
  { id: 'm', service: 'MVR', state: 'Texas', cost: 2, total_cost: 2, church_price: 4, staffing_price: 4.5, trucking_price: 4, high_volume_price: 3, general_price: 5 },
  { id: 'd', service: 'Drug Screening', state: 'Texas', cost: 20, total_cost: 20, church_price: 27, staffing_price: 28.5, trucking_price: 28, high_volume_price: 25, general_price: 30 },
  { id: 'e', service: 'Employment Verification', state: 'Texas', cost: 5, total_cost: 5, church_price: 9, staffing_price: 9, trucking_price: 9, high_volume_price: 8, general_price: 10 },
];

type Base = { label: string; base: BuilderProposal['base'] };
const bases: Base[] = [
  ...sheets.map((s) => ({ label: `sheet "${s.name}"`, base: { kind: 'sheet' as const, sheetId: s.id } })),
  { label: 'category Staffing', base: { kind: 'category' as const, priceKey: 'staffing_price' as const } },
];
const PACKAGE_LINES = [
  ['Federal Search', 'MVR'],
  ['Drug Screening', 'Employment Verification', 'MVR'],
  ['Federal Search', 'Drug Screening'],
];

function build(b: Base, box: boolean, packageCount: number, edit: 'none' | 'one' | 'all') {
  const p = emptyProposal(b.base);
  p.state = 'Texas';
  p.salesCoverage = box;
  const cat = buildCatalog(p.base, sheets, items, p.state);
  const map = new Map(cat.map((c) => [c.key, c]));
  const lineFor = (label: string, qty: number): BuilderLine => ({ ...newLine(cat.find((c) => c.label === label)), quantity: qty });
  p.packages = PACKAGE_LINES.slice(0, packageCount).map((labels, i) => ({
    id: `p${i}`, name: `Package ${i + 1}`, description: '',
    minimumItems: b.base.kind === 'sheet' ? MIN.map((r) => lineFor(r.label, 1)) : [],
    lines: labels.map((l, j) => lineFor(l, j + 1)),
  }));
  const editable = p.packages.flatMap((pkg) => [...pkg.minimumItems, ...pkg.lines]).filter((l) => !l.included);
  if (edit === 'one') editable[0].priceOverride = 7.25;
  if (edit === 'all') editable.forEach((l, i) => (l.priceOverride = 3 + i * 1.15));
  return { p, map };
}

test('every sheet × box on/off × 1-3 packages × edited prices: 10% applied at most once', () => {
  let cases = 0;
  for (const b of bases) for (const box of [false, true]) for (const n of [1, 2, 3]) for (const edit of ['none', 'one', 'all'] as const) {
    const { p, map } = build(b, box, n, edit);
    const name = `${b.label} box=${box} packages=${n} edit=${edit}`;
    const inSheet = b.base.kind === 'sheet' && COVERAGE_SHEETS.has(b.base.sheetId);
    assert.equal(baseIncludesCoverage(p, sheets), inSheet, name);
    const applies = box && !inSheet;
    assert.equal(coverageApplies(p, sheets), applies, name);
    const totals = proposalTotals(p, map, sheets);
    let grandBase = 0; let grandLines = 0;
    p.packages.forEach((pkg, i) => {
      let base = 0; let expected = 0; let priced = 0;
      for (const line of [...pkg.minimumItems, ...pkg.lines]) {
        if (line.included) continue;
        const pre = line.priceOverride ?? map.get(line.catalogKey)!.basePrice!;
        base += pre * line.quantity;
        expected += round2(pre * (applies ? 1.1 : 1)) * line.quantity;
        priced += 1;
      }
      const total = totals.perPackage[i].total;
      assert.equal(total, round2(expected), `${name} pkg${i} exact`);
      // Never compounds: at most base × 1.10 (+ half a cent of per-unit rounding per priced line).
      assert.ok(total <= base * 1.1 + 0.005 * priced + 1e-9, `${name} pkg${i} <= x1.10`);
      if (!applies) assert.equal(total, round2(base), `${name} pkg${i} no multiplier`);
      grandBase += base; grandLines += priced;
    });
    assert.ok(totals.total <= grandBase * 1.1 + 0.005 * grandLines + 1e-9, `${name} grand <= x1.10`);
    if (applies && edit === 'none') assert.equal(totals.total, round2(grandBase * 1.1), `${name} grand exactly x1.10`);
    if (!applies) assert.equal(totals.total, round2(grandBase), `${name} grand unchanged`);

    // Client preview / PDF payload: no 10% or sales coverage wording at all, even when the base label is the
    // coverage sheet's name and the package description / notes typed by an admin mention it.
    const sheetName = b.base.kind === 'sheet' ? sheets.find((s) => s.id === (b.base as { sheetId: string }).sheetId)!.name : 'Staffing pricing';
    p.notes = 'Pricing includes 10% sales coverage.';
    p.packages[0].description = 'Staffing + 10% Sales Coverage package';
    const preview = buildClientPreview(p, map, sheetName, new Date(0), sheets);
    const text = JSON.stringify(preview);
    assert.ok(!/10\s*%|sales\s*coverage|coverage/i.test(text), `${name}: client output mentions coverage: ${text.match(/.{0,30}(10\s*%|coverage).{0,30}/i)?.[0]}`);
    assert.ok(!('coverageNote' in preview), name);
    assert.equal(preview.grandTotal, totals.total, name);
    cases++;
  }
  assert.equal(cases, bases.length * 2 * 3 * 3);
});

test('"Staffing + 10% Sales Coverage" with the box checked equals "Saffhire Pricing" with the box checked (real sheet values)', () => {
  for (const n of [1, 2, 3]) {
    const cov = build(bases.find((b) => b.label.includes('Staffing + 10%'))!, true, n, 'none');
    const plain = build(bases.find((b) => b.label.includes('"Saffhire Pricing"'))!, true, n, 'none');
    assert.deepEqual(proposalTotals(cov.p, cov.map, sheets).perPackage.map((x) => x.total), proposalTotals(plain.p, plain.map, sheets).perPackage.map((x) => x.total));
  }
  const { p, map } = build(bases.find((b) => b.label.includes('Staffing + 10%'))!, true, 2, 'none');
  const t = proposalTotals(p, map, sheets);
  // Package 1: SSN Trace 5.50 + Federal 5.50 + MVR 4.95×2 = 20.90; Package 2: SSN 5.50 + Drug 31.35 + Employment 9.90×2 + MVR 4.95×3 = 71.50
  assert.deepEqual(t.perPackage.map((x) => x.total), [20.9, 71.5]);
  assert.equal(t.total, 92.4);
});

test('sheet detection uses the database flag only (migration 014 values)', () => {
  assert.deepEqual(productionSheets.map((s) => sheetIncludesCoverage(s)), [false, false, true]);
  assert.equal(sheetIncludesCoverage(savedFromBuilderNoBox), true);
  assert.equal(sheetIncludesCoverage(flaggedOn), true);
  assert.equal(sheetIncludesCoverage(flaggedOff), false); // name/description mention 10% but the flag is false
  assert.equal(sheetIncludesCoverage({ ...productionSheets[2], includes_sales_coverage: undefined }), false); // no name fallback
  assert.equal(sheetIncludesCoverage(undefined), false);
});

test('clientSafeText strips every coverage phrasing and keeps other text', () => {
  for (const t of ['Staffing + 10% Sales Coverage', 'Staffing pricing with a 10% uplift to cover salesperson cost.', 'Created from the proposal builder (Saffhire Pricing; includes 10% sales coverage).', 'All prices include 10% sales coverage.', 'Sales Coverage', 'x 10 % y']) {
    assert.ok(!CLIENT_FORBIDDEN_WORDING.test(clientSafeText(t)), t);
  }
  assert.equal(clientSafeText('SaffHire Direct Pricing'), 'SaffHire Direct Pricing');
  assert.equal(clientSafeText(''), '');
});

test('saving packages as a sheet writes final prices once and the new sheet is recognised as coverage-inclusive', () => {
  const { p, map } = build(bases.find((b) => b.label.includes('"Saffhire Pricing"'))!, true, 1, 'one');
  const rows = packageToSheetRows(p.packages[0], map, coverageApplies(p, sheets));
  assert.deepEqual(rows.find((r) => r.label === 'Social Security Trace'), { label: 'Social Security Trace', price: '$7.98' }); // edited 7.25 +10% once
  assert.deepEqual(rows.find((r) => r.label === 'Federal Search'), { label: 'Federal Search', price: '$5.50' });
  // The builder saves includes_sales_coverage = box applied || base sheet already included it.
  const flag = coverageApplies(p, sheets) || baseIncludesCoverage(p, sheets);
  assert.equal(flag, true);
  const saved: BaseSheet = { id: 'n', name: 'New – Package 1', description: '', minimum_package: rows, individual_pricing: [], includes_sales_coverage: flag };
  const again = emptyProposal({ kind: 'sheet', sheetId: 'n' });
  again.salesCoverage = true;
  assert.equal(coverageApplies(again, [saved]), false); // re-using the saved sheet never adds a second 10%
});

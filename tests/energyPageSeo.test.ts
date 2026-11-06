import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { industryFaqs } from "../data/industryFaqs";
import { getPageMetadata } from "../shared/seoMetadata";

describe("energy industry search terms", () => {
  it("keeps Oil & Gas in the title, H1, description and body, within the limits", () => {
    const meta = getPageMetadata("/industries/oil-and-gas");
    const titleTag = `${meta.title} | SaffHire`;
    assert.ok(titleTag.length <= 65, `${titleTag.length}: ${titleTag}`);
    assert.ok(meta.description.length <= 160, String(meta.description.length));
    assert.match(meta.title, /Oil & Gas/);
    assert.match(meta.description, /Oil & Gas/);
    const faq = industryFaqs["/industries/oil-and-gas"];
    const blob = `${meta.title} ${meta.description} ${JSON.stringify(faq)}`;
    assert.match(blob, /employee screening for the energy industry/i);
    assert.match(blob, /background check for the energy industry/i);
    assert.match(blob, /energy industry background check solutions/i);
    assert.match(blob, /Frisco, TX/);
    assert.match(blob, /nationwide/i);
    assert.match(blob, /Veteran-Owned/);
    const page = readFileSync(new URL("../legacy/EnergyPage.tsx", import.meta.url), "utf8");
    assert.match(page, /Oil & Gas Employee Screening/);
    assert.match(page, /for the Energy Industry/);
    assert.match(page, /Background check solutions for Oil & Gas/);
    assert.match(page, /path="\/industries\/oil-and-gas"/);
    const combined = `${blob} ${page}`;
    assert.doesNotMatch(combined, /PBSA|TazWorks|I-9|E-Verify|adverse action|\$\d/i);
    const config = readFileSync(new URL("../next.config.js", import.meta.url), "utf8");
    assert.match(
      config,
      /source: '\/industries\/energy', destination: '\/industries\/oil-and-gas', statusCode: 301/,
    );
    assert.equal(industryFaqs["/industries/energy"], undefined);
  });
});

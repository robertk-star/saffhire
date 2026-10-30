import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { industryFaqs } from "../data/industryFaqs";
import { getPageMetadata } from "../shared/seoMetadata";

describe("energy industry search terms", () => {
  it("keeps the title and description within the limits and covers the queries", () => {
    const meta = getPageMetadata("/industries/energy");
    const titleTag = `${meta.title} | SaffHire`;
    assert.ok(titleTag.length <= 65, titleTag);
    assert.ok(meta.description.length <= 160, String(meta.description.length));
    const blob = `${meta.title} ${meta.description} ${JSON.stringify(industryFaqs["/industries/energy"])}`;
    assert.match(blob, /employee screening for the energy industry/i);
    assert.match(blob, /background check for the energy industry/i);
    assert.match(blob, /energy industry background check solutions/i);
    assert.match(blob, /Frisco, TX/);
    assert.match(blob, /nationwide/i);
    assert.match(blob, /Veteran-Owned/);
    assert.doesNotMatch(blob, /PBSA|TazWorks|I-9|E-Verify|adverse action|\$\d/i);
    const page = readFileSync(new URL("../legacy/EnergyPage.tsx", import.meta.url), "utf8");
    assert.match(page, /Employee Screening/);
    assert.match(page, /for the Energy Industry/);
  });
});

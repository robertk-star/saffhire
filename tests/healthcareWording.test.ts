import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { getPageMetadata } from "../shared/seoMetadata";

describe("healthcare hospital and medical office wording", () => {
  it("adds both terms once in the body and once in the description", () => {
    const meta = getPageMetadata("/industries/healthcare");
    assert.ok(meta.description.length <= 160, String(meta.description.length));
    assert.match(meta.description, /hospitals, medical offices, and other healthcare organizations/);
    assert.doesNotMatch(meta.title, /hospital|medical office/i);
    const page = readFileSync(new URL("../legacy/HealthcarePage.tsx", import.meta.url), "utf8");
    assert.match(page, /Healthcare\{\s*" "\}<br/);
    assert.match(page, /at hospitals and medical offices/);
    assert.equal(page.split("medical office").length - 1, 2);
    assert.doesNotMatch(`${meta.title} ${meta.description} ${page}`, /PBSA|TazWorks|I-9|E-Verify|adverse action|\$\d/i);
  });
});

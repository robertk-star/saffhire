import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { organizationSchema } from "../lib/structuredData";

const phrase = "18 years of combined experience";

function read(path: string) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}

describe("founders' combined experience", () => {
  it("uses the approved phrase on the about page, homepage trust section, schema, and llms files", () => {
    const about = read("../components/AboutSection.tsx");
    const why = read("../legacy/WhySaffHirePage.tsx");
    const trust = read("../components/WhySaffHireHighlights.tsx");
    const company = read("../app/company-information/page.tsx");
    const llms = read("../public/llms.txt");
    const llmsFull = read("../public/llms-full.txt");

    for (const source of [about, why, trust, company, llms, llmsFull, organizationSchema.description]) {
      assert.match(source, new RegExp(phrase));
    }
    assert.match(about, /The founders, Robert Krebsbach, John Waak and Jody Thigpen, have 18 years of combined experience/);
    assert.match(trust, /Founded by Robert Krebsbach, John Waak and Jody Thigpen, with 18 years of combined experience/);
    assert.match(why, /founded by Robert Krebsbach, John Waak and Jody Thigpen, with 18 years of combined experience/);
    assert.match(company, /@type': 'Organization'/);
    assert.doesNotMatch(
      `${about}\n${why}\n${trust}\n${organizationSchema.description}`,
      /FCRA expert|compliance specialist|PBSA|TazWorks|I-9|E-Verify|adverse action/i,
    );
  });
});

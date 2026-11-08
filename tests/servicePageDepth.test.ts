import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { plainText } from "../components/RichText";
import { serviceUpgrades } from "../data/checkPages";
import { getSeoAuthorityPage } from "../data/seoAuthorityPages";

const banned = /PBSA|TazWorks|I-9|E-Verify|adverse action|credit check|testimonial|\$\d|competitive pricing|[—–]/i;

function words(value: string) {
  return plainText(value).split(/\s+/).filter(Boolean).length;
}

function sectionWords(sections: Array<{ heading: string; paragraphs?: string[]; bullets?: string[] }>) {
  return sections.reduce((total, section) => {
    return total + words([section.heading, ...(section.paragraphs ?? []), ...(section.bullets ?? [])].join(" "));
  }, 0);
}

describe("thin service page depth", () => {
  for (const path of ["/employment-verification", "/mvr-checks"] as const) {
    it(`${path} explains coverage, audience, process, and compliance`, () => {
      const page = serviceUpgrades[path];
      const headings = page.sections.map((section) => section.heading);
      assert.ok(headings.some((heading) => /who/i.test(heading)));
      assert.ok(headings.some((heading) => /how/i.test(heading)));
      assert.ok(headings.includes("Compliance"));
      assert.ok(page.faqs.length >= 5);
      assert.ok(sectionWords(page.sections) >= 350, String(sectionWords(page.sections)));
      const blob = JSON.stringify(page);
      assert.match(blob, /not a law firm/);
      assert.match(blob, /1 to 3 days on average/);
      assert.doesNotMatch(blob, banned);
      assert.doesNotMatch(blob, /2-5 days/);
    });
  }

  for (const path of ["/volunteer-background-checks", "/small-business-background-checks"] as const) {
    it(`${path} adds process, audience, and compliance sections`, () => {
      const page = getSeoAuthorityPage(path);
      assert.ok(page?.detailSections && page.detailSections.length >= 4);
      const headings = page!.detailSections!.map((section) => section.heading.toLowerCase());
      assert.ok(headings.some((heading) => heading.includes("what")));
      assert.ok(headings.some((heading) => heading.includes("who")));
      assert.ok(headings.some((heading) => heading.includes("how the process")));
      assert.ok(headings.some((heading) => heading.includes("compliance")));
      assert.ok(page!.faqs.length >= 5);
      assert.ok(sectionWords(page!.detailSections!) >= 350);
      const blob = JSON.stringify(page);
      assert.match(blob, /not a law firm/);
      assert.match(blob, /1 to 3 days on average/);
      assert.match(blob, /888-588-1733/);
      assert.doesNotMatch(blob, banned);
    });
  }
});

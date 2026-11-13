import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const heading =
  "Instant searches like the National Criminal Database, SSN Trace and MVR usually return in minutes. Full packages take 1 to 3 days on average.";

describe("homepage turnaround heading", () => {
  it("states the existing minute and 1 to 3 day claims in a heading", () => {
    const page = readFileSync(new URL("../components/WhyChooseUsSection.tsx", import.meta.url), "utf8");
    assert.match(page, new RegExp(`<h2[^>]*>\\s*${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*</h2>`));
    assert.equal(page.split(heading).length - 1, 2);
    assert.doesNotMatch(page, /PBSA|TazWorks|I-9|E-Verify|adverse action|\$\d|24 hour/i);
  });

  it("shows 1 to 5 days on packages with drug screening and 1 to 3 days on the rest", () => {
    const packages = readFileSync(new URL("../components/PackagesClient.tsx", import.meta.url), "utf8");
    // Robert, Nov 13 2026: any package with drug screening says 1 to 5 days.
    const rows = [...packages.matchAll(/\{ name: "(Package \d)", adds: (\d+), turnaround: "([^"]+)" \}/g)].map((m) => ({
      name: m[1],
      adds: Number(m[2]),
      turnaround: m[3],
    }));
    const drugScreeningAdds = 4; // Drug Screening is the 4th add-on (minAdds 4).
    assert.equal(rows.length, 6);
    for (const row of rows) {
      assert.equal(row.turnaround, row.adds >= drugScreeningAdds ? "1 to 5 days" : "1 to 3 days", row.name);
    }
    assert.match(packages, /const addOns = \[[^\]]*"Motor Vehicle Report \(MVR\) §",\s*"State Search † ‡",\s*"County Search † ‡",\s*"Drug Screening",/);
    assert.equal(packages.split('turnaround: "1 to 3 days"').length - 1, 4);
    assert.equal(packages.split('turnaround: "1 to 5 days"').length - 1, 2);
    assert.doesNotMatch(packages, /2-5 days|1-2 days|turnaround: "1 day"/);
    assert.match(packages, /Full background packages take 1 to 3 days on average/);
  });

  it("says drug-screening packages take 1 to 5 days and closer-look records can take longer (Nov 13 audit)", () => {
    const note = "Packages with drug screening take 1 to 5 days on average, and records that need a closer look can take longer.";
    for (const path of [
      "../components/WhyChooseUsSection.tsx",
      "../components/PackagesClient.tsx",
      "../data/pageFaqs.ts",
      "../legacy/FAQPage.tsx",
      "../data/aiInfoPage.ts",
      "../public/llms.txt",
      "../public/llms-full.txt",
    ]) {
      const source = readFileSync(new URL(path, import.meta.url), "utf8");
      assert.ok(source.includes(note), path);
      // llms-full.txt already uses dashes in its section headings; check only the new line there.
      const checked = path.endsWith("llms-full.txt") ? note : source;
      assert.doesNotMatch(checked, /[\u2014\u2013]|guarantee|24 hour|48 hour/i, path);
    }
    const home = readFileSync(new URL("../components/WhyChooseUsSection.tsx", import.meta.url), "utf8");
    assert.match(home, /A full package typically takes 1 to 3 days\./);
  });
});


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

  it("leaves package rows that say 2-5 days unchanged", () => {
    const packages = readFileSync(new URL("../components/PackagesClient.tsx", import.meta.url), "utf8");
    assert.match(packages, /turnaround: "2-5 days"/);
    assert.equal(packages.split("2-5 days").length - 1, 2);
    assert.doesNotMatch(packages, /1 to 3 days/);
  });
});

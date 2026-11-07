import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { organizationSchema } from "../lib/structuredData";

function read(path: string) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}

describe("Nov 7 audit copy consistency", () => {
  it("removes competitive pricing and uses Frisco, TX in the footer", () => {
    const why = read("../components/WhyChooseUsSection.tsx");
    const footer = read("../components/Footer.tsx");
    assert.doesNotMatch(why, /competitive pricing/i);
    assert.match(why, /Custom packages built around the searches each role needs/);
    assert.match(footer, /Based in Frisco, TX\./);
    assert.doesNotMatch(footer, /Frisco, Texas/);
    assert.match(footer, /since 2019/);
  });

  it("keeps the founding year at 2019 in schema and public facts", () => {
    assert.equal(organizationSchema.foundingDate, "2019");
    const company = read("../app/company-information/page.tsx");
    const llms = read("../public/llms.txt");
    const llmsFull = read("../public/llms-full.txt");
    assert.match(company, /foundingDate: '2019'/);
    assert.match(company, /founded in 2019/i);
    assert.match(llms, /Founded in 2019/);
    assert.match(llmsFull, /founded in 2019/i);
    const combined = `${company}\n${llms}\n${llmsFull}\n${JSON.stringify(organizationSchema)}`;
    assert.doesNotMatch(combined, /since 2020|founded in 2020|foundingDate":"2020"|foundingDate: '2020'/i);
  });
});

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { backgroundCheckCompaniesMeta, backgroundCheckCompaniesPage } from "../data/backgroundCheckCompaniesPage";

const banned = /PBSA|TazWorks|adverse action|credit check|testimonial|\$\d|competitive pricing|flat pric|predictable pric|clear pric|[—–]/i;

describe("/background-check-companies (SH-14/15/16)", () => {
  it("targets all three keyword phrases", () => {
    const blob = JSON.stringify(backgroundCheckCompaniesPage).toLowerCase();
    assert.match(blob, /background check companies/);
    assert.match(blob, /background screening compan(y|ies)/);
    assert.match(blob, /companies that do background checks/);
  });

  it("keeps metadata within limits and the title free of the site suffix", () => {
    assert.ok(backgroundCheckCompaniesMeta.description.length <= 160, String(backgroundCheckCompaniesMeta.description.length));
    assert.ok(`${backgroundCheckCompaniesMeta.title} | SaffHire`.length <= 65);
    assert.doesNotMatch(backgroundCheckCompaniesMeta.title, /SaffHire/);
  });

  it("follows the SaffHire copy rules", () => {
    const blob = JSON.stringify({ backgroundCheckCompaniesMeta, backgroundCheckCompaniesPage });
    assert.doesNotMatch(blob, banned);
    assert.match(blob, /call us for more information or fill out a contact form/i);
    assert.match(blob, /888-588-1733/);
    assert.match(blob, /\(\/contact\)/);
    assert.match(blob, /Frisco, TX/);
    assert.match(blob, /not a law firm/);
    assert.ok(backgroundCheckCompaniesPage.faqs.length >= 6);
  });
});

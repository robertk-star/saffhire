import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { friscoLanding, dallasLanding, planoLanding } from "../data/cityLandings";
import { allenLanding, mckinneyLanding } from "../data/mckinneyAllenLandings";
import { plainText } from "../components/RichText";

function words(value: string) {
  return plainText(value).split(/\s+/).filter(Boolean);
}

function landingWords(landing: {
  h1: string;
  hero: string;
  whyTitle: string;
  whyParagraphs: string[];
  bullets: string[];
  searchesTitle: string;
  searchesParagraphs: string[];
  hqTitle: string;
  hqParagraphs: string[];
  localTitle: string;
  localParagraphs: string[];
  startTitle: string;
  startParagraphs: string[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  serviceCards: { title: string; body: string }[];
  related: { label: string }[];
  serviceArea: string;
  eyebrow: string;
}) {
  const parts = [
    landing.eyebrow,
    landing.h1,
    landing.hero,
    landing.whyTitle,
    ...landing.whyParagraphs,
    ...landing.bullets,
    landing.searchesTitle,
    ...landing.searchesParagraphs,
    landing.hqTitle,
    ...landing.hqParagraphs,
    landing.localTitle,
    ...landing.localParagraphs,
    landing.startTitle,
    ...landing.startParagraphs,
    landing.faqTitle,
    ...landing.faqs.flatMap((item) => [item.question, item.answer]),
    ...landing.serviceCards.flatMap((card) => [card.title, card.body]),
    ...landing.related.map((link) => link.label),
    landing.serviceArea,
    "Talk with SaffHire",
    "Headquartered in Frisco, TX",
    "Screening services",
    "Related SaffHire pages",
    "Get a Free Quote",
  ];
  return words(parts.join(" ")).length;
}

const banned = [/PBSA/i, /TazWorks/i, /I-9/, /E-Verify/i, /adverse action/i, /testimonial/i, /remote work/i, /\$\d/];

describe("McKinney and Allen city landings", () => {
  for (const landing of [mckinneyLanding, allenLanding]) {
    it(`${landing.path} matches the expanded city template`, () => {
      const count = landingWords(landing);
      assert.ok(count >= 1500 && count <= 1900, `${landing.path} has ${count} words`);
      assert.equal(landing.faqs.length, 4);
      assert.ok(landing.seoDescription.length <= 160, String(landing.seoDescription.length));
      assert.ok(landing.seoTitle.length + " | SaffHire".length <= 70);
      assert.match(landing.hero, /Frisco, TX/);
      assert.match(landing.hero, /nationwide/i);
      assert.match(JSON.stringify(landing), /Veteran-Owned/);
      const blob = JSON.stringify(landing);
      for (const pattern of banned) assert.doesNotMatch(blob, pattern);
    });
  }

  it("uses unique copy rather than a renamed Frisco page", () => {
    assert.notEqual(mckinneyLanding.hero, friscoLanding.hero);
    assert.notEqual(allenLanding.hero, friscoLanding.hero);
    assert.notEqual(mckinneyLanding.hero, allenLanding.hero);
    assert.notEqual(mckinneyLanding.seoDescription, allenLanding.seoDescription);
    assert.notEqual(mckinneyLanding.seoTitle, dallasLanding.seoTitle);
    assert.notEqual(allenLanding.seoTitle, planoLanding.seoTitle);
    const friscoAsMckinney = JSON.stringify(friscoLanding).replace(/Frisco/g, "McKinney");
    assert.notEqual(friscoAsMckinney, JSON.stringify(mckinneyLanding));
  });
});

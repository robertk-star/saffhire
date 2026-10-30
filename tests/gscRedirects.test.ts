import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { gscRedirects } from "../data/gscRedirects.js";

const protectedPath = "/blog/fcra-adverse-action-two-step-notice-requirements-2026";

describe("GSC redirects", () => {
  it("301s each dead URL to a relevant page and leaves the protected post untouched", () => {
    const sources = gscRedirects.map((item) => item.source);
    assert.equal(new Set(sources).size, sources.length);
    assert.ok(!sources.includes(protectedPath));
    assert.ok(gscRedirects.length >= 50);

    for (const item of gscRedirects) {
      assert.notEqual(item.source, item.destination);
      assert.ok(item.destination.startsWith("/"));
      assert.ok(item.gsc === "soft" || item.gsc === "hard");
      if (item.gsc === "hard") assert.equal(item.destination, "/");
      if (item.source.startsWith("/blog/")) assert.notEqual(item.destination, "/");
    }

    const config = readFileSync(new URL("../next.config.js", import.meta.url), "utf8");
    const matches = config.match(/fcra-adverse-action-two-step-notice-requirements-2026/g) || [];
    assert.equal(matches.length, 2);
    assert.match(
      config,
      /source: '\/blog\/fcra-adverse-action-two-step-notice-requirements-2026', destination: '\/blog\/fcra-basics-for-employers', statusCode: 301/,
    );
  });
});

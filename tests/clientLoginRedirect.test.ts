import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { describe, it } from "node:test";
import { openKnowledgePages } from "../data/openKnowledgePages";

const require = createRequire(import.meta.url);
const vendor = /instascreen|\.taz\b/i;
const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

describe("client login goes through /login", () => {
  it("keeps the portal URL out of public links and page copy", () => {
    for (const file of [
      "components/Navbar.tsx",
      "components/Footer.tsx",
      "data/openKnowledgePages.ts",
      "app/open-knowledge/okf.json/route.ts",
      "public/llms.txt",
      "public/llms-full.txt",
    ]) {
      assert.doesNotMatch(read(file), vendor, file);
    }
    assert.match(read("components/Navbar.tsx"), /href="\/login"/);
    assert.match(read("components/Footer.tsx"), /\{ label: "Login", href: "\/login" \}/);
  });

  it("shows a Client Login button on the business overview page", () => {
    const overview = openKnowledgePages.find((page) => page.slug === "business-overview");
    assert.ok(overview);
    assert.match(overview.markdown, /^\[Client Login\]\(\/login\)$/m);
  });

  it("redirects /login with a temporary redirect", async () => {
    const config = require("../next.config.js");
    const redirects: Array<{ source: string; destination: string; statusCode?: number; permanent?: boolean }> =
      await config.redirects();
    const login = redirects.filter((redirect) => redirect.source === "/login");
    assert.equal(login.length, 1);
    assert.equal(login[0].statusCode, 302);
    assert.equal(login[0].permanent, undefined);
    assert.match(login[0].destination, /^https:\/\//);
  });
});

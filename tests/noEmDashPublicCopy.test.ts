import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, it } from "node:test";

// Robert, Nov 13 2026: no em dashes on any blogs, websites, or anything a client
// or the general public can read. En dashes used as dashes are out too.
const root = new URL("..", import.meta.url).pathname;
const dash = /[\u2014\u2013]/;

// Files that never render to the public: admin-only tools and legacy pages
// that no route imports.
const skip = new Set([
  "app/admin",
  "components/MultiPackageProposalBuilder.tsx",
  "legacy/ComponentShowcase.tsx",
  "legacy/CriminalBackgroundChecks.tsx",
  "legacy/DrugScreening.tsx",
]);

function walk(dir: string): string[] {
  const rel = relative(root, dir);
  if (skip.has(rel)) return [];
  if (statSync(dir).isFile()) return [dir];
  return readdirSync(dir).flatMap((name) => walk(join(dir, name)));
}

function stripComments(source: string) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");
}

describe("public copy has no em or en dashes", () => {
  it("llms.txt and llms-full.txt", () => {
    for (const file of ["public/llms.txt", "public/llms-full.txt"]) {
      const text = readFileSync(join(root, file), "utf8");
      const line = text.split("\n").findIndex((l) => dash.test(l));
      assert.equal(line, -1, `${file}:${line + 1}`);
    }
  });

  it("pages, components, data, and blog posts", () => {
    const files = ["app", "components", "data", "legacy", "shared"]
      .flatMap((dir) => walk(join(root, dir)))
      .filter((f) => /\.(tsx?|md|json)$/.test(f) && !/\.test\.tsx?$/.test(f));
    assert.ok(files.length > 50);
    const hits: string[] = [];
    for (const file of files) {
      stripComments(readFileSync(file, "utf8"))
        .split("\n")
        .forEach((line, i) => {
          if (dash.test(line)) hits.push(`${relative(root, file)}:${i + 1}: ${line.trim().slice(0, 80)}`);
        });
    }
    assert.deepEqual(hits, []);
  });
});

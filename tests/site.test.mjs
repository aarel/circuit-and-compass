import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { getValidationTemplate } from "../app.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const html = await readFile(join(root, "index.html"), "utf8");
const css = await readFile(join(root, "styles.css"), "utf8");

test("index includes key sections for the microsite", () => {
  const ids = ["services", "workflow", "samples", "cta"];
  ids.forEach((id) => {
    assert.match(
      html,
      new RegExp(`id="${id}"`),
      `missing #${id} anchor in index.html`
    );
  });
  assert.match(html, /Circuit & Compass/, "brand name missing");
  assert.match(
    html,
    /Copy validation block/,
    "copy action not present in hero"
  );
});

test("styles define the palette and component primitives", () => {
  ["--accent", "--surface", "--ink", "--border"].forEach((token) => {
    assert.match(css, new RegExp(`${token}\\s*:`), `missing ${token} variable`);
  });
  assert.match(css, /color-mix/, "color-mix usage missing");
  assert.match(css, /grid-template-columns/, "responsive grid not defined");
});

test("validation template stays consistent with sample output", () => {
  const template = getValidationTemplate();
  assert.match(template, /Validation Block/);
  ["project description", "primary artifact", "Stack picks", "risk questions"]
    .forEach((phrase) => {
      assert.match(template, new RegExp(phrase, "i"), `${phrase} missing`);
    });

  assert.match(
    html,
    /Validation Block\s+- One-sentence project description/,
    "html sample does not mirror validation template"
  );
});

test("styles and markup avoid runaway file size", () => {
  const maxReasonableBytes = 20000;
  assert.ok(
    Buffer.byteLength(css, "utf8") < maxReasonableBytes,
    "styles.css too large for a minimal build"
  );
  assert.ok(
    Buffer.byteLength(html, "utf8") < maxReasonableBytes,
    "index.html too large for a minimal build"
  );
});

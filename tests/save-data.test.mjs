import assert from "node:assert/strict";
import test from "node:test";
import { buildAgentMarkdown, buildOfflineHtml, SAMPLE_PAGE_URL, DEFAULT_MANUAL } from "../src/save-data.js";

const capture = { url: SAMPLE_PAGE_URL, selected: { content: true, styles: true, metadata: true }, removeBloat: true, instructions: DEFAULT_MANUAL };

test("the manual keeps its exact URL, CSS/HTML references and authored instructions", () => {
  const text = buildAgentMarkdown({ ...capture, url: "https://example.com/article?id=42", instructions: "Use .story-body; preserve the h2 order." });
  assert.ok(text.includes("Target URL: https://example.com/article?id=42"));
  assert.ok(text.includes("CSS reference: `main .article`"));
  assert.ok(text.includes('<article class="article">'));
  assert.ok(text.includes("Use .story-body; preserve the h2 order."));
  assert.ok(text.includes("Right-click the TechTree extension icon"));
});

test("omitted chunks are absent from both export formats", () => {
  const inputs = { ...capture, selected: { content: true, styles: false, metadata: false } };
  const text = buildAgentMarkdown(inputs);
  const html = buildOfflineHtml(inputs);
  assert.ok(!text.includes("### Styles & assets"));
  assert.ok(!text.includes("### Page metadata"));
  assert.ok(!html.includes("<style>"));
  assert.ok(!html.includes("Asset references"));
  assert.ok(!html.includes("Source:"));
  assert.ok(html.includes('<article class="article">'));
});

test("the bloat choice changes the manual and exported sample markup", () => {
  assert.ok(!buildOfflineHtml(capture).includes('<aside class="promo">'));
  assert.ok(buildOfflineHtml({ ...capture, removeBloat: false }).includes('<aside class="promo">'));
  assert.ok(buildAgentMarkdown({ ...capture, removeBloat: false }).includes("No bloat exclusions selected"));
});

test("invalid URLs and empty selections cannot produce a capture", () => {
  for (const build of [buildAgentMarkdown, buildOfflineHtml]) {
    assert.throws(() => build({ ...capture, url: "javascript:alert(1)" }), /HTTP or HTTPS/);
    assert.throws(() => build({ ...capture, selected: {} }), /at least one/);
  }
});

test("source URL characters are escaped in the exported HTML", () => {
  const html = buildOfflineHtml({ ...capture, url: "https://example.com/?q=a&sort=b" });
  assert.ok(html.includes("q=a&amp;sort=b"));
});

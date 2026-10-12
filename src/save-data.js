export const SAMPLE_PAGE_URL = "https://atelier.example/journal/calm-spaces";

export const DATA_CHUNKS = [
  { id: "content", label: "Page content", selector: "main .article", markup: '<article class="article">…</article>' },
  { id: "styles", label: "Styles & assets", selector: ".article img, link[rel='stylesheet']", markup: '<img src="…"> · <link rel="stylesheet" href="…">' },
  { id: "metadata", label: "Page metadata", selector: "head title, link[rel='canonical']", markup: '<title>…</title> · <link rel="canonical" href="…">' },
];

export const DEFAULT_MANUAL = "Keep the selected blocks in their original order.\nUse the CSS/HTML references above.\nPreserve the page’s layout and style in the offline copy.";

export function pageUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function captureInputs({ url, selected }) {
  const target = pageUrl(url);
  if (!target) throw new Error("Enter an HTTP or HTTPS page URL.");
  const chunks = DATA_CHUNKS.filter((chunk) => selected[chunk.id]);
  if (!chunks.length) throw new Error("Choose at least one data chunk.");
  return { target, chunks };
}

export function buildAgentMarkdown({ url, selected, removeBloat, instructions }) {
  const { target, chunks } = captureInputs({ url, selected });
  const references = chunks.map((chunk) => `### ${chunk.label}\n\nCSS reference: \`${chunk.selector}\`\n\nHTML reference:\n\n\`\`\`html\n${chunk.markup}\n\`\`\``).join("\n\n");
  return `# TechTree page capture manual\n\nTarget URL: ${target}\n\nApply this manual only to this exact page URL and its layout. This export uses demonstration references; edit them to match your page.\n\n## Selected data chunks\n\n${references}\n\n## Bloat removal\n\n${removeBloat ? "Exclude the CSS matches `.ad, .promo, iframe` and their child markup before saving the selected blocks." : "No bloat exclusions selected. Keep the selected blocks intact."}\n\n## Manual instructions\n\n${instructions.trim() || "Use the selected CSS/HTML references to save these blocks."}\n\n## Start manually\n\nRight-click the TechTree extension icon → Choose data chunks to save. Review the page blocks and references before capturing.\n\n## Repeat with a scraper agent\n\n1. Open the exact target URL above.\n2. Extract only the selected data chunks using their CSS/HTML references.\n3. Apply the chosen bloat exclusions and keep the relevant layout/style references with the saved data.\n4. Record the source URL and capture time; update the saved knowledge when these blocks change.\n5. If the page markup or layout changes, stop and revise this manual before the next capture.\n\nThis file describes the capture; it does not run or schedule a scraper by itself.\n`;
}

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

export function buildOfflineHtml({ url, selected, removeBloat }) {
  const { target } = captureInputs({ url, selected });
  const style = selected.styles ? '<style>body{font-family:system-ui,sans-serif;max-width:720px;margin:48px auto;padding:0 24px;color:#101a32;background:#fff}h1{letter-spacing:-.04em}a{color:#0862fc}.promo{padding:16px;background:#eff7ff}small{color:#61718e}</style>' : "";
  const metadata = selected.metadata ? `<header><h1>Calm spaces — Atelier</h1><p>Source: <a href="${escapeHtml(target)}">${escapeHtml(target)}</a></p></header>` : "";
  const content = selected.content ? '<main><article class="article"><h2>Keep what matters.</h2><p>A calm room starts with fewer, more useful objects. This is example page content for the TechTree demo.</p></article></main>' : "";
  const assets = selected.styles ? '<section><h2>Asset references</h2><ul><li>atelier.css</li><li>hero.webp</li><li>inter-var.woff2</li></ul><small>Example names only; website assets are not bundled into this sample.</small></section>' : "";
  const bloat = removeBloat ? "" : '<aside class="promo">Demo promo block — excluded when Remove bloat is selected.</aside>';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>TechTree sample export</title>${style}</head><body>${metadata}${content}${assets}${bloat}<footer><p><small>TechTree sample export. No browser page was captured.</small></p></footer></body></html>`;
}

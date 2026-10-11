# Prototype Instructions

## TechTree design decisions

The user selected direction 3: an editorial white page with cobalt actions, an asymmetric hero and a browser inspector demonstration. Preserve the approved intro copy. Use Manrope headings and Inter body text, and favor explicit browser-specific CTA labels. The main action should lead to a browser chooser; contact links should use `/contact/`. Do not invent published extension listings, email addresses or Telegram handles.

The final spacing revision adds 24px on each side of desktop feature/privacy/download sections and 16px on mobile. Preserve this breathing room and the alignment between each heading, chapter marker and demonstration panel.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

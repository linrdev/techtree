# TechTree

A responsive, one-page introduction to TechTree: detect a website's technology stack, explore its DOM and downloaded assets, review performance patterns, and save useful context for offline viewing.

The design follows the selected white-and-cobalt direction, with Manrope headings, Inter body text, short scroll-led chapters with generous section spacing, and working browser-specific calls to action.

## Run

Requirements: Node.js 22.12 or newer and npm, on Linux, macOS or Windows. No database, account system or GPU is required.

```sh
npm ci
npm run dev -- --host 0.0.0.0 --port 4173
```

## Build

```sh
npm run build
npm run test:sites
```

Static output: `dist/client/`. The bundled Worker and hosting metadata are generated under `dist/server/` and `dist/.openai/`. The project remains compatible with Sites hosting.

## Activate the final links

Edit `public/site-config.json` before building, or edit `site-config.json` in the deployed static output after building.

| Field               | Expected value                                                      |
| ------------------- | ------------------------------------------------------------------- |
| `contactPath`       | `/contact/`, or the absolute URL of an existing contact page        |
| `email`             | Your public contact email address, without `mailto:`                |
| `telegram`          | Your public HTTPS Telegram link, such as `https://t.me/your_handle` |
| `storeUrls.firefox` | The published TechTree Firefox Add-ons listing                      |
| `storeUrls.chrome`  | The published TechTree Chrome Web Store listing                     |
| `storeUrls.opera`   | The published TechTree Opera Add-ons listing                        |
| `storeUrls.edge`    | The published TechTree Edge Add-ons listing                         |
| `storeUrls.safari`  | The published TechTree App Store listing                            |

No addresses or listings have been invented. With blank store entries, each browser button opens its official marketplace, and a visible note explains that TechTree listings are coming soon. Blank contact channels show a coming-soon state on `/contact/`.

## Included interactions

- Primary CTA and browser strip scroll to the browser download section.
- The detected desktop browser receives subtle emphasis. Browser detection is only a convenience; all five choices remain available.
- Clickable inspector tabs, a searchable sample DOM, and asset category filters.
- Sample HTML exports reflect the metadata and asset checkboxes. These files contain example names and metadata, not actual downloaded website assets.
- A demo privacy switch; it does not change real browser settings or send a lookup request.
- Chapter markers track the visible section.
- Responsive navigation, keyboard focus states, and reduced-motion support.
- A contact route ready for email and Telegram links.

## Scope

This project is the introduction website and interactive product demonstration. It does not include an installable extension. Browser editions, feature parity, permissions, marketplace publication and online detection services must be implemented and tested separately. The page uses sample data throughout its inspector views.

## Deploy

Serve `dist/client/` over HTTPS on a static host. Configure navigation fallback to `index.html` so `/contact/` loads on direct visits. Keep missing asset URLs as real 404s rather than rewriting them to HTML.

Fonts and images are served locally. The website has no third-party analytics or remote font dependencies. The privacy switch illustrates the intended extension preference, rather than promising the future extension's data handling.

See [requirements.md](requirements.md) for deployment details and [design-qa.md](design-qa.md) for verification notes.

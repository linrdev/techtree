# TechTree page capture manual

Target URL: https://atelier.example/journal/calm-spaces

Apply this manual only to this exact page URL and its layout. This export uses demonstration references; edit them to match your page.

## Selected data chunks

### Page content

CSS reference: `main .article`

HTML reference:

```html
<article class="article">…</article>
```

### Styles & assets

CSS reference: `.article img, link[rel='stylesheet']`

HTML reference:

```html
<img src="…"> · <link rel="stylesheet" href="…">
```

### Page metadata

CSS reference: `head title, link[rel='canonical']`

HTML reference:

```html
<title>…</title> · <link rel="canonical" href="…">
```

## Bloat removal

Exclude the CSS matches `.ad, .promo, iframe` and their child markup before saving the selected blocks.

## Manual instructions

Keep the selected blocks in their original order.
Use the CSS/HTML references above.
Preserve the page’s layout and style in the offline copy.

## Start manually

Right-click the TechTree extension icon → Choose data chunks to save. Review the page blocks and references before capturing.

## Repeat with a scraper agent

1. Open the exact target URL above.
2. Extract only the selected data chunks using their CSS/HTML references.
3. Apply the chosen bloat exclusions and keep the relevant layout/style references with the saved data.
4. Record the source URL and capture time; update the saved knowledge when these blocks change.
5. If the page markup or layout changes, stop and revise this manual before the next capture.

This file describes the capture; it does not run or schedule a scraper by itself.

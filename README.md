# Teresa R. Foster, L.C.S.W. — Counseling & Coaching

A responsive, accessibility-first marketing site for Teresa R. Foster’s counseling and coaching practice in Bloomington, Indiana.

## Editing content safely

- **Global content** lives in static HTML files at the project root (e.g., `index.html`, `counseling.html`). Each page reuses the same header/footer structure for consistency.
- Update copy within the existing semantic structure (headings, paragraphs, lists) to preserve accessibility and SEO.
- When adding imagery, place optimized assets in `img/` and include descriptive `alt` text. Prefer WebP/AVIF; include JPEG fallbacks if necessary.
- Licensure details and NAP (name, address, phone) appear in the footer and JSON-LD. Update all instances together to keep Google Business Profile data in sync.

## Analytics & schema

- Google Analytics 4 loads when `data-analytics-id` on `<html>` or `<body>` is replaced with the production GA property (e.g., `G-XXXXXXXX`).
- CTA clicks (`book_consult_click`), phone link taps (`call_click`), contact submissions, and portal visits emit GA4 events.
- LocalBusiness schema is injected via `js/main.js`. Update the object there if business details change.

### Setting up Google Analytics 4

1. In Google Analytics, create (or confirm) the GA4 property and web data stream, then copy the Measurement ID (Admin → Data streams → Web → Measurement ID).
2. On each root-level HTML page (e.g., `index.html`, `counseling.html`), set the `data-analytics-id` attribute on the `<html>` tag to your Measurement ID (format: `G-XXXXXXXXXX`). This site already uses `G-SGB80BEZT4`.
3. You do **not** need to paste the full GA snippet into the HTML because `js/main.js` loads `gtag.js` and calls `gtag('config', <Measurement ID>)` automatically based on the attribute.
4. In the GA UI, turn on **Enhanced measurement** for page views. Mark `book_consult_click`, `call_click`, `contact_submit`, and `cta_variant_impression` as **Conversions** once data flows so they appear in the main reports.
5. Deploy the site, then verify in Google Analytics → Reports → Realtime that `page_view` and the custom events are arriving from your visits.

## Client portal configuration

- Set `data-portal-url` on `<body>` to the IntakeQ (or other HIPAA-compliant) portal URL.
- `intake.html` auto-redirects to the portal and exposes a button as fallback.
- On `contact.html`, set `data-contact-endpoint` to a mailto link or secure form endpoint. The default builds a mailto message to `tfosterlcsw@gmail.com` and reminds visitors not to include PHI.

## Performance & QA

- Lighthouse CI runs in GitHub Actions (`.github/workflows/performance.yml`) against `/`, `/counseling.html`, and `/coaching.html` with mobile emulation. Performance must stay ≥0.90 and accessibility at 1.00.
- Baseline results live in `docs/perf/baseline/`. Update the table and saved reports after significant changes.
- Accessibility audits are logged in `docs/a11y/`. Re-run axe DevTools whenever new UI is introduced.

## Local development

Serve the site with any static file server, for example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a browser.

## Keeping SEO assets current

- Update `sitemap.xml` and `robots.txt` when adding or removing pages.
- Ensure page-specific `<title>` and meta descriptions reflect current offerings.
- Maintain the `docs/` reports for transparency with compliance partners.

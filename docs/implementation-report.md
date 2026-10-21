# TOC Frontend Implementation Report

Verification date: October 21, 2026. Local production preview: `http://127.0.0.1:3127`.

## Delivered Application

Next.js App Router, React, strict TypeScript, Tailwind CSS, local Stack Sans fonts, Next.js Image, Lucide icons, and customized shadcn/ui primitives. Server Components render local editorial data; client components handle interactions. No API, database, authentication, CMS, or submission service is included.

| Route | Delivered content |
| --- | --- |
| `/` | Reference-ordered hero, numbered challenges, solution/statistics, product showcase, editorial quality/customer-sector panel, support/brand section, branch network, articles, categorized FAQ, CTA, and footer |
| `/tentang` | Company profile, source-backed quality commitment, customer sectors, services, and branches |
| `/produk` | Four local catalog records with working category filters |
| `/produk/chester-machine-center` | Chester equipment presentation, authentic image, source-backed functions, applications, catalog/contact links, and related records |
| `/produk/peralatan-medis` | Clearly labeled medical product group, not an invented equipment model |
| `/produk/peralatan-pendidikan` | Clearly labeled education product group |
| `/produk/earthquake-simulator-unit` | Clearly labeled informational technology entry; no availability assertion |
| `/layanan` | Six officially named services in the reference visual system |
| `/artikel` | Three source-backed publications with working category filters |
| `/artikel/[slug]` | Three statically generated article pages, original titles/dates, labeled editorial summaries, source links, and related articles |
| `/kontak` | Official contact information, five offices, accessible validated email-draft form |

Unknown paths and nonexistent product/article slugs return 404. Sitemap and robots files are generated locally. Each content route has Indonesian language metadata, one h1, a canonical URL, and page-specific title/description/Open Graph data.

## Visual Reconstruction

The rendered reference was inspected before UI implementation. See `docs/happan-visual-audit.md` for page inventories, computed measurements, interactions, and unverified reference properties. Asset provenance and editorial restrictions are in `docs/toc-asset-inventory.md`.

Preserved geometry includes the 1200px shell, fixed overlay/pill navigation, 800px desktop and 650px phone homepage heroes, 750px desktop inner banners, responsive heading scales, numbered challenge composition, large photographic solution/editorial panels, horizontal product showcase, categorized FAQ, and reference-shaped CTA/footer.

Refinement corrected inner-banner heights, article-detail alignment, contact-page section composition, body/navigation weights, tablet heading sizes, mobile challenge ordering, article-card spacing, and large-image crop resolution. These corrections were followed by a new production build and rendered checks.

Side-by-side homepage evidence:

- `artifacts/qa/comparison-home-1440-top.png`: 1440 x 900 desktop viewports.
- `artifacts/qa/comparison-home-390-top.png`: 390 x 844 mobile viewports.
- `artifacts/qa/comparison-home-1440-full.png`: full desktop pages, half-scale captures.
- `artifacts/qa/comparison-home-390-full.png`: full mobile pages, half-scale captures.
- `artifacts/reference/measurements.json`: original computed geometry and typography.
- `artifacts/reference/home-section-*.png`: individual source sections, useful where source scroll effects obscure full-page text.

The final homepage is approximately 8959px tall at 1440px versus the source's 8843px; at 390px it is 8787px versus approximately 8312px. TOC copy, honest content labels, branch-map content, and image proportions account for remaining rhythm differences. Source full-page captures also contain incomplete counters, initially transparent headings, or unloaded media; these defects are not reproduced. This is a reference-based reconstruction, not a claim of pixel-perfect equivalence.

## Functional Behavior

- Mobile Sheet navigation: accessible dialog, keyboard focus containment, backdrop/close controls, Escape, focus restoration, and route-change dismissal.
- Product and article category filters use local React state; product and customer-sector carousels have working controls.
- FAQ uses shadcn Accordion and Tabs; categories and keyboard operation work.
- Branch-map controls select verified office details; address links open external map searches.
- Statistics count up only when visible; reduced-motion users receive final values without animation.
- Contact validation covers required fields, email shape, plausible phone digit counts, and length limits. Errors identify and focus the first invalid field.
- A valid contact action opens an encoded email draft addressed to `info@toc.co.id`. The user must review and send it. No message delivery is claimed; data is not stored. A direct email link remains available.

## Final Verification

| Check | Command/evidence | Result |
| --- | --- | --- |
| Production build | `npm run build`; `artifacts/qa/build.log` | Passed; static/SSG routes generated |
| Lint | `npm run lint` | Passed, no errors/warnings |
| Strict TypeScript | `npm run typecheck` | Passed |
| Unit checks | `npm test` | Five passed: contact validation, mailto encoding/header safety, contrast samples, catalog/article integrity, branch/service integrity |
| HTTP and metadata | `node --experimental-strip-types scripts/check-routes.mjs`; `artifacts/qa/routes.json` | 13 content routes, three invalid routes, sitemap, and robots passed |
| Responsive browser checks | `scripts/qa.py`; `artifacts/qa/responsive.json` | 65 route/viewport combinations passed |
| Browser interactions | `scripts/qa.py`; `artifacts/qa/interactions.json` | 11 grouped interaction checks passed |
| Asset decoding | `artifacts/source/asset-dimensions.json` | 30 raster assets decoded; dimensions/formats recorded |
| Runtime dependency audit | `npm audit --omit=dev --json`; `artifacts/qa/runtime-dependency-audit.json` | Zero reported vulnerabilities |
| Full dependency audit | `npm audit --json`; `artifacts/qa/dependency-audit.json` | Five high-severity development-tool findings remain; see below |

Browser widths: 1440, 1280, 768, 390, and 375px. Every content route was rendered at each width. Checks found no horizontal overflow, broken rendered images, missing image alt attributes, unnamed visible buttons, or captured console/runtime errors. Desktop/tablet/phone screenshots are retained under `artifacts/qa/`.

Interaction groups cover product filters/reset, article filters/reset, FAQ opening/closing/category and keyboard navigation, branch selection, sector carousel, mobile product carousel, drawer focus/Escape/restoration, mobile navigation, required-form validation/focus, invalid-email validation, and reduced motion. Email handoff encoding is unit-tested; no external mail application was opened and no email was sent during QA.

Accessibility checks include semantic headings, labels, visible focus styling, keyboard navigation and dialog containment, error focus, selected token/photo-overlay contrast samples, alt attributes, and reduced motion. This is not a complete WCAG conformance audit or a substitute for assistive-technology/user testing.

To repeat the browser checks against a running production preview:

```powershell
node --experimental-strip-types scripts/check-routes.mjs
"exec(open('scripts/qa.py', encoding='utf-8').read())" | browser-harness
```

Set `QA_ORIGIN` for a different preview origin. `QA_INTERACTIONS_ONLY=1` runs only interaction checks. Browser targets are isolated from unrelated user tabs.

## Source and Fidelity Limitations

- No HAPPAN logo, photograph, product image, certificate, or promotional media is served by the application. Reference screenshots remain research artifacts only.
- The official TOC logo red is sampled as `#85251A`. A derived light-lettering logo supports dark surfaces. Local font licenses and geographic-outline attribution are recorded in the asset inventory.
- TOC's available high-resolution city image is reused for full-bleed panels. It is illustrative, not a verified TOC office location. Available clinical/product images are not stretched into large background photographs.
- HAPPAN's quality video and geographic details did not render reliably during inspection. The implementation uses a static TOC image and a locally sourced Indonesia outline with verified branch controls; it does not invent the unseen source media.
- Genuine TOC testimonials were not found. Equivalent carousel geometry presents customer sectors without fictional quotations or people.
- Partner/customer logos are source-backed and appropriately labeled. No certification status is inferred from a logo or historical image.
- The source homepage's 1977 founding statement conflicts with the anniversary article's 1978/46-year wording. Corporate chronology omits the disputed fact; the archived article visibly flags the inconsistency.
- Article bodies are labeled curated summaries of official publications, not claimed verbatim republications. Original titles, dates, images, and links are retained.
- The earthquake image shows damage, not a simulator. The anniversary/contact portrait is illustrative, not a verified employee or event image.
- Chester Model U255 / 5 Axis Machine Center is one verified equipment entry. Other records are labeled groups or informational technology. No model variants, pricing, stock, warranty, or technical specifications are fabricated.
- Product detail pages use single genuine source images rather than an invented thumbnail gallery. Unverified specification and downloadable-document sections are omitted. An official external E-Catalog link is provided instead.
- Both published Jakarta telephone numbers are retained without invented department assignments. No WhatsApp capability is asserted.
- Confirm TOC's asset reuse permissions, current contact details, and editorial approval before public deployment. Being publicly available is not proof of an unrestricted asset license.

## Dependency Risk

The full audit reports five high-severity findings in the development-only chain `eslint-config-next` / `@next/eslint-plugin-next` / `fast-glob` / `micromatch` / `braces`. These are not runtime dependencies. The installed upstream chain has no compatible nonbreaking remediation in the captured audit; the suggested force fix downgrades the Next ESLint configuration. No forced downgrade or unsupported dependency override was applied. Recheck upstream fixes before updating the toolchain. The runtime-only audit is clean; the complete dependency audit is not.

## Remaining Launch Work

Obtain company editorial/asset approval, confirm the canonical deployment domain, review the documented source ambiguities, and recheck upstream development-tool advisories. Deploy the frontend with Next.js-compatible hosting. A real submission service remains intentionally out of scope; add one only if a backend delivery requirement is separately approved.

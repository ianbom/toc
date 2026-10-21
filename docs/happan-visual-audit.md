# HAPPAN Visual Reference Audit

Inspected in rendered Chrome on 2026-10-21. Evidence: `artifacts/reference/measurements.json`, 35 top-viewport captures, 14 half-scale full-page captures, and nine additional homepage section captures. Measurements are computed CSS pixels, not guesses. Full-page screenshots can retain scroll-animation artifacts; use individual section captures and computed measurements to disambiguate.

## Global system

- Desktop content width: 1200px. At a 1440px viewport the content starts near x=112px because the browser reserves approximately 15px for the scrollbar. At 1280px x=32px. Tablet gutters: 24px; phone gutters: 16px.
- Fonts: Stack Sans Headline for headings; Stack Sans Text for body/navigation. Homepage hero: weight 500, 72/80px, width 700px. Main section headings: 600, 44/57.2px. Editorial statement: 40/54px. Product-detail h1: 48/62.4px. Body is typically 16px, with larger lead text.
- Full-image headers: overlay logo left at 32px; desktop pill navigation top-right, approximately 64px tall, with round contact CTA. Header becomes a fixed translucent dark band on scroll. Light product/article-detail headers use an aligned 1200px shell and dark text.
- Buttons: approximately 40px tall, uppercase action labels, pill outline or solid brand fill, arrow at right. Product navigation uses circular arrow controls. Cards use restrained 6-12px rounding, not large dashboard radii.
- Desktop section rhythm: typically 120px outer gaps; large image/editorial sections use fixed composition heights. Light grey surface approximately #eee, white surfaces, dark overlays. The reference red is replaced by sampled TOC logo red #85251A; white/light/dark distribution is retained.
- Responsive: tablet hero 40/54px; mobile hero 32/43.2px. Phone hero approximately 650px high. Full-width stacked hero buttons; 16px side gutters. Desktop homepage hero 800px high. Products remain a horizontal showcase rather than a generic vertical stack.
- Detailed mobile measurements: section headings 24/31.2px, solution heading approximately 25.5/34.5px, editorial statement approximately 18.2/24.6px, article-card headings 20/26px, final CTA 24/28.8px. Inner-page banners are 400px at tablet and 250px on phone, not reduced full-screen heroes. Mobile challenge items form one column.

## Page inventories

### Homepage `/`
1. Overlay navigation and 800px photographic hero: left 700px heading, supporting paragraph, adjacent pill buttons.
2. White challenges, split heading / 2-by-2 numbered text links. Main content begins near y=920px; section approximately 302px plus surrounding whitespace.
3. 950px full-width company solution image, 60/72px title, lead paragraph, outline CTA; three large statistics near bottom-right.
4. White product carousel: heading/introduction left, all-products CTA right, four desktop cards of 285px width, 24px card padding, image top and product name bottom. Section approximately 867px including spacing.
5. 1150px editorial quality/media panel with rounded top corners; prominent 814px-wide statement at top-left, white testimonial carousel panel approximately 955px wide near bottom-left.
6. 910px light-grey standards panel with rounded top corners; left title/media, right copy, certification grouping and laboratory grouping.
7. Centered distribution heading (644px width), large map region and bottom-left legend; approximately 664px plus outer gaps.
8. Article heading and CTA row, three 450px-tall image-overlay cards; card titles 32/41.6px and small uppercase date/category.
9. Centered FAQ heading; category rail left, four closed question rows right. Changing category changes questions. Individual accordions expand.
10. 1050px final full-image CTA with 72/80px heading, followed by a compact multi-column white footer (approximately 374px).

### About `/tentang/`
Image banner, breadcrumbs and 72px title; split company profile; large quality/philosophy section; numbered differentiators; shared standards section; shared distribution section; image CTA; footer. Desktop measured page height approximately 5946px. TOC content length may alter height, not the template language.

### Products `/produk/`
Approximately 750px image banner, breadcrumbs/title; centered introduction; category rail and multi-column product grid; shared image CTA/footer. Only real available TOC content determines card count.

### Product detail `/produk/happan-plywood/`
Light header, breadcrumbs; gallery left and product title/details right (roughly 40/60 composition), thumbnail strip and circular controls; outlined document actions then full-width solid enquiry action. Subsequent technical table, videos, applications, standards, related carousel, image CTA/footer. Unsupported TOC sections must be omitted, not filled with fabricated specifications.

### Articles `/artikel/`
Image banner with breadcrumbs/title; stacked image-and-text article previews in main column; categories/popular-article sidebar; pagination only when content requires it; image CTA/footer. Source has more articles than TOC; three TOC entries require no invented pagination.

### Article detail
Inspected `https://happan.co.id/artikel/distributor-triplek-luar-jawa-cara-memilih-supplier-yang-siap-antarpulau/`. Light header, 1080px content shell, left-aligned 44/44px weight-600 title, date/category, editorial image and readable article body, related articles, shared CTA/footer. Article surface is very light grey; title becomes 28px at tablet and 24px on phone. TOC's supplied article images are capped at their available width rather than stretched to 1080px.

### Contact `/kontak/`
Image banner; heading/intro split, followed by a four-column contact-information strip. Separate light-grey form section: tall image/title left, two-column fields right. Form fields: company, business type, operational region, contact person, phone, email, message. Narrow copyright/social strip rather than full marketing footer/CTA. TOC branch information and honest email-draft disclosure are intentional additional requirements.

## Interactions and accessibility

Observed: sticky overlay header, right off-canvas mobile navigation with backdrop and close control; product and testimonial carousel arrows; product gallery thumbnails; category navigation; categorized FAQ accordions; scroll-enter text animation and statistics counters; hover transitions; floating contact and back-to-top controls. Motion will use CSS/IntersectionObserver where sufficient and respect reduced motion. No source analytics, chat scripts, forms, or WordPress plugins will be copied.

## Inspection limits and deliberate adaptations

- HAPPAN's quality background appeared grey even after section-level inspection; the exact media playback appearance was not verified. Distribution map details also failed to render, although heading/region/legend geometry was observable. Reconstruct these layouts with TOC material and an accurately sourced geographic outline, not invented HAPPAN details.
- Source scroll effects can leave text initially transparent in full-page captures; never reproduce permanently invisible content.
- Mobile source showed small overflow at some widths. TOC implementation must remove overflow rather than preserve the defect.
- Geometry and responsive behavior are binding; source-derived TOC copy, imagery and number of genuine records intentionally differ. No claim of pixel-identical content or imagery.

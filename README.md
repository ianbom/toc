# PT Tamara Overseas Corporindo

Frontend-only Next.js application. Indonesian content, local TypeScript data and local TOC website assets. No API, database, CMS, authentication, analytics, or message-delivery service.

## Run

Node.js 24 LTS and npm are recommended.

```powershell
npm ci
npm run dev
```

Production:

```powershell
npm run build
npm run start -- --port 3127
```

## Verify

```powershell
npm test
npm run lint
npm run typecheck
npm run build
node --experimental-strip-types scripts/check-routes.mjs
```

Browser QA uses the separately installed `browser-harness` CLI. After starting production on port 3127, run this in PowerShell:

```powershell
"exec(open('scripts/qa.py', encoding='utf-8').read())" | browser-harness
```

Set `QA_ORIGIN` to use another production origin. QA evidence is stored under `artifacts/qa/`.

## Content and Assets

Edit `src/data/` for content. Product groups and informational technology entries are labeled separately from equipment. Unverified specifications and downloadable catalogs are deliberately absent. E-Catalog opens the official external catalog.

Contact submission validates locally and opens an email draft addressed to `info@toc.co.id`. The visitor must send it themselves. There is no delivery confirmation or data storage.

See `docs/happan-visual-audit.md`, `docs/toc-asset-inventory.md`, and `docs/implementation-report.md` for visual evidence, asset provenance, editorial limitations, and acceptance results. Confirm TOC asset reuse rights and company facts before public launch.

`scripts/ingest-sources.mjs` is an optional editorial-maintenance tool, not a build/runtime dependency. It retrieves official source snapshots. Review changed content before regenerating or publishing it. Stack Sans fonts are distributed under the included SIL Open Font License. The Indonesia outline derives from public-domain Natural Earth geography.

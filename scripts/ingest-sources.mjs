import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const origin = 'https://www.toc.co.id';
const uploads = `${origin}/wp-content/uploads/`;
const assets = [
  ['brand/toc-logo.png','2025/04/toc-logo.png'],
  ['brand/toc-symbol.png','2025/04/cropped-toc-only.png'],
  ['hero/toc-city.jpg','2025/07/cities.jpg'],
  ['company/toc-company.png','2025/04/photo-1-toc.png'],
  ['products/chester-machine.png','revslider/home-one/chaster.png'],
  ['products/medical-equipment.png','2025/04/medical-equipment.png'],
  ['products/earthquake-simulator.png','2025/04/earthquake.png'],
  ['articles/syringe-safety.png','2025/04/Untitled-design-20.png'],
  ['articles/toc-anniversary.png','2025/04/Untitled-design-21.png'],
  ['company/service-spare-parts.png','2025/04/1-1.png'],
  ['company/service-installation.png','2025/04/4.png'],
  ['company/service-workshop.png','2025/04/5.png'],
  ['company/service-evaluation.png','2025/04/6.png'],
  ['company/service-medical.png','2025/04/3.png'],
  ['brand/cdakb-toc.png','2025/04/cdakb-toc.png'],
  ['brand/lkpp-catalog.png','2025/04/lkpp-banner-1.png'],
  ...[['randox','randox1.png'],['nova','NOVA-1.png'],['unisis','UNISIS-1.png'],['mts','MTS1.png'],['chester','LogoChaster.jpg'],['armfield','ARMFIELD.png'],['denford','DENFORD.png'],['quanser','quanser.png']].map(([name,file])=>[`partners/${name}.${file.split('.').at(-1)}`,`2025/04/${file}`]),
  ...[['rscm','1rscm.jpg'],['hermina','3hermina-hospital.jpg'],['pondok-indah','4pondokindah.jpg'],['national-hospital','10nationalhospital.jpg'],['awal-bros','14rsawalbros.jpg']].map(([name,file])=>[`clients/${name}.jpg`,`2025/04/${file}`]),
];
const inventory = [];
for (const [local, remote] of assets) {
  const url = uploads + remote;
  const response = await fetch(url);
  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`Invalid asset ${url}: ${response.status}`);
  const target = `public/assets/${local}`;
  await mkdir(path.dirname(target), { recursive: true });
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(target, bytes);
  inventory.push({ source: url, local: `/${target.replace('public/', '')}`, bytes: bytes.length });
  console.log(local,bytes.length);
}
const posts = await (await fetch(`${origin}/wp-json/wp/v2/posts?per_page=100&_fields=id,slug,date,title,content,excerpt,link,featured_media`)).json();
await mkdir('src/data',{recursive:true});
await mkdir('artifacts/source',{recursive:true});
await writeFile('artifacts/source/posts.json',JSON.stringify(posts,null,2));
await import('./curate-articles.mjs');
await writeFile('artifacts/source/asset-inventory.json',JSON.stringify(inventory,null,2));
await mkdir('docs',{recursive:true});
await writeFile('docs/toc-asset-inventory.md',`# TOC Asset Inventory\n\nRetrieved 2026-10-21 from the official TOC website. Website publication is provenance, not independent proof of copyright ownership. Use within this TOC adaptation; confirm reuse rights before public launch. No HAPPAN promotional media is included.\n\nHTTP/development-host references were replaced only after successful retrieval of the matching HTTPS path on www.toc.co.id. Descriptive local names do not add product claims.\n\n| Local path | Official source URL | Bytes |\n|---|---|---:|\n${inventory.map(asset=>`| \`${asset.local}\` | ${asset.source} | ${asset.bytes} |`).join('\n')}\n\n## Editorial restrictions\n\n- Six service illustrations are used as service/category imagery, not as independently verified product models.\n- Chester Model U255 / 5 Axis Machine Center is one source-backed equipment entry, not three invented products.\n- Earthquake Simulator Unit is sourced from an informational TOC article; availability is not asserted.\n- The anniversary article is archived as published on April 15, 2025; its 46-year headline and 1978 founding assertion conflict with the homepage's 1977 statement. Corporate copy omits disputed chronology.\n- Both Jakarta telephone numbers are published: header 625-1690, footer 625-1689. No invented department assignment or WhatsApp claim.\n- Customer logos appear under Customer Kami on the source; no testimonials or endorsements are inferred. Partner logos are labeled as brands shown by TOC, not certifications.\n- CDAKB imagery is not presented as proof of currently valid certification.\n- The hero uses TOC's own 1920px city hero. No high-resolution clinical/company photograph was found; 667px product images are not stretched into full-screen photographs.\n`);

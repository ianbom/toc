import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { products } from '../src/data/products.ts';
import { articles } from '../src/data/articles.ts';

const origin=process.env.QA_ORIGIN??'http://127.0.0.1:3127';
const paths=['/','/tentang','/produk','/layanan','/artikel','/kontak',...products.map(item=>`/produk/${item.slug}`),...articles.map(item=>`/artikel/${item.slug}`)];
const results=[];
for(const path of paths){
  const response=await fetch(origin+path);
  const html=await response.text();
  assert.equal(response.status,200,path);
  assert.equal((html.match(/<h1\b/g)??[]).length,1,`One h1: ${path}`);
  assert.match(html,/<html[^>]*lang="id"/);
  assert.match(html,/<link rel="canonical"/);
  assert.doesNotMatch(html,/happan|lorem ipsum/i);
  results.push({path,status:response.status});
}
for(const path of ['/missing-page','/produk/not-a-product','/artikel/not-an-article'])assert.equal((await fetch(origin+path)).status,404,path);
for(const path of ['/sitemap.xml','/robots.txt'])assert.equal((await fetch(origin+path)).status,200,path);
await mkdir('artifacts/qa',{recursive:true});
await writeFile('artifacts/qa/routes.json',JSON.stringify({origin,results,invalidRoutes:3,seoRoutes:2},null,2));
console.log(`${results.length} content routes; 3 missing routes; sitemap and robots verified.`);

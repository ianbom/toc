import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

test('local catalog and articles have unique working slugs and authentic asset references', async () => {
  const { products } = await import('../src/data/products.ts');
  const { articles } = await import('../src/data/articles.ts');
  for (const records of [products, articles]) {
    assert.ok(records.length >= 2);
    assert.equal(new Set(records.map(record => record.slug)).size, records.length);
    for (const record of records) {
      assert.match(record.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      assert.ok(record.title.length > 3);
      assert.match(record.source, /^https:\/\/www\.toc\.co\.id\//);
      assert.ok(existsSync(`public${record.image}`),record.image);
      assert.doesNotMatch(JSON.stringify(record), /happan|lorem ipsum/i);
    }
  }
});

test('five branches and six services retain source-backed contact data', async () => {
  const { branches, services, company } = await import('../src/data/company.ts');
  assert.equal(branches.length,5);
  assert.equal(services.length,6);
  assert.equal(company.email,'info@toc.co.id');
  for (const branch of branches) {
    assert.match(branch.email,/@toc\.co\.id$/);
    assert.ok(branch.address.length>20);
  }
});

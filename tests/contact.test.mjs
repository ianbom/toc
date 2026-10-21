import test from 'node:test';
import assert from 'node:assert/strict';
import { createMailto, validateContact } from '../src/lib/contact.ts';

const fields = {company:'RS Contoh & Mitra',business:'Rumah Sakit',region:'Jakarta',name:'Nama Kontak',phone:'+62 812 1234567',email:'nama@example.com',message:'Konsultasi peralatan & pelatihan?'};
test('contact validates required fields, email, telephone and message length',()=>{
  assert.deepEqual(validateContact(fields),{});
  assert.ok(validateContact({...fields,email:'invalid'}).email);
  assert.ok(validateContact({...fields,phone:'abc'}).phone);
  assert.ok(validateContact({...fields,company:'  '}).company);
  assert.ok(validateContact({...fields,message:'x'.repeat(3001)}).message);
});
test('email draft encodes content without injecting mail headers',()=>{
  const target = new URL(createMailto({...fields,company:'Test\r\nBcc: bad@example.com'}));
  assert.equal(target.pathname,'info@toc.co.id');
  assert.equal(target.searchParams.has('bcc'),false);
  assert.doesNotMatch(target.searchParams.get('subject'),/[\r\n]/);
  assert.match(target.searchParams.get('body'),/Konsultasi peralatan & pelatihan\?/);
});

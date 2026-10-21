'use client';

import { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createMailto, validateContact, type ContactFields } from '@/lib/contact';

const fields: {name:keyof ContactFields;label:string;placeholder:string;type?:string;required?:boolean;autocomplete?:string}[]=[
  {name:'company',label:'Nama Perusahaan/Institusi',placeholder:'Nama perusahaan atau institusi Anda',required:true,autocomplete:'organization'},
  {name:'business',label:'Jenis Institusi',placeholder:'Rumah sakit / universitas / industri'},
  {name:'region',label:'Wilayah Operasional',placeholder:'Kota atau wilayah Anda',autocomplete:'address-level2'},
  {name:'name',label:'Nama Penanggung Jawab',placeholder:'Nama lengkap Anda',required:true,autocomplete:'name'},
  {name:'phone',label:'Nomor Telepon',placeholder:'Nomor telepon yang dapat dihubungi',type:'tel',required:true,autocomplete:'tel'},
  {name:'email',label:'Email',placeholder:'Alamat email Anda',type:'email',required:true,autocomplete:'email'},
];

export function ContactForm() {
  const [errors,setErrors] = useState<Partial<Record<keyof ContactFields,string>>>({});
  const [draft,setDraft] = useState('');
  return <form className="contact-form" aria-labelledby="contact-form-title" noValidate onSubmit={event=>{
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const values=Object.fromEntries([...fields.map(field=>[field.name,String(data.get(field.name)??'')]),['message',String(data.get('message')??'')]]) as ContactFields;
    const next=validateContact(values);
    setErrors(next);setDraft('');
    if(Object.keys(next).length){event.currentTarget.querySelector<HTMLInputElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();return;}
    const mailto=createMailto(values);setDraft(mailto);window.location.href=mailto;
  }}>
    {fields.map(field=><div className="form-field" key={field.name}><label htmlFor={field.name}>{field.label}{field.required&&<span aria-hidden="true"> *</span>}</label><Input id={field.name} name={field.name} type={field.type??'text'} placeholder={field.placeholder} required={field.required} autoComplete={field.autocomplete} maxLength={200} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name]?`${field.name}-error`:undefined}/>{errors[field.name]&&<p className="field-error" id={`${field.name}-error`}>{errors[field.name]}</p>}</div>)}
    <div className="form-field form-message"><label htmlFor="message">Jelaskan Kebutuhan Anda <span aria-hidden="true">*</span></label><Textarea id="message" name="message" placeholder="Produk, penggunaan, dan kebutuhan yang ingin Anda diskusikan" required maxLength={3000} rows={5} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message?'message-error':'form-note'}/>{errors.message&&<p className="field-error" id="message-error">{errors.message}</p>}</div>
    <p className="form-note" id="form-note">Formulir ini menyiapkan draf di aplikasi email Anda, bukan mengirim pesan otomatis. Tinjau dan kirim email sendiri. Data tidak disimpan oleh situs ini.</p>
    <Button className="action-link" type="submit">Siapkan Email <ArrowRight size={20}/></Button>
    <div role="status" className="form-status">{draft&&<p>Draf siap dibuka. Pesan belum dikirim. Jika aplikasi email tidak terbuka, <a href={draft}>buka draf kembali</a> atau kirim langsung ke <a href="mailto:info@toc.co.id">info@toc.co.id</a>.</p>}</div>
    <a className="form-alternative" href="mailto:info@toc.co.id"><Mail size={16}/> Alternatif: info@toc.co.id</a>
  </form>;
}

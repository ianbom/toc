import Image from 'next/image';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero } from '@/components/shared';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/layout/footer';
import { branches, company } from '@/data/company';
import { pageMetadata } from '@/lib/seo';

export const metadata=pageMetadata('Kontak TOC','/kontak','Hubungi TOC melalui email, telepon, dan kantor Jakarta, Semarang, Surabaya, Palembang, serta Makassar.');

export default function ContactPage() {
  return <><main id="main-content">
    <PageHero title="Kontak TOC" crumb="Kontak"/>
    <section className="section-pad"><div className="container">
      <div className="contact-intro"><h2>Informasi Kontak</h2><p>Hubungi PT Tamara Overseas Corporindo melalui saluran resmi untuk informasi produk, kebutuhan institusi, atau layanan pendukung.</p></div>
      <dl className="contact-strip">
        <div><dt><MapPin size={16}/> Lokasi</dt><dd>{branches[0].address}</dd></div>
        <div><dt><Mail size={16}/> Email</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
        <div><dt><Phone size={16}/> Nomor Telepon</dt><dd><a href="tel:+62216251689">(021) 625-1689</a><br/><a href="tel:+62216251690">(021) 625-1690</a></dd></div>
        <div><dt><ArrowUpRight size={16}/> Katalog</dt><dd><a href={company.catalog} target="_blank" rel="noopener noreferrer">E-Catalog Resmi TOC</a></dd></div>
      </dl>
    </div></section>
    <section className="contact-form-section section-pad"><div className="container contact-layout"><div className="contact-visual"><Image src="/assets/articles/toc-anniversary.png" alt="Ilustrasi layanan pelanggan yang digunakan pada situs TOC, bukan foto staf yang terverifikasi" fill sizes="(max-width: 767px) 100vw, 468px"/><div/><h2 id="contact-form-title">Sampaikan Kebutuhan Anda</h2></div><ContactForm/></div></section>
    <section className="office-section section-pad"><div className="container"><h2>Kantor dan Cabang TOC</h2><div className="office-grid">{branches.map(branch=><article key={branch.city}><h3>{branch.city}</h3><p>{branch.address}</p><a href={`tel:${branch.tel}`}>{branch.phone}</a><a href={`mailto:${branch.email}`}>{branch.email}</a>{branch.hours&&<p className="office-hours">{branch.hours}</p>}<a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`} target="_blank" rel="noopener noreferrer">Lihat Alamat <MapPin size={14}/></a></article>)}</div></div></section>
    </main><Footer compact/></>;
}

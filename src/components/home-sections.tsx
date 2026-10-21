import Image from 'next/image';
import Link from 'next/link';
import { CircleX } from 'lucide-react';
import { ActionLink, ArticleCard } from '@/components/shared';
import { ProductCarousel, SectorCarousel, Statistics } from '@/components/interactions';
import { articles } from '@/data/articles';
import { services } from '@/data/company';

export function Hero() {
  return <section className="home-hero photo-panel"><Image src="/assets/hero/toc-city.jpg" alt="Panorama kota yang digunakan pada situs resmi TOC, sebagai ilustrasi" fill priority sizes="100vw" className="panel-image"/><div className="photo-overlay"/><div className="container hero-content"><h1>Teknologi Tepat untuk Kebutuhan Profesional Anda</h1><p>Peralatan medis, pendidikan, laboratorium, dan industri. PT Tamara Overseas Corporindo mendukung kebutuhan teknologi institusi Anda.</p><div className="hero-actions"><ActionLink href="/tentang">Tentang Kami</ActionLink><ActionLink href="/kontak" outline>Diskusi Kebutuhan Anda</ActionLink></div></div></section>;
}

export function Challenges() {
  const items=[['Peralatan Tidak Sesuai Kebutuhan','Pemilihan teknologi kurang tepat'],['Gangguan Operasional dan Downtime','Aktivitas institusi terhambat'],['Instalasi dan Pelatihan Kurang Optimal','Penggunaan belum maksimal'],['Kesulitan Mendapat Dukungan Teknis','Perawatan perlu perencanaan']];
  return <section className="challenges-section section-pad"><div className="container challenges-grid"><h2>Tantangan Pengadaan yang Memengaruhi Operasional Anda</h2><div className="challenges-items">{items.map(([title,description],index)=><Link href={`/layanan#${index<2?'maintenance':'instalasi-pelatihan'}`} className="challenge" key={title}><span className="challenge-number">0{index+1}</span><h3>{title}</h3><p><CircleX size={14}/>{description}</p></Link>)}</div></div></section>;
}

export function CompanySolution() {
  return <section className="solution-section photo-panel"><Image src="/assets/hero/toc-city.jpg" alt="" fill sizes="100vw" className="panel-image"/><div className="photo-overlay"/><div className="container solution-content"><h2>TOC Hadir untuk Mendukung Kebutuhan Teknologi Profesional</h2><p>Pengadaan peralatan teknologi untuk pendidikan dan industri, distribusi alat kesehatan, serta layanan instalasi, pelatihan, dan perawatan. Dukungan yang berangkat dari kebutuhan institusi Anda.</p><ActionLink href="/tentang" outline>Pelajari Lebih Lanjut</ActionLink><Statistics/></div></section>;
}

export function ProductShowcase() {
  return <section className="product-showcase section-pad"><div className="container"><div className="section-header"><div><h2>Produk TOC</h2><p>Ragam peralatan dan teknologi untuk kebutuhan medis,<br className="desktop-break"/> pendidikan, laboratorium, dan industri profesional.</p></div><ActionLink href="/produk" outline>Lihat Semua Produk</ActionLink></div><ProductCarousel/></div></section>;
}

export function QualityStatement() {
  return <section className="quality-section photo-panel"><Image src="/assets/hero/toc-city.jpg" alt="" fill sizes="100vw" className="panel-image"/><div className="photo-overlay"/><div className="container quality-content"><h2>Komitmen pada mutu, teknologi, dan pelayanan profesional. TOC menyediakan peralatan kesehatan, laboratorium, pendidikan, dan industri, didukung kerja sama tim serta layanan bagi kebutuhan pelanggan.</h2><SectorCarousel/></div></section>;
}

export function StandardsSection() {
  return <section className="standards-section section-pad"><div className="container standards-grid"><div><h2>Mutu Peralatan dan Dukungan di Setiap Kebutuhan</h2><div className="company-photo"><Image src="/assets/company/toc-company.png" alt="Foto kebersamaan perusahaan yang dipublikasikan TOC" width={800} height={533} sizes="(max-width: 800px) 100vw, 550px"/></div></div><div className="standards-content"><p>Produk dan layanan TOC mencakup kebutuhan alat kesehatan, laboratorium, pendidikan, serta industri. Dukungan pelanggan menjadi bagian dari informasi layanan resmi perusahaan.</p><h3>Layanan & Dukungan</h3><div className="support-grid">{services.map((service,index)=><Link key={service.slug} href={`/layanan#${service.slug}`}><span>0{index+1}</span><p>{service.title}</p></Link>)}</div><h3>Merek pada Situs TOC</h3><div className="partner-logos">{[['randox','Randox'],['nova','Nova'],['unisis','Unisis'],['mts','MTS'],['chester','Chester'],['armfield','Armfield']].map(([file,name])=><Image key={file} src={`/assets/partners/${file}.${file==='chester'?'jpg':'png'}`} alt={name} width={100} height={100}/>)}</div><p className="source-caption">Logo merek, bukan tanda sertifikasi TOC.</p></div></div></section>;
}

export function ArticlePreview() {
  return <section className="article-preview section-pad"><div className="container"><div className="section-header"><h2>Wawasan dan Informasi TOC</h2><ActionLink href="/artikel" outline>Lihat Artikel Lainnya</ActionLink></div><div className="article-grid">{articles.map(article=><ArticleCard key={article.slug} article={article}/>)}</div></div></section>;
}

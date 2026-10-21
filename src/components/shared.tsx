import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Home, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import type { Article, Product } from '@/types';

export function ActionLink({ href, children, outline = false, className = '' }: { href: string; children: React.ReactNode; outline?: boolean; className?: string }) {
  return <Button asChild className={`action-link ${outline ? 'action-outline' : ''} ${className}`}><Link href={href}>{children}<ArrowRight size={20} aria-hidden="true"/></Link></Button>;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="breadcrumbs" aria-label="Jejak navigasi"><Link href="/" aria-label="Beranda"><Home size={14}/></Link>{items.map((item,index)=><span key={`${index}-${item.label}`}><span aria-hidden="true">/</span>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav>;
}

export function PageHero({ title, crumb, image = '/assets/hero/toc-city.jpg', className = '' }: { title: string; crumb: string; image?: string; className?: string }) {
  return <section className={`page-hero photo-panel ${className}`}><Image src={image} alt="" fill priority sizes="100vw" className="panel-image"/><div className="photo-overlay"/><div className="container page-hero-content"><Breadcrumbs items={[{label:crumb}]}/><h1>{title}</h1></div></section>;
}

export function ContactCTA({ title = 'Siap Mendukung Kebutuhan Teknologi Anda' }: { title?: string }) {
  return <section className="contact-cta photo-panel"><Image src="/assets/hero/toc-city.jpg" alt="" fill sizes="100vw" className="panel-image"/><div className="photo-overlay"/><div className="container"><h2>{title}</h2><p>Diskusikan kebutuhan peralatan medis, pendidikan, laboratorium, atau industri Anda bersama tim PT Tamara Overseas Corporindo.</p><ActionLink href="/kontak">Hubungi Kami</ActionLink></div></section>;
}

export function PageEnd() {
  return <><ContactCTA/><Footer/></>;
}

export function ProductCard({ product }: { product: Product }) {
  return <Link href={`/produk/${product.slug}`} className={`product-card ${product.kind === 'Peralatan' ? 'product-equipment' : ''}`}>
    <div className="product-card-image"><Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 600px) 80vw, (max-width: 1024px) 45vw, 285px"/></div>
    <div className="product-card-label"><span className="card-brand">TOC</span><p className="eyebrow">{product.kind}</p><div className="product-card-bottom"><h3>{product.title}</h3><ArrowRight size={18}/></div></div>
  </Link>;
}

export function ArticleCard({ article }: { article: Article }) {
  return <Link href={`/artikel/${article.slug}`} className="article-card"><Image src={article.image} alt={`Ilustrasi artikel ${article.title}`} fill sizes="(max-width: 700px) 100vw, 33vw"/><div className="article-shade"/><div className="article-card-content"><div className="article-meta"><span>{article.category}</span><time dateTime={article.date}>{formatDate(article.date)}</time></div><h3>{article.title}</h3><span className="article-card-arrow"><ArrowRight size={20}/></span></div></Link>;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('id-ID',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Jakarta'}).format(new Date(`${date}T12:00:00Z`));
}

export function FloatingContact() {
  return <Link href="/kontak" className="floating-contact" aria-label="Hubungi TOC"><Mail size={27}/></Link>;
}

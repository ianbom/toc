import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { branches, company, navigation } from '@/data/company';

export function Footer({ compact = false }: { compact?: boolean }) {
  return <footer className={`site-footer ${compact ? 'footer-compact' : ''}`}>
    {!compact && <div className="container footer-grid">
      <div className="footer-about"><Link href="/" aria-label="TOC — Beranda"><Image src="/assets/brand/toc-logo.png" alt="PT Tamara Overseas Corporindo" width={230} height={99}/></Link><p>{company.description}</p></div>
      <nav aria-label="Navigasi footer">{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href="/layanan">Layanan</Link></nav>
      <div className="footer-contact"><p><MapPin size={16}/>{branches[0].address}</p><a href={`mailto:${company.email}`}><Mail size={16}/>{company.email}</a><a href="tel:+62216251689"><Phone size={16}/>(021) 625-1689</a><a href="tel:+62216251690"><Phone size={16}/>(021) 625-1690</a></div>
    </div>}
    <div className="container footer-bottom"><p>© {new Date().getFullYear()} PT Tamara Overseas Corporindo. All rights reserved.</p><a href={company.catalog} target="_blank" rel="noopener noreferrer">E-Catalog Resmi <ArrowUpRight size={14}/></a></div>
  </footer>;
}

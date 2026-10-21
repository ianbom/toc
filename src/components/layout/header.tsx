'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Mail, MapPin, Menu, X } from 'lucide-react';
import { navigation, company } from '@/data/company';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const light = pathname.startsWith('/produk/') || pathname.startsWith('/artikel/') || !['/', '/tentang', '/produk', '/artikel', '/kontak', '/layanan'].includes(pathname);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        entry.target.animate([{opacity:.2,transform:'translateY(15px)'},{opacity:1,transform:'translateY(0)'}],{duration:500,easing:'ease-out'});
        observer.unobserve(entry.target);
      });
    },{threshold:.2});
    document.querySelectorAll('main section h2').forEach(element=>observer.observe(element));
    return ()=>observer.disconnect();
  },[pathname]);
  return <header className={`site-header ${light ? 'header-light' : 'header-overlay'} ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="header-inner">
      <Link href="/" aria-label="TOC — Beranda" className="header-logo"><Image src={`/assets/brand/toc-logo${light ? '' : '-light'}.png`} alt="Tamara Overseas Corporindo" width={450} height={194} priority /></Link>
      <nav className="desktop-nav" aria-label="Navigasi utama">
        {navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/')) ? 'page' : undefined} className={item.href === '/kontak' ? 'nav-contact' : ''}>{item.label}</Link>)}
      </nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild><button className="mobile-menu-button" aria-label="Buka menu navigasi"><Menu size={22} /></button></SheetTrigger>
        <SheetContent className="mobile-drawer" showCloseButton={false}>
          <SheetTitle className="sr-only">Navigasi TOC</SheetTitle>
          <SheetDescription className="sr-only">Navigasi utama dan informasi kontak PT Tamara Overseas Corporindo.</SheetDescription>
          <SheetClose className="drawer-close" aria-label="Tutup menu navigasi"><X size={24}/></SheetClose>
          <Image src="/assets/brand/toc-logo.png" alt="TOC" width={180} height={78}/>
          <nav aria-label="Navigasi seluler">{navigation.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}</nav>
          <div className="drawer-contact"><p><MapPin size={18}/> Jakarta, Indonesia</p><a href={`mailto:${company.email}`}><Mail size={18}/>{company.email}</a><Link href="/layanan" onClick={() => setOpen(false)}>Jasa & Layanan</Link></div>
        </SheetContent>
      </Sheet>
    </div>
  </header>;
}

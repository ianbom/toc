'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { branches, faq, sectors } from '@/data/company';
import { products } from '@/data/products';
import { ProductCard } from '@/components/shared';
import type { Product } from '@/types';

export function ProductCarousel({ items = products }: { items?: Product[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [canScroll,setCanScroll] = useState(false);
  useEffect(()=>{
    const element=track.current;
    if(!element)return;
    const observer=new ResizeObserver(()=>setCanScroll(element.scrollWidth>element.clientWidth+1));
    observer.observe(element);
    return ()=>observer.disconnect();
  },[]);
  const move = (direction: number) => {
    const current = track.current;
    if (!current) return;
    const card = current.querySelector('a');
    const step = (card?.getBoundingClientRect().width ?? 285) + 24;
    const maximum = current.scrollWidth-current.clientWidth;
    const next = direction>0 && current.scrollLeft>=maximum-2 ? 0 : direction<0 && current.scrollLeft<=2 ? maximum : current.scrollLeft+step*direction;
    current.scrollTo({left:next,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  };
  return <div className="carousel"><div className="product-track" ref={track} onScroll={event=>setPosition(Math.round(event.currentTarget.scrollLeft / ((event.currentTarget.querySelector('a')?.getBoundingClientRect().width ?? 285)+24)))}>{items.map(product=><ProductCard key={product.slug} product={product}/>)}</div>{canScroll&&<><button className="carousel-arrow previous" aria-label="Produk sebelumnya" onClick={()=>move(-1)}><ChevronLeft size={19}/></button><button className="carousel-arrow next" aria-label="Produk selanjutnya" onClick={()=>move(1)}><ChevronRight size={19}/></button></>}<span className="sr-only" aria-live="polite">Posisi produk {position+1}</span></div>;
}

export function ProductCatalog() {
  const [category,setCategory] = useState('Semua');
  const categories = ['Semua', ...new Set(products.map(product=>product.category))];
  const visible = products.filter(product=>category==='Semua'||product.category===category);
  return <div className="catalog-layout"><aside className="category-rail"><h3>Kategori</h3>{categories.map(item=><button key={item} aria-pressed={category===item} onClick={()=>setCategory(item)}>{item}</button>)}</aside><div><p className="catalog-count" aria-live="polite">{visible.length} pilihan {category==='Semua'?'produk dan teknologi':category.toLowerCase()}</p><div className="product-grid">{visible.map(product=><ProductCard key={product.slug} product={product}/>)}</div></div></div>;
}

export function Statistics() {
  const root = useRef<HTMLDivElement>(null);
  const [values,setValues] = useState(sectors.map(sector=>sector.count));
  useEffect(()=>{
    const element=root.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame=0;
    const observer=new IntersectionObserver(entries=>{
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      const start=performance.now();
      const tick=(now:number)=>{
        const progress=Math.min((now-start)/1100,1);
        setValues(sectors.map(sector=>Math.round(sector.count*(1-Math.pow(1-progress,3)))));
        if (progress<1) frame=requestAnimationFrame(tick);
      };
      frame=requestAnimationFrame(tick);
    },{threshold:.5});
    observer.observe(element);
    return ()=>{observer.disconnect();cancelAnimationFrame(frame);};
  },[]);
  return <div className="statistics" ref={root}>{sectors.map((sector,index)=><div key={sector.name}><span className="stat-number" aria-hidden="true">{values[index]}<span>+</span></span><span className="sr-only">{sector.count} lebih</span><p>{sector.name}</p></div>)}</div>;
}

export function SectorCarousel() {
  const [index,setIndex] = useState(0);
  return <div className="trust-panel"><button aria-label="Sektor sebelumnya" onClick={()=>setIndex((index+sectors.length-1)%sectors.length)}><ChevronLeft/></button><div aria-live="polite"><p className="eyebrow">Sektor Pelanggan TOC</p><h3>{sectors[index].name}</h3><p>{sectors[index].text}</p><span>Berdasarkan informasi perusahaan — bukan kutipan pelanggan</span></div><button aria-label="Sektor selanjutnya" onClick={()=>setIndex((index+1)%sectors.length)}><ChevronRight/></button></div>;
}

export function BranchNetwork({ compact = false }: { compact?: boolean }) {
  const [selected,setSelected] = useState(0);
  const branch=branches[selected];
  return <section className={`branch-section section-pad ${compact?'branch-compact':''}`}><div className="container"><h2 className="center-heading">Jaringan Kantor dan Dukungan TOC di Indonesia</h2><div className="branch-map"><Image src="/assets/icons/indonesia.svg" alt="Peta geografis Indonesia" fill sizes="(max-width: 1280px) 100vw, 1200px"/>{branches.map((item,index)=><button key={item.city} className={`map-pin ${selected===index?'selected':''}`} style={{left:`${((item.lon-94)*25)/12}%`,top:`${((7-item.lat)*25)/5}%`}} aria-label={`Lihat kantor ${item.city}`} aria-pressed={selected===index} onClick={()=>setSelected(index)}><span className="pin-dot"/><span className={`pin-label pin-label-${index}`}>{item.city}</span></button>)}</div><div className="branch-toolbar"><div className="branch-tabs" aria-label="Pilih kantor">{branches.map((item,index)=><button key={item.city} aria-pressed={selected===index} onClick={()=>setSelected(index)}>{item.city}</button>)}</div><div className="branch-selected" aria-live="polite"><MapPin size={19}/><p><strong>{branch.city}</strong><span>{branch.address}</span><a href={`tel:${branch.tel}`}>{branch.phone}</a> · <a href={`mailto:${branch.email}`}>{branch.email}</a></p><Link href="/kontak" className="text-link">Semua Kontak</Link></div></div></div></section>;
}

export function FAQ() {
  return <section className="faq-section section-pad"><div className="container"><h2 className="center-heading">Pertanyaan yang Sering Diajukan</h2><Tabs defaultValue="0" orientation="vertical" className="faq-tabs"><div className="faq-rail"><p>Kategori</p><TabsList className="faq-categories" aria-label="Kategori pertanyaan">{faq.map((group,index)=><TabsTrigger key={group.category} value={String(index)}>{group.category}</TabsTrigger>)}</TabsList></div><div className="faq-content">{faq.map((group,index)=><TabsContent key={group.category} value={String(index)}><Accordion type="single" collapsible>{group.items.map((item,itemIndex)=><AccordionItem key={item.question} value={String(itemIndex)}><AccordionTrigger>{item.question}</AccordionTrigger><AccordionContent>{item.answer}</AccordionContent></AccordionItem>)}</Accordion></TabsContent>)}</div></Tabs></div></section>;
}

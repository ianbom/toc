'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { articles } from '@/data/articles';
import { formatDate } from '@/components/shared';

export function ArticleList() {
  const [category,setCategory]=useState('Semua');
  const visible=articles.filter(article=>category==='Semua'||article.category===category);
  return <div className="article-list-layout"><div className="article-list"><span className="sr-only" aria-live="polite">{visible.length} artikel ditampilkan</span>{visible.map(article=><article key={article.slug} className="article-list-item"><Link href={`/artikel/${article.slug}`} className="article-list-image" aria-label={`Baca ${article.title}`}><Image src={article.image} alt={`Ilustrasi artikel ${article.title}`} fill sizes="(max-width: 800px) 100vw, 330px"/></Link><div><div className="article-meta"><span>{article.category}</span><time dateTime={article.date}>{formatDate(article.date)}</time></div><h2><Link href={`/artikel/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt}</p><Link href={`/artikel/${article.slug}`} className="read-more">Baca Selengkapnya <ArrowRight size={16}/></Link></div></article>)}</div><aside className="article-sidebar"><h2>Kategori</h2><div className="category-rail">{['Semua',...new Set(articles.map(article=>article.category))].map(item=><button key={item} aria-pressed={category===item} onClick={()=>setCategory(item)}>{item}</button>)}</div><h2>Jelajahi Artikel</h2>{articles.map(article=><Link key={article.slug} href={`/artikel/${article.slug}`} className="sidebar-article"><span className="eyebrow">{article.category}</span><h3>{article.title}</h3></Link>)}</aside></div>;
}

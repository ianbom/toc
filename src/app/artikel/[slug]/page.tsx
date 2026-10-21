import Image from 'next/image';
import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';
import { ArticleCard, Breadcrumbs, formatDate, PageEnd } from '@/components/shared';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams=false;
export function generateStaticParams(){return articles.map(article=>({slug:article.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const article=articles.find(item=>item.slug===slug);return article?pageMetadata(article.title,`/artikel/${slug}`,article.excerpt):{};}

export default async function ArticlePage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;const article=articles.find(item=>item.slug===slug);if(!article)notFound();
  return <><main id="main-content" className="detail-main article-main"><article className="container article-detail"><Breadcrumbs items={[{label:'Artikel',href:'/artikel'},{label:article.title}]}/><header className="article-detail-header"><h1>{article.title}</h1><div className="article-meta"><span>{article.category}</span><time dateTime={article.date}>{formatDate(article.date)}</time></div></header><figure className="article-detail-photo"><Image src={article.image} alt={`Ilustrasi pada artikel ${article.title}, bukan dokumentasi produk atau acara`} width={667} height={515} priority sizes="(max-width: 700px) 100vw, 667px"/><figcaption>Ilustrasi yang digunakan pada publikasi sumber TOC.</figcaption></figure><div className="article-prose"><p className="article-summary-label">Ringkasan publikasi resmi TOC</p>{article.blocks.map((block,index)=>block.type==='heading'?<h2 key={index}>{block.text}</h2>:<p key={index}>{block.text}</p>)}{article.category==='Perusahaan'&&<aside className="editorial-note"><strong>Catatan arsip.</strong> Judul dan tanggal mengikuti publikasi sumber. Angka ulang tahun serta tahun pendirian dalam artikel tidak konsisten dengan informasi pada beranda TOC. Informasi tersebut tidak digunakan sebagai fakta kronologi perusahaan pada situs ini.</aside>}{article.category==='Kesehatan'&&<p className="source-caption">Ringkasan informasi artikel, bukan pengganti pedoman klinis atau prosedur institusi Anda.</p>}<p className="article-source">Sumber: <a href={article.source} target="_blank" rel="noopener noreferrer">Baca publikasi asli TOC</a></p></div></article><section className="section-pad"><div className="container"><h2>Artikel Terkait</h2><div className="article-grid related-articles">{articles.filter(item=>item.slug!==slug).map(item=><ArticleCard key={item.slug} article={item}/>)}</div></div></section></main><PageEnd/></>;
}

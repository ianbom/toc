import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Check, ArrowUpRight } from 'lucide-react';
import { products } from '@/data/products';
import { company } from '@/data/company';
import { ActionLink, Breadcrumbs, PageEnd } from '@/components/shared';
import { ProductCarousel } from '@/components/interactions';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams=false;
export function generateStaticParams(){return products.map(product=>({slug:product.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=products.find(item=>item.slug===slug);return product?pageMetadata(product.title,`/produk/${slug}`,product.description):{};}

export default async function ProductPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const product=products.find(item=>item.slug===slug);
  if(!product)notFound();
  return <><main id="main-content" className="detail-main"><div className="container"><Breadcrumbs items={[{label:'Produk',href:'/produk'},{label:product.title}]}/><div className="product-detail-grid"><figure className={`product-detail-image ${product.kind==='Peralatan'?'equipment-image':''}`}><Image src={product.image} alt={product.imageAlt} width={800} height={600} priority sizes="(max-width: 800px) 100vw, 480px"/>{product.kind==='Informasi teknologi'&&<figcaption>Ilustrasi dampak gempa dari artikel TOC, bukan foto unit simulator.</figcaption>}</figure><div className="product-information"><span className="card-brand">TOC</span><h1>{product.title}</h1><p className="eyebrow">{product.category} / {product.kind}</p><h2>Informasi Produk</h2><p>{product.description}</p><h2>{product.kind==='Peralatan'?'Fungsi dan Penggunaan':'Lingkup Informasi'}</h2><ul className="check-list">{product.features.map(feature=><li key={feature}><Check size={18}/>{feature}</li>)}</ul><div className="detail-actions"><a href={company.catalog} target="_blank" rel="noopener noreferrer" className="catalog-external">E-Catalog Resmi TOC <ArrowUpRight size={17}/></a><ActionLink href="/kontak">Konsultasikan Kebutuhan</ActionLink></div></div></div>{product.specifications&&<section className="detail-section"><h2>Spesifikasi Teknis</h2><table><tbody>{product.specifications.map(spec=><tr key={spec.label}><th scope="row">{spec.label}</th><td>{spec.value}</td></tr>)}</tbody></table></section>}<section className="detail-section"><h2>Aplikasi Penggunaan</h2><div className="application-list">{product.applications.map((application,index)=><div key={application}><span>0{index+1}</span><h3>{application}</h3></div>)}</div><p className="source-caption">Informasi dirangkum dari <a href={product.source} target="_blank" rel="noopener noreferrer">situs resmi TOC</a>. Konfirmasikan kesesuaian produk dan kebutuhan teknis bersama tim TOC.</p></section><section className="detail-section related-products"><h2>Produk dan Teknologi Terkait</h2><ProductCarousel items={products.filter(item=>item.slug!==slug)}/></section></div></main><PageEnd/></>;
}

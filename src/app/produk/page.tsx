import { PageHero, PageEnd } from '@/components/shared';
import { ProductCatalog } from '@/components/interactions';
import { company } from '@/data/company';
import { pageMetadata } from '@/lib/seo';
import { ArrowUpRight } from 'lucide-react';

export const metadata=pageMetadata('Produk TOC','/produk','Jelajahi kelompok peralatan medis, pendidikan, teknologi simulasi, dan Chester Machine Center dari informasi resmi TOC.');

export default function ProductsPage() {
  return <><main id="main-content"><PageHero title="Produk Kami" crumb="Produk"/><section className="section-pad"><div className="container"><div className="catalog-intro"><h2>Produk</h2><p>Peralatan dan teknologi untuk kebutuhan medis, pendidikan, laboratorium, serta industri. Kenali informasi produk dan konsultasikan kebutuhan institusi Anda.</p><a className="text-link" href={company.catalog} target="_blank" rel="noopener noreferrer">Buka E-Catalog Resmi <ArrowUpRight size={17}/></a></div><ProductCatalog/><p className="catalog-disclaimer">Katalog ini mencakup peralatan, kelompok produk, dan informasi teknologi yang diberi label sesuai sumbernya. Harga, spesifikasi lengkap, serta ketersediaan perlu dikonfirmasi langsung kepada TOC.</p></div></section></main><PageEnd/></>;
}

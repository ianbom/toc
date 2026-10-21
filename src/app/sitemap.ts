import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { articles } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['','/tentang','/produk','/layanan','/artikel','/kontak',...products.map(product=>`/produk/${product.slug}`),...articles.map(article=>`/artikel/${article.slug}`)].map(path=>({url:`https://www.toc.co.id${path}`,changeFrequency:'monthly' as const,priority:path===''?1:.7}));
}

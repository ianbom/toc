import type { Metadata } from 'next';

export function pageMetadata(title: string, path: string, description: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title: `${title} | TOC`, description, url: path, locale: 'id_ID', siteName: 'PT Tamara Overseas Corporindo', images: [{url:'/assets/hero/toc-city.jpg',width:1920,height:860}] } };
}

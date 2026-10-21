import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/layout/header';
import { FloatingContact } from '@/components/shared';
import './globals.css';

const headline=localFont({src:'../../public/assets/fonts/stacksansheadline.ttf',variable:'--font-headline',display:'swap',weight:'100 900'});
const text=localFont({src:'../../public/assets/fonts/stacksanstext.ttf',variable:'--font-text',display:'swap',weight:'100 900'});

export const metadata: Metadata={
  metadataBase:new URL('https://www.toc.co.id'),
  title:{default:'TOC — PT Tamara Overseas Corporindo',template:'%s | TOC'},
  description:'Pengadaan peralatan medis, pendidikan, laboratorium, dan industri. Kenali produk dan layanan PT Tamara Overseas Corporindo.',
  openGraph:{type:'website',locale:'id_ID',siteName:'PT Tamara Overseas Corporindo',images:[{url:'/assets/hero/toc-city.jpg',width:1920,height:860,alt:'TOC — Tamara Overseas Corporindo'}]},
  twitter:{card:'summary_large_image'},
  icons:{icon:'/assets/brand/toc-symbol.png',apple:'/assets/brand/toc-symbol.png'},
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="id"><body className={`${headline.variable} ${text.variable}`}><a href="#main-content" className="skip-link">Lewati ke konten</a><Header/>{children}<FloatingContact/></body></html>;
}

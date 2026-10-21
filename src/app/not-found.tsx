import Link from 'next/link';
import { Footer } from '@/components/layout/footer';

export default function NotFound(){return <><main id="main-content" className="not-found"><p>404</p><h1>Halaman Tidak Ditemukan</h1><p>Halaman yang Anda cari tidak tersedia.</p><Link href="/" className="action-link">Kembali ke Beranda</Link></main><Footer/></>;}

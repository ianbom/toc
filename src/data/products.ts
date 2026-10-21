import type { Product } from '@/types';

export const products: Product[] = [
  {
    slug: 'chester-machine-center', title: 'Chester Machine Center', category: 'Industri', kind: 'Peralatan',
    image: '/assets/products/chester-machine.png', imageAlt: 'Mesin Chester Model U255 yang ditampilkan pada situs resmi TOC',
    description: 'Chester Model U255 ditampilkan TOC sebagai 5 Axis Machine Center. Peralatan ini diperkenalkan untuk kebutuhan pemesinan presisi, termasuk pemotongan, penggilingan, dan pengeboran material seperti logam.',
    features: ['Pemesinan presisi', 'Pemotongan, penggilingan, dan pengeboran', 'Pengolahan komponen untuk kebutuhan industri'],
    applications: ['Pemesinan komponen logam', 'Kebutuhan produksi dan pengrajin industri'],
    source: 'https://www.toc.co.id/',
  },
  {
    slug: 'peralatan-medis', title: 'Peralatan Medis', category: 'Medis', kind: 'Kelompok produk',
    image: '/assets/products/medical-equipment.png', imageAlt: 'Ilustrasi peralatan kesehatan dari situs resmi TOC',
    description: 'TOC bergerak dalam distribusi alat kesehatan dan menyebut rumah sakit sebagai salah satu sektor pelanggannya. Kebutuhan produk dan rincian teknis dapat didiskusikan langsung bersama tim TOC.',
    features: ['Pengadaan alat kesehatan', 'Dukungan instalasi dan pelatihan', 'Layanan perawatan dan konsultasi suku cadang'],
    applications: ['Institusi pelayanan kesehatan', 'Rumah sakit'],
    source: 'https://www.toc.co.id/',
  },
  {
    slug: 'peralatan-pendidikan', title: 'Peralatan Pendidikan', category: 'Pendidikan', kind: 'Kelompok produk',
    image: '/assets/company/service-workshop.png', imageAlt: 'Ilustrasi kegiatan pembelajaran dan workshop dari situs TOC',
    description: 'Pengadaan peralatan teknologi untuk pendidikan merupakan bagian dari bidang usaha TOC. Perusahaan juga mencantumkan kebutuhan universitas dan laboratorium dalam informasi produk dan sektor pelanggannya.',
    features: ['Teknologi untuk pendidikan', 'Kebutuhan universitas dan laboratorium', 'Pengenalan produk melalui pelatihan dan workshop'],
    applications: ['Institusi pendidikan', 'Universitas dan laboratorium pendidikan'],
    source: 'https://www.toc.co.id/',
  },
  {
    slug: 'earthquake-simulator-unit', title: 'Earthquake Simulator Unit', category: 'Pendidikan', kind: 'Informasi teknologi',
    image: '/assets/products/earthquake-simulator.png', imageAlt: 'Dampak gempa pada bangunan, ilustrasi artikel Earthquake Simulator Unit milik TOC; bukan foto unit simulator',
    description: 'Artikel TOC memperkenalkan Earthquake Simulator Unit sebagai fasilitas untuk mensimulasikan efek gempa bumi. Informasi ini disajikan sebagai pengenalan teknologi, bukan konfirmasi penjualan atau ketersediaan unit.',
    features: ['Pengenalan teknologi simulasi gempa', 'Pembahasan efek gempa bumi', 'Informasi bersumber dari artikel resmi TOC'],
    applications: ['Pengenalan dan pembelajaran teknologi simulasi gempa'],
    source: 'https://www.toc.co.id/apa-itu-earthquake-simulator-unit/',
  },
];

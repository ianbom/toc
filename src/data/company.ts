export const company = {
  name: 'PT Tamara Overseas Corporindo',
  shortName: 'TOC',
  email: 'info@toc.co.id',
  phones: ['(021) 625-1689', '(021) 625-1690'],
  description: 'PT Tamara Overseas Corporindo bergerak di bidang pengadaan peralatan teknologi untuk pendidikan dan industri, serta distribusi alat kesehatan di Indonesia.',
  source: 'https://www.toc.co.id/',
  catalog: 'https://katalog.inaproc.id/tamara-overseas-corporindo',
};

export const navigation = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Produk', href: '/produk' },
  { label: 'Artikel', href: '/artikel' },
  { label: 'Kontak', href: '/kontak' },
];

export const branches = [
  { city: 'Jakarta', address: 'Jl. Pinangsia Timur No. 49, Jakarta Pusat', phone: '(021) 625-1689', tel: '+62216251689', email: 'info@toc.co.id', hours: '', lat: -6.14, lon: 106.82 },
  { city: 'Semarang', address: 'Jl. Abdul Rahman Saleh No. 126 i, Kec. Semarang Barat, Semarang 50149', phone: '+62 8112 836 000', tel: '+628112836000', email: 'infosmg@toc.co.id', hours: 'Senin–Jumat, 08.00–16.00', lat: -6.97, lon: 110.42 },
  { city: 'Surabaya', address: 'Jl. Mayjend Sungkono No. 149–151, Komplek Ruko Rich Palace Blok C-5, Surabaya 60189', phone: '+62 8214 1550 000', tel: '+6282141550000', email: 'infosby@toc.co.id', hours: 'Senin–Jumat, 08.00–16.00', lat: -7.26, lon: 112.75 },
  { city: 'Palembang', address: 'Jl. Brigjend Dani Effendy (Radial), Komplek Ruko Palembang City Centre No. 23A, Palembang 30134', phone: '+62 8152 550 000', tel: '+628152550000', email: 'infoplm@toc.co.id', hours: 'Senin–Jumat, 08.00–16.00', lat: -2.99, lon: 104.76 },
  { city: 'Makassar', address: 'Jl. Monginsidi 1 No. 56, Makassar 90142 (Depan Polisi Militer Kodam XIV/Hasanudin)', phone: '+62 8218 7050 000', tel: '+6282187050000', email: 'infomks@toc.co.id', hours: 'Senin–Jumat, 08.00–16.00', lat: -5.15, lon: 119.43 },
];

export const services = [
  { slug: 'suku-cadang', title: 'Penjualan Suku Cadang', description: 'Suku cadang untuk mendukung kebutuhan peralatan pelanggan. Hubungi tim TOC untuk mendiskusikan komponen yang sesuai dengan peralatan Anda.', image: '/assets/company/service-spare-parts.png' },
  { slug: 'maintenance', title: 'Maintenance Rutin', description: 'Perawatan rutin untuk membantu menjaga fungsi peralatan. Kebutuhan pemeliharaan dapat dikonsultasikan bersama Service Department TOC.', image: '/assets/products/medical-equipment.png' },
  { slug: 'office-hour-medical', title: 'Office Hour Medical', description: 'Saluran konsultasi kebutuhan servis peralatan medis melalui Service Department. Konfirmasikan pengaturan layanan langsung kepada tim TOC.', image: '/assets/company/service-medical.png' },
  { slug: 'instalasi-pelatihan', title: 'Instalasi dan Pelatihan', description: 'Pendampingan instalasi dan pelatihan penggunaan produk agar pengguna dapat memahami pengoperasian peralatan dengan lebih baik.', image: '/assets/company/service-installation.png' },
  { slug: 'workshop', title: 'Workshop', description: 'Workshop dan fasilitas pendukung untuk presentasi serta pengenalan produk kepada pelanggan.', image: '/assets/company/service-workshop.png' },
  { slug: 'evaluasi', title: 'Evaluasi', description: 'Pengecekan fasilitas sesuai prosedur operasional yang diterapkan TOC untuk kebutuhan pelanggan.', image: '/assets/company/service-evaluation.png' },
];

export const sectors = [
  { name: 'Rumah Sakit', count: 100, text: 'Peralatan kesehatan dan dukungan penggunaan untuk kebutuhan institusi pelayanan kesehatan.' },
  { name: 'Universitas', count: 50, text: 'Peralatan pendidikan dan teknologi untuk mendukung kebutuhan institusi pendidikan.' },
  { name: 'Industri', count: 70, text: 'Teknologi dan peralatan untuk kebutuhan pemesinan serta kegiatan industri profesional.' },
];

export const faq = [
  { category: 'Produk dan Peralatan', items: [
    { question: 'Bidang peralatan apa yang ditangani TOC?', answer: 'TOC menangani pengadaan peralatan teknologi untuk pendidikan dan industri, serta distribusi alat kesehatan. Kebutuhan laboratorium juga tercakup dalam informasi produk perusahaan.' },
    { question: 'Bagaimana mengetahui produk yang sesuai kebutuhan?', answer: 'Sampaikan jenis institusi, penggunaan, dan kebutuhan peralatan kepada tim TOC melalui halaman Kontak. Tim TOC dapat membantu membahas pilihan yang relevan.' },
    { question: 'Di mana saya bisa melihat katalog resmi TOC?', answer: 'Katalog elektronik TOC tersedia melalui tautan E-Catalog resmi pada halaman Produk. Detail produk pada situs ini hanya memuat informasi yang dapat diverifikasi dari sumber TOC.' },
    { question: 'Apakah harga dan ketersediaan tercantum di situs ini?', answer: 'Situs ini tidak menampilkan harga atau klaim ketersediaan. Hubungi TOC untuk mengonfirmasi kebutuhan produk, rincian teknis, dan penawaran.' },
  ] },
  { category: 'Instalasi dan Pelatihan', items: [
    { question: 'Apakah TOC menyediakan instalasi dan pelatihan?', answer: 'Instalasi dan pelatihan merupakan bagian dari layanan yang dicantumkan TOC. Lingkup dan pengaturannya perlu dikonfirmasi sesuai produk dan kebutuhan Anda.' },
    { question: 'Apakah tersedia workshop?', answer: 'TOC mencantumkan workshop dan fasilitas pendukung untuk presentasi produk. Silakan hubungi perusahaan untuk membahas kebutuhan kegiatan.' },
  ] },
  { category: 'Maintenance dan Suku Cadang', items: [
    { question: 'Bagaimana menghubungi dukungan perawatan?', answer: 'Hubungi TOC melalui email atau nomor telepon resmi dan sampaikan jenis peralatan serta kebutuhan servis kepada Service Department.' },
    { question: 'Apakah tersedia layanan suku cadang?', answer: 'Penjualan suku cadang tercantum dalam layanan TOC. Kesesuaian komponen dan ketersediaannya harus dikonfirmasi langsung, bukan diasumsikan dari situs ini.' },
  ] },
  { category: 'Informasi Perusahaan', items: [
    { question: 'Di mana kantor TOC berada?', answer: 'Informasi resmi TOC mencantumkan kantor di Jakarta, Semarang, Surabaya, Palembang, dan Makassar. Alamat lengkap tersedia di halaman Kontak.' },
    { question: 'Siapa saja sektor pelanggan TOC?', answer: 'Situs resmi perusahaan menyebut rumah sakit, universitas, dan industri sebagai sektor pelanggan, dengan angka publikasi 100+, 50+, dan 70+ secara berurutan.' },
  ] },
  { category: 'Konsultasi dan Kontak', items: [
    { question: 'Bagaimana menyampaikan kebutuhan peralatan?', answer: 'Gunakan email info@toc.co.id, telepon resmi, atau formulir pada halaman Kontak untuk menyiapkan draf email berisi kebutuhan Anda.' },
    { question: 'Apakah formulir otomatis mengirim pesan?', answer: 'Tidak. Formulir hanya membuka draf di aplikasi email Anda. Anda perlu meninjau dan mengirimnya sendiri. Tidak ada data formulir yang disimpan oleh situs ini.' },
  ] },
];

import { readFile, writeFile } from 'node:fs/promises';

const posts=JSON.parse(await readFile('artifacts/source/posts.json','utf8'));
const summaries=[
  {
    slug:'apa-itu-earthquake-simulator-unit',category:'Teknologi',image:'/assets/products/earthquake-simulator.png',
    excerpt:'Mengenal teknologi simulasi gempa dan perannya dalam pembelajaran serta penelitian respons struktur bangunan.',
    blocks:[
      {type:'paragraph',text:'Publikasi TOC memperkenalkan Earthquake Simulator Unit sebagai fasilitas untuk mempelajari pengaruh getaran gempa pada bangunan dan infrastruktur. Simulator membantu mereproduksi gerakan tertentu sehingga respons struktur dapat diamati dalam pengujian.'},
      {type:'heading',text:'Simulasi untuk Penelitian dan Pendidikan'},
      {type:'paragraph',text:'Artikel menjelaskan penggunaan platform bergerak serta teknologi aktuator untuk membentuk pola getaran. Hasil pengujian dapat menjadi bahan penelitian mengenai perilaku struktur dan pengembangan rancangan yang lebih aman. Dalam pendidikan, teknologi tersebut juga membantu pengenalan prinsip rekayasa tahan gempa.'},
      {type:'heading',text:'Memahami Konteks Informasi'},
      {type:'paragraph',text:'Pembahasan ini merupakan pengenalan teknologi dari artikel perusahaan. Gambar yang digunakan memperlihatkan dampak gempa, bukan unit simulator. Tidak ada model, spesifikasi unit, maupun ketersediaan penjualan yang ditetapkan melalui artikel ini. Hubungi TOC untuk mendiskusikan kebutuhan teknologi institusi Anda.'},
    ],
  },
  {
    slug:'mengapa-jarum-suntik-harus-diganti-setelah-dipakai',category:'Kesehatan',image:'/assets/articles/syringe-safety.png',
    excerpt:'Ringkasan artikel TOC mengenai kebersihan, keselamatan, dan alasan jarum suntik tidak digunakan kembali setelah pemakaian.',
    blocks:[
      {type:'paragraph',text:'Artikel TOC membahas alasan penggantian jarum suntik setelah digunakan. Pokok bahasannya berhubungan dengan kebersihan alat, risiko kontaminasi, serta kondisi fisik jarum setelah pemakaian.'},
      {type:'heading',text:'Kebersihan dan Keselamatan Penggunaan'},
      {type:'paragraph',text:'Publikasi tersebut menekankan bahwa pemakaian ulang dapat membawa risiko bagi pengguna. Kondisi jarum yang berubah setelah digunakan juga menjadi bagian dari pertimbangan keselamatan yang dibahas sumber.'},
      {type:'heading',text:'Informasi untuk Pengguna Peralatan'},
      {type:'paragraph',text:'Pemahaman penggunaan alat kesehatan perlu disertai prosedur yang tepat di institusi masing-masing. Ringkasan ini mempertahankan topik publikasi perusahaan tanpa menambahkan petunjuk tindakan medis. Untuk rincian bahasan sumber, baca artikel asli melalui tautan di bawah.'},
    ],
  },
  {
    slug:'merayakan-46-tahun-pt-tamara-overseas-corporindo-jejak-sukses-dan-harapan-masa-depan',category:'Perusahaan',image:'/assets/articles/toc-anniversary.png',
    excerpt:'Arsip publikasi perusahaan mengenai perjalanan TOC, kerja sama tim, dan komitmen terhadap kebutuhan alat kesehatan.',
    blocks:[
      {type:'paragraph',text:'Publikasi perusahaan ini mengangkat perayaan ulang tahun TOC dan refleksi perjalanan usahanya. Artikel menempatkan dedikasi karyawan, hubungan dengan mitra, dan kebutuhan pelanggan sebagai bagian dari cerita perusahaan.'},
      {type:'heading',text:'Perjalanan dan Kerja Sama'},
      {type:'paragraph',text:'Sumber membahas peran perusahaan dalam distribusi alat kesehatan serta komitmen untuk mendukung institusi pelayanan kesehatan. Perayaan digambarkan sebagai kesempatan untuk mengapresiasi tim dan meninjau arah pengembangan perusahaan.'},
      {type:'heading',text:'Catatan Publikasi'},
      {type:'paragraph',text:'Artikel disajikan sebagai arsip bertanggal 15 April 2025. Judul aslinya dipertahankan, tetapi angka ulang tahun dan kronologi pendirian tidak digunakan untuk menghitung usia perusahaan saat ini karena informasi antarhalaman sumber tidak konsisten. Ilustrasi yang menyertai artikel berasal dari publikasi sumber dan bukan dokumentasi acara yang telah diverifikasi.'},
    ],
  },
];
const records=summaries.map(summary=>{
  const post=posts.find(item=>item.slug===summary.slug);
  if(!post)throw new Error(`Missing official article: ${summary.slug}`);
  return {title:post.title.rendered.replace(/&#8211;/g,'–').replace(/&amp;/g,'&'),date:post.date.slice(0,10),source:post.link,...summary};
});
await writeFile('src/data/articles.ts',`import type { Article } from '@/types';\n\nexport const articles: Article[] = ${JSON.stringify(records,null,2)};\n`);

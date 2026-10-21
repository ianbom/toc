export type Product = {
  slug: string;
  title: string;
  category: 'Medis' | 'Pendidikan' | 'Industri';
  kind: 'Peralatan' | 'Kelompok produk' | 'Informasi teknologi';
  image: string;
  imageAlt: string;
  description: string;
  features: string[];
  applications: string[];
  source: string;
  specifications?: { label: string; value: string }[];
  catalog?: string;
};

export type Article = {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  source: string;
  blocks: { type: string; text: string }[];
};

import { PageHero, PageEnd } from '@/components/shared';
import { ArticleList } from '@/components/article-list';
import { pageMetadata } from '@/lib/seo';

export const metadata=pageMetadata('Artikel & Berita','/artikel','Artikel resmi TOC seputar teknologi, kesehatan, dan informasi perusahaan.');

export default function ArticlesPage() {
  return <><main id="main-content"><PageHero title="Wawasan dan Informasi TOC" crumb="Artikel"/><section className="section-pad"><div className="container"><ArticleList/></div></section></main><PageEnd/></>;
}

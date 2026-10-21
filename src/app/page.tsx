import { Hero, Challenges, CompanySolution, ProductShowcase, QualityStatement, StandardsSection, ArticlePreview } from '@/components/home-sections';
import { BranchNetwork, FAQ } from '@/components/interactions';
import { ContactCTA } from '@/components/shared';
import { Footer } from '@/components/layout/footer';
import { pageMetadata } from '@/lib/seo';

export const metadata=pageMetadata('Teknologi untuk Kebutuhan Profesional','/','PT Tamara Overseas Corporindo: peralatan medis, pendidikan, laboratorium, industri, dan layanan pendukung untuk institusi Anda.');

export default function HomePage() {
  return <><main id="main-content"><Hero/><Challenges/><CompanySolution/><ProductShowcase/><QualityStatement/><StandardsSection/><BranchNetwork/><ArticlePreview/><FAQ/><ContactCTA/></main><Footer/></>;
}

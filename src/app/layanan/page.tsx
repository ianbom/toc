import Image from 'next/image';
import { PageHero, PageEnd, ActionLink } from '@/components/shared';
import { services } from '@/data/company';
import { pageMetadata } from '@/lib/seo';

export const metadata=pageMetadata('Jasa & Layanan','/layanan','Layanan suku cadang, maintenance rutin, Office Hour Medical, instalasi dan pelatihan, workshop, serta evaluasi TOC.');

export default function ServicesPage() {
  return <><main id="main-content"><PageHero title="Jasa & Layanan" crumb="Layanan"/><section className="section-pad"><div className="container"><div className="profile-grid"><h2>Pelayanan Profesional untuk Kebutuhan Anda</h2><p>Penyediaan peralatan merupakan bagian dari kebutuhan institusi. TOC juga mencantumkan layanan pendukung untuk penggunaan, perawatan, dan pengenalan produk. Diskusikan lingkup layanan yang sesuai bersama tim perusahaan.</p></div><div className="service-list">{services.map((service,index)=><article id={service.slug} key={service.slug} className="service-row"><div className="service-number">0{index+1}.</div><Image src={service.image} alt={`Ilustrasi layanan ${service.title} dari situs TOC`} width={667} height={515} sizes="(max-width: 800px) 100vw, 400px"/><div><h2>{service.title}</h2><p>{service.description}</p><ActionLink href="/kontak" outline>Diskusikan Kebutuhan</ActionLink></div></article>)}</div></div></section></main><PageEnd/></>;
}

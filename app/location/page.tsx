import type { Metadata } from 'next';
import { LOCATION, OFFICE } from '@/lib/site';
import PageHero from '@/components/PageHero';
import ContactList from '@/components/ContactList';
import SubpageCta from '@/components/SubpageCta';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';
import s from './location.module.css';

export const metadata: Metadata = {
  title: '오시는 길',
  description: `법률사무소 진서 오시는 길 — ${OFFICE.address}. ${OFFICE.addressNote}.`,
  alternates: { canonical: '/location' },
};

export default function LocationPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(LOCATION.mapQuery)}&hl=ko&z=17&output=embed`;
  return (
    <main id="main">
      <JsonLd data={breadcrumbJsonLd([{ name: '오시는 길', path: '/location' }])} />
      <PageHero eyebrow="Location" title="오시는 길" lead={`${OFFICE.address}`} />

      <section className={s.section} aria-label="지도">
        <div className="frame">
          <div className={s.map}>
            <iframe
              title={`${OFFICE.name} 위치 지도`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className={s.mapLinks}>
            <a className="text-link" href={LOCATION.naverMap} target="_blank" rel="noopener noreferrer">
              네이버 지도에서 보기 <span className="arrow" aria-hidden>→</span>
            </a>
            <a className="text-link" href={LOCATION.kakaoMap} target="_blank" rel="noopener noreferrer">
              카카오맵에서 보기 <span className="arrow" aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className={s.info} aria-labelledby="address-title">
        <div className={`frame ${s.grid}`}>
          <div>
            <h2 id="address-title" className={s.h2}>
              주소
            </h2>
            <address className={s.address}>{OFFICE.address}</address>
            <p className={s.transit}>{OFFICE.addressNote}</p>
          </div>
          <div>
            <h2 className={s.h2}>연락처</h2>
            <ContactList />
          </div>
        </div>
      </section>

      <SubpageCta secondary={{ label: '대표변호사 소개', href: '/attorney' }} />
    </main>
  );
}

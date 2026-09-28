import type { Metadata } from 'next';
import { CONSULT, LINKS } from '@/lib/site';
import PageHero from '@/components/PageHero';
import ContactList from '@/components/ContactList';
import LocationPreview from '@/components/LocationPreview';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';
import s from './consultation.module.css';

export const metadata: Metadata = {
  title: '상담안내',
  description:
    '법률사무소 진서 상담 신청 안내. 대표번호 02-562-1260, 직통 010-2801-1260(문자 우선), 이메일 mge0716@naver.com.',
  alternates: { canonical: '/consultation' },
};

export default function ConsultationPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbJsonLd([{ name: '상담안내', path: '/consultation' }])} />
      <PageHero eyebrow="Consultation" title="상담안내" lead={CONSULT.body} />

      <section className={s.section} aria-labelledby="consult-title">
        <div className={`frame ${s.grid}`}>
          <div className={s.intro}>
            <h2 id="consult-title" className={s.h2}>
              상담 신청
            </h2>
            <p className={s.body}>블로그에서 상담 신청 방법과 진행 순서를 안내하고 있습니다.</p>
            <a className="line-btn line-btn--ink" href={LINKS.consultGuide} target="_blank" rel="noopener noreferrer">
              {CONSULT.cta} <span className="arrow" aria-hidden>→</span>
              <span className="sr-only">(네이버 블로그, 새 창)</span>
            </a>
          </div>
          <div>
            <h2 className="sr-only">연락처</h2>
            <ContactList />
          </div>
        </div>
      </section>

      <LocationPreview />
    </main>
  );
}

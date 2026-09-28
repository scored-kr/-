import type { Metadata } from 'next';
import Image from 'next/image';
import { CASES, LINKS } from '@/lib/site';
import PageHero from '@/components/PageHero';
import Zoomable from '@/components/Zoomable';
import SubpageCta from '@/components/SubpageCta';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';
import s from './cases.module.css';

export const metadata: Metadata = {
  title: '성공사례와 후기',
  description: '법률사무소 진서 민고은 변호사의 주요 수행사례와 의뢰인 후기. 자세한 사례는 네이버 블로그에서 확인하실 수 있습니다.',
  alternates: { canonical: '/cases' },
};

export default function CasesPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbJsonLd([{ name: '성공사례와 후기', path: '/cases' }])} />
      <PageHero eyebrow="Cases & Reviews" title="성공사례와 후기" lead={CASES.body} />

      <section className={s.section} aria-labelledby="reviews-title">
        <div className="frame">
          <header className={s.head}>
            <h2 id="reviews-title" className={s.h2}>
              의뢰인 후기
            </h2>
            <a className="line-btn line-btn--ink" href={LINKS.cases} target="_blank" rel="noopener noreferrer">
              {CASES.cta} <span className="arrow" aria-hidden>→</span>
              <span className="sr-only">(네이버 블로그, 새 창)</span>
            </a>
          </header>

          <div className={s.gallery}>
            {CASES.reviews.map((r) => (
              <figure key={r.src} className={s.item}>
                <Zoomable src={r.src} alt={r.alt} width={r.w} height={r.h}>
                  <Image
                    src={r.src}
                    alt=""
                    width={r.w}
                    height={r.h}
                    sizes="(max-width: 960px) 100vw, 400px"
                    className={s.img}
                  />
                </Zoomable>
              </figure>
            ))}
          </div>

        </div>
      </section>

      <SubpageCta secondary={{ label: '대표변호사 소개', href: '/attorney' }} />
    </main>
  );
}

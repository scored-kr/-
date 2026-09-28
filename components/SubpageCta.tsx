import { CASES, CONTACT_CTA } from '@/lib/site';
import s from './SubpageCta.module.css';

/** 하위 페이지 하단 공통 상담 CTA. HOME Cases 섹션의 카피를 재사용 */
export default function SubpageCta({ secondary }: { secondary?: { label: string; href: string } }) {
  return (
    <section data-header-dark className={s.cta} aria-labelledby="cta-title">
      <div className={`frame ${s.inner}`}>
        <h2 id="cta-title" className={s.title}>
          {CASES.title.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </h2>
        <div className={s.actions}>
          <a className="line-btn line-btn--light" href={CONTACT_CTA.href}>
            {CONTACT_CTA.label} <span className="arrow" aria-hidden>→</span>
          </a>
          {secondary && (
            <a className="line-btn line-btn--light" href={secondary.href}>
              {secondary.label} <span className="arrow" aria-hidden>→</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

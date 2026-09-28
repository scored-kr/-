import Image from 'next/image';
import { CASES } from '@/lib/site';
import Carousel from './Carousel';
import heroImg from '@/public/images/hero/hero-atmosphere.jpg';
import s from './Cases.module.css';

export default function CasesConsultation() {
  return (
    <section id="cases" data-header-dark className={s.section} aria-labelledby="cases-title">
      <Image src={heroImg} alt="" fill sizes="100vw" className={s.bg} aria-hidden />

      <div className={`frame ${s.inner}`}>
        <div className={s.top}>
          <div>
            <span className={`eyebrow ${s.eyebrow}`}>Cases &amp; Consultation</span>
            <h2 id="cases-title" className={s.heading}>
              {CASES.title.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </h2>
          </div>
          <div className={s.aside}>
            <p className={s.body}>{CASES.body}</p>
            <div className={s.actions}>
              <a className="line-btn line-btn--light" href="/cases">
                성공사례 보기 <span className="arrow" aria-hidden>→</span>
              </a>
              <a className="line-btn line-btn--light" href="/consultation">
                상담 절차 안내 <span className="arrow" aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>

        <div className={s.reviews}>
          <h3 className={s.reviewsHead}>의뢰인 후기</h3>
          <Carousel label="의뢰인 후기" tone="dark" className={s.reviewCarousel}>
            {CASES.reviews.map((r) => (
              <figure key={r.src} className={s.review}>
                <Image
                  src={r.src}
                  alt={r.alt}
                  width={r.w}
                  height={r.h}
                  sizes="(max-width: 640px) 80vw, (max-width: 960px) 62vw, 400px"
                  className={s.reviewImg}
                />
              </figure>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

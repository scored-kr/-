import { OFFICE, tel } from '@/lib/site';
import s from './Location.module.css';

export default function LocationPreview() {
  return (
    <section id="location" className={s.section} aria-labelledby="location-title">
      <div className={`frame ${s.grid}`}>
        <div>
          <span className="eyebrow">Location</span>
          <h2 id="location-title" className={s.heading}>
            오시는 길
          </h2>
        </div>
        <div className={s.detail}>
          <address className={s.address}>{OFFICE.address}</address>
          <p className={s.note}>{OFFICE.addressNote}</p>
          <p className={s.phone}>
            <span>대표번호</span>
            <a href={tel(OFFICE.tel)}>{OFFICE.tel}</a>
          </p>
          <a className="text-link" href="/location">
            자세히 보기 <span className="arrow" aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

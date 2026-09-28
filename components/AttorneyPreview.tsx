import { ATTORNEY } from '@/lib/site';
import AttorneyPortrait from './AttorneyPortrait';
import s from './Attorney.module.css';

export default function AttorneyPreview() {
  return (
    <section id="attorney" className={s.section} aria-labelledby="attorney-name">
      <div className="frame">
        <div className={s.grid}>
        <AttorneyPortrait />
        <div className={s.copy}>
          <span className="eyebrow">Attorney</span>
          <h2 id="attorney-name" className={s.name}>
            {ATTORNEY.name}
          </h2>
          <span className={`rule ${s.rule}`} aria-hidden />
          <p className={s.focus}>
            {ATTORNEY.focus.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
          <p className={s.body}>{ATTORNEY.body}</p>
          <a className="line-btn line-btn--ink" href="/attorney">
            변호사 소개 보기 <span className="arrow" aria-hidden>→</span>
          </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import { CREDENTIAL_SUMMARY, HOME_DOCS } from '@/lib/site';
import DocCarousel from './DocCarousel';
import s from './Credentials.module.css';

export default function Credentials() {
  return (
    <section id="credentials" className={s.section} aria-labelledby="credentials-title">
      <div className="frame">
        <div className={s.top}>
        <header className={s.head}>
          <div>
            <span className="eyebrow">Credentials</span>
            <h2 id="credentials-title" className={s.heading}>
              신뢰는, 걸어온 길로 말합니다.
            </h2>
          </div>
          <a className="text-link" href="/attorney#career">
            주요 경력 더 보기 <span className="arrow" aria-hidden>→</span>
          </a>
        </header>

        <div className={s.summary}>
          {CREDENTIAL_SUMMARY.map((col) => (
            <div key={col.heading} className={s.col}>
              <h3 className={s.colHead}>{col.heading}</h3>
              <ul>
                {col.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </div>
      </div>

      <div className={s.band}>
        <div className="frame">
          <DocCarousel docs={HOME_DOCS} label="수상 및 위촉 증빙 자료" />
        </div>
      </div>
    </section>
  );
}

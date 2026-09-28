import { NAV, OFFICE, tel } from '@/lib/site';
import Logo from './Logo';
import s from './Footer.module.css';

export default function Footer() {
  return (
    <footer data-header-dark className={s.footer}>
      <div className={`frame ${s.inner}`}>
        <div className={s.brandCol}>
          <Logo className={s.logo} title={OFFICE.name} />
        </div>

        <dl className={s.info}>
          <div>
            <dt>주소</dt>
            <dd>{OFFICE.address}</dd>
          </div>
          <div>
            <dt>대표번호</dt>
            <dd>
              <a href={tel(OFFICE.tel)}>{OFFICE.tel}</a>
            </dd>
          </div>
          <div>
            <dt>팩스</dt>
            <dd>{OFFICE.fax}</dd>
          </div>
          <div>
            <dt>이메일</dt>
            <dd>
              <a href={`mailto:${OFFICE.email}`}>{OFFICE.email}</a>
            </dd>
          </div>
        </dl>

        <nav className={s.nav} aria-label="하단 메뉴">
          <ul>
            {NAV.map((n) => (
              <li key={n.label}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={`frame ${s.bottom}`}>
        <p>대표변호사 민고은</p>
        <p>© {new Date().getFullYear()} {OFFICE.name}</p>
      </div>
    </footer>
  );
}

import { OFFICE, sms, tel } from '@/lib/site';
import s from './ContactList.module.css';

/** 연락처 — 모바일에서 바로 전화·문자·메일로 연결 */
export default function ContactList() {
  const rows = [
    { label: '대표번호', value: OFFICE.tel, href: tel(OFFICE.tel), action: '전화하기' },
    { label: '직통번호', value: OFFICE.mobile, href: sms(OFFICE.mobile), action: '문자 보내기', note: OFFICE.mobileNote },
    { label: '이메일', value: OFFICE.email, href: `mailto:${OFFICE.email}`, action: '메일 쓰기' },
    { label: '팩스', value: OFFICE.fax },
  ];
  return (
    <dl className={s.list}>
      {rows.map((r) => (
        <div key={r.label} className={s.row}>
          <dt className={s.label}>{r.label}</dt>
          <dd className={s.valueCol}>
            <span className={s.value}>{r.value}</span>
            {r.note && <span className={s.note}>{r.note}</span>}
          </dd>
          <dd className={s.actionCol}>
            {r.href && (
              <a className="text-link" href={r.href}>
                {r.action} <span className="arrow" aria-hidden>→</span>
              </a>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

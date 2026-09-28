import type { Entry } from '@/lib/site';
import s from './Timeline.module.css';

/**
 * 좌측 기간 · 세로 얇은 선 + 각진 노드 · 우측 기관/직함/부가설명.
 * 기간이 하나도 없으면 기간 칼럼을 생략한다.
 */
export default function Timeline({ items }: { items: Entry[] }) {
  const hasPeriod = items.some((i) => i.period);
  return (
    <ol className={s.list} data-period={hasPeriod ? '' : undefined}>
      {items.map((it, i) => (
        <li key={`${it.title}-${i}`} className={s.item}>
          {hasPeriod && <span className={s.period}>{it.period ?? ''}</span>}
          <span className={s.dot} aria-hidden />
          <div className={s.body}>
            {it.org && <span className={s.org}>{it.org}</span>}
            <span className={s.title}>{it.title}</span>
            {it.note && <span className={s.note}>{it.note}</span>}
          </div>
        </li>
      ))}
    </ol>
  );
}

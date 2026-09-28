'use client';

import { useState } from 'react';
import type { Entry } from '@/lib/site';
import Timeline from './Timeline';
import s from './ExpandableTimeline.module.css';

/** 항목이 많을 때 처음엔 일부만, '전체 보기'로 펼침 — 한 화면 정보 밀도 제한 */
export default function ExpandableTimeline({ items, initial = 7 }: { items: Entry[]; initial?: number }) {
  const [open, setOpen] = useState(false);
  const rest = items.length - initial;
  if (rest <= 0) return <Timeline items={items} />;
  return (
    <div>
      <Timeline items={open ? items : items.slice(0, initial)} />
      <button type="button" className={s.more} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span>{open ? '접기' : `전체 보기 (${rest}건 더)`}</span>
        <span className={s.icon} aria-hidden />
      </button>
    </div>
  );
}

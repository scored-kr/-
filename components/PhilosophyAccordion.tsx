'use client';

import { useId, useState } from 'react';
import { PHILOSOPHY } from '@/lib/site';
import s from './Philosophy.module.css';

export default function PhilosophyAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <ol className={s.accordion}>
      {PHILOSOPHY.items.map((item, i) => {
        const isOpen = open === i;
        const hid = `${uid}-h${i}`;
        const pid = `${uid}-p${i}`;
        return (
          <li key={item.title} className={s.item} data-open={isOpen ? '' : undefined}>
            <h3 className={s.headWrap}>
              <button
                id={hid}
                type="button"
                className={s.head}
                aria-expanded={isOpen}
                aria-controls={pid}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className={s.num} aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={s.title}>{item.title}</span>
                <span className={s.icon} aria-hidden />
              </button>
            </h3>
            <div id={pid} role="region" aria-labelledby={hid} className={s.panel}>
              <div className={s.panelInner}>
                <p>{item.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

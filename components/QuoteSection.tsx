'use client';

import { useRef } from 'react';
import { QUOTE } from '@/lib/site';
import { clamp, useScrollFrame } from '@/lib/useScrollFrame';
import s from './QuoteSection.module.css';

export default function QuoteSection() {
  const sec = useRef<HTMLElement>(null);
  const open = useRef<HTMLSpanElement>(null);
  const close = useRef<HTMLSpanElement>(null);

  // 따옴표가 서로 반대 방향으로 최대 ±18px 이동
  useScrollFrame(({ vh }) => {
    const el = sec.current;
    if (!el || !open.current || !close.current) return;
    const r = el.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh + 100) return;
    const p = (vh - r.top) / (vh + r.height); // 0 → 1
    const d = clamp((p - 0.5) * 36, -18, 18);
    open.current.style.transform = `translate3d(${d}px, ${-d * 0.4}px, 0)`;
    close.current.style.transform = `translate3d(${-d}px, ${d * 0.4}px, 0)`;
  });

  return (
    <section id="quote" data-header-dark ref={sec} className={s.section} aria-label="대표변호사의 말">
      <div className={`frame ${s.wrap}`}>
        <span ref={open} className={`${s.mark} ${s.open}`} aria-hidden>
          “
        </span>
        <figure className={s.figure}>
          <blockquote className={s.quote}>
            {QUOTE.lines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </blockquote>
          <figcaption className={s.by}>
            <span className="rule" aria-hidden />
            {QUOTE.by}
          </figcaption>
        </figure>
        <span ref={close} className={`${s.mark} ${s.close}`} aria-hidden>
          ”
        </span>
      </div>
    </section>
  );
}

'use client';

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import s from './Carousel.module.css';

type Props = {
  label: string;
  children: ReactNode;
  /** 'light' = 흰/회색 배경용, 'dark' = 그린 배경용 */
  tone?: 'light' | 'dark';
  className?: string;
  /** 데스크톱에서 한 화면에 보이는 개수 (기본 3) */
  perView?: number;
};

/**
 * 가로 캐러셀
 * - 네이티브 scroll-snap (터치 스와이프는 브라우저 기본 관성 그대로)
 * - 마우스 drag 지원
 * - 넘칠 때만 이전/다음 + 진행선 표시 (항목이 한 화면에 다 들어가면 컨트롤 숨김)
 */
export default function Carousel({ label, children, tone = 'light', className, perView = 3 }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [progress, setProgress] = useState({ start: 0, size: 1 });
  const [edge, setEdge] = useState({ atStart: true, atEnd: false });
  const count = Children.count(children);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setOverflow(max > 4);
    const size = el.clientWidth / el.scrollWidth;
    const start = max > 0 ? (el.scrollLeft / max) * (1 - size) : 0;
    setProgress({ start, size });
    setEdge({ atStart: el.scrollLeft < 4, atEnd: el.scrollLeft > max - 4 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.addEventListener('scroll', measure, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener('scroll', measure);
    };
  }, [measure]);

  // mouse drag (touch/pen은 네이티브 스크롤에 맡긴다)
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let down = false;
    let moved = false;
    let x0 = 0;
    let s0 = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true;
      moved = false;
      x0 = e.clientX;
      s0 = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - x0;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        el.dataset.dragging = '';
        el.setPointerCapture(e.pointerId);
      }
      if (moved) el.scrollLeft = s0 - dx;
    };
    const onUp = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      if (moved) {
        delete el.dataset.dragging;
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
        // 가장 가까운 카드로 스냅
        const card = el.firstElementChild as HTMLElement | null;
        if (card) {
          const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0');
          el.scrollTo({ left: Math.round(el.scrollLeft / step) * step, behavior: 'smooth' });
        }
      }
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('click', onClick, true);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('click', onClick, true);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0');
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div
      className={`${s.root} ${className ?? ''}`}
      data-tone={tone}
      style={{ ['--per' as string]: perView }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div
        ref={track}
        className={s.track}
        tabIndex={overflow ? 0 : -1}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1);
          if (e.key === 'ArrowLeft') go(-1);
        }}
      >
        {Children.map(children, (child, i) => (
          <div className={s.slide} role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${count}`}>
            {child}
          </div>
        ))}
      </div>

      {overflow && (
        <div className={s.controls}>
          <div className={s.bar} aria-hidden>
            <span style={{ left: `${progress.start * 100}%`, width: `${progress.size * 100}%` }} />
          </div>
          <div className={s.buttons}>
            <button type="button" onClick={() => go(-1)} disabled={edge.atStart} aria-label="이전 항목">
              <svg viewBox="0 0 20 10" aria-hidden>
                <path d="M19 5H1M5 1 1 5l4 4" />
              </svg>
            </button>
            <button type="button" onClick={() => go(1)} disabled={edge.atEnd} aria-label="다음 항목">
              <svg viewBox="0 0 20 10" aria-hidden>
                <path d="M1 5h18M15 1l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

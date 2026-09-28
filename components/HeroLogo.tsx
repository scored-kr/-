'use client';

import { useEffect, useRef } from 'react';
import { OFFICE } from '@/lib/site';
import Logo from './Logo';
import { LOGO_DOCK_EVENT } from './Header';

/**
 * Hero 중앙 로고 → 스크롤하면 헤더 중앙 자리로 '도킹'.
 * 세로 위치는 자연 스크롤로 올라가고, 그 사이 크기만 헤더 로고 크기로 줄어든다.
 * 로고 중심이 헤더 중심에 닿는 순간 헤더 로고와 교대(같은 크기·같은 위치라 이음매 없음).
 */
export default function HeroLogo({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.closest('section') as HTMLElement | null;
    if (!el || !section) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let docked = false;
    let raf = 0;

    const frame = () => {
      raf = 0;
      const slot = document.querySelector<HTMLElement>('[data-logo-slot]');
      if (!slot) return;
      const y = window.scrollY;
      const s = slot.getBoundingClientRect();
      const r = el.getBoundingClientRect(); // scale은 중심 기준이라 중심 좌표는 불변
      const cy = r.top + r.height / 2;
      const range = Math.max(1, cy + y - (s.top + s.height / 2));
      const p = Math.min(1, Math.max(0, y / range));

      const target = s.height / el.offsetHeight;
      const scale = reduce ? 1 : 1 + (target - 1) * p;
      const dx = reduce ? 0 : (s.left + s.width / 2 - (r.left + r.width / 2)) * p;
      el.style.transform = `translate3d(${dx}px,0,0) scale(${scale})`;
      section.style.setProperty('--dock', String(p));

      const nowDocked = p >= 1;
      el.style.visibility = nowDocked ? 'hidden' : '';
      if (reduce) el.style.opacity = String(1 - p);
      if (nowDocked !== docked) {
        docked = nowDocked;
        window.dispatchEvent(new CustomEvent(LOGO_DOCK_EVENT, { detail: docked }));
      }
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      window.dispatchEvent(new CustomEvent(LOGO_DOCK_EVENT, { detail: true }));
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      <Logo title={OFFICE.name} />
    </div>
  );
}

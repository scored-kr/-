'use client';

import { useRef, type ReactNode } from 'react';
import { clamp, useScrollFrame } from '@/lib/useScrollFrame';

/** Hero 배경: 스크롤에 따라 아주 느리게 내려가는 parallax (최대 60px). */
export default function HeroBackdrop({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollFrame(({ y, vh }) => {
    const el = ref.current;
    if (!el || y > vh * 1.2) return;
    const t = clamp(y * 0.22, 0, 60);
    el.style.transform = `translate3d(0, ${t}px, 0)`;
  });
  return (
    <div ref={ref} className={className} aria-hidden>
      {children}
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ATTORNEY } from '@/lib/site';
import { clamp, useScrollFrame } from '@/lib/useScrollFrame';
import s from './Attorney.module.css';

/** 인물 사진이 화면에 들어오며 1.06 → 1.0 으로 조용히 자리잡는 settle 모션. */
export default function AttorneyPortrait() {
  const shell = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);

  useScrollFrame(({ vh }) => {
    if (!shell.current || !img.current) return;
    const r = shell.current.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) return;
    const p = clamp((vh - r.top) / (vh * 0.9), 0, 1); // 0: 진입 전, 1: 충분히 들어옴
    const scale = 1.06 - 0.06 * p;
    const y = (1 - p) * 3;
    img.current.style.transform = `translate3d(0, ${y}%, 0) scale(${scale})`;
  });

  return (
    <div ref={shell} className={s.photo}>
      <div ref={img} className={s.photoInner}>
        <Image
          src={ATTORNEY.photo.src}
          alt={`${ATTORNEY.name} 프로필 사진`}
          fill
          sizes="(max-width: 960px) 100vw, 44vw"
          className={s.photoImg}
        />
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';

type Frame = { y: number; vh: number };
type Callback = (f: Frame) => void;

/**
 * 모든 스크롤 모션이 공유하는 단일 rAF 루프.
 * prefers-reduced-motion 에서는 등록 자체를 하지 않는다.
 */
const subscribers = new Set<Callback>();
let ticking = false;
let bound = false;

function run() {
  ticking = false;
  const f = { y: window.scrollY, vh: window.innerHeight };
  subscribers.forEach((cb) => cb(f));
}
function request() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(run);
  }
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useScrollFrame(cb: Callback) {
  const ref = useRef(cb);
  ref.current = cb;

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const fn: Callback = (f) => ref.current(f);
    subscribers.add(fn);
    if (!bound) {
      window.addEventListener('scroll', request, { passive: true });
      window.addEventListener('resize', request);
      bound = true;
    }
    request();
    return () => {
      subscribers.delete(fn);
      if (subscribers.size === 0 && bound) {
        window.removeEventListener('scroll', request);
        window.removeEventListener('resize', request);
        bound = false;
      }
    };
  }, []);
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

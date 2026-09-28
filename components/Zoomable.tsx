'use client';

import Image from 'next/image';
import { useEffect, useRef, type ReactNode } from 'react';
import s from './Zoomable.module.css';

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  children: ReactNode; // 썸네일
  className?: string;
};

/** 증빙/후기 원본 크게 보기. 네이티브 <dialog> — ESC·포커스 관리 기본 제공 */
export default function Zoomable({ src, alt, width, height, children, className }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => document.body.classList.remove('is-locked');
    d.addEventListener('close', onClose);
    return () => d.removeEventListener('close', onClose);
  }, []);

  const open = () => {
    ref.current?.showModal();
    document.body.classList.add('is-locked');
  };

  return (
    <>
      <button type="button" className={`${s.trigger} ${className ?? ''}`} onClick={open} aria-label={`${alt} 크게 보기`}>
        {children}
      </button>
      <dialog
        ref={ref}
        className={s.dialog}
        aria-label={alt}
        onClick={(e) => {
          if (e.target === e.currentTarget) ref.current?.close();
        }}
      >
        <div className={s.body}>
          <Image src={src} alt={alt} width={width} height={height} sizes="92vw" className={s.img} />
        </div>
        <button type="button" className={s.close} onClick={() => ref.current?.close()} aria-label="닫기">
          <i />
          <i />
        </button>
      </dialog>
    </>
  );
}

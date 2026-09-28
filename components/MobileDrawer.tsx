'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { CONTACT_CTA, NAV, OFFICE, sms, tel } from '@/lib/site';
import Logo from './Logo';
import s from './MobileDrawer.module.css';

type Props = { open: boolean; onClose: () => void };

export default function MobileDrawer({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // scroll lock + ESC + focus trap
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    document.body.classList.add('is-locked');
    const first = panel?.querySelector<HTMLElement>('a, button');
    first?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panel) return;
      const els = Array.from(panel.querySelectorAll<HTMLElement>('a, button'));
      const a = els[0];
      const z = els[els.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    };
    const mq = window.matchMedia('(min-width: 961px)');
    const onMq = () => mq.matches && onClose();
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open, onClose]);

  return (
    <div className={s.root} data-open={open ? '' : undefined} inert={!open}>
      <div className={s.backdrop} onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        id="mobile-drawer"
        className={s.panel}
        role="dialog"
        aria-modal="true"
        aria-label="전체 메뉴"
      >
        <div className={s.top}>
          <span className={s.brand}>
            <Logo title={OFFICE.name} />
          </span>
          <button type="button" className={s.close} onClick={onClose} aria-label="메뉴 닫기">
            <i />
            <i />
          </button>
        </div>

        <nav aria-label="모바일 메뉴">
          <ul className={s.list}>
            {NAV.map((item, i) => (
              <li key={item.label} style={{ ['--i' as string]: i }}>
                <a href={item.href} onClick={onClose} aria-current={pathname === item.href ? 'page' : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.bottom}>
          <a className={s.contact} href={CONTACT_CTA.href} onClick={onClose}>
            {CONTACT_CTA.label} <span aria-hidden>→</span>
          </a>
          <dl className={s.meta}>
            <div>
              <dt>대표번호</dt>
              <dd>
                <a href={tel(OFFICE.tel)}>{OFFICE.tel}</a>
              </dd>
            </div>
            <div>
              <dt>직통 문자</dt>
              <dd>
                <a href={sms(OFFICE.mobile)}>{OFFICE.mobile}</a>
              </dd>
            </div>
            <div>
              <dt>주소</dt>
              <dd>{OFFICE.address}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

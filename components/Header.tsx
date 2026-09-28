'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CONTACT_CTA, NAV, OFFICE, tel } from '@/lib/site';
import Logo from './Logo';
import MobileDrawer from './MobileDrawer';
import s from './Header.module.css';

export const LOGO_DOCK_EVENT = 'jinseo:logo-dock';

/**
 * - 헤더 아래가 data-header-dark 섹션이면 투명 + 흰 글자, 아니면 흰 배경 + 얇은 선
 * - 중앙 로고: HOME에서는 Hero 로고가 스크롤로 올라와 이 자리에 '도킹'된 뒤 나타난다.
 *   하위 페이지에서는 처음부터 표시.
 */
export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [onDark, setOnDark] = useState(true);
  const [docked, setDocked] = useState(!isHome);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setDocked(!isHome), [isHome]);

  useEffect(() => {
    const onDock = (e: Event) => setDocked((e as CustomEvent<boolean>).detail);
    window.addEventListener(LOGO_DOCK_EVENT, onDock);
    return () => window.removeEventListener(LOGO_DOCK_EVENT, onDock);
  }, []);

  useEffect(() => {
    const update = () => {
      const y = (headerRef.current?.offsetHeight ?? 64) / 2;
      const dark = Array.from(document.querySelectorAll<HTMLElement>('[data-header-dark]')).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= y && r.bottom > y;
      });
      setOnDark(dark);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    burgerRef.current?.focus({ preventScroll: true });
  }, []);

  const left = NAV.slice(0, 3);
  const right = NAV.slice(3);
  const link = (item: (typeof NAV)[number]) => (
    <li key={item.label}>
      <a href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
        {item.label}
      </a>
    </li>
  );

  return (
    <>
      <header
        ref={headerRef}
        className={s.header}
        data-dark={onDark ? '' : undefined}
        data-docked={docked ? '' : undefined}
      >
        <div className={`frame ${s.inner}`}>
          <nav className={`${s.nav} ${s.navLeft}`} aria-label="주요 메뉴">
            <ul>{left.map(link)}</ul>
          </nav>

          <a className={s.phone} href={tel(OFFICE.tel)} aria-label={`전화 상담 ${OFFICE.tel}`}>
            <svg viewBox="0 0 20 20" aria-hidden>
              <path d="M6.2 2.5 8 6.4 6.3 7.8a10.5 10.5 0 0 0 5.9 5.9l1.4-1.7 3.9 1.8-.6 3.2c-.1.5-.5.8-1 .8C9.1 17.6 2.4 10.9 2.2 4.1c0-.5.3-.9.8-1Z" />
            </svg>
          </a>

          <a className={s.logo} href="/" data-logo-slot aria-label={`${OFFICE.name} 처음으로`}>
            <Logo />
          </a>

          <div className={s.rightGroup}>
            <nav className={s.nav} aria-label="보조 메뉴">
              <ul>{right.map(link)}</ul>
            </nav>
            <a className={`text-link ${s.cta}`} href={CONTACT_CTA.href}>
              {CONTACT_CTA.label} <span className="arrow" aria-hidden>→</span>
            </a>
          </div>

          <button
            ref={burgerRef}
            type="button"
            className={s.burger}
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <i />
            <i />
          </button>
        </div>
      </header>
      <MobileDrawer open={open} onClose={close} />
    </>
  );
}

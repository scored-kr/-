import Image from 'next/image';
import { HERO, OFFICE } from '@/lib/site';
import HeroBackdrop from './HeroBackdrop';
import HeroLogo from './HeroLogo';
import heroImg from '@/public/images/hero/hero-atmosphere.jpg';
import s from './Hero.module.css';

export default function Hero() {
  return (
    <section id="top" data-header-dark className={s.hero} aria-labelledby="hero-title">
      <HeroBackdrop className={s.backdrop}>
        <Image src={heroImg} alt="" fill priority sizes="100vw" placeholder="blur" className={s.bgImg} />
      </HeroBackdrop>
      <div className={s.veil} aria-hidden />

      <div className={`frame ${s.inner}`}>
        <p className={`${s.side} ${s.left}`}>
          {HERO.left.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </p>

        <div className={s.mark}>
          <h1 id="hero-title" className="sr-only">
            {OFFICE.name}
          </h1>
          <HeroLogo className={s.logo} />
          <span className={s.dash} aria-hidden />
          <p className={s.sub}>{HERO.sub}</p>
        </div>

        <p className={`${s.side} ${s.right}`}>
          {HERO.right.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </p>
      </div>
    </section>
  );
}

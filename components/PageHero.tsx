import Image from 'next/image';
import heroImg from '@/public/images/hero/hero-atmosphere.jpg';
import s from './PageHero.module.css';

type Props = { eyebrow: string; title: string; lead?: string; id?: string };

/** 하위 페이지 상단 — Hero와 같은 딥그린 대기 속, 제목은 좌측 정렬로 절제 */
export default function PageHero({ eyebrow, title, lead, id = 'page-title' }: Props) {
  return (
    <section data-header-dark className={s.hero} aria-labelledby={id}>
      <Image src={heroImg} alt="" fill priority sizes="100vw" placeholder="blur" className={s.bg} />
      <div className={`frame ${s.inner}`}>
        <span className={`eyebrow ${s.eyebrow}`}>{eyebrow}</span>
        <h1 id={id} className={s.title}>
          {title}
        </h1>
        {lead && <p className={s.lead}>{lead}</p>}
      </div>
    </section>
  );
}

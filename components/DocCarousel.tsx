import Image from 'next/image';
import type { Doc } from '@/lib/site';
import Carousel from './Carousel';
import Zoomable from './Zoomable';
import s from './DocCarousel.module.css';

type Props = {
  docs: Doc[];
  label: string;
  perView?: number;
  /** 문서는 contain(내용 잘림 금지), 현장 사진은 cover 가능 */
  fit?: 'contain' | 'cover';
  aspect?: string;
  surface?: 'white' | 'paper';
};

export default function DocCarousel({ docs, label, perView = 3, fit = 'contain', aspect = '3 / 4', surface = 'white' }: Props) {
  const sizes = `(max-width: 640px) 80vw, (max-width: 960px) 62vw, ${Math.round(1240 / perView)}px`;
  return (
    <Carousel label={label} perView={perView}>
      {docs.map((d) => (
        <figure key={d.src} className={s.doc}>
          <Zoomable src={d.src} alt={d.title} width={d.w} height={d.h}>
            <span className={s.frame} data-fit={fit} data-surface={surface} style={{ aspectRatio: aspect }}>
              <Image src={d.src} alt="" fill sizes={sizes} className={s.img} />
            </span>
          </Zoomable>
          <figcaption className={s.caption}>
            <span className={s.title}>{d.title}</span>
            {d.meta && <span className={s.meta}>{d.meta}</span>}
          </figcaption>
        </figure>
      ))}
    </Carousel>
  );
}

import { PHILOSOPHY } from '@/lib/site';
import PhilosophyAccordion from './PhilosophyAccordion';
import s from './Philosophy.module.css';

export default function Philosophy() {
  return (
    <section id="philosophy" className={s.section} aria-labelledby="philosophy-title">
      <div className={`frame ${s.grid}`}>
        <div className={s.intro}>
          <span className="eyebrow">Our Philosophy</span>
          <h2 id="philosophy-title" className={s.heading}>
            {PHILOSOPHY.title.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h2>
        </div>
        <PhilosophyAccordion />
      </div>
    </section>
  );
}

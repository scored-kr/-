import type { Metadata } from 'next';
import Image from 'next/image';
import {
  APPOINTMENT_DOCS,
  ATTORNEY,
  AWARD_DOCS,
  AWARDS,
  CAREER,
  EDUCATION,
  LECTURE_PHOTOS,
  LECTURES,
  QUOTE,
  RESEARCH,
  RESEARCH_PHOTOS,
} from '@/lib/site';
import Timeline from '@/components/Timeline';
import ExpandableTimeline from '@/components/ExpandableTimeline';
import DocCarousel from '@/components/DocCarousel';
import Zoomable from '@/components/Zoomable';
import SubpageCta from '@/components/SubpageCta';
import JsonLd from '@/components/JsonLd';
import { attorneyJsonLd } from '@/lib/seo';
import s from './attorney.module.css';

export const metadata: Metadata = {
  title: '대표변호사 민고은',
  description:
    '민고은 변호사 — 이화여대 법학박사(형사법), 한국여성변호사회 인권이사. 성폭력·성희롱·스토킹·교제폭력·가정폭력 피해자 조력. 학력, 경력, 수상, 강의, 학술연구.',
  alternates: { canonical: '/attorney' },
};

const INDEX = [
  { id: 'education', label: '학력' },
  { id: 'career', label: '경력' },
  { id: 'awards', label: '수상' },
  { id: 'lectures', label: '강의' },
  { id: 'research', label: '학술연구' },
];

function Chapter({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} className={s.chapter} aria-labelledby={`${id}-h`}>
      <div className={`frame ${s.chapterGrid}`}>
        <h2 id={`${id}-h`} className={s.chapterLabel}>
          {label}
        </h2>
        <div className={s.chapterBody}>{children}</div>
      </div>
    </section>
  );
}

export default function AttorneyPage() {
  return (
    <main id="main">
      <JsonLd data={attorneyJsonLd()} />

      {/* 인트로 */}
      <section className={s.intro} aria-labelledby="attorney-title">
        <div className={`frame ${s.introGrid}`}>
          <div className={s.photo}>
            <Image
              src={ATTORNEY.photo.src}
              alt={`${ATTORNEY.name} 프로필 사진`}
              fill
              priority
              sizes="(max-width: 960px) 100vw, 46vw"
              className={s.photoImg}
            />
          </div>
          <div className={s.copy}>
            <span className="eyebrow">Attorney</span>
            <h1 id="attorney-title" className={s.name}>
              {ATTORNEY.name}
            </h1>
            <span className={`rule ${s.rule}`} aria-hidden />
            <p className={s.focus}>
              {ATTORNEY.focus.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </p>
            <p className={s.body}>{ATTORNEY.body}</p>

            <figure className={s.pull}>
              <span className={s.pullMark} aria-hidden>
                “
              </span>
              <blockquote>
                {QUOTE.lines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </blockquote>
            </figure>
          </div>
        </div>
      </section>

      {/* 목차 */}
      <nav className={s.index} aria-label="대표변호사 소개 목차">
        <div className="frame">
          <ul>
            {INDEX.map((i) => (
              <li key={i.id}>
                <a href={`#${i.id}`}>{i.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <Chapter id="education" label="학력">
        <Timeline items={EDUCATION} />
      </Chapter>

      <Chapter id="career" label="경력">
        <ExpandableTimeline items={CAREER} initial={7} />
      </Chapter>

      <section className={s.band} aria-labelledby="appointments-h">
        <div className="frame">
          <header className={s.bandHead}>
            <h3 id="appointments-h" className={s.bandTitle}>
              위촉장
            </h3>
            <p className={s.bandNote}>이미지를 누르면 원본을 크게 볼 수 있습니다.</p>
          </header>
          <DocCarousel docs={APPOINTMENT_DOCS} label="위촉장" />
        </div>
      </section>

      <Chapter id="awards" label="수상">
        <Timeline items={AWARDS} />
      </Chapter>

      <section className={s.band} aria-labelledby="award-docs-h">
        <div className="frame">
          <header className={s.bandHead}>
            <h3 id="award-docs-h" className={s.bandTitle}>
              상장
            </h3>
            <p className={s.bandNote}>이미지를 누르면 원본을 크게 볼 수 있습니다.</p>
          </header>
          <DocCarousel docs={AWARD_DOCS} label="상장" />
        </div>
      </section>

      <Chapter id="lectures" label="강의">
        <p className={s.lead}>{LECTURES.lead}</p>
        <Timeline items={LECTURES.items} />
        <div className={s.photos}>
          {LECTURE_PHOTOS.map((p) => (
            <figure key={p.src} className={s.photoItem}>
              <Zoomable src={p.src} alt={p.title} width={p.w} height={p.h}>
                <span className={s.photoFrame}>
                  <Image src={p.src} alt="" fill sizes="(max-width: 960px) 100vw, 380px" className={s.photoCover} />
                </span>
              </Zoomable>
              <figcaption>{p.title}</figcaption>
            </figure>
          ))}
        </div>
      </Chapter>

      <Chapter id="research" label="학술연구">
        {RESEARCH.map((g) => (
          <div key={g.group} className={s.subgroup}>
            <h3 className={s.subLabel}>{g.group}</h3>
            <Timeline items={g.items} />
          </div>
        ))}
        <div className={s.researchMedia}>
          <DocCarousel docs={RESEARCH_PHOTOS} label="학술 활동 자료" perView={2} aspect="4 / 5" surface="paper" />
        </div>
      </Chapter>

      <SubpageCta secondary={{ label: '성공사례 보기', href: '/cases' }} />
    </main>
  );
}

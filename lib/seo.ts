import { ATTORNEY, AWARDS, CAREER, EDUCATION, LINKS, OFFICE, RESEARCH, SITE_URL } from './site';

const ATTORNEY_ID = `${SITE_URL}/attorney#person`;
const OFFICE_ID = `${SITE_URL}/#office`;

const AREAS = ['성폭력', '성희롱', '스토킹', '교제폭력', '가정폭력', '디지털성범죄', '피해자 변호'];

export function officeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': OFFICE_ID,
    name: OFFICE.name,
    alternateName: ['법률사무소 眞書', '진서 법률사무소'],
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    image: `${SITE_URL}/opengraph-image.png`,
    description:
      '민고은 변호사가 상담부터 마무리까지 직접 담당하는 법률사무소. 성폭력, 성희롱, 스토킹, 교제폭력, 가정폭력 피해자를 조력합니다.',
    telephone: '+82-2-562-1260',
    faxNumber: '+82-504-392-1260',
    email: OFFICE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '테헤란로 152, 41층 (역삼동, 강남파이낸스센터)',
      addressLocality: '강남구',
      addressRegion: '서울특별시',
      addressCountry: 'KR',
    },
    areaServed: { '@type': 'Country', name: '대한민국' },
    knowsAbout: AREAS,
    founder: { '@id': ATTORNEY_ID },
    employee: { '@id': ATTORNEY_ID },
    sameAs: [LINKS.blog],
  };
}

export function attorneyJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': ATTORNEY_ID,
    name: '민고은',
    jobTitle: '변호사, 법률사무소 진서 대표변호사',
    url: `${SITE_URL}/attorney`,
    image: `${SITE_URL}${ATTORNEY.photo.src}`,
    worksFor: { '@id': OFFICE_ID, '@type': 'LegalService', name: OFFICE.name },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: '이화여자대학교' },
      { '@type': 'CollegeOrUniversity', name: '경희대학교 법학전문대학원' },
    ],
    hasCredential: EDUCATION.map((e) => ({
      '@type': 'EducationalOccupationalCredential',
      name: `${e.org} ${e.title}`,
    })),
    award: AWARDS.map((a) => `${a.org} ${a.title}${a.period ? ` (${a.period.replace(/\s/g, '')})` : ''}`),
    memberOf: CAREER.filter((c) => c.org && c.org !== OFFICE.name).map((c) => ({
      '@type': 'OrganizationRole',
      roleName: c.title,
      memberOf: { '@type': 'Organization', name: c.org },
    })),
    knowsAbout: AREAS,
    subjectOf: RESEARCH.flatMap((g) =>
      g.items.map((i) => ({ '@type': 'CreativeWork', name: i.title.replace(/[「」]/g, ''), publisher: i.org })),
    ),
    sameAs: [LINKS.blog],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: '홈', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

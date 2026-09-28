/**
 * 사이트 전역 데이터 — 모든 카피·경력·연락처의 단일 출처.
 * 출처: 클라이언트 제공 「홈페이지 구성.hwp」, 「4면 관련.hwp」, 증빙 이미지.
 */

export const OFFICE = {
  name: '법률사무소 진서',
  nameShort: '진서',
  hanja: '眞書',
  attorney: '민고은 변호사',
  address: '서울 강남구 테헤란로 152, 41층 강남파이낸스센터(역삼동)',
  addressNote: '역삼역 2번 출구 바로 앞',
  tel: '02-562-1260',
  mobile: '010-2801-1260',
  mobileNote: '직통번호. 통화가 어려울 수 있어 문자메시지를 먼저 보내주세요.',
  fax: '0504-392-1260',
  email: 'mge0716@naver.com',
} as const;

export const tel = (n: string) => `tel:${n.replace(/-/g, '')}`;
export const sms = (n: string) => `sms:${n.replace(/-/g, '')}`;

export const LINKS = {
  blog: 'https://blog.naver.com/mge0716',
  cases: 'https://blog.naver.com/mge0716/222505510481',
  consultGuide: 'https://blog.naver.com/mge0716/222340860568',
} as const;

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: '소개', href: '/#philosophy' },
  { label: '대표변호사', href: '/attorney' },
  { label: '성공사례', href: '/cases' },
  { label: '상담안내', href: '/consultation' },
  { label: '오시는 길', href: '/location' },
];

export const CONTACT_CTA: NavItem = { label: '상담 문의', href: '/consultation' };

/** 배포 도메인. Vercel 환경변수 NEXT_PUBLIC_SITE_URL 로 설정 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

/* ============================================================ HOME */
export const HERO = {
  left: ['오늘도,', '누군가의', '내일을 지키기 위해.'],
  right: ['지금도,', '여전히,', '사람을 변호합니다.'],
  sub: '한 사람의 곁에서, 끝까지.',
};

export const QUOTE = {
  lines: ['피해자의 시간은 멈추고,', '법원의 시간은 느리게 간다.'],
  by: '민고은 변호사',
};

export const PHILOSOPHY = {
  title: ['직접 챙기고,', '충분히 설명하며,', '솔직하게 소통합니다.'],
  items: [
    {
      title: '상담부터 마무리까지 직접 담당하는 변호사',
      body: '상담, 사건 검토, 서면 작성과 주요 절차의 대응까지 직접 맡아 사건을 세심하게 살핍니다.',
    },
    {
      title: '신속하게 소통하는 변호사',
      body: '의뢰인의 질문에 빠르게 답하고, 사건의 진행 상황과 필요한 정보를 신속하게 안내합니다.',
    },
    {
      title: '이해할 수 있도록 자세히 설명하는 변호사',
      body: '사건의 쟁점과 절차, 대응 방향을 알기 쉽게 설명하여 의뢰인이 충분히 이해하고 판단할 수 있도록 돕습니다.',
    },
    {
      title: '가능성과 한계를 솔직하게 짚는 변호사',
      body: '유리한 점뿐 아니라 불리한 사정과 예상되는 어려움까지 함께 설명하며, 현실적인 대응 방향을 제시합니다.',
    },
    {
      title: '의뢰인의 신뢰와 만족을 중요하게 여기는 변호사',
      body: '결과를 위한 노력은 물론, 의뢰인이 자신의 이야기를 충분히 전하고 존중받는 과정도 중요하게 생각합니다.',
    },
  ],
};

export const ATTORNEY = {
  name: '민고은 변호사',
  focus: ['성폭력, 성희롱, 스토킹, 교제폭력,', '가정폭력 피해자를 조력합니다.'],
  body: '피해자의 목소리가 법률 절차 안에서 충분히 전달될 수 있도록, 사건의 시작부터 주요 절차까지 직접 살핍니다.',
  photo: { src: '/images/attorney/min-goeun.jpg', width: 1075, height: 1434 },
};

/* ============================================================ 경력 데이터 */
export type Entry = { period?: string; org?: string; title: string; note?: string };

export const EDUCATION: Entry[] = [
  {
    period: '2025. 08.',
    org: '이화여자대학교 일반대학원',
    title: '법학박사(형사법) 졸업',
    note: '박사학위 논문: 피해자 변호사의 지위와 권한에 관한 연구',
  },
  { period: '2019. 02.', org: '경희대학교 법학전문대학원', title: '법학전문석사 졸업' },
  { period: '2016. 02.', org: '이화여자대학교', title: '국어교육(주전공) · 심리학(복수전공) 학사 졸업' },
];

export const CAREER: Entry[] = [
  { period: '2019. 04.', title: '제8회 변호사시험 합격' },
  { period: '현재', org: '법률사무소 진서', title: '대표변호사' },
  { period: '2022. 01. – 현재', org: '한국여성변호사회', title: '인권이사' },
  { period: '2024. 02. – 2025. 02.', org: '여성가족부(現 성평등가족부)', title: '정책자문위원회 위원' },
  { period: '2024. 10. – 현재', org: '서울특별시', title: '여성폭력방지위원회 위원' },
  { period: '2022. 12. – 현재', org: '서울지방변호사회', title: '성희롱피해구제센터 운영위원회 위원' },
  { period: '2025. 03. – 현재', org: '서울지방변호사회', title: '교육위원회 위원' },
  { period: '2025. 09. – 현재', org: '대한변호사협회', title: '인권위원회 위원' },
  { period: '2023. 05. – 2025. 04.', org: '대한변호사협회', title: '여성변호사특별위원회 위원' },
  { period: '2025. 07. – 현재', org: '서울여성가족재단', title: '감사자문위원회 위원' },
  { period: '2026. 07. – 현재', org: '서울여성가족재단', title: '성희롱·성폭력 고충심의위원' },
  { period: '2023. 09. – 2024. 12.', org: '스포츠윤리센터', title: '심의위원회 위원' },
  { period: '2024. 01. – 현재', org: 'JTBC', title: '보도자문단 법률부문 자문위원' },
  { period: '2024. 01. – 2024. 12.', org: '국민일보', title: '독자위원회 위원' },
];

export const AWARDS: Entry[] = [
  { period: '2025. 02.', org: '대한변호사협회', title: '청년변호사상', note: '인권 옹호 및 사회정의 실현 기여' },
  { period: '2024. 10.', org: '서울특별시', title: '표창장', note: '스토킹 피해자 지원 및 안심특별시 조성 공로' },
  { period: '2026', org: '한국여성변호사회', title: '감사장' },
  { period: '2023 · 2024', org: '한국여성변호사회', title: '공로상', note: '피해자 인권 보호, 정책 연구 기여' },
];

export const LECTURES = {
  lead: '수사기관 대상 성폭력·스토킹 범죄 관련 직무교육',
  items: [
    {
      period: '2024 – 2026',
      org: '서울경찰청',
      title: '여성청소년수사팀 수사관·스토킹 전담 경찰관 대상 스토킹범죄, 교제폭력 관련 법령 및 판례 중심 교육',
    },
    { period: '2026', org: '경찰수사연수원', title: '신임 여성청소년수사팀 수사관 대상 성폭력, 스토킹 관련 직무교육' },
    {
      period: '2024 – 2025',
      org: '경기북부경찰청',
      title: '여성청소년수사팀 수사관 대상 디지털성범죄 법제, 스토킹 예방 및 2차 피해 방지 교육',
    },
    {
      period: '2022. 05. – 현재',
      org: '한국양성평등교육진흥원',
      title: '위촉 폭력예방 통합교육 전문강사',
      note: '교육부·외교부·헌법재판소 등 정부부처, 공공기관 대상 판례 중심 폭력예방 통합교육',
    },
  ] as Entry[],
};

export const RESEARCH: { group: string; items: Entry[] }[] = [
  {
    group: '학술논문',
    items: [{ period: '2023. 09.', org: '경찰학연구 제23권 제3호', title: '「성폭력처벌법상 주거침입의 구체적 판단기준」' }],
  },
  {
    group: '연구보고서 (공동연구)',
    items: [
      { period: '2023', org: '법원행정처', title: '「반의사불벌죄에 관한 형사정책적 고찰」' },
      { period: '2024', org: '한국여성정책연구원', title: '「디지털 성범죄 판례의 성인지적 분석」' },
      { period: '2024', org: '한국여성의정', title: '「교제폭력 예방과 피해자 보호를 위한 입법 제언」' },
      { period: '2025', org: '성평등가족부', title: '「폭력피해상담사실확인서 공신력 제고를 위한 제도 개선방안」' },
      { period: '2025', org: '한국여성의정', title: '「호주제 폐지 후 20년 간의 주요 판례 10선」' },
    ],
  },
  {
    group: '사례집',
    items: [
      { period: '2024', org: '서울지방변호사회', title: '성희롱 사례집 집필', note: '2020~2022년 판결 및 국가인권위원회 결정례' },
      {
        period: '2024 · 2025',
        org: '경기도여성가족재단',
        title: '젠더폭력 판례집 집필',
        note: '스토킹·교제폭력(2024), 장애 및 경계선 지능 관련 판례(2025)',
      },
    ],
  },
];

/* ============================================================ 이미지 자료 */
export type Doc = { src: string; title: string; meta: string; w: number; h: number };
const A4 = { w: 1127, h: 1600 };

export const AWARD_DOCS: Doc[] = [
  { src: '/images/awards/02-kba-young-lawyer.jpg', title: '대한변호사협회 청년변호사상', meta: '2025. 2.', ...A4 },
  { src: '/images/awards/01-seoul-mayor.jpg', title: '서울특별시장 표창', meta: '2024. 10.', ...A4 },
  { src: '/images/awards/03-kwla-appreciation.jpg', title: '한국여성변호사회 감사장', meta: '2026. 1.', ...A4 },
  { src: '/images/awards/04-kwla-merit-2024.jpg', title: '한국여성변호사회 공로상', meta: '2024. 1.', ...A4 },
  { src: '/images/awards/05-kwla-merit-2023.jpg', title: '한국여성변호사회 공로상', meta: '2023. 1.', ...A4 },
];

export const APPOINTMENT_DOCS: Doc[] = [
  { src: '/images/appointments/01-mogef-policy.jpg', title: '여성가족부 정책자문위원회 위원', meta: '2024. 2.', ...A4 },
  { src: '/images/appointments/02-seoul-violence.jpg', title: '서울특별시 여성폭력방지위원회 위원', meta: '2024. 10.', ...A4 },
  { src: '/images/appointments/03-kba-human-rights.jpg', title: '대한변호사협회 인권위원회 위원', meta: '2025. 9.', ...A4 },
  { src: '/images/appointments/04-sfwf-grievance.jpg', title: '성희롱·성폭력 고충심의위원', meta: '2026. 7.', w: 1132, h: 1600 },
  { src: '/images/appointments/05-kba-women.jpg', title: '대한변호사협회 여성변호사특별위원회 위원', meta: '2023. 5.', ...A4 },
  { src: '/images/appointments/06-sports-ethics.jpg', title: '스포츠윤리센터 심의위원회 위원', meta: '2023. 9.', ...A4 },
  { src: '/images/appointments/07-sba-education.jpg', title: '서울지방변호사회 교육위원회 위원', meta: '2025. 3.', ...A4 },
  { src: '/images/appointments/08-sfwf-audit.jpg', title: '서울여성가족재단 감사자문위원회 위원', meta: '2025. 7.', ...A4 },
  { src: '/images/appointments/10-jtbc.jpg', title: 'JTBC 보도자문단 법률부문', meta: '2025. 1.', w: 1130, h: 1600 },
  { src: '/images/appointments/09-kukmin-readers.jpg', title: '국민일보 독자위원회 위원', meta: '2024. 1.', ...A4 },
];

export const LECTURE_PHOTOS: Doc[] = [
  { src: '/images/lectures/01-seoul-police.jpg', title: '서울경찰청 강의', meta: '', w: 773, h: 580 },
  { src: '/images/lectures/02-mofa.jpg', title: '외교부 강의', meta: '', w: 773, h: 580 },
];

export const RESEARCH_PHOTOS: Doc[] = [
  { src: '/images/research/01-forum.jpg', title: '토론회', meta: '', w: 773, h: 740 },
  { src: '/images/research/02-roundtable.jpg', title: '라운드테이블', meta: '', w: 766, h: 392 },
  { src: '/images/research/03-poster.jpg', title: '대한변협·일본변호사연합회 공동세미나', meta: '2026', w: 1200, h: 1600 },
  { src: '/images/research/04-poster.jpg', title: '한국피해자학회 추계 공동학술대회', meta: '2025', w: 773, h: 1093 },
  { src: '/images/research/05-poster.jpg', title: '제2회 여성·아동 인권보고대회', meta: '2025', w: 773, h: 1093 },
];

/** HOME 경력 요약 (상세는 /attorney) */
export const CREDENTIAL_SUMMARY = [
  {
    heading: '학력',
    items: ['이화여자대학교 일반대학원 법학박사(형사법)', '경희대학교 법학전문대학원 법학전문석사'],
  },
  {
    heading: '주요 경력',
    items: ['한국여성변호사회 인권이사', '서울특별시 여성폭력방지위원회 위원', '대한변호사협회 인권위원회 위원'],
  },
  {
    heading: '수상',
    items: ['대한변호사협회 청년변호사상 (2025)', '서울특별시장 표창 (2024)', '한국여성변호사회 감사장 · 공로상'],
  },
];

/** HOME 캐러셀: 수상 전체 + 주요 위촉 */
export const HOME_DOCS: Doc[] = [...AWARD_DOCS, ...APPOINTMENT_DOCS.slice(0, 3)];

/* ============================================================ 성공사례 · 상담 */
export const CASES = {
  title: ['용기가 다시 일상이 되는 순간,', '진서가 함께하겠습니다.'],
  body: '주요 수행사례와 의뢰인 후기는 블로그에서 자세히 확인하실 수 있습니다.',
  cta: '수행사례 · 후기 보러 가기',
  reviews: [
    { src: '/images/reviews/review-1.jpg', alt: '의뢰인이 보내온 감사 메시지 1', w: 720, h: 540 },
    { src: '/images/reviews/review-2.jpg', alt: '의뢰인이 보내온 감사 메시지 2', w: 720, h: 366 },
    { src: '/images/reviews/review-3.jpg', alt: '의뢰인이 보내온 감사 메시지 3', w: 720, h: 300 },
  ],
};

export const CONSULT = {
  body: '상담신청 절차는 블로그에서 확인하실 수 있습니다.',
  cta: '상담신청 절차 보러 가기',
};

export const LOCATION = {
  mapQuery: '서울 강남구 테헤란로 152 강남파이낸스센터',
  naverMap: 'https://map.naver.com/p/search/' + encodeURIComponent('강남파이낸스센터'),
  kakaoMap: 'https://map.kakao.com/?q=' + encodeURIComponent('강남파이낸스센터'),
};

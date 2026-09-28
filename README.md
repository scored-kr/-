# 법률사무소 진서 홈페이지

Next.js 15 App Router · CSS Modules + 전역 디자인 토큰 (Tailwind 미사용)

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## 페이지
| 경로 | 내용 |
|---|---|
| `/` | Hero(로고 → 헤더 도킹), 인용, 변호 철학 아코디언, 대표변호사, 경력 요약 + 증빙 캐러셀, 성공사례·상담 CTA, 오시는 길 |
| `/attorney` | 인트로, 목차(고정), 학력·경력(전체 보기) 타임라인, 위촉장·상장 캐러셀, 강의, 학술연구 |
| `/cases` | 의뢰인 후기 + 블로그 수행사례 연결 |
| `/consultation` | 블로그 상담절차 연결 + 연락처(전화·문자·메일 바로 연결) |
| `/location` | 지도, 네이버·카카오 지도 링크, 주소, 연락처 |

## 콘텐츠 수정
모든 문구·경력·연락처·이미지 목록은 `lib/site.ts` 한 파일. 이미지는 `public/images/*` (웹용 1600px 변환본, 원본은 별도 보관).

## 배포 (Vercel) 환경변수
- `NEXT_PUBLIC_SITE_URL` — 실제 도메인 (sitemap, canonical, OG, JSON-LD에 사용) **필수**
- `NEXT_PUBLIC_GOOGLE_VERIFICATION` — 구글 서치콘솔 소유확인 코드
- `NEXT_PUBLIC_NAVER_VERIFICATION` — 네이버 서치어드바이저 소유확인 코드

## 검색 · AI 추천 대응
- 페이지별 제목/설명/canonical 분리
- JSON-LD: LegalService(사무소), Person(대표변호사: 학력·수상·위원 활동·연구), BreadcrumbList
- `/sitemap.xml`, `/robots.txt` (Googlebot, Yeti(네이버), GPTBot, ClaudeBot, PerplexityBot 등 허용)
- `/llms.txt` — AI 답변엔진용 사무소 요약 (lib/site.ts에서 자동 생성)
- OG 이미지·파비콘: 공식 로고(.ai)에서 생성

배포 후 할 일: 서치콘솔·서치어드바이저 등록 → 소유확인 코드 환경변수 입력 → sitemap 제출.

## 폰트
- 명조: 조선일보명조체(단일 400), woff2 셀프호스팅
- 한자·곡선 따옴표 등 조선일보명조에 없는 글리프는 Noto Serif KR로 자동 fallback
- 본문: Pretendard

## 교체 대기
- `public/images/hero/hero-atmosphere.jpg` — 장식용 임시 배경 (`docs/source/hero-atmosphere.py`)

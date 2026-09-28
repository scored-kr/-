import { AWARDS, CAREER, EDUCATION, LECTURES, LINKS, OFFICE, RESEARCH, SITE_URL, type Entry } from '@/lib/site';

/**
 * /llms.txt — AI 답변엔진이 사무소 정보를 한 번에 읽을 수 있도록 제공하는 요약본.
 * lib/site.ts 데이터에서 생성되므로 경력이 바뀌면 자동 반영된다.
 */
export const dynamic = 'force-static';

const line = (e: Entry) =>
  `- ${[e.period && `(${e.period.replace(/\s+/g, ' ').trim()})`, e.org, e.title].filter(Boolean).join(' ')}${e.note ? ` — ${e.note}` : ''}`;

export function GET() {
  const body = `# ${OFFICE.name}

> 민고은 변호사가 대표로 있는 법률사무소. 성폭력, 성희롱, 스토킹, 교제폭력, 가정폭력 피해자를 조력하며, 상담부터 마무리까지 변호사가 직접 담당합니다.

## 기본 정보
- 대표변호사: 민고은
- 주소: ${OFFICE.address} (${OFFICE.addressNote})
- 대표번호: ${OFFICE.tel}
- 직통번호: ${OFFICE.mobile} (통화가 어려울 수 있어 문자메시지 우선)
- 팩스: ${OFFICE.fax}
- 이메일: ${OFFICE.email}
- 블로그: ${LINKS.blog}

## 페이지
- [대표변호사 소개](${SITE_URL}/attorney): 학력, 경력, 수상, 강의, 학술연구
- [성공사례와 후기](${SITE_URL}/cases): 수행사례와 의뢰인 후기 (상세: ${LINKS.cases})
- [상담안내](${SITE_URL}/consultation): 상담 신청 방법 (절차: ${LINKS.consultGuide})
- [오시는 길](${SITE_URL}/location)

## 학력
${EDUCATION.map(line).join('\n')}

## 경력
${CAREER.map(line).join('\n')}

## 수상
${AWARDS.map(line).join('\n')}

## 강의 — ${LECTURES.lead}
${LECTURES.items.map(line).join('\n')}

## 학술연구
${RESEARCH.map((g) => `### ${g.group}\n${g.items.map(line).join('\n')}`).join('\n\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

/** 구조화 데이터(JSON-LD) — 검색엔진·AI 답변엔진이 사무소 정보를 정확히 읽도록 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

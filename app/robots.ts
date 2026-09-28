import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/** 검색엔진 + AI 답변엔진(ChatGPT, Claude, Perplexity 등) 수집 모두 허용 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: ['Yeti', 'Googlebot', 'Bingbot'], allow: '/' },
      { userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot'], allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

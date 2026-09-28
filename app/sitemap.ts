import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { path: '/', priority: 1 },
    { path: '/attorney', priority: 0.9 },
    { path: '/cases', priority: 0.7 },
    { path: '/consultation', priority: 0.8 },
    { path: '/location', priority: 0.6 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority,
  }));
}

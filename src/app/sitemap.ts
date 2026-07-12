import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { cms } from '@/lib/cms';

const BASE = 'https://ettoryx.com';

const PRIORITY: Record<string, number> = {
  '': 1.0,
  '/services': 0.9,
  '/portfolio': 0.85,
  '/about': 0.8,
  '/products': 0.8,
  '/contacts': 0.75,
  '/team': 0.7,
  '/privacy-policy': 0.3,
};

function getPriority(path: string): number {
  if (PRIORITY[path] !== undefined) return PRIORITY[path];
  if (path.startsWith('/services/')) return 0.85;
  if (path.startsWith('/portfolio/')) return 0.8;
  return 0.6;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '',
    '/about',
    '/services',
    '/products',
    '/portfolio',
    '/team',
    '/contacts',
    '/privacy-policy',
  ];
  const dynamicPaths = [
    ...cms.getServiceSlugs().map((s) => `/services/${s}`),
    ...cms.getCaseStudySlugs().map((s) => `/portfolio/${s}`),
  ];
  const all = [...staticPaths, ...dynamicPaths];

  return routing.locales.flatMap((locale) =>
    all.map((path) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: (path === '' ||
      path === '/services' ||
      path === '/portfolio'
        ? 'weekly'
        : 'monthly') as 'weekly' | 'monthly',
      priority: getPriority(path),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${BASE}/${l}${path}`]),
        ),
      },
    })),
  );
}

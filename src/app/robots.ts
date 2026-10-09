import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

// Production is indexable. Preview/staging deployments stay out of search so the demo
// never competes with the real domain.
export default function robots(): MetadataRoute.Robots {
  const preview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';
  if (preview || process.env.NOINDEX === '1') return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { indexable } from '@/lib/indexing';

// Indexing is opt-in (ALLOW_INDEXING=1) so demo/preview deployments stay out of search.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (!indexable) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

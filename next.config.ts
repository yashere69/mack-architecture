import type { NextConfig } from 'next';
import { projects } from './src/content/projects';

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 82],
    deviceSizes: [480, 640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [96, 160, 240, 320, 400],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async redirects() {
    // Keep links from the previous site (Instagram bio, shared URLs) alive.
    return [
      { source: '/about', destination: '/studio', permanent: true },
      { source: '/products', destination: '/objects', permanent: true },
      { source: '/products/:slug', destination: '/objects/:slug', permanent: true },
      ...projects
        .filter((p) => p.legacySlug !== p.slug)
        .map((p) => ({ source: `/projects/${p.legacySlug}`, destination: `/projects/${p.slug}`, permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: '/media/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default config;

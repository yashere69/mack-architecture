import type { NextConfig } from 'next';

// Fully static export: `out/` can be dropped onto Netlify (or any static host) as-is.
// - Responsive image variants are generated after the build (scripts/build-variants.mjs)
//   and addressed by src/lib/image-loader.ts.
// - Legacy-URL redirects and cache/security headers live in public/_redirects and
//   public/_headers (Netlify format).
// - The contact form uses Netlify Forms (public/__forms.html), with an email fallback.
const config: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    deviceSizes: [480, 828, 1280, 1920, 2400],
    imageSizes: [96, 240],
    qualities: [70, 82],
  },
};

export default config;

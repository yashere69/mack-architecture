// Maps next/image requests to pre-generated variants: /media/<key>.webp → /media/w/<key>-<width>.webp
// Variants are written by scripts/build-variants.mjs after `next build`. The widest size
// (2400) is the graded master itself. In development the master is served directly.
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith('/media/') || process.env.NODE_ENV === 'development' || width >= 2400) return src;
  return src.replace(/^\/media\//, '/media/w/').replace(/\.webp$/, `-${width}.webp`);
}

import { getImageProps } from 'next/image';
import type { Img } from '@/content/projects';

// Sizes/quality of the destination hero (projects/[slug] and objects/[slug]).
export const HERO_SIZES = '(min-width: 64rem) 84vw, 100vw';
export const HERO_QUALITY = 82;

const done = new Set<string>();

// Preload exactly the candidate the destination hero will request, so a morph
// lands on a sharp image rather than its blur placeholder.
export function preloadHero(img: Img) {
  if (typeof document === 'undefined' || done.has(img.src)) return;
  done.add(img.src);
  const { props } = getImageProps({ src: img.src, alt: '', width: img.w, height: img.h, sizes: HERO_SIZES, quality: HERO_QUALITY });
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  if (props.srcSet) link.setAttribute('imagesrcset', props.srcSet);
  link.setAttribute('imagesizes', HERO_SIZES);
  link.href = props.src;
  document.head.appendChild(link);
}

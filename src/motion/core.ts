'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type Lenis from 'lenis';

let registered = false;

export function motion() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    gsap.defaults({ ease: 'expo.out', duration: 1.1 });
    registered = true;
  }
  return { gsap, ScrollTrigger, SplitText };
}

/** Media conditions shared by every scene. */
export const MQ = {
  /** Full cinematic choreography: pinned scenes, scroll-linked frames. */
  cinema: '(min-width: 64rem) and (prefers-reduced-motion: no-preference)',
  /** Lighter touch for tablets/phones: reveals and gentle parallax, no pinning. */
  light: '(max-width: 63.99rem) and (prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
} as const;

// ---- Smooth scroll handle (set by <SmoothScroll/>) ----
let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenis = l;
};
export const getLenis = () => lenis;

/** Freeze/unfreeze page scrolling (menus, viewer) — works with or without Lenis. */
export function lockScroll(lock: boolean) {
  document.documentElement.style.overflow = lock ? 'hidden' : '';
  if (lock) lenis?.stop();
  else lenis?.start();
}

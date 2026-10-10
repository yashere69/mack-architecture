'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { motion, setLenis, getLenis } from '@/motion/core';

// Weighted, inertial scrolling (Lenis) driven by GSAP's ticker so ScrollTrigger and
// the scroll position share one clock. Touch keeps native momentum; reduced-motion
// users get plain native scrolling.
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const { gsap, ScrollTrigger } = motion();
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
    });
    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // New page: Next has already set the scroll position (top, or restored on back).
  // Re-sync Lenis's internal target so it never animates back to the old page's offset.
  useEffect(() => {
    const l = getLenis();
    if (!l) return;
    l.resize();
    l.scrollTo(window.scrollY, { immediate: true, force: true });
  }, [pathname]);

  return null;
}

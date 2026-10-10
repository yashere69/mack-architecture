'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { motion, MQ } from '@/motion/core';

// Scroll choreography, declared in markup and directed here.
// Server components only add data attributes; this wires them up per route with
// GSAP ScrollTrigger and tears everything down on navigation.
//
//   data-m="parallax"  photograph drifts inside its frame        data-speed (% , default 7)
//   data-m="cover"     above-the-fold hero sinks as the page lifts data-speed (% , default 10)
//   data-m="doors"     frame opens from the centre (symmetry)     — scrubbed
//   data-m="blind"     frame rises from the bottom edge           — scrubbed
//   data-m="lower"     frame lowers from the top edge             — scrubbed
//   data-m="expand"    inset frame widens to its full width       — scrubbed
//   data-m="dolly"     camera moves slowly into the image         — scrubbed
//   data-m="depth"     element floats on its own plane            data-depth (default 1)
//   data-m="fade"      drawing settles onto the sheet             — once
//   data-m="lines"     text rises line by line out of masks       — once
//   data-m="read"      lines brighten as they are read            — scrubbed
//   data-m="fadeout"   text recedes as it leaves the top          — scrubbed
//   data-m="next"      threshold image grows toward the visitor   — scrubbed
//   data-m="track"     display word tightens its letterspacing    — scrubbed
//   data-bg="#hex"     page ground shifts while the section is in view
//
// Several kinds can be combined: data-m="blind parallax".
export function MotionDirector() {
  const pathname = usePathname();

  useEffect(() => {
    const { gsap, ScrollTrigger, SplitText } = motion();
    const mm = gsap.matchMedia();
    const html = document.documentElement;
    const PAPER = '#efece6';

    const frame = requestAnimationFrame(() => {
      mm.add({ cinema: MQ.cinema, light: MQ.light }, (ctx) => {
        const cinema = !!ctx.conditions?.cinema;
        const k = cinema ? 1 : 0.55; // gentler amplitudes on small screens
        const scrub = cinema ? 0.6 : true;

        gsap.utils.toArray<HTMLElement>('[data-m]').forEach((el) => {
          const kinds = (el.dataset.m ?? '').split(/\s+/);
          const img = el.querySelector<HTMLElement>(':scope > img');
          const st = (vars: ScrollTrigger.Vars) => ({ trigger: el, scrub, ...vars });

          for (const kind of kinds) {
            switch (kind) {
              case 'parallax': {
                if (!img) break;
                const sp = Number(el.dataset.speed ?? 7) * k;
                gsap.set(img, { scale: 1 + (sp * 2.2) / 100 });
                gsap.fromTo(img, { yPercent: -sp }, { yPercent: sp, ease: 'none', scrollTrigger: st({ start: 'top bottom', end: 'bottom top', scrub: true }) });
                break;
              }
              case 'cover': {
                // Starts from the photograph's resting state, so nothing moves on load.
                if (!img) break;
                const sp = Number(el.dataset.speed ?? 10) * k;
                gsap.fromTo(img, { yPercent: 0, scale: 1 }, {
                  yPercent: sp, scale: 1 + sp / 100, transformOrigin: '50% 100%', ease: 'none',
                  scrollTrigger: { trigger: el, start: 'clamp(top bottom)', end: 'bottom top', scrub: true },
                });
                break;
              }
              case 'doors':
              case 'blind':
              case 'lower':
              case 'expand': {
                const from = {
                  doors: 'inset(0% 50% 0% 50%)',
                  blind: 'inset(100% 0% 0% 0%)',
                  lower: 'inset(0% 0% 100% 0%)',
                  expand: 'inset(7% 18% 7% 18%)',
                }[kind];
                if (cinema) {
                  gsap.fromTo(el, { clipPath: from }, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    ease: kind === 'doors' ? 'power2.inOut' : 'power3.out',
                    scrollTrigger: st({ start: 'top 92%', end: kind === 'expand' ? 'center 55%' : 'top 38%' }),
                  });
                  if (img && !kinds.includes('parallax'))
                    gsap.fromTo(img, { scale: 1.22 }, { scale: 1.02, ease: 'none', scrollTrigger: st({ start: 'top 92%', end: 'bottom 20%' }) });
                } else {
                  gsap.fromTo(el, { clipPath: from }, {
                    clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out',
                    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
                  });
                }
                break;
              }
              case 'dolly': {
                if (!img) break;
                gsap.fromTo(img, { scale: 1.02 }, { scale: 1 + 0.16 * k, ease: 'none', scrollTrigger: st({ start: 'top bottom', end: 'bottom top', scrub: true }) });
                break;
              }
              case 'depth': {
                const d = Number(el.dataset.depth ?? 1) * k;
                gsap.fromTo(el, { y: 90 * d }, { y: -90 * d, ease: 'none', scrollTrigger: st({ start: 'clamp(top bottom)', end: 'bottom top', scrub: true }) });
                break;
              }
              case 'fade': {
                gsap.from(el, { opacity: 0, y: 40, scale: 0.97, duration: 1.4, scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
                break;
              }
              case 'lines': {
                SplitText.create(el, {
                  type: 'lines',
                  mask: 'lines',
                  linesClass: 'm-line',
                  autoSplit: true,
                  onSplit: (self) =>
                    gsap.from(self.lines, {
                      yPercent: 110,
                      duration: 1.25,
                      stagger: 0.09,
                      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
                    }),
                });
                break;
              }
              case 'read': {
                SplitText.create(el, {
                  type: 'lines',
                  linesClass: 'm-line',
                  autoSplit: true,
                  onSplit: (self) =>
                    gsap.fromTo(self.lines, { opacity: 0.18 }, {
                      opacity: 1, ease: 'none', stagger: 0.4,
                      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 52%', scrub: true },
                    }),
                });
                break;
              }
              case 'fadeout': {
                if (!cinema) break;
                gsap.to(el, { opacity: 0.12, y: -70, ease: 'none', scrollTrigger: { trigger: el, start: 'clamp(top 22%)', end: 'clamp(bottom top)', scrub: true } });
                break;
              }
              case 'next': {
                const media = el.querySelector<HTMLElement>('[data-next-media]');
                const title = el.querySelector<HTMLElement>('[data-next-title]');
                if (media) gsap.fromTo(media, { scale: 0.84, transformOrigin: '100% 100%' }, { scale: 1, ease: 'none', scrollTrigger: st({ start: 'top bottom', end: 'top 35%', scrub: true }) });
                if (title && cinema) gsap.fromTo(title, { xPercent: 12 }, { xPercent: 0, ease: 'none', scrollTrigger: st({ start: 'top bottom', end: 'top 35%', scrub: true }) });
                break;
              }
              case 'track': {
                gsap.fromTo(el, { letterSpacing: '0.34em' }, { letterSpacing: '0.04em', ease: 'none', scrollTrigger: st({ start: 'top 98%', end: 'top 50%', scrub: true }) });
                break;
              }
            }
          }
        });

        // Ground colour shifts: the page itself changes tone while a section is in view.
        gsap.utils.toArray<HTMLElement>('[data-bg]').forEach((el) => {
          const color = el.dataset.bg!;
          ScrollTrigger.create({
            trigger: el,
            start: 'top 62%',
            end: 'bottom 38%',
            onToggle: (self) => gsap.to(html, { '--page-bg': self.isActive ? color : PAPER, duration: 0.9, ease: 'power2.out', overwrite: true }),
          });
        });

        return () => gsap.set(html, { '--page-bg': PAPER });
      });

      ScrollTrigger.refresh();
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      document.documentElement.classList.add('motion-ready');
    });

    return () => {
      cancelAnimationFrame(frame);
      mm.revert();
    };
  }, [pathname]);

  return null;
}

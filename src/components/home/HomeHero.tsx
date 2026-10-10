'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Img } from '@/content/projects';
import { MorphLink } from '@/components/MorphLink';
import { motion, MQ } from '@/motion/core';
import s from './HomeHero.module.css';

export type Discipline = {
  scope: 'Architecture' | 'Interiors' | 'Objects';
  count: number;
  /** Where the word leads: the filtered index. */
  href: string;
  /** The single image that stands for this discipline. */
  work: { title: string; place?: string; href: string; img: Img; focus?: string; heroImg?: Img };
};

// The studio's own tagline is the first viewport: three words that are also the
// index of the practice. Hover or focus a word and the aperture shows its work.
export function HomeHero({ disciplines }: { disciplines: Discipline[] }) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));

  const show = (n: number) => {
    if (n === active) return;
    setPrev(active);
    setActive(n);
    setSeen((s0) => (s0.has(n) ? s0 : new Set(s0).add(n)));
  };
  // Warm the other two images once the visitor shows intent.
  const warm = () => setSeen((s0) => (s0.size === disciplines.length ? s0 : new Set(disciplines.map((_, k) => k))));

  const cur = disciplines[active].work;

  const track = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const aperture = useRef<HTMLAnchorElement>(null);

  // Scroll choreography. Desktop: the hero holds on a sticky track while the framed
  // photograph opens to the full viewport and the tagline lifts away; the statement
  // then rises over it. Smaller screens: a gentle parallax, no pinning.
  useEffect(() => {
    const { gsap } = motion();
    const mm = gsap.matchMedia();
    mm.add(MQ.cinema, () => {
      const ap = aperture.current!;
      const el = hero.current!;
      // Untransformed geometry of the frame relative to the (stuck) hero: the stage is
      // never transformed, so its rect plus the frame's offsets locate the frame exactly.
      const stage = ap.parentElement!;
      const geo = () => {
        const hr = el.getBoundingClientRect();
        const sr = stage.getBoundingClientRect();
        const w = ap.offsetWidth;
        const h = ap.offsetHeight;
        const left = sr.left - hr.left + ap.offsetLeft;
        const top = sr.top - hr.top + ap.offsetTop;
        const vw = el.clientWidth;
        const vh = window.innerHeight;
        return {
          scale: Math.max(vw / w, vh / h) * 1.002,
          x: vw / 2 - (left + w / 2),
          y: vh / 2 - (top + h / 2),
        };
      };
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: track.current, start: 'top top', end: 'bottom bottom', scrub: 0.7, invalidateOnRefresh: true },
      });
      // Phase A — the frame opens (≈ first 40% of the track)
      tl.to(ap, { x: () => geo().x, y: () => geo().y, scale: () => geo().scale, ease: 'power2.inOut', duration: 0.4 }, 0)
        .to(ap.querySelectorAll('img'), { yPercent: -3, scale: 1.04, duration: 0.4 }, 0)
        .to(el.querySelectorAll('[data-hero-word]'), { yPercent: -60, opacity: 0, stagger: 0.03, duration: 0.22, ease: 'power2.in' }, 0.02)
        .to(el.querySelectorAll('[data-hero-fade]'), { y: -30, opacity: 0, duration: 0.16, ease: 'power2.in' }, 0)
        // Phase B — the statement rises over the open frame; the photograph settles back
        .to(ap.querySelector('[data-veil]'), { opacity: 0.42, duration: 0.6 }, 0.4)
        .to(ap.querySelectorAll('img'), { yPercent: -7, scale: 1.1, duration: 0.6 }, 0.4);
    });
    mm.add(MQ.light, () => {
      const el = hero.current!;
      gsap.to(aperture.current!.querySelectorAll('img'), {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(el.querySelectorAll('[data-hero-word]'), {
        y: -24, opacity: 0.25, ease: 'none', stagger: 0.05,
        scrollTrigger: { trigger: el, start: 'top top', end: '45% top', scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div className={s.track} ref={track}>
    <section ref={hero} className={`grid ${s.hero}`} aria-labelledby="hero-title" onPointerEnter={warm}>
      <div className={s.intro} data-reveal="fade" data-hero-fade style={{ '--delay': '0.5s' } as CSSProperties}>
        <p className={s.lead}>
          A studio for architecture, interiors and objects in Andheri&nbsp;West, Mumbai.
        </p>
      </div>

      <h1 className={s.words} id="hero-title" data-reveal="rise">
        <span className="sr-only">MACK &amp; Co Architects — </span>
        {disciplines.map((d, k) => (
          <Link
            key={d.scope}
            href={d.href}
            className={s.word}
            data-hero-word
            data-active={k === active || undefined}
            onMouseEnter={() => show(k)}
            onFocus={() => show(k)}
          >
            <span className="mask" style={{ '--i': k } as CSSProperties}>
              <span>{d.scope}.</span>
            </span>
            <sup className={s.sup} aria-label={`${d.count} ${d.count === 1 ? 'work' : 'works'}`}>
              {String(d.count).padStart(2, '0')}
            </sup>
          </Link>
        ))}
      </h1>

      <figure className={s.stage}>
        <MorphLink ref={aperture} href={cur.href} className={s.aperture} hero={cur.heroImg ?? cur.img} aria-label={`${cur.title}${cur.place ? `, ${cur.place}` : ''}`}>
          {disciplines.map((d, k) =>
            seen.has(k) ? (
              <div
                key={d.scope}
                className={s.slide}
                data-morph={k === active ? '' : undefined}
                data-state={k === active ? 'active' : k === prev ? 'prev' : 'idle'}
                style={{ '--ph': d.work.img.color, '--focus': d.work.focus ?? '50% 50%' } as CSSProperties}
              >
                <Image
                  src={d.work.img.src}
                  alt=""
                  fill
                  sizes="(min-width: 64rem) 64vw, 100vw"
                  quality={82}
                  placeholder="blur"
                  blurDataURL={d.work.img.blur}
                  loading={k === 0 ? 'eager' : 'lazy'}
                  fetchPriority={k === 0 ? 'high' : 'low'}
                  draggable={false}
                />
              </div>
            ) : null,
          )}
          <span className={s.veil} data-veil aria-hidden="true" />
        </MorphLink>
        <figcaption className={s.caption} data-hero-fade>
          <span key={cur.href} className={s.captionIn}>
            <span className="label num">{disciplines[active].scope}</span>
            <MorphLink href={cur.href} className={`serif ${s.title}`} tabIndex={-1}>
              {cur.title}
            </MorphLink>
            {cur.place ? <span className={`small ${s.place}`}>{cur.place}</span> : null}
          </span>
        </figcaption>
      </figure>
    </section>
    </div>
  );
}

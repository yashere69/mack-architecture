'use client';

import Image from 'next/image';
import { useEffect, useRef, type CSSProperties } from 'react';
import type { Img } from '@/content/projects';
import { MorphLink } from '@/components/MorphLink';
import { Rise } from '@/components/Rise';
import { motion, MQ } from '@/motion/core';
import s from './Walkthrough.module.css';

export type Step = { img: Img; label: string };

type Props = {
  no: string;
  scope: string;
  title: string;
  place?: string;
  imagery: string;
  href: string;
  hero: Img;
  steps: Step[];
};

const pad = (n: number) => String(n).padStart(2, '0');

// A walk through one building. On desktop the stage holds still while each view rises
// over the last — approach, terrace, court, hall, drawing — so scrolling reads as moving
// through the architecture. Elsewhere it is a calm vertical sequence.
export function Walkthrough({ no, scope, title, place, imagery, href, hero, steps }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = motion();
    const mm = gsap.matchMedia();
    mm.add(MQ.cinema, () => {
      const el = root.current!;
      const frames = gsap.utils.toArray<HTMLElement>('[data-frame]', el);
      const items = gsap.utils.toArray<HTMLElement>('[data-step]', el);
      const bar = el.querySelector<HTMLElement>('[data-bar]');
      const n = frames.length;
      let current = -1;
      const setStep = (i: number) => {
        if (i === current) return;
        current = i;
        items.forEach((li, k) => li.toggleAttribute('data-active', k === i));
      };
      setStep(0);
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el.querySelector('[data-track]'),
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => setStep(Math.min(n - 1, Math.round(self.progress * (n - 1) + 0.18))),
        },
      });
      frames.forEach((f, i) => {
        const img = f.querySelector('img');
        if (i === 0) {
          tl.fromTo(img, { scale: 1.12 }, { scale: 1.02, duration: 1 }, 0);
          return;
        }
        const prevImg = frames[i - 1].querySelector('img');
        const prevVeil = frames[i - 1].querySelector('[data-veil]');
        tl.fromTo(f, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' }, i - 1)
          .fromTo(img, { scale: 1.18, yPercent: 6 }, { scale: 1.02, yPercent: 0, duration: 1.1 }, i - 1)
          .to(prevImg, { scale: 1.1, yPercent: -4, duration: 1 }, i - 1)
          .to(prevVeil, { opacity: 0.5, duration: 1 }, i - 1);
      });
      if (bar) tl.fromTo(bar, { scaleX: 1 / n }, { scaleX: 1, duration: n - 1 }, 0);
    });
    return () => mm.revert();
  }, []);

  return (
    <div className={s.walk} ref={root}>
      <div className={s.track} data-track style={{ '--steps': steps.length } as CSSProperties}>
        <div className={`grid ${s.stage}`}>
          <div className={s.info}>
            <p className="label">
              <span className="num">No. {no}</span>
              <span className={s.dot} aria-hidden="true" />
              <span className="label--muted">{scope}</span>
            </p>
            <h3 className={`d2 ${s.title}`}>
              <MorphLink href={href} hero={hero} morph={`[data-walk-hero]`}>
                <Rise text={title} />
              </MorphLink>
            </h3>
            <p className={`small ${s.meta}`}>
              {place ? <span>{place}</span> : null}
              <span>{imagery}</span>
            </p>
            <ol className={s.steps} aria-label={`Views of ${title}`}>
              {steps.map((st, i) => (
                <li key={st.img.key} data-step className={s.step}>
                  <span className="label num">{pad(i + 1)}</span>
                  <span className={s.stepLabel}>{st.label}</span>
                </li>
              ))}
            </ol>
            <span className={s.progress} aria-hidden="true">
              <span data-bar />
            </span>
            <MorphLink href={href} hero={hero} morph={`[data-walk-hero]`} className={`label link link--static ${s.view}`}>
              Walk through the project<span className="sr-only">: {title}</span>
            </MorphLink>
          </div>

          <div className={s.frames}>
            {steps.map((st, i) => (
              <figure key={st.img.key} className={s.frame} data-frame data-drawing={st.img.kind === 'drawing' || undefined} style={{ '--ph': st.img.color, zIndex: i + 1 } as CSSProperties}>
                <div className={s.media} data-walk-hero={i === 0 ? '' : undefined} data-reveal={i === 0 ? undefined : 'aperture'}>
                  <Image
                    src={st.img.src}
                    alt={st.img.alt}
                    fill
                    sizes="(min-width: 64rem) 66vw, 100vw"
                    quality={82}
                    placeholder="blur"
                    blurDataURL={st.img.blur}
                    draggable={false}
                  />
                  <span className={s.veil} data-veil aria-hidden="true" />
                </div>
                <figcaption className={s.cap}>
                  <span className="label num">{pad(i + 1)}</span>
                  <span className="label label--muted">{st.label}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

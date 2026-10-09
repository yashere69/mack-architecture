'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type CSSProperties } from 'react';
import type { Img } from '@/content/projects';
import { MorphLink } from '@/components/MorphLink';
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

  return (
    <section className={`grid ${s.hero}`} aria-labelledby="hero-title" onPointerEnter={warm}>
      <div className={s.intro} data-reveal="fade" style={{ '--delay': '0.5s' } as CSSProperties}>
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
        <MorphLink href={cur.href} className={s.aperture} hero={cur.heroImg ?? cur.img} aria-label={`${cur.title}${cur.place ? `, ${cur.place}` : ''}`}>
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
        </MorphLink>
        <figcaption className={s.caption}>
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
  );
}

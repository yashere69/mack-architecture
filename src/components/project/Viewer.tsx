'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Img } from '@/content/projects';
import { lockScroll } from '@/motion/core';
import s from './Viewer.module.css';

type Props = { images: Img[]; start: number; title: string; onClose: () => void };

const pad = (n: number) => String(n).padStart(2, '0');

export function Viewer({ images, start, title, onClose }: Props) {
  const [i, setI] = useState(start);
  const [dir, setDir] = useState<1 | -1>(1);
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (d: 1 | -1) => {
      setDir(d);
      setI((cur) => (cur + d + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const y = window.scrollY;
    lockScroll(true);
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab' && root.current) {
        const f = [...root.current.querySelectorAll<HTMLElement>('button')];
        const k = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && k <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && k === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lockScroll(false);
      window.scrollTo(0, y);
      prevFocus?.focus({ preventScroll: true });
    };
  }, [go, onClose]);

  const img = images[i];
  const neighbours = [images[(i + 1) % images.length], images[(i - 1 + images.length) % images.length]];

  return (
    <div
      ref={root}
      className={s.viewer}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — images`}
      onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x;
        const dy = e.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) onClose();
        touch.current = null;
      }}
    >
      <div className={s.bar}>
        <p className="label num" aria-live="polite">
          {pad(i + 1)} <span className={s.of}>/ {pad(images.length)}</span>
          <span className="sr-only">: {img.alt}</span>
        </p>
        <p className={`small ${s.title}`}>{title}</p>
        <button ref={closeBtn} className={`label ${s.close}`} onClick={onClose}>
          Close<span className="sr-only"> viewer</span>
        </button>
      </div>

      <figure className={s.stage}>
        <div key={img.key} className={s.frame} data-dir={dir} data-drawing={img.kind === 'drawing' || undefined}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="100vw"
            quality={82}
            placeholder="blur"
            blurDataURL={img.blur}
            style={{ objectFit: 'contain' }}
          />
        </div>
        {img.caption ? <figcaption className={`label ${s.cap}`}>{img.caption}</figcaption> : null}
      </figure>

      <button className={`${s.nav} ${s.prev}`} onClick={() => go(-1)} aria-label="Previous image">
        <span aria-hidden="true">←</span>
      </button>
      <button className={`${s.nav} ${s.next}`} onClick={() => go(1)} aria-label="Next image">
        <span aria-hidden="true">→</span>
      </button>

      {/* Warm the neighbours so stepping feels instant */}
      <div className={s.preload} aria-hidden="true">
        {neighbours.map((n) => (
          <Image key={n.key} src={n.src} alt="" width={n.w} height={n.h} sizes="100vw" quality={82} />
        ))}
      </div>
    </div>
  );
}

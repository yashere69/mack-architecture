'use client';

import { useState, type CSSProperties } from 'react';
import type { Img } from '@/content/projects';
import type { Row } from '@/lib/sequence';
import { Picture } from '@/components/Picture';
import { Viewer } from './Viewer';
import s from './ProjectGallery.module.css';

type Chapter = { title?: string; rows: Row[] };
type Props = { chapters: Chapter[]; images: Img[]; title: string };

const pad = (n: number) => String(n).padStart(2, '0');

export function ProjectGallery({ chapters, images, title }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const total = images.length;
  const named = chapters.filter((c) => c.title).length;
  let chapterNo = 0;

  return (
    <>
      {chapters.map((c, ci) => {
        if (c.title) chapterNo++;
        return (
          <section key={ci} className={s.chapter} aria-label={c.title ?? `${title} — images`}>
            {c.title ? (
              <header className={`grid ${s.chapterHead}`}>
                <p className={`label num label--muted ${s.chapterNo}`}>
                  {pad(chapterNo)} / {pad(named)}
                </p>
                <h2 className={`d3 ${s.chapterTitle}`}>{c.title}</h2>
              </header>
            ) : null}
            {c.rows.map((r, ri) => (
              <div key={ri} className={`grid ${s.row}`} data-kind={r.kind}>
                {r.slots.map((sl) => (
                  <figure
                    key={sl.img.key}
                    className={s.slot}
                    data-offset={sl.offset || undefined}
                    data-portrait={sl.img.h > sl.img.w || undefined}
                    style={{ '--col': sl.col } as CSSProperties}
                  >
                    <button className={s.open} onClick={() => setOpen(sl.index)} aria-label={`View image ${sl.index + 1} of ${total}: ${sl.img.alt}`}>
                      <Picture
                        img={sl.img}
                        drift={r.kind === 'wide'}
                        sizes={
                          r.kind === 'wide'
                            ? '(min-width: 64rem) 82vw, 100vw'
                            : r.kind === 'pair'
                              ? '(min-width: 64rem) 46vw, 50vw'
                              : '(min-width: 64rem) 52vw, 100vw'
                        }
                      />
                    </button>
                    <figcaption className={s.cap}>
                      <span className="label num">{pad(sl.index + 1)}</span>
                      {sl.img.caption ? <span className="label label--muted">{sl.img.caption}</span> : null}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </section>
        );
      })}
      {open !== null ? <Viewer images={images} start={open} title={title} onClose={() => setOpen(null)} /> : null}
    </>
  );
}

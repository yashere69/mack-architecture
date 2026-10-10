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

// Each kind of hang has one entrance, so a gallery reads as a sequence of rooms
// rather than a set of effects: wide views open out, singles and pairs rise into
// place, drawings settle onto the sheet.
const MOTION: Record<Row['kind'], string> = {
  wide: 'expand parallax',
  single: 'blind parallax',
  pair: 'blind parallax',
  drawing: 'fade',
};

export function ProjectGallery({ chapters, images, title }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const total = images.length;
  const named = chapters.filter((c) => c.title).length;
  let chapterNo = 0;

  return (
    <>
      {chapters.map((c, ci) => {
        if (c.title) chapterNo++;
        const Tag = c.title ? 'section' : 'div';
        return (
          <Tag key={ci} className={s.chapter} aria-label={c.title ? `${c.title} — ${title}` : undefined}>
            {c.title ? (
              <header className={`grid ${s.chapterHead}`}>
                <p className={`label num label--muted ${s.chapterNo}`}>
                  {pad(chapterNo)} / {pad(named)}
                </p>
                <h2 className={`d3 ${s.chapterTitle}`} data-m="lines">{c.title}</h2>
              </header>
            ) : null}
            {c.rows.map((r, ri) => (
              <div key={ri} className={`grid ${s.row}`} data-kind={r.kind}>
                {r.slots.map((sl, si) => (
                  <figure
                    key={sl.img.key}
                    className={s.slot}
                    data-m={r.kind === 'pair' && si === 1 ? 'depth' : undefined}
                    data-depth={r.kind === 'pair' && si === 1 ? 0.6 : undefined}
                    data-offset={sl.offset || undefined}
                    data-portrait={sl.img.h > sl.img.w || undefined}
                    style={{ '--col': sl.col } as CSSProperties}
                  >
                    <button className={s.open} onClick={() => setOpen(sl.index)} aria-label={`View image ${sl.index + 1} of ${total}: ${sl.img.alt}`}>
                      <Picture
                        img={sl.img}
                        motion={MOTION[r.kind]}
                        speed={5}
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
          </Tag>
        );
      })}
      {open !== null ? <Viewer images={images} start={open} title={title} onClose={() => setOpen(null)} /> : null}
    </>
  );
}

'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { Entry, Scope } from '@/content/catalogue';
import { MorphLink } from '@/components/MorphLink';
import { Picture } from '@/components/Picture';
import s from './ProjectIndex.module.css';

type View = 'list' | 'grid';
type Props = {
  entries: Entry[];
  /** 'page' = full index with filters & view toggle; 'home' = list only. */
  mode?: 'page' | 'home';
  headingId?: string;
};

const pad = (n: number) => String(n).padStart(2, '0');
const SCOPES: Scope[] = ['Architecture', 'Interiors', 'Objects'];

export function ProjectIndex({ entries, mode = 'page', headingId }: Props) {
  const [scope, setScope] = useState<Scope | 'All'>('All');
  const [view, setView] = useState<View>('list');
  const [active, setActive] = useState(entries[0]?.slug);
  const [shown, setShown] = useState<Set<string>>(() => new Set(entries[0] ? [entries[0].slug] : []));

  // Read & write state to the URL without a navigation (shareable filtered views).
  useEffect(() => {
    if (mode !== 'page') return;
    const q = new URLSearchParams(window.location.search);
    const sc = q.get('scope');
    const match = SCOPES.find((x) => x.toLowerCase() === sc);
    if (match) setScope(match);
    if (q.get('view') === 'grid') setView('grid');
  }, [mode]);
  useEffect(() => {
    if (mode !== 'page') return;
    const q = new URLSearchParams();
    if (scope !== 'All') q.set('scope', scope.toLowerCase());
    if (view === 'grid') q.set('view', 'grid');
    const url = `${window.location.pathname}${q.size ? `?${q}` : ''}`;
    window.history.replaceState(window.history.state, '', url);
  }, [scope, view, mode]);

  const list = useMemo(() => (scope === 'All' ? entries : entries.filter((e) => e.scope === scope)), [entries, scope]);
  const counts = useMemo(
    () => Object.fromEntries(SCOPES.map((sc) => [sc, entries.filter((e) => e.scope === sc).length])) as Record<Scope, number>,
    [entries],
  );

  const hover = (slug: string) => {
    setActive(slug);
    setShown((prev) => (prev.has(slug) ? prev : new Set(prev).add(slug)));
  };
  const activeEntry = list.find((e) => e.slug === active) ?? list[0];

  return (
    <div className={s.root} data-mode={mode}>
      {mode === 'page' ? (
        <div className={`grid ${s.controls}`}>
          <div className={s.filters} role="group" aria-label="Filter by discipline">
            {(['All', ...SCOPES] as const).map((sc) => (
              <button
                key={sc}
                className={s.filter}
                aria-pressed={scope === sc}
                onClick={() => {
                  setScope(sc);
                  const first = sc === 'All' ? entries[0] : entries.find((e) => e.scope === sc);
                  if (first) hover(first.slug);
                }}
              >
                {sc}
                <sup className={s.n}>{pad(sc === 'All' ? entries.length : counts[sc])}</sup>
              </button>
            ))}
          </div>
          <div className={s.views} role="group" aria-label="View">
            {(['list', 'grid'] as const).map((v) => (
              <button key={v} className={s.filter} aria-pressed={view === v} onClick={() => setView(v)}>
                {v === 'list' ? 'Index' : 'Images'}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {list.length} {list.length === 1 ? 'work' : 'works'} shown{scope !== 'All' ? ` in ${scope}` : ''}.
      </p>

      {view === 'list' ? (
        <div className={`grid ${s.listWrap}`} key={`list-${scope}`}>
          <ol className={s.list} aria-labelledby={headingId}>
            <li className={s.head} aria-hidden="true">
              <span className="label label--muted">No.</span>
              <span className="label label--muted">Work</span>
              <span className={`label label--muted ${s.colPlace}`}>Place</span>
              <span className={`label label--muted ${s.colScope}`}>Discipline</span>
              <span className={`label label--muted ${s.colCount}`}>Images</span>
            </li>
            {list.map((e, k) => (
              <li key={e.slug} className={s.item} style={{ '--k': k } as CSSProperties}>
                <MorphLink
                  href={e.href}
                  className={s.row}
                  data-active={e.slug === activeEntry?.slug || undefined}
                  morph={`[data-preview="${e.slug}"]`}
                  hero={e.cover}
                  onMouseEnter={() => hover(e.slug)}
                  onFocus={() => hover(e.slug)}
                >
                  <span className={`label num ${s.no}`}>{pad(e.no)}</span>
                  <span className={s.thumb} aria-hidden="true">
                    <Image src={e.cover.src} alt="" fill sizes="96px" quality={70} placeholder="blur" blurDataURL={e.cover.blur} />
                  </span>
                  <span className={s.title}>
                    <span className={s.titleText}>{e.title}</span>
                    <span className={`small ${s.descriptor}`}>{e.descriptor}</span>
                  </span>
                  <span className={`small ${s.colPlace}`}>{e.place ?? '—'}</span>
                  <span className={`label ${s.colScope}`}>{e.scope}</span>
                  <span className={`label num ${s.colCount}`}>
                    {pad(e.count)} <span className="sr-only">images</span>
                  </span>
                </MorphLink>
              </li>
            ))}
          </ol>

          <div className={s.preview} aria-hidden="true">
            <div className={s.previewFrame}>
              {list
                .filter((e) => shown.has(e.slug))
                .map((e) => (
                  <div
                    key={e.slug}
                    className={s.previewSlide}
                    data-preview={e.slug}
                    data-state={e.slug === activeEntry?.slug ? 'active' : 'idle'}
                    style={{ '--ph': e.cover.color, aspectRatio: `${e.cover.w / e.cover.h}` } as CSSProperties}
                  >
                    <Image src={e.cover.src} alt="" fill sizes="(min-width: 64rem) 30vw, 1px" quality={82} placeholder="blur" blurDataURL={e.cover.blur} />
                  </div>
                ))}
            </div>
            {activeEntry ? (
              <p className={s.previewCap} key={activeEntry.slug}>
                <span className="label num">{pad(activeEntry.no)}</span>
                <span className="small">{activeEntry.imagery}</span>
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <ul className={`grid ${s.gridView}`} key={`grid-${scope}`} aria-labelledby={headingId}>
          {list.map((e, k) => (
            <li key={e.slug} className={s.cell} style={{ '--k': k } as CSSProperties}>
              <MorphLink href={e.href} className={s.cellLink} hero={e.cover}>
                <span className={s.cellMedia}>
                  <Picture
                    img={e.cover}
                    morph
                    sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 100vw"
                    delay={(k % 3) * 0.08}
                    style={e.cover.w / e.cover.h >= 1.18 ? { width: '100%' } : { height: '100%', width: 'auto' }}
                  />
                </span>
                <span className={s.cellCap}>
                  <span className="label num label--muted">{pad(e.no)}</span>
                  <span className={s.cellTitle}>{e.title}</span>
                  <span className={`small ${s.descriptor}`}>{e.descriptor}</span>
                </span>
              </MorphLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

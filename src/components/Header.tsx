'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { nav, site } from '@/content/site';
import { projects } from '@/content/projects';
import { Monogram } from './Logo';
import { lockScroll } from '@/motion/core';
import s from './Header.module.css';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<'top' | 'shown' | 'hidden'>('top');
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const navList = useRef<HTMLUListElement>(null);
  const marker = useRef<HTMLSpanElement>(null);

  // Hide on scroll down, return on scroll up. Never hides while the menu is open.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 24) setState('top');
        else if (y > last + 4 && y > 160) setState('hidden');
        else if (y < last - 4) setState('shown');
        last = y;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const first = panel.current?.querySelector<HTMLElement>('a');
    first?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
      if (e.key === 'Tab' && panel.current) {
        const f = [menuBtn.current, ...panel.current.querySelectorAll<HTMLElement>('a')].filter(Boolean) as HTMLElement[];
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  // Desktop nav: one rule slides between items, resting under the current section.
  const mark = useCallback((a: HTMLElement | null) => {
    const m = marker.current;
    if (!m) return;
    if (!a) {
      m.style.opacity = '0';
      return;
    }
    const r = a.getBoundingClientRect();
    const base = m.parentElement!.getBoundingClientRect();
    m.style.setProperty('--x', `${r.left - base.left}px`);
    m.style.setProperty('--w', `${r.width}px`);
    m.style.opacity = '1';
    if (!m.dataset.ready) requestAnimationFrame(() => (m.dataset.ready = ''));
  }, []);
  const rest = useCallback(() => mark(navList.current?.querySelector<HTMLElement>('a[aria-current="page"]') ?? null), [mark]);

  useEffect(() => {
    rest();
    document.fonts?.ready.then(rest);
    window.addEventListener('resize', rest);
    return () => window.removeEventListener('resize', rest);
  }, [pathname, rest]);

  return (
    <>
      <header className={s.header} data-state={open ? 'open' : state} style={{ viewTransitionName: 'site-header' }}>
        <div className={s.bar}>
          <Link href="/" className={s.brand} aria-label={`${site.name} — home`}>
            <Monogram className={s.mark} />
            <span className={s.word} aria-hidden="true">
              MACK <span className={s.amp}>&amp;</span> Co
            </span>
          </Link>
          <nav className={s.nav} aria-label="Primary">
            <ul ref={navList} onMouseLeave={rest} onBlur={rest}>
              {nav.map((n, i) => (
                <li key={n.href} style={{ ['--i' as string]: i }}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? 'page' : undefined}
                    onMouseEnter={(e) => mark(e.currentTarget)}
                    onFocus={(e) => mark(e.currentTarget)}
                  >
                    {n.label}
                    {n.href === '/projects' ? <sup className={s.count}>{projects.length}</sup> : null}
                  </Link>
                </li>
              ))}
            </ul>
            <span ref={marker} className={s.marker} aria-hidden="true" />
          </nav>
        </div>
      </header>

      {/* Mobile: the menu lives in the thumb zone and rises from the bottom. */}
      <div id="site-menu" ref={panel} data-lenis-prevent className={s.panel} data-open={open || undefined} role="dialog" aria-modal="true" aria-label="Menu" hidden={!open}>
        <div className={s.panelFoot}>
          <p className="label label--muted">{site.visits}</p>
          <p className={`small ${s.panelContact}`}>
            <a className="link link--static" href={`mailto:${site.email}`}>{site.email}</a>
            <a className="link link--static" href={site.phoneHref}>{site.phone}</a>
          </p>
        </div>
        <ol className={s.panelNav}>
          <li style={{ ['--i' as string]: 0 }}>
            <Link href="/" className={s.panelLink} aria-current={pathname === '/' ? 'page' : undefined}>
              <span className={s.panelNum}>00</span>
              <span>Home</span>
            </Link>
          </li>
          {nav.map((n, i) => (
            <li key={n.href} style={{ ['--i' as string]: i + 1 }}>
              <Link href={n.href} className={s.panelLink} aria-current={isActive(n.href) ? 'page' : undefined}>
                <span className={s.panelNum}>{String(i + 1).padStart(2, '0')}</span>
                <span>{n.label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <button ref={menuBtn} className={`label ${s.menuBtn}`} data-open={open || undefined} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((o) => !o)}>
        <span className={s.menuLabel} data-open={open || undefined} aria-hidden="true">
          <span>Menu</span>
          <span>Close</span>
        </span>
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      </button>
    </>
  );
}

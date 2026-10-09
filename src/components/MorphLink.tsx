'use client';

import Link from 'next/link';
import type { ComponentProps, FocusEvent, MouseEvent } from 'react';
import type { Img } from '@/content/projects';
import { preloadHero } from '@/lib/preload';

export const MORPH = 'project-cover';

// A link whose image becomes the destination page's hero.
// The shared view-transition-name is assigned at click time (not render time) so a
// project can appear several times on one page without duplicate names; the
// destination hero carries the same name statically.
export function MorphLink({
  onClick,
  onMouseEnter,
  onFocus,
  morph,
  hero,
  ...props
}: ComponentProps<typeof Link> & {
  /** CSS selector of the element to morph, when it lives outside the link. */
  morph?: string;
  /** The destination's hero image — preloaded on intent. */
  hero?: Img;
}) {
  const warm = () => hero && preloadHero(hero);
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    // Release every other holder of the name (including this page's own hero) —
    // two elements with one name abort the whole transition.
    document.querySelectorAll<HTMLElement>('[data-morph-active], [data-vt-hero]').forEach((el) => {
      el.style.viewTransitionName = 'none';
      el.removeAttribute('data-morph-active');
    });
    const target =
      (morph ? document.querySelector<HTMLElement>(morph) : null) ??
      e.currentTarget.querySelector<HTMLElement>('[data-morph]') ??
      (e.currentTarget.hasAttribute('data-morph') ? e.currentTarget : null);
    if (target) {
      target.style.viewTransitionName = MORPH;
      target.setAttribute('data-morph-active', '');
    }
  };
  return (
    <Link
      {...props}
      onClick={handle}
      onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
        warm();
        onMouseEnter?.(e);
      }}
      onFocus={(e: FocusEvent<HTMLAnchorElement>) => {
        warm();
        onFocus?.(e);
      }}
    />
  );
}

'use client';

import Link from 'next/link';
import type { ComponentProps, MouseEvent } from 'react';

export const MORPH = 'project-cover';

// A link whose image becomes the destination page's hero.
// The shared view-transition-name is assigned at click time (not render time) so a
// project can appear several times on one page without duplicate names; the
// destination hero carries the same name statically.
export function MorphLink({
  onClick,
  morph,
  ...props
}: ComponentProps<typeof Link> & {
  /** CSS selector of the element to morph, when it lives outside the link. */
  morph?: string;
}) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    document.querySelectorAll<HTMLElement>('[data-morph-active]').forEach((el) => {
      el.style.viewTransitionName = '';
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
  return <Link {...props} onClick={handle} />;
}

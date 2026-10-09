'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// One observer for the whole site. Server components only emit `data-reveal`;
// this marks them `data-in` as they enter the viewport. New nodes (route
// changes, filtering) are picked up by a MutationObserver.
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute('data-in', '');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );
    const scan = (root: ParentNode) =>
      root.querySelectorAll('[data-reveal]:not([data-in])').forEach((el) => io.observe(el));
    scan(document);
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && scan(n.parentNode ?? n));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}

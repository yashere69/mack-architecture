'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import s from './IndexPill.module.css';

// A quiet way back to the index. It waits until the visitor is inside the image
// sequence, and steps aside when the next-project threshold arrives.
export function IndexPill() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const next = document.querySelector('[data-threshold]');
    let nearEnd = false;
    const io = next
      ? new IntersectionObserver(([e]) => {
          nearEnd = e.isIntersecting;
          update();
        })
      : null;
    if (next && io) io.observe(next);
    function update() {
      setShow(window.scrollY > window.innerHeight * 0.85 && !nearEnd);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      io?.disconnect();
    };
  }, []);
  return (
    <Link href="/projects" className={`label ${s.pill}`} data-show={show || undefined} tabIndex={show ? 0 : -1} aria-hidden={!show}>
      <span aria-hidden="true" className={s.glyph} />
      Index
    </Link>
  );
}

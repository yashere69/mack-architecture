import type { ReactNode } from 'react';
import { Rise } from './Rise';
import s from './PageHead.module.css';

// Two-tone title block used across the site: the name in ink, what it is in grey.
export function PageHead({
  kicker,
  title,
  tone,
  size = 'd1',
  children,
}: {
  kicker: string;
  title: string;
  tone?: string;
  size?: 'd1' | 'd2';
  children?: ReactNode;
}) {
  return (
    <header className={`grid ${s.head}`}>
      <p className={`label label--muted ${s.kicker}`}>{kicker}</p>
      <h1 className={`${size} ${s.title}`}>
        <Rise text={title} />
        {tone ? (
          <span className={s.tone}>
            <Rise text={tone} delay={0.1} />
          </span>
        ) : null}
      </h1>
      {children ? <div className={s.aside}>{children}</div> : null}
    </header>
  );
}

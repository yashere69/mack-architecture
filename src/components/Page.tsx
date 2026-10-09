import { ViewTransition, type ReactNode } from 'react';

// Every route's content crossfades (out fast, in gently). Named elements — the
// header and a project's cover — are excluded and move on their own.
export function Page({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

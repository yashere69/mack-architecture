import type { Metadata } from 'next';
import Link from 'next/link';
import { Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { Picture } from '@/components/Picture';
import { MorphLink } from '@/components/MorphLink';
import { objects } from '@/content/objects';
import { site } from '@/content/site';
import s from './objects.module.css';

export const metadata: Metadata = {
  title: 'Objects',
  description: `Furniture by ${site.name}, including ORA, a fluted timber console table.`,
  alternates: { canonical: '/objects' },
  openGraph: { title: `Objects — ${site.name}`, url: '/objects', images: [{ url: '/og/ora.jpg', width: 1200, height: 630 }] },
};

export default function ObjectsPage() {
  return (
    <Page>
      <PageHead kicker={`Objects — ${String(objects.length).padStart(2, '0')}`} title="Objects" tone="Furniture by the studio" />
      {objects.map((o) => (
        <article key={o.slug} className={`grid ${s.item}`} aria-labelledby={`o-${o.slug}`}>
          <MorphLink href={`/objects/${o.slug}`} className={s.media} tabIndex={-1} aria-hidden="true" hero={o.images[0]}>
            <Picture img={o.images[0]} morph eager sizes="(min-width: 64rem) 60vw, 100vw" />
          </MorphLink>
          <div className={s.text}>
            <h2 id={`o-${o.slug}`} className={`d1 ${s.name}`}>
              <MorphLink href={`/objects/${o.slug}`} morph={`[aria-labelledby="o-${o.slug}"] [data-morph]`}>{o.name}</MorphLink>
            </h2>
            <dl className={`small ${s.meta}`}>
              <div><dt className="label label--muted">Type</dt><dd>{o.type}</dd></div>
              <div><dt className="label label--muted">Material</dt><dd>{o.materials.join(', ')}</dd></div>
            </dl>
            <div className={s.sketch}>
              <Picture img={o.images[2]} sizes="(min-width: 64rem) 20vw, 50vw" delay={0.1} />
              <p className="label label--muted">Sketch</p>
            </div>
            <Link href={`/objects/${o.slug}`} className="label link link--static">
              View object<span className="sr-only">: {o.name}</span>
            </Link>
          </div>
        </article>
      ))}
    </Page>
  );
}

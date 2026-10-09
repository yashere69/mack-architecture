import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Page } from '@/components/Page';
import { Picture } from '@/components/Picture';
import { MORPH } from '@/components/MorphLink';
import { Rise } from '@/components/Rise';
import { ProjectGallery } from '@/components/project/ProjectGallery';
import { catalogue } from '@/content/catalogue';
import { getObject, objects } from '@/content/objects';
import { site } from '@/content/site';
import { compose } from '@/lib/sequence';
import s from '../../projects/[slug]/project.module.css';
import o from './object.module.css';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return objects.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const ob = getObject((await params).slug);
  if (!ob) return {};
  return {
    title: `${ob.name}, ${ob.type.toLowerCase()}`,
    description: ob.summary,
    alternates: { canonical: `/objects/${ob.slug}` },
    openGraph: { title: `${ob.name} — ${site.name}`, url: `/objects/${ob.slug}`, images: [{ url: `/og/${ob.slug}.jpg`, width: 1200, height: 630 }] },
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

export default async function ObjectPage({ params }: Params) {
  const ob = getObject((await params).slug);
  if (!ob) notFound();
  const entry = catalogue.find((e) => e.slug === ob.slug)!;
  const rows = compose(ob.images.slice(1), 1);
  const mail = `mailto:${site.email}?subject=${encodeURIComponent(`Product inquiry: ${ob.name}`)}`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: ob.name,
    category: ob.type,
    material: ob.materials.join(', '),
    description: ob.summary,
    image: ob.images.map((i) => `${site.url}${i.src}`),
    brand: { '@type': 'Brand', name: site.name },
    url: `${site.url}/objects/${ob.slug}`,
  };

  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className={`grid ${s.head}`}>
        <p className={`label ${s.crumb}`}>
          <Link href="/objects" className="link">Objects</Link>
          <span className={s.rule} aria-hidden="true" />
          <span className="num label--muted">No. {pad(entry.no)} / {pad(catalogue.length)}</span>
        </p>
        <h1 className={`d1 ${s.title}`}>
          <span className={o.name}><Rise text={ob.name} /></span>
          <span className={s.tone}><Rise text={entry.descriptor} delay={0.1} /></span>
        </h1>
      </header>

      <div className={`grid ${s.heroRow}`}>
        <div className={s.hero}>
          <Picture img={ob.images[0]} eager reveal={false} vtName={MORPH} sizes="(min-width: 64rem) 84vw, 100vw" className={s.heroFrame} />
        </div>
      </div>

      <section className={`grid ${s.intro}`} aria-label="About the object">
        <dl className={s.meta}>
          <div><dt className="label label--muted">Type</dt><dd>{ob.type}</dd></div>
          <div><dt className="label label--muted">Material</dt><dd>{ob.materials.join(', ')}</dd></div>
          <div><dt className="label label--muted">Imagery</dt><dd>Visualisation, sketches</dd></div>
          <div><dt className="label label--muted">Images</dt><dd className="num">{pad(ob.images.length)}</dd></div>
        </dl>
        <div className={s.text}>
          <p className={`lede ${s.summary}`} data-reveal="fade">{ob.summary}</p>
          <a className={`label ${o.enquire}`} href={mail}>
            <span>Enquire about {ob.name}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <ProjectGallery chapters={[{ rows }]} images={ob.images} title={ob.name} />
    </Page>
  );
}

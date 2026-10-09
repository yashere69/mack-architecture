import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { Page } from '@/components/Page';
import { Picture } from '@/components/Picture';
import { MorphLink, MORPH } from '@/components/MorphLink';
import { Rise } from '@/components/Rise';
import { ProjectGallery } from '@/components/project/ProjectGallery';
import { IndexPill } from '@/components/project/IndexPill';
import { catalogue } from '@/content/catalogue';
import { getProject, projectImages, projects } from '@/content/projects';
import { site } from '@/content/site';
import { compose } from '@/lib/sequence';
import s from './project.module.css';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  const title = p.location ? `${p.title}, ${p.location}` : p.title;
  return {
    title,
    description: `${p.summary} ${p.scope} by ${site.name}.`,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      type: 'article',
      title: `${title} — ${site.name}`,
      description: p.summary,
      url: `/projects/${p.slug}`,
      images: [{ url: `/og/${p.slug}.jpg`, width: 1200, height: 630, alt: p.cover.alt }],
    },
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

export default async function ProjectPage({ params }: Params) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const entry = catalogue.find((e) => e.slug === p.slug)!;
  const all = projectImages(p);
  // Chapters after the cover: the first chapter loses its first image (it is the hero).
  let offset = 1;
  const chapters = p.chapters.map((c, ci) => {
    const imgs = ci === 0 ? c.images.slice(1) : c.images;
    const rows = compose(imgs, offset);
    offset += imgs.length;
    return { title: c.title, rows };
  });

  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const nextEntry = catalogue.find((e) => e.slug === next.slug)!;
  const descriptor = entry.descriptor;
  const ratio = p.cover.w / p.cover.h;

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: p.title,
      description: p.summary,
      url: `${site.url}/projects/${p.slug}`,
      image: all.slice(0, 4).map((im) => `${site.url}${im.src}`),
      genre: p.scope,
      creator: { '@id': `${site.url}/#studio` },
      ...(p.location ? { locationCreated: { '@type': 'Place', name: p.location } } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Projects', item: `${site.url}/projects` },
        { '@type': 'ListItem', position: 2, name: p.title, item: `${site.url}/projects/${p.slug}` },
      ],
    },
  ];

  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <header className={`grid ${s.head}`}>
        <p className={`label ${s.crumb}`}>
          <Link href="/projects" className="link">Projects</Link>
          <span className={s.rule} aria-hidden="true" />
          <span className="num label--muted">
            No. {pad(entry.no)} / {pad(catalogue.length)}
          </span>
        </p>
        <h1 className={`d1 ${s.title}`}>
          <Rise text={p.title} />
          <span className={s.tone}>
            <Rise text={descriptor} delay={0.12} />
          </span>
        </h1>
      </header>

      <div className={`grid ${s.heroRow}`}>
        <div className={s.hero} style={{ width: `min(100%, calc(80svh * ${ratio.toFixed(3)}))` } as CSSProperties}>
          <Picture img={p.cover} eager reveal={false} vtName={MORPH} sizes="(min-width: 64rem) 84vw, 100vw" className={s.heroFrame} />
        </div>
      </div>

      <section className={`grid ${s.intro}`} aria-label="About the project">
        <dl className={s.meta}>
          {p.location ? (
            <div>
              <dt className="label label--muted">Location</dt>
              <dd>{p.location}</dd>
            </div>
          ) : null}
          <div>
            <dt className="label label--muted">Discipline</dt>
            <dd>{p.scope}</dd>
          </div>
          <div>
            <dt className="label label--muted">Imagery</dt>
            <dd>{p.imagery}</dd>
          </div>
          <div>
            <dt className="label label--muted">Images</dt>
            <dd className="num">{pad(all.length)}</dd>
          </div>
          {p.chapters.filter((c) => c.title).length > 1 ? (
            <div>
              <dt className="label label--muted">Spaces</dt>
              <dd>{p.chapters.map((c) => c.title).filter(Boolean).join(', ')}</dd>
            </div>
          ) : null}
        </dl>

        <div className={s.text}>
          {p.description ? (
            <div className="body" data-reveal="fade">
              {p.description.map((para, k) => (
                <p key={k} className={k === 0 ? `lede ${s.first}` : undefined}>
                  {para}
                </p>
              ))}
            </div>
          ) : (
            <p className={`lede ${s.summary}`} data-reveal="fade">
              {p.summary}
            </p>
          )}
          {p.quote ? (
            <blockquote className={s.quote} data-reveal="fade">
              <p className="serif">“{p.quote.text}”</p>
              <footer className="label label--muted">— {p.quote.by}</footer>
            </blockquote>
          ) : null}
        </div>
      </section>

      <ProjectGallery chapters={chapters} images={all} title={p.title} />

      <nav className={s.next} aria-label="Next project" data-threshold>
        <MorphLink href={`/projects/${next.slug}`} className={`grid ${s.nextLink}`}>
          <span className={`label ${s.nextLabel}`}>
            Next <span className="num label--muted">No. {pad(nextEntry.no)}</span>
          </span>
          <span className={`d1 ${s.nextTitle}`}>{next.title}</span>
          <span className={`small ${s.nextDesc}`}>{nextEntry.descriptor}</span>
          <span className={s.nextMedia}>
            <Picture img={next.cover} morph sizes="(min-width: 64rem) 34vw, 100vw" />
          </span>
        </MorphLink>
        <div className={`grid ${s.nextFoot}`}>
          <Link href={`/projects/${prev.slug}`} className="label link">
            ← {prev.title}
          </Link>
          <Link href="/projects" className={`label link ${s.all}`}>
            All projects
          </Link>
        </div>
      </nav>

      <IndexPill />
    </Page>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { Picture } from '@/components/Picture';
import { catalogue, countBy, scopes } from '@/content/catalogue';
import type { Img } from '@/content/projects';
import { site } from '@/content/site';
import media from '@/content/media.generated.json';
import s from './studio.module.css';

export const metadata: Metadata = {
  title: 'Studio',
  description: `${site.name} — a studio for architecture, interiors and objects in Andheri West, Mumbai. Visits by appointment.`,
  alternates: { canonical: '/studio' },
  openGraph: { title: `Studio — ${site.name}`, url: '/studio', images: [{ url: '/og/studio.jpg', width: 1200, height: 630 }] },
};

// Images from the studio's previous homepage that are not attached to a named project.
// They are shown as the studio's work, never captioned as a specific project.
const studioImg = (key: 'studio/courtyard' | 'studio/pavilion', alt: string): Img => ({ key, ...media[key], alt, kind: 'image' });
const courtyard = studioImg('studio/courtyard', 'Arcaded stone courtyard with a chequered floor, loungers and terraces above');
const pavilion = studioImg('studio/pavilion', 'Glazed pavilion under a timber soffit, beside a stone terrace and palms at dusk');

// Places of work — derived only from locations the client's material states.
const places = (() => {
  const map = new Map<string, { title: string; href: string }[]>();
  for (const e of catalogue) {
    if (!e.place) continue;
    const key = e.place.includes('Dharampur') ? 'Dharampur, Gujarat' : e.place.includes('Ahmedabad') ? 'Ahmedabad, Gujarat' : e.place;
    map.set(key, [...(map.get(key) ?? []), { title: e.title, href: e.href }]);
  }
  return [...map.entries()];
})();

export default function StudioPage() {
  return (
    <Page>
      <PageHead kicker="Studio" title="MACK & Co Architects" tone="Andheri West, Mumbai" />

      <section className={`grid ${s.statement}`} aria-label="Statement">
        <div className={s.statementBody}>
          {site.statement.map((line, k) => (
            <p key={k} className={`lede ${k ? s.muted : ''}`} data-reveal="fade" style={{ ['--delay' as string]: `${k * 0.1}s` }}>
              {line}
            </p>
          ))}
        </div>
      </section>

      <div className={`grid ${s.wide}`}>
        <div className={s.wideImg}>
          <Picture img={courtyard} drift sizes="(min-width: 64rem) 75vw, 100vw" />
        </div>
      </div>

      <section className={`grid ${s.practice}`} aria-labelledby="practice-h">
        <h2 id="practice-h" className={`d3 ${s.practiceTitle}`}>Practice</h2>
        <dl className={s.sheet}>
          <div>
            <dt className="label label--muted">Disciplines</dt>
            <dd>
              <ul className={s.inline}>
                {scopes.map((sc) => (
                  <li key={sc}>
                    <Link className="link" href={`/projects?scope=${sc.toLowerCase()}`}>{sc}</Link>
                    <sup className={s.n}>{String(countBy(sc)).padStart(2, '0')}</sup>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="label label--muted">Work in</dt>
            <dd>
              <ul className={s.places}>
                {places.map(([place, works]) => (
                  <li key={place}>
                    <span>{place}</span>
                    <span className={s.works}>
                      {works.map((w, k) => (
                        <span key={w.href}>
                          <Link className="link" href={w.href}>{w.title}</Link>
                          {k < works.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="label label--muted">Studio</dt>
            <dd>
              <address>{site.address.lines.join(', ')}</address>
              <a className={`link link--static ${s.small}`} href={site.mapUrl} target="_blank" rel="noopener noreferrer">
                Open in Maps<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </dd>
          </div>
          <div>
            <dt className="label label--muted">Visits</dt>
            <dd>
              {site.visits}. <Link className="link link--static" href="/contact">Request an appointment</Link>
            </dd>
          </div>
          <div>
            <dt className="label label--muted">Contact</dt>
            <dd>
              <a className="link" href={`mailto:${site.email}`}>{site.email}</a>
              <span aria-hidden="true"> · </span>
              <a className="link" href={site.phoneHref}>{site.phone}</a>
            </dd>
          </div>
          <div>
            <dt className="label label--muted">Follow</dt>
            <dd>
              <a className="link" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                Instagram {site.instagram.handle}<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <div className={`grid ${s.offset}`}>
        <div className={s.offsetImg}>
          <Picture img={pavilion} sizes="(min-width: 64rem) 50vw, 100vw" />
        </div>
      </div>
    </Page>
  );
}

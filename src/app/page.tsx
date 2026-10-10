import Link from 'next/link';
import { Page } from '@/components/Page';
import { HomeHero, type Discipline } from '@/components/home/HomeHero';
import { Walkthrough, type Step } from '@/components/home/Walkthrough';
import { ProjectIndex } from '@/components/index/ProjectIndex';
import { MorphLink } from '@/components/MorphLink';
import { Picture } from '@/components/Picture';
import { Rise } from '@/components/Rise';
import { catalogue, countBy } from '@/content/catalogue';
import { getProject, type Img, type Project } from '@/content/projects';
import { objects } from '@/content/objects';
import { site } from '@/content/site';
import s from './home.module.css';

const ora = objects[0];
const p = (slug: string) => getProject(slug) as Project;
const pick = (proj: Project, key: string): Img =>
  proj.chapters.flatMap((c) => c.images).find((i) => i.key === key) ?? proj.cover;

const disciplines: Discipline[] = [
  {
    scope: 'Architecture',
    count: countBy('Architecture'),
    href: '/projects?scope=architecture',
    work: { title: 'Udaipur Resort', place: 'Rajasthan, India', href: '/projects/udaipur-resort', img: p('udaipur-resort').cover, focus: '52% 60%' },
  },
  {
    scope: 'Interiors',
    count: countBy('Interiors'),
    href: '/projects?scope=interiors',
    work: { title: 'Agra Fort Project', place: 'Dharampur', href: '/projects/agra-fort-project', img: p('agra-fort-project').cover, focus: '50% 55%' },
  },
  {
    scope: 'Objects',
    count: countBy('Objects'),
    href: '/projects?scope=objects',
    work: { title: 'ORA', place: 'Console table', href: `/objects/${ora.slug}`, img: ora.images[0], focus: '50% 62%' },
  },
];

// Each project is told with its own scroll treatment — never the same twice.
type Feature = {
  project: Project;
  main: Img;
  second: Img;
  variant: 'b' | 'c' | 'd' | 'e';
  motion: string; // main image
  depth: number; // second image's parallax plane
};
const features: Feature[] = [
  { project: p('red-fort-project'), main: pick(p('red-fort-project'), 'red-fort-project/11'), second: pick(p('red-fort-project'), 'red-fort-project/05'), variant: 'b', motion: 'blind parallax', depth: 1.5 },
  { project: p('rc-house'), main: pick(p('rc-house'), 'rc-house/01'), second: pick(p('rc-house'), 'rc-house/06'), variant: 'c', motion: 'doors', depth: 0.9 },
  { project: p('the-31st'), main: pick(p('the-31st'), 'the-31st/01'), second: pick(p('the-31st'), 'the-31st/14'), variant: 'd', motion: 'expand parallax', depth: 1.3 },
  { project: p('agra-fort-project'), main: pick(p('agra-fort-project'), 'agra-fort-project/11'), second: pick(p('agra-fort-project'), 'agra-fort-project/10'), variant: 'e', motion: 'blind dolly', depth: 1.7 },
];

// The flagship as a walk: terrace → arcade → court → hall → drawing (labels describe what each view shows).
const udaipur = p('udaipur-resort');
const walk: Step[] = [
  { img: pick(udaipur, 'udaipur-resort/02'), label: 'Terrace' },
  { img: pick(udaipur, 'udaipur-resort/03'), label: 'Garden arcade' },
  { img: pick(udaipur, 'udaipur-resort/04'), label: 'Inner court' },
  { img: pick(udaipur, 'udaipur-resort/05'), label: 'Pool hall' },
  { img: pick(udaipur, 'udaipur-resort/06'), label: 'Axonometric' },
];

const no = (slug: string) => String(catalogue.find((e) => e.slug === slug)?.no ?? 0).padStart(2, '0');

export default function Home() {
  return (
    <Page>
      <HomeHero disciplines={disciplines} />

      {/* A pause: the studio in its own words */}
      <section className={`grid ${s.statement}`} aria-labelledby="studio-h">
        <h2 id="studio-h" className={`label label--muted ${s.kicker}`}>The studio</h2>
        <div className={s.statementBody} data-m="fadeout">
          <p className={`lede ${s.statementLead}`} data-m="read">
            {site.statement[0]}
          </p>
          <p className={`lede ${s.statementMuted}`} data-m="read">
            {site.statement[1]} {site.statement[2]}
          </p>
          <Link href="/studio" className={`label link link--static ${s.more}`}>
            About the studio
          </Link>
        </div>
      </section>

      {/* Selected work — hung like an exhibition: widths and offsets, never the same twice */}
      <section aria-labelledby="work-h" className={s.work}>
        <div className={`grid ${s.workHead}`}>
          <h2 id="work-h" className={`label label--muted ${s.kicker}`}>Selected work</h2>
          <p className={`small ${s.workNote}`}>
            Five of {catalogue.length} works
          </p>
        </div>

        <Walkthrough
          no={no(udaipur.slug)}
          scope={udaipur.scope}
          title={udaipur.title}
          place={udaipur.location}
          imagery={udaipur.imagery}
          href={`/projects/${udaipur.slug}`}
          hero={udaipur.cover}
          steps={walk}
        />

        {features.map(({ project: pr, main, second, variant, motion, depth }) => (
          <article key={pr.slug} className={`grid ${s.feature}`} data-v={variant} data-feature={pr.slug} aria-labelledby={`f-${pr.slug}`}>
            <MorphLink href={`/projects/${pr.slug}`} className={s.main} tabIndex={-1} aria-hidden="true" hero={pr.cover}>
              <Picture img={main} morph motion={motion} speed={6} sizes="(min-width: 64rem) 72vw, 100vw" />
            </MorphLink>
            <div className={s.second} data-m="depth" data-depth={depth}>
              <Picture img={second} sizes="(min-width: 64rem) 22vw, 60vw" delay={0.15} />
              {second.caption ? <p className={`label label--muted ${s.cap}`}>{second.caption}</p> : null}
            </div>
            <div className={s.text}>
              <p className="label">
                <span className="num">No. {no(pr.slug)}</span>
                <span className={s.dot} aria-hidden="true" />
                <span className="label--muted">{pr.scope}</span>
              </p>
              <h3 id={`f-${pr.slug}`} className={`d2 ${s.title}`}>
                <MorphLink href={`/projects/${pr.slug}`} morph={`[data-feature="${pr.slug}"] [data-morph]`} hero={pr.cover}>
                  <Rise text={pr.title} />
                </MorphLink>
              </h3>
              <p className={`small ${s.meta}`}>
                {pr.location ? <span>{pr.location}</span> : null}
                <span>{pr.imagery}</span>
              </p>
              <MorphLink href={`/projects/${pr.slug}`} className={`label link link--static ${s.view}`} morph={`[data-feature="${pr.slug}"] [data-morph]`} hero={pr.cover}>
                View project<span className="sr-only">: {pr.title}</span>
              </MorphLink>
            </div>
          </article>
        ))}
      </section>

      {/* The full index — every work, one line each */}
      <section aria-labelledby="index-h" className={s.index}>
        <div className={`grid ${s.indexHead}`}>
          <h2 id="index-h" className={`d3 ${s.indexTitle}`} data-m="lines">Index</h2>
          <p className={`small ${s.indexNote}`}>
            {countBy('Architecture')} architecture · {countBy('Interiors')} interiors · {countBy('Objects')} object
          </p>
          <Link href="/projects" className={`label link link--static ${s.indexAll}`}>All projects</Link>
        </div>
        <ProjectIndex entries={catalogue} mode="home" headingId="index-h" />
      </section>

      {/* Objects: the same care at the scale of the hand */}
      <section aria-labelledby="objects-h" className={`grid ${s.objects}`} data-bg="#e5e1d9">
        <div className={s.objMain}>
          <Picture img={ora.images[0]} motion="lower parallax" speed={5} sizes="(min-width: 64rem) 58vw, 100vw" />
        </div>
        <div className={s.objText}>
          <h2 id="objects-h" className="label label--muted">Objects</h2>
          <p className={`d1 ${s.objName}`} data-m="track">
            {ora.name}
          </p>
          <dl className={`small ${s.objMeta}`}>
            <div><dt className="label label--muted">Type</dt><dd>{ora.type}</dd></div>
            <div><dt className="label label--muted">Material</dt><dd>{ora.materials.join(', ')}</dd></div>
          </dl>
          <div className={s.objSketch}>
            <Picture img={ora.images[2]} sizes="(min-width: 64rem) 22vw, 50vw" delay={0.1} />
            <p className={`label label--muted ${s.cap}`}>Sketch</p>
          </div>
          <Link href={`/objects/${ora.slug}`} className={`label link link--static ${s.view}`}>
            View object<span className="sr-only">: {ora.name}</span>
          </Link>
        </div>
      </section>
    </Page>
  );
}

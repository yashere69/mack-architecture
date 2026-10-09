import type { Metadata } from 'next';
import { Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { ProjectIndex } from '@/components/index/ProjectIndex';
import { catalogue, countBy } from '@/content/catalogue';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Projects',
  description: `The index of ${site.name}: a resort in Rajasthan, houses and interiors in Gujarat, and the ORA console table.`,
  alternates: { canonical: '/projects' },
  openGraph: { title: `Projects — ${site.name}`, url: '/projects', images: [{ url: '/og/projects.jpg', width: 1200, height: 630 }] },
};

export default function ProjectsPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Projects — ${site.name}`,
    url: `${site.url}/projects`,
    hasPart: catalogue.map((e) => ({ '@type': 'CreativeWork', name: e.title, url: `${site.url}${e.href}` })),
  };
  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHead kicker={`Index — ${catalogue.length} works`} title="Projects" tone="Architecture, interiors, objects" size="d2">
        <p className="small">
          {countBy('Architecture')} architecture · {countBy('Interiors')} interiors · {countBy('Objects')} object.
          Photographs and visualisations are labelled on each project.
        </p>
      </PageHead>
      <h2 id="index-list" className="sr-only">All works</h2>
      <ProjectIndex entries={catalogue} mode="page" headingId="index-list" />
    </Page>
  );
}

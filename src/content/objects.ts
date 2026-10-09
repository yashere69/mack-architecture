import media from './media.generated.json';
import type { Img, MediaKey } from './projects';

export type ObjectItem = {
  slug: string;
  name: string;
  type: string;
  materials: string[];
  summary: string;
  images: Img[];
};

const im = (key: MediaKey, alt: string, kind: Img['kind'] = 'image', caption?: string): Img => ({
  key,
  ...media[key],
  alt,
  kind,
  caption,
});

// Source: old /products/ora — name, type and material only.
export const objects: ObjectItem[] = [
  {
    slug: 'ora',
    name: 'ORA',
    type: 'Console Table',
    materials: ['Wood'],
    summary: 'ORA, a wooden console table by MACK & Co Architects — fluted timber, raised top on short posts.',
    images: [
      im('ora/01', 'ORA console table in fluted timber with a raised top, in raking afternoon light'),
      im('ora/02', 'ORA console variant with two drawers and an open shelf'),
      im('ora/03', 'Sketch of the ORA console in perspective', 'drawing', 'Sketch'),
      im('ora/04', 'Sketch of the drawer variant of the ORA console', 'drawing', 'Sketch'),
    ],
  },
];

export const getObject = (slug: string) => objects.find((o) => o.slug === slug);

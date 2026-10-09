import { objects } from './objects';
import { projects, projectImages, type Img } from './projects';

// One catalogue of the practice — buildings, interiors and objects in a single index,
// numbered in exhibition order (not chronology, which is unknown).
export type Scope = 'Architecture' | 'Interiors' | 'Objects';

export type Entry = {
  no: number;
  slug: string;
  href: string;
  title: string;
  scope: Scope;
  place?: string;
  descriptor: string;
  imagery: 'Photography' | 'Visualisation';
  count: number;
  cover: Img;
};

export const catalogue: Entry[] = [
  ...projects.map((p) => ({
    slug: p.slug,
    href: `/projects/${p.slug}`,
    title: p.title,
    scope: p.scope as Scope,
    place: p.location,
    descriptor: p.location ? `${p.scope}, ${shortPlace(p.location)}` : p.scope,
    imagery: p.imagery,
    count: projectImages(p).length,
    cover: p.cover,
  })),
  ...objects.map((o) => ({
    slug: o.slug,
    href: `/objects/${o.slug}`,
    title: o.name,
    scope: 'Objects' as Scope,
    place: undefined,
    descriptor: `${o.type}, ${o.materials.join(', ').toLowerCase()}`,
    imagery: 'Visualisation' as const,
    count: o.images.length,
    cover: o.images[0],
  })),
].map((e, i) => ({ ...e, no: i + 1 }));

export const scopes: Scope[] = ['Architecture', 'Interiors', 'Objects'];
export const countBy = (scope: Scope) => catalogue.filter((e) => e.scope === scope).length;

export function shortPlace(loc: string) {
  // "Shrimad Rajchandra Ashram, Dharampur" → "Dharampur"; "Rajasthan, India" → "Rajasthan"
  if (loc.endsWith(', India')) return loc.replace(', India', '');
  const parts = loc.split(', ');
  return parts[parts.length - 1];
}

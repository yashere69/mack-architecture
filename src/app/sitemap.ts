import type { MetadataRoute } from 'next';
import { objects } from '@/content/objects';
import { projectImages, projects } from '@/content/projects';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${site.url}${p}`;
  const pages = ['/', '/projects', '/objects', '/studio', '/contact'].map((p) => ({
    url: u(p),
    changeFrequency: 'monthly' as const,
    priority: p === '/' ? 1 : 0.8,
  }));
  const work = projects.map((p) => ({
    url: u(`/projects/${p.slug}`),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
    images: projectImages(p).map((i) => u(i.src)),
  }));
  const objs = objects.map((o) => ({
    url: u(`/objects/${o.slug}`),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
    images: o.images.map((i) => u(i.src)),
  }));
  const legal = ['/privacy-policy', '/terms-and-conditions'].map((p) => ({ url: u(p), priority: 0.2 }));
  return [...pages, ...work, ...objs, ...legal];
}

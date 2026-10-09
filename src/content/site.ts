// Canonical studio facts. Source: context/SOURCE.md (extracted from the client's current site).
// Nothing here is invented — unknowns are simply absent.

export const site = {
  name: 'MACK & Co Architects',
  shortName: 'MACK',
  tagline: 'Architecture. Interiors. Objects.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mack-architecture.vercel.app',
  locale: 'en_IN',
  email: 'macka@gmail.com',
  phone: '+91 99980 00393',
  phoneHref: 'tel:+919998000393',
  address: {
    lines: ['Shah Industrial Estate', '1001 Parinee I, 7-A', 'Andheri West, Mumbai', 'Maharashtra 400053'],
    street: 'Shah Industrial Estate, 1001 Parinee I, 7-A, Andheri West',
    city: 'Mumbai',
    region: 'Maharashtra',
    postalCode: '400053',
    country: 'IN',
  },
  mapUrl: 'https://maps.app.goo.gl/LDt3TN9yLwB5n6yg7',
  instagram: { url: 'https://www.instagram.com/karandesai_a.d/', handle: '@karandesai_a.d' },
  visits: 'By appointment only',
  // The studio's own words (old contact page) — grammar tidied only; meaning unchanged. Pending client sign-off.
  statement: [
    'We are not a conventional team of architects and interior designers, but a unified movement of innovators and creators of unique design experiences.',
    'We offer design solutions that contribute to the well-being of our clients and bring real value to their life and work.',
    'Entering a space we have created, you should feel as if you were in your imagination.',
  ],
} as const;

export const nav = [
  { href: '/projects', label: 'Projects' },
  { href: '/objects', label: 'Objects' },
  { href: '/studio', label: 'Studio' },
  { href: '/contact', label: 'Contact' },
] as const;

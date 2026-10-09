import media from './media.generated.json';

// Projects — facts from context/SOURCE.md only.
// `location` / `description` exist ONLY where the client's own material states them.
// `scope` uses the studio's own tagline taxonomy (Architecture · Interiors · Objects),
// assigned from what the imagery visibly shows (building exteriors → Architecture).
// Alt text describes what is visible in each image.

export type MediaKey = keyof typeof media;

export type Img = {
  key: MediaKey;
  src: string;
  w: number;
  h: number;
  blur: string;
  color: string;
  alt: string;
  /** Visually evident medium: drawings get a caption & are shown on the paper ground. */
  kind: 'image' | 'drawing';
  caption?: string;
};

export type Chapter = { title?: string; images: Img[] };

export type Project = {
  slug: string;
  title: string;
  scope: 'Architecture' | 'Interiors';
  location?: string;
  /** Short factual line used for meta description & index (no claims). */
  summary: string;
  description?: string[];
  quote?: { text: string; by: string };
  cover: Img;
  chapters: Chapter[];
  /** Old URL slug on the client's previous site, for redirects. */
  legacySlug: string;
};

function img(key: MediaKey, alt: string, extra: Partial<Pick<Img, 'kind' | 'caption'>> = {}): Img {
  const m = media[key];
  return { key, ...m, alt, kind: extra.kind ?? 'image', caption: extra.caption };
}

const raw: Omit<Project, 'cover'>[] = [
  {
    slug: 'udaipur-resort',
    legacySlug: 'udaipurresort',
    title: 'Udaipur Resort',
    scope: 'Architecture',
    location: 'Rajasthan, India',
    summary: 'A resort in Rajasthan — sandstone wings, towers, terraced gardens and an arcaded pool hall.',
    chapters: [
      {
        images: [
          img('udaipur-resort/01', 'Sandstone resort façade with crenellated towers, lit at dusk above a curving driveway lined with clipped shrubs'),
          img('udaipur-resort/02', 'Garden terrace with a carved balustrade below domed chhatris and the resort wings at sunset'),
          img('udaipur-resort/03', 'Lower garden wall of pointed arches beneath the stepped sandstone wings'),
          img('udaipur-resort/04', 'Lawn court between two wings with arched openings and jali screens'),
          img('udaipur-resort/05', 'Arcaded indoor pool hall with cusped arches, loungers and a guest walking'),
          img('udaipur-resort/06', 'Axonometric of the resort: wings, courts, lawns and the oval approach drive', { kind: 'drawing', caption: 'Axonometric' }),
        ],
      },
    ],
  },
  {
    slug: 'red-fort-project',
    legacySlug: 'red-fort-project',
    title: 'Red Fort Project',
    scope: 'Interiors',
    location: 'Shrimad Rajchandra Ashram, Dharampur',
    summary: 'A second home for a family from Mumbai on the Ashram premises in Dharampur.',
    description: [
      'This second home, located on the Ashram premises of the Shrimad Rajchandra Mission, Dharampur, belongs to a family from Mumbai. It reflects the serene environment of its surroundings while catering to all the modern comforts and aesthetic requirements of its owners.',
      'The family comprises a young couple, their elderly parents and twin daughters.',
    ],
    quote: {
      text: 'We were not allowed to do much structurally — no plumbing work was possible in the bathroom too. But we changed the flooring to SPC, and redid some electric wiring too.',
      by: 'Karan Desai',
    },
    chapters: [
      {
        images: [
          img('red-fort-project/11', 'Living room with a pale blue sectional, lime-plastered walls and a terrace beyond'),
          img('red-fort-project/03', 'Open living and dining with a timber stair, kitchen and coral dining chairs'),
          img('red-fort-project/04', 'Dining table on dark marble pedestals with pale blue and coral chairs'),
          img('red-fort-project/08', 'Living area with a pale blue sofa, sculptural coffee table and stair beyond'),
        ],
      },
      {
        images: [
          img('red-fort-project/06', 'Bedroom with an arched coral headboard, dark four-poster bed and floral curtains'),
          img('red-fort-project/07', 'Bedroom corner with a writing desk, coral chair and arched headboard'),
          img('red-fort-project/12', 'Children’s room in pink with an arched alcove, ladder and terrazzo platform bed'),
          img('red-fort-project/05', 'Arched pink sleeping nook with terrazzo base and woven poufs'),
          img('red-fort-project/10', 'Bunk with a circular opening and a white ladder in a pink room'),
          img('red-fort-project/09', 'Pink wardrobe wall with an integrated study desk'),
        ],
      },
    ],
  },
  {
    slug: 'rc-house',
    legacySlug: 'rc-house',
    title: 'RC House',
    scope: 'Architecture',
    summary: 'A house of brick and exposed concrete, with perforated brick screens and garden terraces.',
    chapters: [
      {
        images: [
          img('rc-house/01', 'Street elevation of a brick and concrete house with perforated brick screens and planted terraces'),
          img('rc-house/02', 'The house seen from the street at dusk, brick volumes stacked over a lit entrance'),
          img('rc-house/03', 'Side elevation with vertical bands of jali brickwork between concrete floor plates'),
          img('rc-house/04', 'Garden porch under a concrete overhang with brick piers and outdoor seating'),
          img('rc-house/05', 'Lawn terrace with tall glazed sliding doors and a palm'),
          img('rc-house/06', 'Entrance passage under a brick soffit with globe pendants and a planted edge'),
        ],
      },
    ],
  },
  {
    slug: 'the-31st',
    legacySlug: 'the31st',
    title: 'The 31st',
    scope: 'Interiors',
    location: 'Ahmedabad',
    summary: 'An interior in Ahmedabad — living and dining, a guest bedroom and a bath.',
    chapters: [
      {
        title: 'Living & dining',
        images: [
          img('the-31st/01', 'Light-filled living room with arched mirrored panels, a marble coffee table and linen sofas'),
          img('the-31st/04', 'Living room at sunset with full-height black steel glazing'),
          img('the-31st/03', 'Dining area with a round marble table, cane-backed chairs and coffered ceiling'),
          img('the-31st/05', 'Round dining table beneath a ceiling fan, with arched wall panelling'),
          img('the-31st/02', 'Living room seen towards the glazing, with layered neutral textiles'),
        ],
      },
      {
        title: 'Guest bedroom',
        images: [
          img('the-31st/06', 'Guest bedroom with an upholstered wall, built-in study and arched reading niche'),
          img('the-31st/10', 'Guest bed framed by a panelled headboard wall and full-height shelving'),
          img('the-31st/08', 'Guest bedroom with an arched window seat and glass-fronted cabinets'),
          img('the-31st/11', 'Guest bedroom looking out through arched steel windows to a terrace'),
          img('the-31st/07', 'Study wall with lit shelving and a sage green panel'),
          img('the-31st/09', 'Guest bedroom with sheer curtains and a desk beside the bed'),
        ],
      },
      {
        title: 'Bath',
        images: [
          img('the-31st/13', 'Bath with blue toile wallpaper, a dark timber vanity and brass fittings'),
          img('the-31st/14', 'Twin brass taps on a marble vanity before navy panelled cabinetry'),
          img('the-31st/15', 'Bath with an arched mirror, toile walls and a glass shower'),
          img('the-31st/12', 'Shower with toile wallpaper, brass rain shower and a patterned floor'),
        ],
      },
    ],
  },
  {
    slug: 'agra-fort-project',
    legacySlug: 'agra-fort-project',
    title: 'Agra Fort Project',
    scope: 'Interiors',
    location: 'Shrimad Rajchandra Ashram, Dharampur',
    summary: 'A personalised bedroom in Dharampur with an automated Murphy bed, a sliding TV partition and a valley view.',
    description: [
      'The Agra Fort Project is a playful, personalised bedroom. It features an automated Murphy bed, a sliding partition for a TV, an adjustable study table, a spiritual valley view, and backlit Vondom furniture.',
      'The project combines functionality, technology and aesthetics, creating a stronghold of individuality and comfort — a blend of contemporary and timeless elegance.',
    ],
    chapters: [
      {
        images: [
          img('agra-fort-project/14', 'Living room with a circular skylight, a rust sectional and a valley view'),
          img('agra-fort-project/15', 'Living and dining under a pink ceiling cove, with curved built-in niches'),
          img('agra-fort-project/11', 'A sculptural spiral stair in white plaster seen from above'),
          img('agra-fort-project/10', 'Curving white stair beside a gilded figure and a large-leafed plant'),
          img('agra-fort-project/08', 'Curved banquette around a round table, with a textured circular wall relief'),
          img('agra-fort-project/07', 'Lounge corner with a circular ceiling cove, arched niches and a floor lamp'),
        ],
      },
      {
        images: [
          img('agra-fort-project/03', 'Automated Murphy bed lowered from a textured wall, with a framed photo wall'),
          img('agra-fort-project/04', 'The same wall with the bed folded away and a sofa in front'),
          img('agra-fort-project/12', 'Study with an ergonomic chair facing a full-height window to the valley'),
          img('agra-fort-project/06', 'Bedroom with a tufted headboard and a window over the valley'),
          img('agra-fort-project/05', 'Bedroom with a quilted bedspread beside a white sliding wardrobe'),
          img('agra-fort-project/09', 'Shrine niche at the end of a narrow lime-plastered passage'),
          img('agra-fort-project/13', 'Terrace with a lawn, white lounge chairs and a view over the hills'),
        ],
      },
    ],
  },
  {
    slug: 'gandhinagar-house',
    legacySlug: 'gandhnagar-house',
    title: 'Gandhinagar House',
    scope: 'Interiors',
    summary: 'A double-height living space with a dark marble feature wall and a suspended sculptural light.',
    chapters: [
      {
        images: [
          img('gandhinagar-house/01', 'Double-height living room with a black marble slot, sculptural pendant and cantilevered stair'),
          img('gandhinagar-house/02', 'Full height of the living room, from lounge chairs to the lit ceiling'),
          img('gandhinagar-house/03', 'Lounge with a marble media wall, timber slats and the kitchen beyond'),
        ],
      },
    ],
  },
  {
    slug: 'the-earthen-room',
    legacySlug: 'the-earthen-room',
    title: 'The Earthen Room',
    scope: 'Interiors',
    location: 'Ahmedabad',
    summary: 'A bedroom in Ahmedabad of plaster, cane-panelled timber wardrobes and earthen tones.',
    chapters: [
      {
        images: [
          img('the-earthen-room/01', 'Bedroom with a wall of cane-panelled timber wardrobes and a woven pendant; a figure walks past'),
          img('the-earthen-room/03', 'Bed in earthy pink and moss green before tall timber wardrobes'),
          img('the-earthen-room/02', 'Corner with a woven pendant over a timber bedside table and plastered walls'),
          img('the-earthen-room/04', 'Rendered plan of the bedroom showing the bed, wardrobes and seating', { kind: 'drawing', caption: 'Plan' }),
        ],
      },
    ],
  },
  {
    slug: 'figuring-out',
    legacySlug: 'figuring-out',
    title: 'Figuring Out',
    scope: 'Interiors',
    summary: 'A residential interior with timber ceilings, crystal chandeliers and a suspended swing seat.',
    chapters: [
      {
        images: [
          img('figuring-out/01', 'Living room under a timber ceiling with a crystal chandelier and grey panelled walls'),
          img('figuring-out/02', 'Lounge with tufted armchairs and a suspended swing seat'),
          img('figuring-out/04', 'Dining area with a lit shelving wall beside the swing seat'),
          img('figuring-out/03', 'Grey kitchen with timber upper cabinets and dark stone counters'),
        ],
      },
    ],
  },
  {
    slug: 'house-2',
    legacySlug: 'house-2',
    title: 'House 2',
    scope: 'Interiors',
    summary: 'A home interior of textured wall panels, sage upholstery, leather and devotional art.',
    chapters: [
      {
        images: [
          img('house-2/01', 'Living room with a sage sofa against textured wall panels with brass inlays'),
          img('house-2/02', 'Living and dining under a coved ceiling, with a devotional painting beyond'),
          img('house-2/05', 'Lounge with leather armchairs, a white coffee table and a media wall'),
          img('house-2/04', 'Dining table beneath a devotional painting, with panelled walls'),
          img('house-2/06', 'Dining room with upholstered chairs and a blue devotional painting'),
        ],
      },
    ],
  },
  {
    slug: 'kids-room',
    legacySlug: 'kids-room',
    title: 'Kids Room',
    scope: 'Interiors',
    summary: 'A child’s room with hot-air-balloon wallpaper, a triangular bookshelf and a chalkboard wall.',
    chapters: [
      {
        images: [
          img('kids-room/02', 'Triangular timber bookshelf over a low storage unit, with balloon wallpaper'),
          img('kids-room/01', 'Study wall with yellow chairs, open shelving and balloon wallpaper'),
          img('kids-room/04', 'Daybed with yellow cushions, toys and a chalkboard wall'),
          img('kids-room/05', 'Daybed and white wardrobes beside balloon wallpaper'),
          img('kids-room/03', 'Study desk beside a white wardrobe'),
        ],
      },
    ],
  },
];

export const projects: Project[] = raw.map((p) => ({ ...p, cover: p.chapters[0].images[0] }));

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectImages = (p: Project) => p.chapters.flatMap((c) => c.images);

export const neighbours = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
    index: i,
  };
};

export const pad = (n: number) => String(n).padStart(2, '0');

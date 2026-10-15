// Builds the 9-page client report: engagement/06-client-deck/MACK-Digital-Foundation.pptx
// (The earlier 20-slide version is built by build-deck-full.cjs into archive/.)
//
// Usage (from any scratch folder that has the two dependencies installed):
//   npm i pptxgenjs@3.12.0 sharp@0.34.5
//   NODE_PATH=./node_modules node <repo>/engagement/06-client-deck/build/build-deck.cjs
// Then apply the theme colours (pptx skill): applyTheme(<out>, THEME) — done at the end below
// when APPLY_THEME points at the skill's apply_theme.js.
//
// Images come from the website's own graded masters (public/media). No pricing anywhere.

const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const pptxgen = require('pptxgenjs');
const sharp = require('sharp');

const REPO = path.resolve(__dirname, '..', '..', '..');
const OUT = path.resolve(__dirname, '..', 'MACK-Digital-Foundation.pptx');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'mack-deck-'));

// ---------------------------------------------------------------- theme
// Palette = the website's design tokens (src/app/globals.css): lime-plaster paper, warm ink,
// one night tone, and a single sandstone accent used sparingly.
const THEME = {
  name: 'MACK Digital Foundation',
  headFontFace: 'Georgia',
  bodyFontFace: 'Arial',
  colors: {
    dk1: '1A1916', // ink
    lt1: 'EFECE6', // paper
    dk2: '4A463F', // ink-2
    lt2: 'E5E1D9', // paper-2 (stone band)
    accent1: '161513', // night
    accent2: '6B665E', // ink-3 (labels, metadata)
    accent3: '9C6A47', // sandstone (sparingly)
    accent4: 'A8A297', // on-night-2
    accent5: 'C9C3B7', // hairline rule
    accent6: 'F8F6F2', // sheet (report mock)
    hlink: '1A1916',
    folHlink: '4A463F',
  },
};

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.333 × 7.5 in
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = 'Digital Foundation — MACK & Co Architects';
pres.subject = 'Search visibility, local presence, measurement and studio infrastructure';
pres.author = 'Yash Sharma';

const C = pres.SchemeColor;
const INK = C.text1;
const INK2 = C.text2;
const INK3 = C.accent2;
const PAPER = C.background1;
const STONE = C.background2;
const NIGHT = C.accent1;
const SAND = C.accent3;
const ONNIGHT2 = C.accent4;
const RULE = C.accent5;
const SHEET = C.accent6;

const W = 13.333;
const L = 0.6; // left margin
const R = W - 0.6; // right edge
const CW = R - L; // content width
const SERIF = '+mj-lt'; // theme heading font

// ---------------------------------------------------------------- assets
async function jpg(key, width = 1800) {
  const out = path.join(TMP, key.replace(/\//g, '_') + '.jpg');
  await sharp(path.join(REPO, 'public', 'media', key + '.webp')).resize({ width, withoutEnlargement: true }).jpeg({ quality: 84 }).toFile(out);
  const m = await sharp(out).metadata();
  return { path: out, w: m.width, h: m.height };
}
async function monogram(hex) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 685 663" width="685" height="663" fill="#${hex}">
    <path d="M1 7 147 122 295 7V316H1Z"/><path d="M498 0 684 316H310Z"/>
    <path d="M175 505 291 389A164 164 0 1 0 291 621Z"/><path d="M356 349H656L547 505 662 661H356Z"/></svg>`;
  const out = path.join(TMP, `mono-${hex}.png`);
  await sharp(Buffer.from(svg)).resize(480).png().toFile(out);
  return out;
}

// ---------------------------------------------------------------- helpers
function T(slide, text, o = {}) {
  const opts = {
    x: o.x, y: o.y, w: o.w, h: o.h,
    fontSize: o.size ?? 14,
    color: o.color ?? INK,
    bold: o.bold ?? false,
    italic: o.italic ?? false,
    align: o.align ?? 'left',
    valign: o.valign ?? 'top',
    margin: o.margin ?? 0,
    isTextBox: true,
    lineSpacingMultiple: o.lsm ?? 1.12,
    paraSpaceAfter: o.psa ?? 0,
    fit: 'none',
    objectName: o.name,
  };
  if (o.serif) opts.fontFace = SERIF;
  if (o.spacing) opts.charSpacing = o.spacing;
  if (o.rotate) opts.rotate = o.rotate;
  slide.addText(text, opts);
}
function label(slide, text, o) {
  T(slide, text.toUpperCase(), { size: 9.5, color: INK3, spacing: 1.6, ...o });
}
function box(slide, x, y, w, h, o = {}) {
  slide.addShape(o.round ? pres.shapes.ROUNDED_RECTANGLE : pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: o.fill ? { color: o.fill } : { type: 'none' },
    line: o.line === false ? { type: 'none' } : { color: o.line ?? INK, width: o.lw ?? 0.75, dashType: o.dash ?? 'solid' },
    rectRadius: o.round ? o.round : undefined,
    objectName: o.name,
  });
}
function ln(slide, x1, y1, x2, y2, o = {}) {
  slide.addShape(pres.shapes.LINE, {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    flipH: x2 < x1, flipV: y2 < y1,
    line: { color: o.color ?? INK, width: o.lw ?? 0.75, dashType: o.dash ?? 'solid', endArrowType: o.arrow ? 'triangle' : undefined },
  });
}
function hair(slide, x, y, w, color = RULE) {
  ln(slide, x, y, x + w, y, { color, lw: 0.75 });
}
function dot(slide, x, y, d, filled, color = INK) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: filled ? { color } : { type: 'none' }, line: { color, width: 0.75 } });
}
function node(slide, x, y, w, h, text, o = {}) {
  box(slide, x, y, w, h, { fill: o.fill, line: o.line ?? INK, dash: o.dash, lw: o.lw });
  T(slide, text, { x: x + 0.12, y, w: w - 0.24, h, size: o.size ?? 13, color: o.color ?? INK, valign: 'middle', align: o.align ?? 'left', serif: o.serif });
}
function content(sectionTitle, kicker, title, notes) {
  const s = pres.addSlide({ masterName: 'MACK_CONTENT', sectionTitle });
  s.addText(kicker.toUpperCase(), { placeholder: 'kicker', charSpacing: 1.6 });
  s.addText(title, { placeholder: 'title' });
  if (notes) s.addNotes(notes);
  return s;
}
function lede(slide, text, y = 1.58, w = 10.6) {
  T(slide, text, { x: L, y, w, h: 0.5, size: 15, color: INK2, lsm: 1.15 });
}

// ---------------------------------------------------------------- layouts
const footer = (dark) => [
  { text: { text: 'MACK & Co Architects  ·  Digital Foundation', options: { x: L, y: 7.0, w: 6, h: 0.22, fontSize: 8.5, color: dark ? ONNIGHT2 : INK3, charSpacing: 1, margin: 0, isTextBox: true } } },
];
pres.defineSlideMaster({
  title: 'MACK_CONTENT',
  background: { color: PAPER },
  margin: [0.4, 0.6, 0.6, 0.6],
  objects: [
    { placeholder: { options: { name: 'kicker', type: 'body', x: L, y: 0.46, w: 9, h: 0.25, fontSize: 9.5, color: INK3, margin: 0, valign: 'top' }, text: '' } },
    { placeholder: { options: { name: 'title', type: 'title', x: L, y: 0.74, w: CW, h: 0.72, fontSize: 32, color: INK, margin: 0, valign: 'top', align: 'left' }, text: '' } },
    ...footer(false),
  ],
  slideNumber: { x: R - 0.6, y: 7.0, w: 0.6, h: 0.22, fontSize: 8.5, color: INK3, align: 'right', margin: 0 },
});
pres.defineSlideMaster({
  title: 'MACK_DARK',
  background: { color: NIGHT },
  margin: [0.4, 0.6, 0.6, 0.6],
  objects: [
    { placeholder: { options: { name: 'kicker', type: 'body', x: L, y: 0.46, w: 9, h: 0.25, fontSize: 9.5, color: ONNIGHT2, margin: 0, valign: 'top' }, text: '' } },
    { placeholder: { options: { name: 'title', type: 'title', x: L, y: 0.74, w: CW, h: 0.72, fontSize: 32, color: PAPER, margin: 0, valign: 'top', align: 'left' }, text: '' } },
    ...footer(true),
  ],
  slideNumber: { x: R - 0.6, y: 7.0, w: 0.6, h: 0.22, fontSize: 8.5, color: ONNIGHT2, align: 'right', margin: 0 },
});
pres.defineSlideMaster({ title: 'MACK_COVER', background: { color: NIGHT }, objects: [] });

// ================================================================ slides (9-page report)
async function build() {
  const img = {
    agra: await jpg('agra-fort-project/14'),
    redfort: await jpg('red-fort-project/11'),
    udaipur: await jpg('udaipur-resort/01'),
    stair: await jpg('agra-fort-project/11'),
    rc: await jpg('rc-house/01'),
  };
  const monoLight = await monogram('EFECE6');
  const arrowDown = (s, x, y1, y2, color = INK3) => ln(s, x, y1, x, y2, { arrow: true, color, lw: 0.75 });
  const list = (s, items, o) => T(s, items.map((t, j) => ({ text: t, options: { breakLine: j < items.length - 1 } })), o);

  // ------------------------------------------------------------ 1 cover
  pres.addSection({ title: 'Opening' });
  {
    const s = pres.addSlide({ masterName: 'MACK_COVER', sectionTitle: 'Opening' });
    s.addImage({ path: img.agra.path, x: 6.35, y: 0, w: W - 6.35, h: 7.5, sizing: { type: 'cover', w: W - 6.35, h: 7.5 }, altText: 'Agra Fort Project living room under a circular skylight (photography)' });
    s.addImage({ path: monoLight, x: 0.7, y: 0.7, w: 0.52, h: 0.52 * 663 / 685, altText: 'MACK monogram' });
    T(s, 'MACK & CO ARCHITECTS', { x: 1.45, y: 0.82, w: 4, h: 0.3, size: 10, color: PAPER, spacing: 2.4 });
    T(s, 'Digital\nFoundation', { x: 0.7, y: 2.1, w: 5.4, h: 1.6, size: 52, color: PAPER, serif: true, lsm: 0.98 });
    T(s, 'The connected digital layer around MACK’s architecture', { x: 0.7, y: 3.95, w: 4.9, h: 0.8, size: 16, color: ONNIGHT2, lsm: 1.2 });
    hair(s, 0.7, 5.95, 5.0, INK3);
    T(s, 'Prepared for Ayushi and the MACK & Co team', { x: 0.7, y: 6.08, w: 5.2, h: 0.28, size: 11, color: PAPER });
    T(s, 'October 2026  ·  Yash Sharma', { x: 0.7, y: 6.4, w: 5.2, h: 0.28, size: 11, color: ONNIGHT2 });
    T(s, 'Cover: Agra Fort Project, Dharampur — photography', { x: 0.7, y: 6.95, w: 5.2, h: 0.22, size: 8.5, color: ONNIGHT2 });
    s.addNotes('A short, visual plan for the digital layer around the studio: how people discover MACK, what is being built, how it is implemented and measured, and the next steps.');
  }

  // ------------------------------------------------------------ 2 the digital destination
  pres.addSection({ title: 'System' });
  {
    const s = content('System', '01 — The digital destination', 'One destination for every way MACK is found',
      'Read left to right. However someone first hears of MACK — a search, Maps, Instagram, a publication or a recommendation — they arrive at the studio\'s own website. ' +
        'There they explore projects and the studio, then act: an enquiry, a call, directions or an email. Every step is measured, and the measurements feed a monthly round of improvement.');
    const cols = [
      { h: 'Discovery', items: ['Google Search', 'Google Maps', 'Instagram', 'Publications', 'Referrals'] },
      { h: 'Destination', items: ['Website', 'Portfolio', 'Studio identity'], dark: true },
      { h: 'Discovery & trust', items: ['Projects', 'Services', 'Architecture', 'Studio'] },
      { h: 'Action', items: ['Enquiry', 'Call', 'Directions', 'Email'] },
      { h: 'Measurement', items: ['Analytics', 'Search Console', 'Business Profile'] },
    ];
    const cw = 2.05, gap = (CW - 5 * cw) / 4, by = 2.35, bh = 2.85, mid = by + bh / 2;
    cols.forEach((c, i) => {
      const x = L + i * (cw + gap);
      label(s, c.h, { x, y: 1.95, w: cw, h: 0.25 });
      if (c.dark) {
        box(s, x, by, cw, bh, { fill: NIGHT, line: false });
        T(s, 'MACK', { x: x + 0.22, y: by + 0.25, w: cw - 0.4, h: 0.6, size: 30, serif: true, color: PAPER });
        c.items.forEach((t, j) => T(s, t, { x: x + 0.22, y: by + 1.2 + j * 0.45, w: cw - 0.4, h: 0.35, size: 14, color: ONNIGHT2 }));
      } else {
        box(s, x, by, cw, bh, { line: INK, lw: 0.75, fill: i === 4 ? STONE : undefined });
        const step = bh / c.items.length;
        c.items.forEach((t, j) => {
          if (j > 0) hair(s, x + 0.15, by + j * step, cw - 0.3, RULE);
          T(s, t, { x: x + 0.2, y: by + j * step, w: cw - 0.3, h: step, size: 14, serif: true, valign: 'middle' });
        });
      }
      if (i < cols.length - 1) ln(s, x + cw + 0.07, mid, x + cw + gap - 0.07, mid, { arrow: true, lw: 0.9 });
    });
    // improvement loop: measurement → back to discovery
    const x0 = L + cw / 2, x4 = L + 4 * (cw + gap) + cw / 2, ly = 5.75;
    ln(s, x4, by + bh, x4, ly, { color: SAND, lw: 1 });
    ln(s, x4, ly, x0, ly, { color: SAND, lw: 1 });
    ln(s, x0, ly, x0, by + bh + 0.04, { color: SAND, lw: 1, arrow: true });
    box(s, W / 2 - 1.55, ly - 0.22, 3.1, 0.44, { fill: PAPER, line: false });
    T(s, 'Continuous improvement', { x: W / 2 - 1.55, y: ly - 0.22, w: 3.1, h: 0.44, size: 16, serif: true, italic: true, color: SAND, align: 'center', valign: 'middle' });
  }

  // ------------------------------------------------------------ 3 discovery system
  {
    const s = content('System', '02 — The discovery system', 'SEO is one part of a connected system',
      'Digital marketing — content, Instagram, publications — creates and widens awareness. SEO makes MACK findable at the moment people actively search, in Google Search and Maps. ' +
        'The website turns that attention into understanding and trust. The Google Business Profile connects local discovery with calls, directions and visits. Analytics shows what actually produces enquiries, which shapes the next round of work.');
    s.addImage({ path: img.udaipur.path, x: L, y: 1.75, w: 3.75, h: 4.95, sizing: { type: 'cover', w: 3.75, h: 4.95 }, altText: 'Udaipur Resort sandstone façade at dusk (visualisation)' });
    T(s, 'Udaipur Resort, Rajasthan — visualisation', { x: L, y: 6.75, w: 3.75, h: 0.2, size: 8.5, color: INK3 });
    const nodes = ['Content · Social · Publications', 'Awareness', 'Search + Maps', 'MACK website', 'Projects + credibility', 'Enquiry · Call · Visit', 'Analytics'];
    const sx = 5.0, sw = 3.3, nh = 0.44, ng = 0.28, y0 = 1.75;
    const yc = [];
    nodes.forEach((t, i) => {
      const y = y0 + i * (nh + ng);
      yc.push(y + nh / 2);
      const dark = i === 3;
      box(s, sx, y, sw, nh, { fill: dark ? NIGHT : i === 6 ? STONE : undefined, line: dark || i === 6 ? false : INK, lw: 0.75 });
      T(s, t, { x: sx, y, w: sw, h: nh, size: dark ? 15 : 13, serif: dark, color: dark ? PAPER : INK, align: 'center', valign: 'middle' });
      if (i < nodes.length - 1) arrowDown(s, sx + sw / 2, y + nh + 0.04, y + nh + ng - 0.04, INK);
    });
    // loop back to the top
    const lx = sx - 0.32;
    ln(s, sx, yc[6], lx, yc[6], { color: SAND, lw: 1 });
    ln(s, lx, yc[6], lx, yc[0], { color: SAND, lw: 1 });
    ln(s, lx, yc[0], sx - 0.04, yc[0], { color: SAND, lw: 1, arrow: true });
    // roles
    const roles = [
      [0, 'Digital marketing', 'creates and expands discovery'],
      [2, 'SEO', 'found when people actively search'],
      [3, 'Website', 'turns attention into trust'],
      [5, 'Google Business Profile', 'calls, directions and visits'],
      [6, 'Analytics', 'shows what produces enquiries'],
    ];
    const rx = 8.85;
    roles.forEach(([i, n, d]) => {
      ln(s, sx + sw + 0.06, yc[i], rx - 0.12, yc[i], { color: RULE, lw: 0.75 });
      T(s, n, { x: rx, y: yc[i] - 0.3, w: R - rx, h: 0.32, size: 15, serif: true, color: i === 2 ? SAND : INK });
      T(s, d, { x: rx, y: yc[i] + 0.02, w: R - rx, h: 0.3, size: 12, color: INK2 });
    });
  }

  // ------------------------------------------------------------ 4 what we are building
  pres.addSection({ title: 'Foundation' });
  {
    const s = content('Foundation', '03 — What we are building', 'A complete digital foundation, owned by MACK',
      'The studio domain is the root: email, website, workspace and Google\'s tools all connect to it, so it is registered in MACK\'s name first. ' +
        'Every account belongs to the studio; access is granted to implement and documented in an access map. First items to confirm: the studio\'s real-world name, the domain, and how the existing Google listing at the studio address should represent MACK.');
    const dx = L, dy = 1.95, dw = 3.0, dh = 4.25;
    box(s, dx, dy, dw, dh, { fill: NIGHT, line: false });
    label(s, 'The root', { x: dx + 0.25, y: dy + 0.3, w: 2.5, h: 0.25, color: ONNIGHT2 });
    T(s, 'Studio domain', { x: dx + 0.25, y: dy + 0.62, w: 2.6, h: 0.5, size: 24, serif: true, color: PAPER });
    T(s, 'Registered to MACK', { x: dx + 0.25, y: dy + 1.2, w: 2.6, h: 0.3, size: 13, color: ONNIGHT2 });
    hair(s, dx + 0.25, dy + 2.9, dw - 0.5, INK3);
    list(s, ['Every account studio-owned', 'Access granted to implement', 'Documented in an access map'], { x: dx + 0.25, y: dy + 3.05, w: dw - 0.45, h: 1.0, size: 12, color: ONNIGHT2, psa: 4 });
    const groups = [
      ['Identity', [['Professional email', 'name@ the studio domain'], ['Website', 'launched and indexed']]],
      ['Workspace', [['Cloud workspace', '2–3 TB, shared by project'], ['Independent backup', 'versioned, one copy off-site']]],
      ['Visibility', [['Search Console', 'how Google sees the site'], ['Analytics', 'visits, enquiries, calls'], ['Business Profile', 'Google Search and Maps']]],
    ];
    const gx0 = 4.1, gw = 2.72, gg = (R - gx0 - 3 * gw) / 2, busY = dy + 0.12;
    ln(s, dx + dw, busY, gx0 + 2 * (gw + gg) + gw / 2, busY, { color: INK, lw: 0.75 });
    groups.forEach(([g, items], i) => {
      const x = gx0 + i * (gw + gg);
      ln(s, x + gw / 2, busY, x + gw / 2, busY + 0.25, { color: INK, lw: 0.75 });
      label(s, g, { x, y: busY + 0.36, w: gw, h: 0.25, align: 'center' });
      items.forEach(([n, d], j) => {
        const y = busY + 0.8 + j * 1.12;
        box(s, x, y, gw, 0.95, { line: INK, lw: 0.75, fill: n === 'Independent backup' ? STONE : undefined });
        T(s, n, { x: x + 0.18, y: y + 0.14, w: gw - 0.3, h: 0.36, size: 16, serif: true });
        T(s, d, { x: x + 0.18, y: y + 0.52, w: gw - 0.3, h: 0.3, size: 12, color: INK2 });
      });
    });
  }

  // ------------------------------------------------------------ 5 search + portfolio
  pres.addSection({ title: 'Search' });
  {
    const s = content('Search', '04 — Search and portfolio', 'From technical foundation to discovery',
      'Visibility is built from the ground up. A technical foundation (indexing, structured data, mobile speed); service pages for architecture, interiors and objects; project pages with place, type, year, a written story and credited images; ' +
        'local presence through the Google Business Profile, reviews and a profile for each new studio; and authority through architecture platforms and publications. The result is discovery by name, by service and by project. ' +
        'A publishing system makes every new project follow the same standard.');
    const layers = [
      ['Discovery', 'found by name, service and project', 'top'],
      ['Authority', 'publications · Archello · Architizer'],
      ['Local presence', 'Business Profile · reviews · new studios'],
      ['Projects', 'facts · story · image SEO & credits'],
      ['Services', 'Architecture · Interiors · Objects'],
      ['Technical foundation', 'indexing · structured data · speed', 'base'],
    ];
    const bh = 0.66, bg = 0.08, base = 6.68;
    const widths = [4.7, 5.25, 5.8, 6.35, 6.9, 7.45];
    layers.forEach(([n, d, kind], i) => {
      const y = base - (layers.length - i) * (bh + bg) + bg;
      const w = widths[i];
      const dark = kind === 'base';
      const top = kind === 'top';
      box(s, L, y, w, bh, { fill: dark ? NIGHT : top ? undefined : i % 2 ? STONE : PAPER, line: dark ? false : top ? SAND : INK, lw: top ? 1.25 : 0.75 });
      T(s, n, { x: L + 0.2, y, w: 2.4, h: bh, size: 15, serif: true, color: dark ? PAPER : top ? SAND : INK, valign: 'middle' });
      T(s, d, { x: L + 2.55, y, w: w - 2.7, h: bh, size: 12, color: dark ? ONNIGHT2 : INK2, valign: 'middle' });
    });
    // project page
    const px = 8.55, pw = R - px;
    s.addImage({ path: img.redfort.path, x: px, y: 1.75, w: pw, h: 2.75, sizing: { type: 'cover', w: pw, h: 2.75 }, altText: 'Red Fort Project living room with a valley view (photography)' });
    T(s, 'Red Fort Project, Dharampur — photography', { x: px, y: 4.56, w: pw, h: 0.2, size: 8.5, color: INK3 });
    label(s, 'Every project page', { x: px, y: 4.95, w: pw, h: 0.22 });
    [['Place · type · year'], ['The story of the brief'], ['Credited images'], ['Related work → enquiry']].forEach(([t], i) => {
      const y = 5.25 + i * 0.32;
      hair(s, px, y, pw, i === 0 ? INK : RULE);
      T(s, t, { x: px, y: y + 0.05, w: pw, h: 0.26, size: 12.5, color: INK2 });
    });
    T(s, 'One publishing system for every new project', { x: px, y: 6.55, w: pw, h: 0.26, size: 12, italic: true, color: SAND });
  }

  // ------------------------------------------------------------ 6 visibility to business
  {
    const s = content('Search', '05 — From visibility to business', 'From visibility to enquiries, measured monthly',
      'The same journey, measured. Searches and Maps views come from Search Console and the Business Profile; visits, project exploration, enquiries, call taps and direction requests from Analytics and the studio\'s enquiry log. ' +
        'Each month a one-page report and a live dashboard, owned by the studio, answer three questions: what changed, why it matters, and what happens next.');
    const flow = [
      ['Search · Maps · Content', 'Search Console', 'searches and views'],
      ['Website', 'Analytics', 'visits by source'],
      ['Project exploration', 'Analytics', 'most-viewed projects'],
      ['Enquiry · Call · Directions', 'Analytics + log', 'enquiries and contact'],
      ['Measurement', 'Dashboard', 'what produces enquiries'],
    ];
    const fw = 2.1, fg = (CW - 5 * fw) / 4, fy = 1.85, fh = 0.8;
    flow.forEach(([n, src, m], i) => {
      const x = L + i * (fw + fg);
      const dark = i === 4;
      box(s, x, fy, fw, fh, { fill: dark ? NIGHT : i === 1 ? STONE : undefined, line: dark || i === 1 ? false : INK, lw: 0.75 });
      T(s, n, { x: x + 0.12, y: fy, w: fw - 0.24, h: fh, size: 14, serif: true, color: dark ? PAPER : INK, align: 'center', valign: 'middle' });
      if (i < flow.length - 1) ln(s, x + fw + 0.06, fy + fh / 2, x + fw + fg - 0.06, fy + fh / 2, { arrow: true, lw: 0.9 });
      label(s, src, { x, y: fy + fh + 0.2, w: fw, h: 0.25, align: 'center' });
      T(s, m, { x, y: fy + fh + 0.47, w: fw, h: 0.3, size: 12, color: INK2, align: 'center' });
    });
    const iy = 3.95, ih = 2.75;
    s.addImage({ path: img.rc.path, x: L, y: iy, w: 4.6, h: ih, sizing: { type: 'cover', w: 4.6, h: ih }, altText: 'RC House street elevation in brick and concrete (visualisation)' });
    T(s, 'RC House — visualisation', { x: L, y: iy + ih + 0.05, w: 4.6, h: 0.2, size: 8.5, color: INK3 });
    const rx = 5.75, rw = R - rx;
    label(s, 'The monthly report', { x: rx, y: iy, w: rw, h: 0.25 });
    hair(s, rx, iy + 0.36, rw, INK);
    ['What changed?', 'Why it matters.', 'What happens next.'].forEach((t, i) => {
      T(s, t, { x: rx, y: iy + 0.55 + i * 0.58, w: rw, h: 0.5, size: 24, serif: true, color: i === 2 ? SAND : INK });
    });
    hair(s, rx, iy + 2.38, rw, RULE);
    T(s, 'One page  ·  live dashboard  ·  owned by the studio', { x: rx, y: iy + 2.48, w: rw, h: 0.28, size: 12, color: INK3 });
  }

  // ------------------------------------------------------------ 7 roadmap
  pres.addSection({ title: 'Roadmap' });
  {
    const s = content('Roadmap', '06 — Implementation roadmap', 'Six milestones in one month, then monthly care',
      'Week one: domain, email, workspace and backup. The site launches and connects to Google in the first two weeks. ' +
        'Google Business Profile and portfolio pages run through weeks two to four; their exact timing follows Google\'s verification and the project information from the studio. ' +
        'Authority work and monthly measurement begin in week four and continue every month.');
    // half-week units: 4 weeks = 8 units, then 2 units for "Ongoing"
    const lx = L, lw = 3.0, gx = 3.75, units = 10, u = (R - gx) / units, hy = 1.85;
    [['Week 1', 0, 2], ['Week 2', 2, 4], ['Week 3', 4, 6], ['Week 4', 6, 8], ['Ongoing', 8, 10]].forEach(([t, a0, b0]) => {
      T(s, t, { x: gx + a0 * u, y: hy, w: (b0 - a0) * u, h: 0.26, size: 10.5, color: t === 'Ongoing' ? SAND : INK3, align: 'center' });
      ln(s, gx + a0 * u, hy + 0.36, gx + a0 * u, 6.3, { color: RULE, lw: 0.5 });
    });
    ln(s, R, hy + 0.36, R, 6.3, { color: RULE, lw: 0.5 });
    hair(s, L, hy + 0.36, CW, INK);
    // [name, outcome, start unit, end unit, ongoing-until unit]
    const ms = [
      ['Foundation', 'Domain · email · workspace · backup', 0, 2, null],
      ['Launch', 'Site live and connected to Google', 1, 4, null],
      ['Local presence', 'Verified Google Maps presence', 2, 8, null],
      ['Portfolio', 'Projects and services discoverable', 3, 8, null],
      ['Authority & growth', 'Platforms · publications · reviews', 6, 8, 10],
      ['Measure & improve', 'Dashboard · monthly report', 6, 8, 10],
    ];
    const ry0 = hy + 0.5, rh = 0.66;
    ms.forEach(([name, out, a0, b0, ext], i) => {
      const y = ry0 + i * rh;
      T(s, String(i + 1).padStart(2, '0'), { x: lx, y: y + 0.04, w: 0.45, h: 0.3, size: 12, color: SAND, serif: true });
      T(s, name, { x: lx + 0.45, y: y + 0.0, w: lw - 0.45, h: 0.32, size: 15, serif: true });
      T(s, out, { x: lx + 0.45, y: y + 0.32, w: lw - 0.5, h: 0.26, size: 10.5, color: INK3 });
      const bx = gx + a0 * u + 0.04, bend = gx + b0 * u - 0.04;
      box(s, bx, y + 0.12, bend - bx, 0.3, { fill: NIGHT, line: false });
      if (ext) box(s, gx + b0 * u + 0.04, y + 0.12, ext * u - b0 * u - 0.08, 0.3, { line: INK, lw: 0.75 });
    });
    hair(s, L, 6.3, CW, RULE);
    T(s, [
      { text: 'Solid', options: { bold: true, color: INK } },
      { text: ' — implementation    ', options: { color: INK3 } },
      { text: 'Outlined', options: { bold: true, color: INK } },
      { text: ' — every month    ·    Begins after alignment and access', options: { color: INK3 } },
    ], { x: L, y: 6.42, w: CW, h: 0.3, size: 11 });
  }

  // ------------------------------------------------------------ 8 what MACK receives
  pres.addSection({ title: 'Close' });
  {
    const s = content('Close', '07 — What MACK receives', 'Everything in place, owned by the studio',
      'Four groups, each something the studio can open, check or use. All accounts and assets remain MACK\'s property.');
    s.addImage({ path: img.stair.path, x: L, y: 1.75, w: 3.55, h: 4.95, sizing: { type: 'cover', w: 3.55, h: 4.95 }, altText: 'Sculptural spiral staircase, Agra Fort Project (photography)' });
    T(s, 'Agra Fort Project — photography', { x: L, y: 6.75, w: 3.55, h: 0.2, size: 8.5, color: INK3 });
    const groups = [
      ['Identity & workspace', ['Studio-owned domain', 'Professional email', '2–3 TB cloud workspace', 'Independent, tested backup', 'Access map — MACK owns every account']],
      ['Website & search', ['Site launched and indexed', 'Technical SEO and structured data', 'Service and project pages', 'Image SEO and credits', 'Project publishing system']],
      ['Local presence & authority', ['Verified Google Business Profile', 'Consistent studio details', 'Review process', 'Architecture platforms and publications', 'Google presence for each new studio']],
      ['Measurement & care', ['Search Console and Analytics', 'Enquiry and call tracking', 'Live dashboard', 'Monthly report', 'Monthly maintenance and improvement']],
    ];
    const gx0 = 4.6, gw = (R - gx0 - 0.45) / 2;
    groups.forEach(([g, items], i) => {
      const x = gx0 + (i % 2) * (gw + 0.45);
      const y = 1.75 + Math.floor(i / 2) * 2.55;
      T(s, g, { x, y, w: gw, h: 0.4, size: 17, serif: true, color: i === 0 ? SAND : INK });
      hair(s, x, y + 0.46, gw, INK);
      list(s, items, { x, y: y + 0.6, w: gw, h: 1.75, size: 13, color: INK2, psa: 5, lsm: 1.1 });
    });
  }

  // ------------------------------------------------------------ 9 next steps
  {
    const s = pres.addSlide({ masterName: 'MACK_DARK', sectionTitle: 'Close' });
    s.addText('08 — NEXT STEPS', { placeholder: 'kicker', charSpacing: 1.6 });
    s.addText('Next steps', { placeholder: 'title' });
    s.addNotes('Align on the studio name, domain and services; set up accounts in MACK\'s name and grant access; implement the six milestones; measure through the dashboard and monthly report; and improve every month.');
    const steps = [
      ['Align', 'Studio name, domain and services'],
      ['Access', 'Accounts in MACK’s name, access granted'],
      ['Implement', 'Milestones one to six'],
      ['Measure', 'Dashboard and monthly report'],
      ['Improve', 'Refined every month'],
    ];
    const cw = 2.2, gap = (CW - 5 * cw) / 4;
    steps.forEach(([t, d], i) => {
      const x = L + i * (cw + gap);
      T(s, String(i + 1).padStart(2, '0'), { x, y: 2.75, w: 0.8, h: 0.45, size: 26, serif: true, color: SAND });
      if (i < steps.length - 1) ln(s, x + 0.78, 3.0, x + cw + gap - 0.1, 3.0, { arrow: true, color: ONNIGHT2, lw: 0.75 });
      T(s, t, { x, y: 3.4, w: cw, h: 0.6, size: 30, serif: true, color: PAPER });
      hair(s, x, 4.18, cw, INK3);
      T(s, d, { x, y: 4.32, w: cw - 0.1, h: 0.7, size: 13.5, color: ONNIGHT2, lsm: 1.15 });
    });
    s.addImage({ path: monoLight, x: L, y: 5.95, w: 0.5, h: 0.5 * 663 / 685, altText: 'MACK monogram' });
  }

  await pres.writeFile({ fileName: OUT });
  if (process.env.APPLY_THEME) {
    const { applyTheme } = require(process.env.APPLY_THEME);
    await applyTheme(OUT, THEME);
  }
  console.log('wrote', OUT);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});

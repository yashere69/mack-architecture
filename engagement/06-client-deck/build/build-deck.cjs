// Builds the client deck: engagement/06-client-deck/MACK-Digital-Foundation.pptx
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
const TOTAL = 19;

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

// ================================================================ slides
async function build() {
  const img = {
    agra: await jpg('agra-fort-project/14'),
    redfort: await jpg('red-fort-project/11'),
    udaipur: await jpg('udaipur-resort/01'),
  };
  const monoLight = await monogram('EFECE6');
  const monoInk = await monogram('1A1916');

  // ------------------------------------------------------------ 01 cover
  pres.addSection({ title: 'Opening' });
  {
    const s = pres.addSlide({ masterName: 'MACK_COVER', sectionTitle: 'Opening' });
    s.addImage({ path: img.agra.path, x: 6.35, y: 0, w: W - 6.35, h: 7.5, sizing: { type: 'cover', w: W - 6.35, h: 7.5 }, altText: 'Agra Fort Project living room under a circular skylight (photography)' });
    s.addImage({ path: monoLight, x: 0.7, y: 0.7, w: 0.52, h: 0.52 * 663 / 685, altText: 'MACK monogram' });
    T(s, 'MACK & CO ARCHITECTS', { x: 1.45, y: 0.82, w: 4, h: 0.3, size: 10, color: PAPER, spacing: 2.4 });
    T(s, 'Digital\nFoundation', { x: 0.7, y: 2.0, w: 5.4, h: 1.6, size: 50, color: PAPER, serif: true, lsm: 0.98 });
    T(s, 'A working plan for search visibility, local presence, measurement and studio infrastructure', { x: 0.7, y: 3.85, w: 5.0, h: 0.9, size: 16, color: ONNIGHT2, lsm: 1.2 });
    hair(s, 0.7, 5.95, 5.0, INK3);
    T(s, 'Prepared for Ayushi and the MACK & Co team', { x: 0.7, y: 6.08, w: 5.2, h: 0.28, size: 11, color: PAPER });
    T(s, 'October 2026  ·  Yash Sharma', { x: 0.7, y: 6.4, w: 5.2, h: 0.28, size: 11, color: ONNIGHT2 });
    T(s, 'Cover: Agra Fort Project, Dharampur — photography', { x: 0.7, y: 6.95, w: 5.2, h: 0.22, size: 8.5, color: ONNIGHT2 });
    s.addNotes(
      'A working plan for what happens if we proceed. ' +
        'Structure: where MACK stands today, how clients find a studio, what needs to be in place, how it will be implemented in milestones, how progress is measured, and the next step. ' +
        'The plan is based on Google\'s official documentation and on checks of MACK\'s current site carried out in October 2026.'
    );
  }

  // ------------------------------------------------------------ 02 starting point
  pres.addSection({ title: 'Context' });
  {
    const s = content('Context', '01 — Starting point', 'Where MACK stands today',
      'Facts, checked in October 2026. Search: the live site carries a "noindex" instruction, so Google is told not to list it. Maps: the map link on the site opens a Google listing named "Karan Desai, Architecture + Design" at the studio\'s address — the studio decides how its Google listing should represent MACK. ' +
        'Identity: contact email is a Gmail address. Portfolio: 6 of 10 projects state no location, only 2 have a written description. Measurement: nothing is tracked. ' +
        'The positive: the new site already has the technical groundwork — the work now is switching it on, connecting it and filling it with real project information.');
    lede(s, 'A new website is ready. Search, maps, identity and measurement around it are not yet in place.');
    const cols = [
      { x: L, w: 1.9, t: 'Area' },
      { x: 2.7, w: 4.5, t: 'Today' },
      { x: 7.5, w: 5.23, t: 'What it means' },
    ];
    const y0 = 2.35;
    cols.forEach((c) => label(s, c.t, { x: c.x, y: y0, w: c.w, h: 0.25 }));
    const rows = [
      ['Search', 'The live site asks Google not to list it', 'MACK cannot appear in Google results yet'],
      ['Maps', 'The map link opens a listing under another name', 'Name and Google listing need to be aligned'],
      ['Identity', 'A Gmail address; no studio domain in use', 'No consistent, studio-owned identity'],
      ['Portfolio', '10 projects; most lack place, year and story', 'Projects can’t be found for what they are'],
      ['Measurement', 'No analytics or enquiry tracking', 'No evidence of what brings clients'],
    ];
    const rh = 0.56;
    rows.forEach((r, i) => {
      const y = y0 + 0.36 + i * rh;
      hair(s, L, y, CW, i === 0 ? INK : RULE);
      T(s, r[0], { x: cols[0].x, y: y + 0.12, w: cols[0].w, h: rh - 0.14, size: 15, serif: true });
      T(s, r[1], { x: cols[1].x, y: y + 0.14, w: cols[1].w, h: rh - 0.14, size: 13.5, color: INK2 });
      T(s, r[2], { x: cols[2].x, y: y + 0.14, w: cols[2].w, h: rh - 0.14, size: 13.5 });
    });
    hair(s, L, y0 + 0.36 + rows.length * rh, CW, RULE);
    box(s, L, 5.75, CW, 0.95, { fill: STONE, line: false });
    T(s, 'Already in place', { x: L + 0.25, y: 5.9, w: 2.4, h: 0.3, size: 15, serif: true });
    T(s, 'The new site: structured pages, project markup, an image sitemap, redirects from old links and indexing that can be switched on at launch. The foundation is built — it needs to be connected, filled and measured.',
      { x: 2.95, y: 5.9, w: 9.5, h: 0.7, size: 13, color: INK2 });
  }

  // ------------------------------------------------------------ 03 digital destination
  pres.addSection({ title: 'The system' });
  {
    const s = content('The system', '02 — The digital destination', 'Every channel leads to one place',
      'Most new clients of a studio arrive through a recommendation, Instagram or a publication — and then search the studio\'s name before getting in touch. ' +
        'So the website is the destination every channel leads to, and its first job is to confirm the recommendation. ' +
        'Left to right: discovery channels, the website, what visitors explore, the actions they take, and the consultation. The bottom row shows where each piece of the plan works.');
    lede(s, 'Most clients arrive through a recommendation, then search the studio’s name. What they find should confirm it.', 1.58, CW);
    const cx = { d: L, dw: 1.95, wx: 3.25, ww: 2.15, ex: 6.15, ew: 1.95, ax: 8.75, aw: 1.75, mx: 11.05, mw: 1.68 };
    const hy = 2.32;
    label(s, 'Discover', { x: cx.d, y: hy, w: cx.dw, h: 0.25 });
    label(s, 'Destination', { x: cx.wx, y: hy, w: cx.ww, h: 0.25 });
    label(s, 'Explore', { x: cx.ex, y: hy, w: cx.ew, h: 0.25 });
    label(s, 'Act', { x: cx.ax, y: hy, w: cx.aw, h: 0.25 });
    label(s, 'Meet', { x: cx.mx, y: hy, w: cx.mw, h: 0.25 });
    const mid = 4.02;
    const disc = ['Google Search', 'Google Maps', 'Instagram', 'Referral', 'Publications'];
    const nh = 0.42, ng = 0.14;
    const dy0 = mid - (disc.length * nh + (disc.length - 1) * ng) / 2;
    disc.forEach((t, i) => {
      const y = dy0 + i * (nh + ng);
      node(s, cx.d, y, cx.dw, nh, t, { size: 12.5 });
      ln(s, cx.d + cx.dw, y + nh / 2, cx.wx, mid, { color: INK3, lw: 0.6 });
    });
    box(s, cx.wx, mid - 0.62, cx.ww, 1.24, { fill: NIGHT, line: false });
    T(s, 'MACK website', { x: cx.wx + 0.18, y: mid - 0.42, w: cx.ww - 0.3, h: 0.45, size: 19, color: PAPER, serif: true });
    T(s, 'the studio’s own address', { x: cx.wx + 0.18, y: mid + 0.08, w: cx.ww - 0.3, h: 0.3, size: 11, color: ONNIGHT2 });
    const exp = ['Projects', 'Services', 'Studio', 'Credibility'];
    const eg = 0.26;
    const ey0 = mid - (exp.length * nh + (exp.length - 1) * eg) / 2;
    exp.forEach((t, i) => {
      const y = ey0 + i * (nh + eg);
      node(s, cx.ex, y, cx.ew, nh, t, { size: 12.5 });
      ln(s, cx.wx + cx.ww, mid, cx.ex, y + nh / 2, { color: INK3, lw: 0.6 });
    });
    ln(s, cx.ex + cx.ew + 0.08, mid, cx.ax - 0.08, mid, { arrow: true, lw: 0.75 });
    const act = ['Enquiry', 'Call', 'Directions', 'Email'];
    act.forEach((t, i) => {
      const y = ey0 + i * (nh + eg);
      node(s, cx.ax, y, cx.aw, nh, t, { size: 12.5, dash: 'dash' });
      ln(s, cx.ax + cx.aw, y + nh / 2, cx.mx, mid, { color: INK3, lw: 0.6 });
    });
    box(s, cx.mx, mid - 0.62, cx.mw, 1.24, { fill: STONE, line: false });
    T(s, 'Consultation or studio visit', { x: cx.mx + 0.14, y: mid - 0.5, w: cx.mw - 0.24, h: 1.0, size: 14, serif: true, valign: 'middle' });

    hair(s, L, 5.72, CW, INK);
    const pw = [
      [cx.d, cx.dw + 0.4, 'SEO · Google Business Profile · publications'],
      [cx.wx, cx.ww, 'Website experience'],
      [cx.ex, cx.ew, 'Portfolio architecture'],
      [cx.ax, cx.aw, 'Enquiry & call tracking'],
      [cx.mx, cx.mw, 'Studio enquiry log'],
    ];
    pw.forEach(([x, w, t]) => T(s, t, { x, y: 5.84, w, h: 0.5, size: 12, color: INK2 }));
    T(s, 'Analytics and monthly improvement run across every stage.', { x: L, y: 6.45, w: CW, h: 0.3, size: 12, color: INK3, italic: true });
  }

  // ------------------------------------------------------------ 04 connected system
  {
    const s = content('The system', '03 — What the infrastructure includes', 'One connected system, owned by the studio',
      'The domain is the root: the website, email, Search Console verification and the workspace all depend on it. That is why it is registered in MACK\'s name and decided first. ' +
        'Principle: MACK owns every account; I am given access to do the work. If I am unavailable, the studio loses nothing. ' +
        'Search Console, Analytics and the Business Profile feed one monthly report. Backup sits apart from the cloud workspace on purpose.');
    lede(s, 'The studio’s domain is the root. Website, email, workspace and Google’s tools all connect to it.');
    const dy = 4.25;
    box(s, L, dy - 0.85, 2.55, 1.7, { fill: NIGHT, line: false });
    T(s, 'Studio domain', { x: L + 0.2, y: dy - 0.6, w: 2.2, h: 0.45, size: 20, color: PAPER, serif: true });
    T(s, 'registered in MACK’s name', { x: L + 0.2, y: dy - 0.08, w: 2.2, h: 0.3, size: 11, color: ONNIGHT2 });
    T(s, 'decided first', { x: L + 0.2, y: dy + 0.22, w: 2.2, h: 0.3, size: 11, color: ONNIGHT2 });
    const rows = [
      ['Website', 'the digital destination, on the studio’s own address'],
      ['Email', 'name@ the studio’s domain'],
      ['Cloud workspace', 'shared project storage for 2–3 TB'],
      ['Search Console', 'how Google sees and shows the site'],
      ['Analytics', 'what visitors do; where enquiries come from'],
      ['Business Profile', 'the studio’s card on Google and Maps'],
    ];
    const nx = 3.85, nw = 2.45, rh = 0.5, rg = 0.17;
    const ry0 = dy - (rows.length * rh + (rows.length - 1) * rg) / 2;
    const yc = [];
    rows.forEach(([n, d], i) => {
      const y = ry0 + i * (rh + rg);
      yc.push(y + rh / 2);
      node(s, nx, y, nw, rh, n, { size: 14, serif: true });
      ln(s, L + 2.55, dy, nx, y + rh / 2, { color: INK3, lw: 0.6 });
      T(s, d, { x: nx + nw + 0.3, y, w: 3.3, h: rh, size: 12.5, color: INK2, valign: 'middle' });
    });
    // backup, apart from the workspace
    const bx = 10.55;
    ln(s, 9.95, yc[2], bx, yc[2], { dash: 'dash', color: INK3, lw: 0.75 });
    node(s, bx, yc[2] - 0.32, R - bx, 0.64, 'Independent backup, one copy off-site', { size: 11.5, dash: 'dash' });
    // report bracket
    const by = [yc[3], yc[5]];
    ln(s, 10.25, by[0], 10.25, by[1], { color: INK, lw: 0.75 });
    ln(s, 9.95, by[0], 10.25, by[0], { color: INK, lw: 0.75 });
    ln(s, 9.95, yc[4], 10.25, yc[4], { color: INK, lw: 0.75 });
    ln(s, 9.95, by[1], 10.25, by[1], { color: INK, lw: 0.75 });
    ln(s, 10.25, yc[4], bx, yc[4], { arrow: true, lw: 0.75 });
    box(s, bx, yc[4] - 0.32, R - bx, 0.64, { fill: STONE, line: false });
    T(s, 'One monthly report', { x: bx + 0.12, y: yc[4] - 0.32, w: R - bx - 0.2, h: 0.64, size: 13, serif: true, valign: 'middle' });
    T(s, [
      { text: 'Principle  ', options: { bold: true, color: INK } },
      { text: 'MACK owns every account. I am given access to do the work.', options: { color: INK2 } },
    ], { x: L, y: 6.45, w: CW, h: 0.3, size: 12.5 });
  }

  // ------------------------------------------------------------ 05 search visibility (section)
  pres.addSection({ title: 'Search' });
  {
    const s = content('Search', '04 — Search visibility', 'Built from the ground up',
      'Search visibility as a building section. 01 technical: Google can find, read and index every page quickly. 02 structure: each page clearly says what it is (titles, headings, structured data). ' +
        '03 relevance: pages that match how people actually search — services and projects. 04 local: the Business Profile and consistent details for Maps. 05 authority: publications, platforms and reviews. Measurement runs alongside all of them. ' +
        'Today: layers 01–02 are largely built into the new site; 03–05 depend on the studio\'s project information, a verified profile and published work.');
    lede(s, 'How a studio becomes visible in Google, layer by layer.');
    const layers = [
      ['05', 'Authority', 'publications, platforms, reviews'],
      ['04', 'Local presence', 'Business Profile, Maps, consistent details'],
      ['03', 'Relevance', 'services and projects that match real searches'],
      ['02', 'Structure & meaning', 'page architecture, titles, structured data'],
      ['01', 'Technical foundation', 'crawlable, indexable, fast on mobile'],
    ];
    const bh = 0.72, bg = 0.07, base = 6.6;
    const widths = [5.0, 5.8, 6.6, 7.35, 8.1];
    layers.forEach(([n, t, d], i) => {
      const y = base - (layers.length - i) * (bh + bg) + bg;
      const w = widths[i];
      const dark = i === layers.length - 1;
      box(s, L, y, w, bh, { fill: dark ? NIGHT : i % 2 ? STONE : PAPER, line: dark ? false : INK, lw: 0.75 });
      T(s, n, { x: L + 0.18, y, w: 0.5, h: bh, size: 12, color: dark ? ONNIGHT2 : INK3, valign: 'middle' });
      T(s, t, { x: L + 0.62, y, w: 2.5, h: bh, size: 15, serif: true, color: dark ? PAPER : INK, valign: 'middle' });
      T(s, d, { x: L + 2.85, y, w: w - 3.0, h: bh, size: 12, color: dark ? ONNIGHT2 : INK2, valign: 'middle' });
    });
    const top = base - layers.length * (bh + bg) + bg;
    box(s, 8.95, top, 0.5, base - top, { line: INK, lw: 0.75 });
    T(s, '06  MEASURED AT EVERY LEVEL', { x: 8.95 - (base - top) / 2 + 0.25, y: top + (base - top) / 2 - 0.15, w: base - top, h: 0.3, size: 9.5, color: INK, spacing: 1.6, align: 'center', rotate: 270 });
    T(s, 'Each layer depends on the one below.', { x: 9.85, y: top + 0.05, w: 2.88, h: 0.9, size: 18, serif: true, lsm: 1.1 });
    T(s, 'Shortcuts at the top — bought links, keyword tricks — don’t hold without the layers underneath, and they break Google’s rules.', { x: 9.85, y: top + 1.1, w: 2.88, h: 1.3, size: 12.5, color: INK2, lsm: 1.2 });
    hair(s, 9.85, top + 2.55, 2.88, INK);
    label(s, 'Where MACK is today', { x: 9.85, y: top + 2.68, w: 2.88, h: 0.25 });
    T(s, '01–02 largely built into the new site. 03–05 need project information, a verified profile and published work.', { x: 9.85, y: top + 2.98, w: 2.88, h: 0.9, size: 12.5, color: INK2, lsm: 1.2 });
  }

  // ------------------------------------------------------------ 06 three kinds of search
  {
    const s = content('Search', '05 — How people search for a studio', 'Three kinds of search, three timescales',
      'Confirm: someone already heard of MACK and searches the name — this is the fastest and most controllable win, and it supports the referrals MACK already gets. Note: "MACK" alone is ambiguous (there is a Mark Mack architecture practice in the US), so the full name is used consistently. ' +
        'Shortlist: local commercial searches like "architect in Andheri West" — decided largely in Google Maps by relevance, distance and prominence; competitive, built over months. ' +
        'Discover: project, typology, place and image searches — long-tail and compounding, but only possible once projects carry real information. Example queries are illustrations to be validated, not targets already won.');
    const cols = [
      { n: 'Confirm', k: 'Searches for the studio’s name', q: '“MACK & Co Architects”\n“mack architects mumbai”', win: 'Website first, a correct Business Profile beside it, consistent details everywhere', sp: 3, ct: 3 },
      { n: 'Shortlist', k: 'Local searches for a studio', q: '“architect in Andheri West”\n“interior designer Mumbai”', win: 'A complete, verified profile, reviews, service and studio pages that match the search', sp: 2, ct: 2 },
      { n: 'Discover', k: 'Searches for work, places, ideas', q: '“sandstone resort Rajasthan”\n“second home interiors Dharampur”', win: 'Project pages with real facts, a written story and well-described images', sp: 1, ct: 2 },
    ];
    const cw = 3.75, gap = 0.44;
    cols.forEach((c, i) => {
      const x = L + i * (cw + gap);
      const y = 1.85;
      T(s, String(i + 1).padStart(2, '0'), { x, y, w: 0.6, h: 0.3, size: 11, color: INK3 });
      T(s, c.n, { x, y: y + 0.3, w: cw, h: 0.6, size: 28, serif: true });
      label(s, c.k, { x, y: y + 0.98, w: cw, h: 0.25 });
      hair(s, x, y + 1.35, cw, INK);
      T(s, c.q, { x, y: y + 1.5, w: cw, h: 0.75, size: 14, serif: true, italic: true, color: INK2, lsm: 1.25 });
      label(s, 'What wins', { x, y: y + 2.42, w: cw, h: 0.25 });
      T(s, c.win, { x, y: y + 2.7, w: cw, h: 0.85, size: 13, color: INK2, lsm: 1.18 });
      hair(s, x, y + 3.68, cw, RULE);
      [['Speed', c.sp], ['Control', c.ct]].forEach(([t, v], j) => {
        const yy = y + 3.82 + j * 0.36;
        T(s, t, { x, y: yy, w: 1.1, h: 0.26, size: 11.5, color: INK3 });
        for (let d = 0; d < 3; d++) dot(s, x + 1.15 + d * 0.27, yy + 0.04, 0.17, d < v);
      });
    });
    T(s, 'Early progress shows first in “Confirm”. “Shortlist” and “Discover” compound over months. Example searches are illustrations, to be validated.',
      { x: L, y: 6.55, w: CW, h: 0.3, size: 11.5, color: INK3, italic: true });
  }

  // ------------------------------------------------------------ 07 implementation
  {
    const s = content('Search', '06 — SEO implementation', 'What will actually be implemented',
      'SEO as a concrete list of work. Technical items are mostly about switching on and verifying what the new site already supports. Pages: titles, headings, service pages and internal links. ' +
        'Portfolio: the biggest gap — real facts and a short written story per project; renders labelled as visualisation and photographers credited, which is also what editors and Google ask for. Local and authority: profile, consistency, reviews within Google\'s rules, free platform profiles, and publication kits.');
    const groups = [
      ['Technical', ['Indexing switched on at launch', 'Search Console verified, sitemap submitted', 'One domain; old links redirected', 'Structured data for studio, site and projects', 'Faster mobile loading on the home page']],
      ['Pages', ['Titles and descriptions mapped to real searches', 'Clean headings and page structure', 'Service pages: Architecture, Interiors', 'Links between related projects and services', 'Enquiries, calls and emails tracked']],
      ['Portfolio', ['Facts per project: place, type, status, year', 'A short written story for each project', 'Descriptive image names and alt text', 'Photographers credited, renders labelled', 'A publishing routine for new work']],
      ['Local & authority', ['Business Profile verified and complete', 'Same name, address, phone everywhere', 'Review requests within Google’s rules', 'Archello and Architizer profiles', 'Submission kits for publications']],
    ];
    const cw = 2.84, gap = 0.257;
    groups.forEach(([g, items], i) => {
      const x = L + i * (cw + gap);
      const y = 1.78;
      T(s, String(i + 1).padStart(2, '0'), { x, y, w: 0.5, h: 0.28, size: 11, color: INK3 });
      T(s, g, { x, y: y + 0.28, w: cw, h: 0.45, size: 19, serif: true });
      items.forEach((it, j) => {
        const yy = y + 0.92 + j * 0.86;
        hair(s, x, yy, cw, j === 0 ? INK : RULE);
        T(s, it, { x, y: yy + 0.12, w: cw, h: 0.68, size: 13.5, color: INK2, lsm: 1.15 });
      });
    });
  }

  // ------------------------------------------------------------ 07b impact model
  {
    const s = content('Search', '07 — From work to impact', 'Work, what it produces, why it matters',
      'Each activity in the plan, read left to right: the work, what it immediately produces, and the business effect it makes possible. ' +
        'The right-hand column describes what becomes possible and measurable — not a guaranteed number. Technical SEO makes MACK eligible to appear at all; the Business Profile makes calls and directions possible from Google; project pages let the portfolio be found for what it is; analytics and the enquiry log turn opinions into evidence.');
    const rows = [
      ['Technical SEO', 'Google can crawl and index every page', 'MACK becomes eligible to appear in search'],
      ['Business Profile', 'A verified, complete card on Google and Maps', 'Calls and directions from Google, measured'],
      ['Project pages', 'Each project findable on its own', 'Reaches people looking for similar work'],
      ['Image SEO & credits', 'Images understood by Google Images', 'Visual discovery, credited to the studio'],
      ['Analytics & enquiry log', 'Sources of enquiries become visible', 'Decisions based on evidence, not assumptions'],
      ['Domain & studio email', 'One identity the studio owns', 'Trust from the first contact'],
      ['Independent backup', 'A recoverable copy of every project', 'The studio’s archive is protected'],
    ];
    const c1 = L, c1w = 2.95, c2 = 3.95, c2w = 3.9, c3 = 8.65, c3w = R - 8.65;
    const y0 = 1.72;
    label(s, 'Work', { x: c1, y: y0, w: c1w, h: 0.25 });
    label(s, 'Immediate output', { x: c2, y: y0, w: c2w, h: 0.25 });
    label(s, 'Business impact', { x: c3, y: y0, w: c3w, h: 0.25 });
    const rh = 0.66;
    rows.forEach(([a, b, c], i) => {
      const y = y0 + 0.34 + i * rh;
      hair(s, L, y, CW, i === 0 ? INK : RULE);
      T(s, a, { x: c1, y: y + 0.16, w: c1w, h: 0.4, size: 15, serif: true });
      ln(s, c2 - 0.55, y + rh / 2, c2 - 0.15, y + rh / 2, { arrow: true, color: INK3, lw: 0.75 });
      T(s, b, { x: c2, y: y + 0.18, w: c2w, h: 0.4, size: 13, color: INK2 });
      ln(s, c3 - 0.55, y + rh / 2, c3 - 0.15, y + rh / 2, { arrow: true, color: INK3, lw: 0.75 });
      T(s, c, { x: c3, y: y + 0.18, w: c3w, h: 0.4, size: 13, color: INK });
    });
    hair(s, L, y0 + 0.34 + rows.length * rh, CW, RULE);
  }

  // ------------------------------------------------------------ 08 local presence
  {
    const s = content('Search', '08 — Google & local presence', 'The studio’s card on Google',
      'The Business Profile is what appears beside the website when someone searches the studio\'s name, and in Maps. First task: settle the existing listing at the studio\'s address — Google allows one profile per business per location; duplicates can lead to suspension. ' +
        'Hours: Google\'s own guidelines say businesses that operate only by appointment should not list opening hours — the profile shows how to book instead. ' +
        'New studios: a profile can be set up with an opening date up to a year ahead and appears 90 days before opening — only for a real, staffed location with signage. ' +
        'Local ranking: Google says it is based on relevance, distance and prominence, and that there is no way to pay for better local ranking.');
    // schematic card
    label(s, 'Schematic', { x: L, y: 1.72, w: 4.6, h: 0.25 });
    const cx = L, cy = 2.05, cw = 4.75, ch = 4.55;
    box(s, cx, cy, cw, ch, { fill: SHEET, line: RULE });
    s.addImage({ path: img.redfort.path, x: cx + 0.2, y: cy + 0.2, w: 2.75, h: 1.35, sizing: { type: 'cover', w: 2.75, h: 1.35 }, altText: 'Red Fort Project interior (photography)' });
    box(s, cx + 3.05, cy + 0.2, 1.5, 0.64, { fill: STONE, line: false });
    box(s, cx + 3.05, cy + 0.91, 1.5, 0.64, { fill: STONE, line: false });
    T(s, 'studio', { x: cx + 3.05, y: cy + 0.2, w: 1.5, h: 0.64, size: 10, color: INK3, align: 'center', valign: 'middle' });
    T(s, 'team at work', { x: cx + 3.05, y: cy + 0.91, w: 1.5, h: 0.64, size: 10, color: INK3, align: 'center', valign: 'middle' });
    T(s, 'MACK & Co Architects', { x: cx + 0.2, y: cy + 1.75, w: cw - 0.4, h: 0.42, size: 19, serif: true });
    T(s, 'Studio category  ·  Andheri West, Mumbai', { x: cx + 0.2, y: cy + 2.2, w: cw - 0.4, h: 0.28, size: 11.5, color: INK2 });
    T(s, 'Visits by appointment', { x: cx + 0.2, y: cy + 2.5, w: cw - 0.4, h: 0.28, size: 11.5, color: INK2 });
    ['Website', 'Directions', 'Call'].forEach((b, i) => {
      box(s, cx + 0.2 + i * 1.47, cy + 2.98, 1.32, 0.4, { round: 0.2, line: INK });
      T(s, b, { x: cx + 0.2 + i * 1.47, y: cy + 2.98, w: 1.32, h: 0.4, size: 11.5, align: 'center', valign: 'middle' });
    });
    hair(s, cx + 0.2, cy + 3.62, cw - 0.4, RULE);
    T(s, 'Reviews from clients  ·  Services  ·  Photos', { x: cx + 0.2, y: cy + 3.75, w: cw - 0.4, h: 0.28, size: 11, color: INK3 });
    T(s, 'Each button is measured: calls, direction requests, website visits.', { x: cx + 0.2, y: cy + 4.05, w: cw - 0.4, h: 0.3, size: 10, color: INK3, italic: true });
    // right list
    const items = [
      'One verified profile for each real studio — resolving the existing listing at the studio’s address first',
      'The same name, address and phone on the profile, the website and Instagram',
      'The website link tagged, so visits from Google Maps are measured on the site',
      'Reviews requested from every client — never incentivised or filtered',
      'New studios set up ahead: an opening date makes the profile visible 90 days before opening',
    ];
    const rx = 6.05, rw = R - rx;
    items.forEach((t, i) => {
      const y = 2.05 + i * 0.8;
      hair(s, rx, y, rw, i === 0 ? INK : RULE);
      T(s, String(i + 1).padStart(2, '0'), { x: rx, y: y + 0.14, w: 0.5, h: 0.3, size: 13, color: SAND, serif: true });
      T(s, t, { x: rx + 0.6, y: y + 0.13, w: rw - 0.6, h: 0.62, size: 13.5, color: INK2, lsm: 1.15 });
    });
    hair(s, rx, 6.05, rw, RULE);
    T(s, 'Google ranks local results on relevance, distance and prominence, and states there is no way to pay for a better local ranking. Distance can’t change; completeness and reputation can.',
      { x: rx, y: 6.15, w: rw, h: 0.6, size: 11, color: INK3, italic: true, lsm: 1.15 });
  }

  // ------------------------------------------------------------ 09 portfolio as search asset
  {
    const s = content('Search', '09 — Portfolio as a search asset', 'Every project becomes a way in',
      'Today most visitors can only find MACK by name. Each project page, written properly, becomes its own entry point: someone searching for a resort in Rajasthan, a second home in Dharampur, or a particular detail can land on MACK\'s work, explore related projects and get in touch. ' +
        'What the studio provides: about ten minutes per project through a short form — place, type, status, year, the brief, what MACK did, credits, and whether the client allows publication. Renders are always labelled as visualisation.');
    const flow = ['Project', 'Project page', 'Search & Images', 'Related work', 'Enquiry'];
    const fw = 2.02, fg = 0.5, fy = 1.78;
    flow.forEach((t, i) => {
      const x = L + i * (fw + fg);
      node(s, x, fy, fw, 0.5, t, { size: 13, fill: i === 1 ? NIGHT : undefined, color: i === 1 ? PAPER : INK, line: i === 1 ? NIGHT : INK, align: 'center' });
      if (i < flow.length - 1) ln(s, x + fw + 0.07, fy + 0.25, x + fw + fg - 0.07, fy + 0.25, { arrow: true });
    });
    const iy = 2.62, ih = 3.75;
    s.addImage({ path: img.redfort.path, x: L, y: iy, w: 5.6, h: ih, sizing: { type: 'cover', w: 5.6, h: ih }, altText: 'Red Fort Project, Dharampur: living room with a valley view (photography)' });
    T(s, 'Red Fort Project, Dharampur — photography', { x: L, y: iy + ih + 0.08, w: 5.6, h: 0.25, size: 10, color: INK3 });
    const rx = 6.75, rw = R - rx;
    label(s, 'What each project page carries', { x: rx, y: iy, w: rw, h: 0.25 });
    const rows = [
      ['Title & place', 'Red Fort Project, Dharampur'],
      ['Facts', 'Type · scope · status · year · collaborators'],
      ['Story', '150–400 words: the brief, the site, what MACK did'],
      ['Images', 'Descriptive names, alt text, photographer credited'],
      ['Links', 'Related projects, the service, “discuss a similar project”'],
      ['Data', 'Structured data, so search engines read it as a project'],
    ];
    rows.forEach(([k, v], i) => {
      const y = iy + 0.35 + i * 0.5;
      hair(s, rx, y, rw, i === 0 ? INK : RULE);
      T(s, k, { x: rx, y: y + 0.12, w: 1.55, h: 0.3, size: 13, serif: true });
      T(s, v, { x: rx + 1.6, y: y + 0.13, w: rw - 1.6, h: 0.32, size: 12.5, color: INK2 });
    });
    hair(s, rx, iy + 0.35 + rows.length * 0.5, rw, RULE);
    box(s, rx, 6.12, rw, 0.6, { fill: STONE, line: false });
    T(s, 'From the studio: about 10 minutes per project, through a short form.', { x: rx + 0.2, y: 6.12, w: rw - 0.3, h: 0.6, size: 13, valign: 'middle' });
  }

  // ------------------------------------------------------------ 10 professional infrastructure
  pres.addSection({ title: 'Infrastructure' });
  {
    const s = content('Infrastructure', '10 — Professional infrastructure', 'Email, storage and a real backup',
      'Email: moving from a Gmail address to the studio\'s domain, authenticated so mail is trusted. ' +
        'Storage: 2–3 TB of project files in shared drives with one folder system per project and access by role; clients and consultants only see what has been issued to them. If Revit worksharing is used, central models need a different setup (Autodesk advises against cloud-sync folders). ' +
        'Backup: the cloud keeps old versions only for a limited time (Google Drive: 30 days or 100 versions; deleted items recoverable by an admin for 25 days). A separate, versioned copy — with one copy off-site — is what protects the studio\'s archive. Restores are tested every quarter.');
    const cols = [
      ['Email', 'Gmail address → name@ studio domain', ['Authenticated (SPF, DKIM, DMARC) so mail is trusted', 'Shared addresses: studio@, careers@', 'Old address forwarded — nothing lost']],
      ['Cloud workspace', 'Shared drives for 2–3 TB of project files', ['One folder system for every project', 'Access by role; clients see only what is issued', 'Large CAD and render files available on studio machines']],
      ['Backup', 'An independent copy outside the cloud account', ['Versioned: last week’s or last month’s file can be recovered', 'One copy kept off-site', 'Restores tested every quarter']],
    ];
    const cw = 3.75, gap = 0.44;
    cols.forEach(([n, sub, items], i) => {
      const x = L + i * (cw + gap);
      const y = 1.8;
      T(s, String(i + 1).padStart(2, '0'), { x, y, w: 0.5, h: 0.28, size: 11, color: INK3 });
      T(s, n, { x, y: y + 0.28, w: cw, h: 0.5, size: 22, serif: true });
      T(s, sub, { x, y: y + 0.85, w: cw, h: 0.62, size: 14, color: INK, lsm: 1.15 });
      items.forEach((it, j) => {
        const yy = y + 1.6 + j * 0.78;
        hair(s, x, yy, cw, j === 0 ? INK : RULE);
        T(s, it, { x, y: yy + 0.12, w: cw, h: 0.6, size: 13, color: INK2, lsm: 1.15 });
      });
    });
    box(s, L, 5.95, CW, 0.75, { fill: NIGHT, line: false });
    T(s, 'Sync is not backup.', { x: L + 0.25, y: 5.95, w: 2.8, h: 0.75, size: 17, serif: true, color: PAPER, valign: 'middle' });
    T(s, 'A deleted or overwritten file syncs everywhere within seconds, and cloud version history is time-limited. The backup is a separate copy.',
      { x: 3.6, y: 5.95, w: 8.9, h: 0.75, size: 13, color: ONNIGHT2, valign: 'middle' });
  }

  // ------------------------------------------------------------ 11 measurement
  pres.addSection({ title: 'Measurement' });
  {
    const s = content('Measurement', '11 — Measurement', 'What we measure, and what we leave out',
      'Five stages, each with its source. Visibility and discovery come from Google Search Console and the Business Profile; engagement and actions from Google Analytics; the outcome — qualified enquiries — only from the studio\'s own enquiry log, because online tools can\'t see a referral conversation or a studio visit. ' +
        'Branded and new (non-branded) searches are always reported separately: one reflects reputation, the other shows the search work reaching new people. ' +
        'Direction requests are an intent-to-visit signal, not a count of studio visits — reported as such.');
    const rows = [
      ['Visibility', 'How often MACK appears in Google: name searches and new searches, kept separate', 'Search Console'],
      ['Discovery', 'Which projects and images people find; what they search on Maps', 'Search Console · Profile'],
      ['Engagement', 'Which project pages visitors explore', 'Analytics'],
      ['Action', 'Enquiries, call taps, email taps, direction requests', 'Analytics · Profile'],
      ['Outcome', 'Qualified enquiries, by where they came from', 'Studio enquiry log'],
    ];
    const y0 = 1.85, rh = 0.84;
    label(s, 'Stage', { x: L, y: y0, w: 1.8, h: 0.25 });
    label(s, 'Measure', { x: 2.55, y: y0, w: 4, h: 0.25 });
    label(s, 'Source', { x: 6.95, y: y0, w: 1.8, h: 0.25 });
    rows.forEach(([a, b, c], i) => {
      const y = y0 + 0.35 + i * rh;
      hair(s, L, y, 8.25, i === 0 ? INK : RULE);
      T(s, a, { x: L, y: y + 0.16, w: 1.9, h: 0.4, size: 17, serif: true, color: i === 4 ? SAND : INK });
      T(s, b, { x: 2.55, y: y + 0.16, w: 4.2, h: 0.62, size: 13, color: INK2, lsm: 1.15 });
      T(s, c.toUpperCase(), { x: 6.95, y: y + 0.2, w: 1.9, h: 0.5, size: 9.5, color: INK3, spacing: 1.2, lsm: 1.2 });
    });
    hair(s, L, y0 + 0.35 + rows.length * rh, 8.25, RULE);
    const rx = 9.6, rw = R - rx;
    label(s, 'Left out on purpose', { x: rx, y: y0, w: rw, h: 0.25 });
    ['Total page views', 'Follower counts', 'Third-party “authority” scores', 'Rankings for long keyword lists'].forEach((t, i) => {
      const y = y0 + 0.35 + i * 0.44;
      hair(s, rx, y, rw, i === 0 ? INK : RULE);
      T(s, t, { x: rx, y: y + 0.1, w: rw, h: 0.3, size: 13, color: INK2 });
    });
    label(s, 'Every report answers', { x: rx, y: 4.35, w: rw, h: 0.25 });
    ['What changed?', 'Why does it matter?', 'What happens next?'].forEach((t, i) => {
      T(s, t, { x: rx, y: 4.7 + i * 0.5, w: rw, h: 0.42, size: 18, serif: true });
    });
  }

  // ------------------------------------------------------------ 12 sample report
  {
    const s = content('Measurement', '12 — The monthly report', 'One page, every month',
      'This is the structure of the monthly report, shown without numbers on purpose: values fill from launch, starting from a recorded baseline in month zero. No figures are projected. ' +
        'Three lines at the top answer what changed, why it matters and what happens next. Then a short scorecard, the most-discovered projects, health checks, the work completed and the next actions with owners. ' +
        'A live dashboard sits alongside it, owned by the studio. Reading it takes about twenty minutes a month.');
    const px = L, py = 1.72, pw = 8.35, ph = 5.08;
    box(s, px, py, pw, ph, { fill: SHEET, line: RULE });
    const ix = px + 0.3, iw = pw - 0.6;
    label(s, 'MACK & Co Architects  ·  Digital report', { x: ix, y: py + 0.22, w: 5, h: 0.22 });
    T(s, 'Month 1', { x: ix + iw - 2, y: py + 0.18, w: 2, h: 0.3, size: 13, serif: true, align: 'right' });
    hair(s, ix, py + 0.55, iw, INK);
    [['What changed', ''], ['Why it matters', ''], ['Next', '']].forEach(([k], i) => {
      const y = py + 0.68 + i * 0.32;
      T(s, k, { x: ix, y, w: 1.6, h: 0.28, size: 11.5, bold: true });
      hair(s, ix + 1.65, y + 0.2, iw - 1.65, RULE);
    });
    const tiles = ['New-search impressions', 'New-search clicks', 'Name-search clicks', 'Profile: calls · directions', 'Enquiries', 'Qualified enquiries'];
    const tw = (iw - 0.4) / 3, th = 0.86, ty0 = py + 1.72;
    tiles.forEach((t, i) => {
      const x = ix + (i % 3) * (tw + 0.2);
      const y = ty0 + Math.floor(i / 3) * (th + 0.15);
      box(s, x, y, tw, th, { line: RULE });
      T(s, t, { x: x + 0.12, y: y + 0.1, w: tw - 0.24, h: 0.25, size: 10, color: INK3 });
      T(s, '—', { x: x + 0.12, y: y + 0.32, w: 1.2, h: 0.42, size: 22, serif: true });
      T(s, 'vs last month', { x: x + 1.3, y: y + 0.5, w: tw - 1.42, h: 0.25, size: 9.5, color: INK3, align: 'right' });
    });
    const by = ty0 + 2 * (th + 0.15) + 0.05;
    const half = (iw - 0.3) / 2;
    label(s, 'Most-discovered projects', { x: ix, y: by, w: half, h: 0.22 });
    ['1  —', '2  —', '3  —'].forEach((t, i) => T(s, t, { x: ix, y: by + 0.28 + i * 0.25, w: half, h: 0.24, size: 11, color: INK2 }));
    label(s, 'Health', { x: ix + half + 0.3, y: by, w: half, h: 0.22 });
    ['Indexing  ·  Form test', 'Speed  ·  Uptime', 'Backup  ·  Last restore test'].forEach((t, i) => T(s, t, { x: ix + half + 0.3, y: by + 0.28 + i * 0.25, w: half, h: 0.24, size: 11, color: INK2 }));
    const rx = 9.45, rw = R - rx;
    const pts = [
      ['Starts from a baseline', 'Month 0 is recorded before launch, so every change is compared with a real starting point.'],
      ['Name and new searches apart', 'Reputation and search reach are reported separately.'],
      ['A live dashboard alongside', 'Owned by the studio; the report explains it.'],
      ['Twenty minutes to read', 'Decisions are written down and followed up next month.'],
    ];
    pts.forEach(([h, d], i) => {
      const y = 1.72 + i * 1.08;
      hair(s, rx, y, rw, i === 0 ? INK : RULE);
      T(s, h, { x: rx, y: y + 0.12, w: rw, h: 0.32, size: 14, serif: true });
      T(s, d, { x: rx, y: y + 0.46, w: rw, h: 0.58, size: 11.5, color: INK2, lsm: 1.15 });
    });
    T(s, 'Values appear as “—”: they fill from launch. No figures are projected.', { x: rx, y: 6.15, w: rw, h: 0.55, size: 10.5, color: INK3, italic: true, lsm: 1.15 });
  }

  // ------------------------------------------------------------ 13 roadmap
  pres.addSection({ title: 'Roadmap' });
  {
    const s = content('Roadmap', '13 — Milestone roadmap', 'Six milestones, each with a visible result',
      'Week 0 is alignment and access. M1 digital foundation in the first two weeks; M2 launch and search foundation by week four; M3 local presence from week three — Google\'s verification time varies; ' +
        'M4 portfolio from week four, paced by how quickly project information arrives; M5 authority from around month three and ongoing; M6 measurement — dashboard by week six, then a report every month. ' +
        'Timings depend on decisions and inputs arriving on time — the usual cause of delay is waiting for access or information.');
    const lx = L, lw = 2.75, gx = 3.55, gw = R - gx;
    const cols = 14; // weeks 0..12 + ongoing
    const u = gw / cols;
    const hy = 1.82;
    for (let wk = 0; wk <= 12; wk++) T(s, wk === 0 ? 'W0' : String(wk), { x: gx + wk * u, y: hy, w: u, h: 0.24, size: 9.5, color: INK3, align: 'center' });
    T(s, 'Ongoing', { x: gx + 13 * u, y: hy, w: u, h: 0.24, size: 9.5, color: INK3, align: 'center' });
    hair(s, L, hy + 0.32, CW, INK);
    for (let wk = 0; wk <= 13; wk++) ln(s, gx + wk * u, hy + 0.32, gx + wk * u, 6.2, { color: RULE, lw: 0.5, dash: 'sysDot' });
    const ms = [
      ['M1', 'Digital Foundation', 1, 3, null, 'Domain · studio email · workspace · analytics · Search Console', 'after'],
      ['M2', 'Launch & Search', 2, 5, null, 'Live, indexable site · tracked enquiries · sitemap submitted', 'after'],
      ['M3', 'Local Presence', 3, 6, 7, 'Verified Business Profile · consistent details · review kit', 'after'],
      ['M4', 'Portfolio', 4, 11, null, 'Project pages · service pages', 'after'],
      ['M5', 'Authority', 9, 13, 14, 'Profiles · submission kits · outreach log', 'before'],
      ['M6', 'Measurement', 6, 6.3, 14, 'Dashboard · monthly report · health checks', 'before'],
    ];
    const ry0 = hy + 0.48, rh = 0.62;
    ms.forEach(([id, name, a, b, ext, del, side], i) => {
      const y = ry0 + i * rh;
      T(s, id, { x: lx, y: y + 0.08, w: 0.5, h: 0.32, size: 12, color: SAND, serif: true });
      T(s, name, { x: lx + 0.5, y: y + 0.06, w: lw - 0.5, h: 0.36, size: 15, serif: true });
      const bx = gx + a * u, bw = (b - a) * u;
      box(s, bx, y + 0.12, bw, 0.26, { fill: NIGHT, line: false });
      if (ext) box(s, gx + b * u, y + 0.12, (ext - b) * u, 0.26, { line: INK, lw: 0.75, dash: id === 'M3' ? 'dash' : 'solid' });
      if (id === 'M6') [8, 12].forEach((wk) => dot(s, gx + wk * u - 0.08, y + 0.17, 0.16, true));
      const end = gx + (ext || b) * u;
      if (side === 'after') T(s, del, { x: end + 0.12, y: y + 0.06, w: R - end - 0.12, h: 0.4, size: 11, color: INK2, valign: 'middle' });
      else T(s, del, { x: gx, y: y + 0.06, w: bx - gx - 0.12, h: 0.4, size: 11, color: INK2, align: 'right', valign: 'middle' });
    });
    hair(s, L, 6.2, CW, RULE);
    T(s, [
      { text: 'Week 0: align & access.  ', options: { bold: true, color: INK } },
      { text: 'Dashed: Google verification time varies. Outlined: ongoing. Dots: monthly reports. Timings assume decisions and inputs arrive on time.', options: { color: INK3 } },
    ], { x: L, y: 6.3, w: CW, h: 0.45, size: 11 });
  }

  // ------------------------------------------------------------ 14–15 milestone details
  const detail = (no, kicker, title, ms, notes) => {
    const s = content('Roadmap', kicker, title, notes);
    const lx = L, lw = 1.65, cx0 = 2.45, cw = 3.3, gap = 0.2;
    const rowsY = { head: 1.72, del: 2.62, from: 4.22, done: 5.4, end: 6.78 };
    [['Deliverables', rowsY.del], ['From MACK', rowsY.from], ['Complete when', rowsY.done]].forEach(([t, y], k) => {
      hair(s, lx, y, CW, k === 0 ? INK : RULE);
      label(s, t, { x: lx, y: y + 0.14, w: lw, h: 0.25 });
    });
    ms.forEach((m, i) => {
      const x = cx0 + i * (cw + gap);
      T(s, m.id, { x, y: rowsY.head, w: 0.6, h: 0.3, size: 12, color: SAND, serif: true });
      T(s, m.when, { x: x + 0.6, y: rowsY.head + 0.02, w: cw - 0.6, h: 0.28, size: 10, color: INK3, align: 'right' });
      T(s, m.name, { x, y: rowsY.head + 0.32, w: cw, h: 0.5, size: 17, serif: true });
      const list = (arr, y, h) => T(s, arr.map((t, j) => ({ text: t, options: { breakLine: j < arr.length - 1 } })), { x, y: y + 0.14, w: cw, h, size: 13, color: INK2, lsm: 1.12, psa: 4 });
      list(m.del, rowsY.del, 1.45);
      list(m.from, rowsY.from, 1.05);
      list(m.done, rowsY.done, 1.2);
    });
    return s;
  };
  detail(1, '14 — Milestones in detail', 'Foundation, launch and local presence', [
    { id: 'M1', when: 'Weeks 1–2', name: 'Digital Foundation', del: ['Domain in the studio’s name', 'Studio email, authenticated', 'Shared drives and permissions', 'Analytics and Search Console'], from: ['Domain decision', 'Who needs a mailbox', 'Where files live today'], done: ['Test email passes authentication', 'Every account has a MACK owner'] },
    { id: 'M2', when: 'Weeks 2–4', name: 'Launch & Search Foundation', del: ['Site live on the domain, indexable', 'Technical fixes', 'Enquiry and contact tracking', 'Search-intent map'], from: ['Launch approval', 'Contact details confirmed', 'Privacy wording approved'], done: ['Pages submitted and crawlable', 'A test enquiry is recorded', 'No critical Search Console errors'] },
    { id: 'M3', when: 'Weeks 3–6', name: 'Local Presence', del: ['Verified Business Profile', 'Consistent name, address, phone', 'Review request kit', 'New-studio playbook'], from: ['Decision on the existing listing', 'Someone at the studio to verify', 'Photos of the studio'], done: ['Profile verified and complete', 'Visits from the profile measured'] },
  ], 'For each milestone: what is delivered, what is needed from the studio, and how we know it is complete. The "complete when" row is deliberately checkable — a test, a status, a report — not a feeling. ' +
    'M3 depends on one decision only the studio can make: how the existing Google listing at the studio\'s address should represent MACK.');
  detail(2, '15 — Milestones in detail', 'Portfolio, authority and measurement', [
    { id: 'M4', when: 'Weeks 4–10', name: 'Portfolio Discoverability', del: ['Project pages to one standard', 'Service pages', 'Image names and credits', 'Publishing routine for new work'], from: ['About 10 minutes per project', 'Photo credits and permissions'], done: ['Every supplied project meets the standard', 'Structured data validates'] },
    { id: 'M5', when: 'From month 3', name: 'Authority & Growth', del: ['Archello and Architizer profiles', 'Publication shortlist', 'Submission kit for a built project', 'Outreach log'], from: ['Approval of submissions', 'Client permissions', 'Ideally, professional photography'], done: ['Profiles live', 'First submission sent — publication is the editors’ decision'] },
    { id: 'M6', when: 'Monthly from week 6', name: 'Measurement & Improvement', del: ['Live dashboard', 'Monthly one-page report', 'Health checks', 'Quarterly review'], from: ['Twenty minutes a month', 'Enquiry log kept current'], done: ['Dashboard live', 'Reports on schedule, decisions recorded'] },
  ], 'M4 is paced by the studio\'s project information — it cannot be completed from my side alone. M5: professional photography of completed projects is the single most valuable authority investment, and the studio\'s decision; publication is never guaranteed. ' +
    'M6 turns everything into a monthly rhythm.');

  // ------------------------------------------------------------ 16 what MACK receives
  pres.addSection({ title: 'Engagement' });
  {
    const s = content('Engagement', '16 — What MACK receives', 'Concrete deliverables',
      'Four groups. Everything listed is a thing the studio can open, check or use — not a vague service. All accounts remain the studio\'s property.');
    const groups = [
      ['Owned identity', ['Domain registered to the studio', 'Studio email for each person', 'Shared drives with permissions', 'Independent, tested backup', 'Access map: MACK owns every account']],
      ['A searchable website', ['The new site live on the domain', 'Technical fixes and structured data', 'Project pages to one standard', 'Service pages', 'Project form and publishing routine']],
      ['Local presence', ['Verified Business Profile', 'Consistent details on Google, Bing, Instagram', 'Review request kit', 'Playbook for each new studio']],
      ['Measurement & care', ['Analytics with enquiry tracking', 'Search Console', 'Live dashboard', 'Monthly report, quarterly review', 'Monthly maintenance and health checks']],
    ];
    const cw = 2.84, gap = 0.257;
    groups.forEach(([g, items], i) => {
      const x = L + i * (cw + gap);
      const y = 1.78;
      box(s, x, y, cw, 0.62, { fill: i === 1 ? NIGHT : STONE, line: false });
      T(s, g, { x: x + 0.18, y, w: cw - 0.3, h: 0.62, size: 17, serif: true, color: i === 1 ? PAPER : INK, valign: 'middle' });
      items.forEach((it, j) => {
        const yy = y + 0.85 + j * 0.8;
        box(s, x, yy + 0.2, 0.09, 0.09, { fill: INK, line: false });
        T(s, it, { x: x + 0.24, y: yy + 0.1, w: cw - 0.24, h: 0.66, size: 13.5, color: INK2, lsm: 1.15 });
        hair(s, x, yy + 0.8, cw, RULE);
      });
    });
  }

  // ------------------------------------------------------------ 17 operating model
  {
    const s = content('Engagement', '17 — Operating model', 'Implement once, then improve every month',
      'Implementation and launch happen once. After that the work runs as a monthly cycle: measure, improve, report — and repeat. ' +
        'Every month: Search Console and indexing review, Business Profile upkeep and review replies, new projects published, site, form and backup checks, and the one-page report with next actions. ' +
        'Every quarter: a review meeting, refresh of the search-intent map, an access audit and a test restore of the backup. The studio\'s part is small but essential: project information, approvals and twenty minutes a month.');
    // linear part
    const y = 3.55;
    node(s, L, y, 1.75, 0.6, 'Implement', { size: 15, serif: true, align: 'center' });
    ln(s, L + 1.82, y + 0.3, L + 2.18, y + 0.3, { arrow: true });
    node(s, L + 2.25, y, 1.6, 0.6, 'Launch', { size: 15, serif: true, align: 'center', fill: NIGHT, color: PAPER, line: NIGHT });
    ln(s, L + 3.92, y + 0.3, 4.95, y + 0.3, { arrow: true });
    label(s, 'Once', { x: L, y: y - 0.45, w: 3.8, h: 0.25 });
    // loop
    const ccx = 6.55, ccy = 3.85, r = 1.45;
    s.addShape(pres.shapes.OVAL, { x: ccx - r, y: ccy - r, w: 2 * r, h: 2 * r, fill: { type: 'none' }, line: { color: INK3, width: 0.75, dashType: 'dash' } });
    const loop = [['Measure', -90], ['Improve', 30], ['Report', 150]];
    loop.forEach(([t, deg]) => {
      const rad = (deg * Math.PI) / 180;
      const nx = ccx + r * Math.cos(rad), ny = ccy + r * Math.sin(rad);
      node(s, nx - 0.75, ny - 0.27, 1.5, 0.54, t, { size: 14, serif: true, align: 'center', fill: PAPER });
    });
    T(s, 'Repeat', { x: ccx - 0.8, y: ccy - 0.2, w: 1.6, h: 0.4, size: 12, color: INK3, align: 'center', italic: true });
    label(s, 'Then, monthly', { x: ccx - r, y: ccy - r - 0.62, w: 3, h: 0.25 });
    [-30, 90, 210].forEach((deg) => {
      const rad = (deg * Math.PI) / 180;
      const px = ccx + r * Math.cos(rad), py = ccy + r * Math.sin(rad);
      const tx = -Math.sin(rad), ty = Math.cos(rad);
      ln(s, px - tx * 0.16, py - ty * 0.16, px + tx * 0.16, py + ty * 0.16, { arrow: true, color: INK, lw: 1 });
    });
    // right lists
    const rx = 8.85, rw = R - rx;
    label(s, 'Every month', { x: rx, y: 1.78, w: rw, h: 0.25 });
    ['Search Console and indexing review', 'Business Profile upkeep, review replies', 'New projects published', 'Site, form and backup checks', 'One-page report and next actions'].forEach((t, i) => {
      const yy = 2.1 + i * 0.4;
      hair(s, rx, yy, rw, i === 0 ? INK : RULE);
      T(s, t, { x: rx, y: yy + 0.08, w: rw, h: 0.3, size: 12.5, color: INK2 });
    });
    label(s, 'Every quarter', { x: rx, y: 4.3, w: rw, h: 0.25 });
    ['Review meeting', 'Search-intent map refreshed', 'Access audit', 'Backup restore test'].forEach((t, i) => {
      const yy = 4.62 + i * 0.4;
      hair(s, rx, yy, rw, i === 0 ? INK : RULE);
      T(s, t, { x: rx, y: yy + 0.08, w: rw, h: 0.3, size: 12.5, color: INK2 });
    });
    box(s, L, 6.0, 7.3, 0.7, { fill: STONE, line: false });
    T(s, 'The studio’s part: project information, approvals, twenty minutes a month.', { x: L + 0.22, y: 6.0, w: 7.0, h: 0.7, size: 13, valign: 'middle' });
  }

  // ------------------------------------------------------------ 18 expectations
  {
    const s = content('Engagement', '18 — Realistic expectations', 'What can be committed, and what can’t',
      'Committed: the work in every milestone, done to Google\'s guidelines, on the agreed timeline given inputs, with transparent monthly measurement — and the studio owns everything. ' +
        'Not promised: positions such as "number one on Google", traffic or lead numbers, a particular Maps position (distance from the searcher is part of how Google ranks), or publication by editors. ' +
        'What usually happens: pages indexed within days to weeks of launch; the studio\'s name returning its own site within weeks; new searches starting to show in one to three months; compounding visibility over three to twelve months. Search builds up over time, and the progress is measured every month.');
    const cw = 5.8;
    const blocks = [
      ['Committed', ['The work in every milestone, to Google’s guidelines', 'The timeline, given decisions and inputs', 'Honest monthly measurement and reporting', 'Every account owned by the studio'], INK],
      ['Not promised', ['Specific positions — “#1 on Google”', 'Traffic, lead or footfall numbers', 'A Maps position (distance is part of ranking)', 'Publication — editors decide'], INK3],
    ];
    blocks.forEach(([h, items, col], i) => {
      const x = L + i * (cw + 0.53);
      T(s, h, { x, y: 1.75, w: cw, h: 0.5, size: 22, serif: true, color: col });
      items.forEach((t, j) => {
        const y = 2.4 + j * 0.5;
        hair(s, x, y, cw, j === 0 ? col : RULE);
        T(s, t, { x, y: y + 0.11, w: cw, h: 0.34, size: 14, color: i === 0 ? INK2 : INK3 });
      });
    });
    // what usually happens
    label(s, 'What usually happens after launch', { x: L, y: 4.68, w: 6, h: 0.25 });
    const steps = [['Days–weeks', 'Pages indexed'], ['Weeks', 'A search for the studio’s full name returns its site'], ['1–3 months', 'New searches begin to appear'], ['3–12 months', 'Visibility and actions compound']];
    const sw = CW / steps.length;
    hair(s, L, 5.2, CW, INK);
    steps.forEach(([a, b], i) => {
      const x = L + i * sw;
      dot(s, x - 0.0, 5.12, 0.16, i === 0, INK);
      T(s, a, { x, y: 5.38, w: sw - 0.2, h: 0.4, size: 17, serif: true });
      T(s, b, { x, y: 5.8, w: sw - 0.3, h: 0.5, size: 12.5, color: INK2 });
    });
    T(s, 'Google states there is no way to pay for a better local ranking, and that meeting its requirements does not guarantee a page will be indexed or shown.', { x: L, y: 6.45, w: CW, h: 0.3, size: 10.5, color: INK3, italic: true });
  }

  // ------------------------------------------------------------ 19 next step
  pres.addSection({ title: 'Next step' });
  {
    const s = pres.addSlide({ masterName: 'MACK_DARK', sectionTitle: 'Next step' });
    s.addText('19 — NEXT STEP', { placeholder: 'kicker', charSpacing: 1.6 });
    s.addText('Align, access, audit, implement', { placeholder: 'title' });
    s.addNotes('The first step is a working session of about ninety minutes to settle the identity questions (studio name, domain, the existing Google listing), agree who owns each account and grant access. ' +
      'Then the baseline audit is recorded, and Milestone 1 begins.');
    const steps = [
      ['Align', ['Studio name and domain', 'Services to be found for', 'How the existing Google listing should represent MACK']],
      ['Access', ['Domain and DNS', 'Google accounts and hosting', 'Business Profile ownership']],
      ['Audit', ['Baseline recorded: search, profile, speed, enquiries', 'Project information form sent']],
      ['Implement', ['Milestone 1 begins', 'First progress note at the end of week 2']],
    ];
    const cw = 2.84, gap = 0.257;
    steps.forEach(([t, items], i) => {
      const x = L + i * (cw + gap);
      T(s, String(i + 1).padStart(2, '0'), { x, y: 2.0, w: 1, h: 0.5, size: 30, serif: true, color: SAND });
      T(s, t, { x, y: 2.65, w: cw, h: 0.55, size: 26, serif: true, color: PAPER });
      hair(s, x, 3.35, cw, ONNIGHT2);
      T(s, items.map((it, j) => ({ text: it, options: { breakLine: j < items.length - 1 } })), { x, y: 3.5, w: cw - 0.1, h: 1.9, size: 13.5, color: ONNIGHT2, lsm: 1.15, psa: 8 });
      if (i < steps.length - 1) ln(s, x + 0.85, 2.27, x + cw + gap - 0.12, 2.27, { arrow: true, color: ONNIGHT2, lw: 0.75 });
    });
    s.addImage({ path: monoLight, x: L, y: 5.85, w: 0.4, h: 0.4 * 663 / 685, altText: 'MACK monogram' });
    T(s, 'A first working session of about ninety minutes is enough to begin.', { x: L + 0.6, y: 5.88, w: 9, h: 0.35, size: 14, color: PAPER, serif: true, italic: true });
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

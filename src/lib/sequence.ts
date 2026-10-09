import type { Img } from '@/content/projects';

// Composes a project's images into an exhibition hang.
// Rules (from the research): rotate wide / offset single / pairs; never the same
// layout twice in a row; respect native resolution (small files never go wide);
// drawings are centred on the paper with a caption.

export type Slot = { img: Img; index: number; col: string; offset?: boolean };
export type Row = { kind: 'wide' | 'single' | 'pair' | 'drawing'; slots: Slot[] };

const isPortrait = (i: Img) => i.h > i.w * 1.05;
const isSmall = (i: Img) => i.w < 1300;

const WIDE = ['1 / 11', '3 / 13', '2 / 12'];
const SINGLE = ['5 / 11', '2 / 8', '7 / 13', '3 / 9'];
const SINGLE_PORTRAIT = ['7 / 11', '3 / 7', '8 / 12', '4 / 8'];

export function compose(images: Img[], startIndex = 0): Row[] {
  const rows: Row[] = [];
  let w = 0;
  let s = 0;
  let sp = 0;
  let pairFlip = false;
  let last: Row['kind'] | null = null;

  for (let k = 0; k < images.length; k++) {
    const a = images[k];
    const b = images[k + 1];
    const idx = startIndex + k;

    if (a.kind === 'drawing') {
      rows.push({ kind: 'drawing', slots: [{ img: a, index: idx, col: isPortrait(a) ? '4 / 10' : '3 / 11' }] });
      last = 'drawing';
      continue;
    }

    // Two portraits, or a portrait with a landscape, hang as a pair.
    if (b && b.kind !== 'drawing' && (isPortrait(a) || isPortrait(b)) && last !== 'pair') {
      const aP = isPortrait(a);
      const bP = isPortrait(b);
      let cols: [string, string];
      if (aP && bP) cols = pairFlip ? ['2 / 6', '8 / 12'] : ['3 / 7', '8 / 12'];
      else if (aP) cols = ['2 / 6', '7 / 13'];
      else cols = ['1 / 8', '9 / 12'];
      rows.push({
        kind: 'pair',
        slots: [
          { img: a, index: idx, col: cols[0] },
          { img: b, index: idx + 1, col: cols[1], offset: true },
        ],
      });
      pairFlip = !pairFlip;
      last = 'pair';
      k++;
      continue;
    }

    if (isPortrait(a)) {
      rows.push({ kind: 'single', slots: [{ img: a, index: idx, col: SINGLE_PORTRAIT[sp++ % SINGLE_PORTRAIT.length] }] });
      last = 'single';
      continue;
    }

    // Landscape: wide when the file can carry it and the last row wasn't wide.
    if (!isSmall(a) && last !== 'wide') {
      rows.push({ kind: 'wide', slots: [{ img: a, index: idx, col: WIDE[w++ % WIDE.length] }] });
      last = 'wide';
    } else {
      rows.push({ kind: 'single', slots: [{ img: a, index: idx, col: SINGLE[s++ % SINGLE.length] }] });
      last = 'single';
    }
  }
  return rows;
}

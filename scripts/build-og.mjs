// Share images (1200×630) cropped by saliency from the graded masters, plus the touch icon.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const media = JSON.parse(await fs.readFile(path.join(ROOT, 'src/content/media.generated.json'), 'utf8'));
const OUT = path.join(ROOT, 'public/og');
await fs.mkdir(OUT, { recursive: true });

const covers = {
  home: 'udaipur-resort/01',
  projects: 'agra-fort-project/14',
  studio: 'studio/courtyard',
  contact: 'studio/pavilion',
  ora: 'ora/01',
  'udaipur-resort': 'udaipur-resort/01',
  'red-fort-project': 'red-fort-project/11',
  'rc-house': 'rc-house/01',
  'the-31st': 'the-31st/01',
  'agra-fort-project': 'agra-fort-project/14',
  'gandhinagar-house': 'gandhinagar-house/01',
  'the-earthen-room': 'the-earthen-room/01',
  'figuring-out': 'figuring-out/01',
  'house-2': 'house-2/01',
  'kids-room': 'kids-room/02',
};

for (const [name, key] of Object.entries(covers)) {
  if (!media[key]) throw new Error(`missing media ${key}`);
  const src = path.join(ROOT, 'public', media[key].src);
  await sharp(src)
    .resize(1200, 630, { fit: 'cover', position: sharp.strategy.attention })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(path.join(OUT, `${name}.jpg`));
}

await sharp(path.join(ROOT, 'src/app/icon.svg'), { density: 300 })
  .resize(180, 180)
  .png()
  .toFile(path.join(ROOT, 'src/app/apple-icon.png'));

console.log(`${Object.keys(covers).length} share images → public/og, apple-icon.png`);

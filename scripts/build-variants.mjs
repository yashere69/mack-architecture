// After `next build` (static export), write the responsive image variants into out/media/w/.
// Every width the site can request is generated for every image; widths above an image's
// native size are written at native size (never upscaled).
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'out');
const WIDTHS = [96, 240, 480, 828, 1280, 1920]; // 2400 = the master itself (see image-loader.ts)
const media = JSON.parse(await fs.readFile(path.join(ROOT, 'src/content/media.generated.json'), 'utf8'));

await fs.access(OUT).catch(() => {
  throw new Error('out/ not found — run `next build` first');
});

let n = 0;
let bytes = 0;
const jobs = [];
for (const [key, m] of Object.entries(media)) {
  const src = path.join(ROOT, 'public', m.src);
  for (const w of WIDTHS) {
    const dest = path.join(OUT, 'media', 'w', `${key}-${w}.webp`);
    jobs.push(async () => {
      await fs.mkdir(path.dirname(dest), { recursive: true });
      const info = await sharp(src)
        .resize({ width: Math.min(w, m.w), withoutEnlargement: true })
        .webp({ quality: w <= 240 ? 70 : 80, effort: 4, smartSubsample: true })
        .toFile(dest);
      n++;
      bytes += info.size;
    });
  }
}
// Small worker pool
const queue = [...jobs];
await Promise.all(Array.from({ length: 6 }, async () => { while (queue.length) await queue.shift()(); }));
console.log(`${n} image variants → out/media/w (${(bytes / 1048576).toFixed(1)} MB)`);

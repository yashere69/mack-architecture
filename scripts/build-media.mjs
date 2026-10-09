// Normalises the client's source imagery into web masters + a typed manifest.
//
//   media-src/sources.json  → list of { key, url, raw }  (raw files are gitignored)
//   public/media/<key>.webp → visually-lossless master, native resolution (never upscaled)
//   src/content/media.generated.json → { [key]: { src, w, h, blur, color } }
//
// next/image derives responsive AVIF/WebP variants from the masters at request time.
// Raw files are re-downloaded from the client's CMS if missing.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'media-src');
const OUT = path.join(ROOT, 'public', 'media');
const MANIFEST = path.join(ROOT, 'src', 'content', 'media.generated.json');
const MAX_W = 2400;
const PAPER = { r: 238, g: 235, b: 229 }; // --paper; drawings with alpha are flattened onto the page colour

const sources = JSON.parse(await fs.readFile(path.join(SRC, 'sources.json'), 'utf8'));
const manifest = {};

async function ensureRaw(s) {
  const file = path.join(SRC, 'raw', s.raw);
  try {
    await fs.access(file);
  } catch {
    const res = await fetch(s.url);
    if (!res.ok) throw new Error(`download failed ${res.status} ${s.url}`);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, Buffer.from(await res.arrayBuffer()));
  }
  return file;
}

for (const s of sources) {
  const raw = await ensureRaw(s);
  const out = path.join(OUT, `${s.key}.webp`);
  await fs.mkdir(path.dirname(out), { recursive: true });

  const base = sharp(raw).rotate().flatten({ background: PAPER });
  const meta = await base.metadata();
  const pipeline = meta.width > MAX_W ? base.resize({ width: MAX_W }) : base;
  const info = await pipeline.clone().webp({ quality: 90, effort: 5, smartSubsample: true }).toFile(out);

  const tiny = await pipeline.clone().resize(20, null, { fit: 'inside' }).webp({ quality: 45 }).toBuffer();
  const { dominant } = await pipeline.clone().stats();
  const hex = (n) => n.toString(16).padStart(2, '0');

  manifest[s.key] = {
    src: `/media/${s.key}.webp`,
    w: info.width,
    h: info.height,
    blur: `data:image/webp;base64,${tiny.toString('base64')}`,
    color: `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}`,
  };
  process.stdout.write(`${s.key} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB\n`);
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 1) + '\n');
console.log(`\n${Object.keys(manifest).length} images → ${path.relative(ROOT, MANIFEST)}`);

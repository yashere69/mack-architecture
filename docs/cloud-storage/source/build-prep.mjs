// Builds MACK-Call-Prep.pdf (internal call-prep pack) from prep.html.
//   NODE_PATH=$(npm root -g) node docs/cloud-storage/source/build-prep.mjs
// Prices in prep.html are the audited figures in ../mack-pricing-audit.md.
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const { chromium } = createRequire(import.meta.url)('playwright');
const here = dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(join(here, 'prep.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const overflow = await page.evaluate(() =>
  [...document.querySelectorAll('.page')].flatMap((p, i) => {
    const pr = p.getBoundingClientRect();
    return [...p.querySelectorAll('*')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width && (r.bottom > pr.bottom + 0.5 || r.right > pr.right + 0.5);
    }).map((el) => `page ${i + 1}: <${el.tagName.toLowerCase()}>`);
  }),
);
if (overflow.length) { console.error('Overflow:\n' + overflow.slice(0, 20).join('\n')); process.exitCode = 1; }
const out = join(here, '..', 'MACK-Call-Prep.pdf');
await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
console.log('wrote', out);
await browser.close();

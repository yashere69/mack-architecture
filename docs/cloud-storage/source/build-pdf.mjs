// Builds MACK-Cloud-Storage-Backup.pdf from template.html + costs.json.
//
//   python3 docs/cloud-storage/source/costs.py --json
//   NODE_PATH=$(npm root -g) node docs/cloud-storage/source/build-pdf.mjs [--png]
//
// Needs Playwright (any recent version) with Chromium. --png also writes page previews to source/preview/.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = dirname(fileURLToPath(import.meta.url));
const costs = JSON.parse(readFileSync(join(here, 'costs.json'), 'utf8'));

// Indian digit grouping: 126320 -> ₹1,26,320
const inr = (n) => {
  const s = String(Math.round(n));
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return '₹' + (rest ? rest + ',' + last3 : last3);
};

const { A, B, C } = costs.options;
const tokens = {
  researched: costs.researched,
  fx: String(costs.fx),
  team: String(costs.team),
  'google.year': inr(costs.google.year),
  'idrive.year': inr(costs.idrive.year),
  'vault.each': inr(costs.vault_drive[1]),
  'nas.usable': String(costs.nas.usable_tb),
};
for (const [k, o] of Object.entries({ A, B, C })) {
  for (const f of ['one_time_total', 'month', 'year', 'year1', 'year2']) tokens[`${k}.${f}`] = inr(o[f]);
  tokens[`${k}.users`] = String(o.users);
  o.one_time.forEach(([, v], i) => (tokens[`${k}.ot${i}`] = inr(v)));
  o.recurring.forEach(([, v], i) => (tokens[`${k}.rec${i}`] = inr(v)));
}

let html = readFileSync(join(here, 'template.html'), 'utf8');
html = html.replace(/\{\{([\w.]+)\}\}/g, (m, k) => {
  if (!(k in tokens)) throw new Error(`Unknown token ${m}`);
  return tokens[k];
});
const built = join(here, 'build.html');
writeFileSync(built, html);

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage();
await page.goto(pathToFileURL(built).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

// Overflow guard: any element whose content escapes its page fails the build.
const overflow = await page.evaluate(() =>
  [...document.querySelectorAll('.page')].flatMap((p, i) => {
    const pr = p.getBoundingClientRect();
    return [...p.querySelectorAll('*')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width && (r.bottom > pr.bottom + 0.5 || r.right > pr.right + 0.5);
      })
      .map((el) => `page ${i + 1}: <${el.tagName.toLowerCase()} class="${el.className?.baseVal ?? el.className}">`);
  }),
);
if (overflow.length) {
  console.error('Overflow:\n' + overflow.slice(0, 20).join('\n'));
  process.exitCode = 1;
}

const out = join(here, '..', 'MACK-Cloud-Storage-Backup.pdf');
await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
console.log('wrote', out);

if (process.argv.includes('--png')) {
  mkdirSync(join(here, 'preview'), { recursive: true });
  const pages = await page.$$('.page');
  for (const [i, p] of pages.entries()) await p.screenshot({ path: join(here, 'preview', `page-${i + 1}.png`) });
  console.log('wrote previews');
}
await browser.close();

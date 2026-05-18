import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');
const srcDir = path.join(__dirname, '../src');

function walk(dir, ext = null) {
  const out = [];
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) out.push(...walk(p, ext));
    else if (!ext || name.name.endsWith(ext)) out.push(p);
  }
  return out;
}

function preferWebp(src) {
  if (!/\/images\//i.test(src)) return src;
  if (!/\.(jpe?g|png)$/i.test(src)) return src;
  return src.replace(/\.(jpe?g|png)$/i, '.webp');
}

function resolvePublicImage(src) {
  let p = src.trim();
  if (!p.startsWith('/') && !p.startsWith('http')) p = `/${p}`;
  return preferWebp(p);
}

const refs = new Set();
const files = walk(srcDir).filter((f) => /\.(tsx?|json)$/.test(f));

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const re = /['"`](\/images\/[^'"`]+|images\/[^'"`]+)['"`]/gi;
  let m;
  while ((m = re.exec(text))) refs.add(m[1]);
}

const missing = [];
for (const ref of [...refs].sort()) {
  const resolved = resolvePublicImage(ref);
  const disk = path.join(publicDir, resolved.replace(/^\//, ''));
  if (!fs.existsSync(disk)) missing.push({ ref, resolved });
}

console.log(`Checked ${refs.size} image refs`);
if (missing.length === 0) {
  console.log('All resolved paths exist.');
} else {
  console.log(`Missing ${missing.length}:`);
  missing.forEach(({ ref, resolved }) => console.log(`  ${ref} -> ${resolved}`));
  process.exit(1);
}

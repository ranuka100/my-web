/**
 * Remove duplicate / unneeded images after WebP optimization.
 *
 *   npm run cleanup-images          # dry-run
 *   npm run cleanup-images -- --apply
 */
import { readFileSync, writeFileSync } from 'fs';
import { readdir, unlink, mkdir, copyFile, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicImages = join(__dirname, '../public/images');
const apply = process.argv.includes('--apply');

const SHARED_DEDUPE = [
  { name: 'IMG_6730.jpg', from: 'products/davula/IMG_6730.jpg' },
  { name: 'IMG_6755.jpg', from: 'products/davula/IMG_6755.jpg' },
  { name: 'ASH06957.JPG', from: 'products/davula/ASH06957.JPG' },
];

const PRODUCT_FOLDERS = ['davula', 'Thammattama', 'pahatharata_beraya', 'getaberaya'];

const JSON_REPLACEMENTS = [
  ['/images/products/Thammattama/IMG_6730.jpg', '/images/shared/IMG_6730.jpg'],
  ['/images/products/pahatharata_beraya/IMG_6730.jpg', '/images/shared/IMG_6730.jpg'],
  ['/images/products/getaberaya/IMG_6730.jpg', '/images/shared/IMG_6730.jpg'],
  ['/images/products/davula/IMG_6730.jpg', '/images/shared/IMG_6730.jpg'],
  ['/images/products/Thammattama/IMG_6755.jpg', '/images/shared/IMG_6755.jpg'],
  ['/images/products/pahatharata_beraya/IMG_6755.jpg', '/images/shared/IMG_6755.jpg'],
  ['/images/products/davula/IMG_6755.jpg', '/images/shared/IMG_6755.jpg'],
  ['/images/products/Thammattama/ASH06957.JPG', '/images/shared/ASH06957.JPG'],
  ['/images/products/davula/ASH06957.JPG', '/images/shared/ASH06957.JPG'],
];

const UNREFERENCED = [
  'home/heropage_bg_1.png',
  'home/heropage_bg_1.webp',
  'aboutUs/pic1.jpeg',
  'aboutUs/pic1.webp',
];

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

async function removeFile(file, reason) {
  const rel = file.replace(publicImages, '').replace(/\\/g, '/');
  if (!apply) {
    console.log(`[dry-run] remove ${rel} — ${reason}`);
    return;
  }
  await unlink(file);
  console.log(`Removed ${rel} — ${reason}`);
}

async function main() {
  const sharedDir = join(publicImages, 'shared');
  if (apply) await mkdir(sharedDir, { recursive: true });

  for (const { name, from } of SHARED_DEDUPE) {
    const src = join(publicImages, from);
    const dest = join(sharedDir, name);
    const srcWebp = src.replace(/\.(jpe?g|png)$/i, '.webp');
    const destWebp = dest.replace(/\.(jpe?g|png)$/i, '.webp');

    if (await exists(src)) {
      if (apply) {
        await copyFile(src, dest);
        if (await exists(srcWebp)) await copyFile(srcWebp, destWebp);
        console.log(`Shared → ${name}`);
      } else {
        console.log(`[dry-run] copy shared/${name} from ${from}`);
      }
    }

    for (const folder of PRODUCT_FOLDERS) {
      const dup = join(publicImages, 'products', folder, name);
      if (await exists(dup)) await removeFile(dup, `duplicate → shared/${name}`);
      const dupWebp = dup.replace(/\.(jpe?g|png)$/i, '.webp');
      if (await exists(dupWebp)) await removeFile(dupWebp, 'duplicate webp');
    }
  }

  for (const rel of UNREFERENCED) {
    const full = join(publicImages, rel);
    if (await exists(full)) await removeFile(full, 'unreferenced in app');
  }

  const productJsonPath = join(__dirname, '../src/data/Product_Details.json');
  let json = readFileSync(productJsonPath, 'utf8');
  for (const [from, to] of JSON_REPLACEMENTS) {
    json = json.split(from).join(to);
  }
  if (apply) {
    writeFileSync(productJsonPath, json);
    console.log('Updated Product_Details.json');
  } else {
    console.log('[dry-run] would update Product_Details.json');
  }

  const all = await walk(publicImages);
  for (const file of all) {
    if (!/\.(jpe?g|png)$/i.test(file)) continue;
    const webp = file.replace(/\.(jpe?g|png)$/i, '.webp');
    if (await exists(webp)) {
      await removeFile(file, 'WebP exists; app uses preferWebp()');
    }
  }

  console.log(
    apply
      ? '\nCleanup complete.'
      : '\nDry-run done. Apply with: npm run cleanup-images -- --apply'
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/**
 * Optimize images under public/images:
 * 1. Compress large JPEG/PNG in place
 * 2. Create .webp versions alongside (use with <picture> via SeoImage)
 *
 * Run: npm install -D sharp && npm run optimize-images
 */
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicImages = join(__dirname, '../public/images');

const MAX_WIDTH = 1920;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 80;
const WEBP_QUALITY = 82;
const MIN_BYTES_TO_OPTIMIZE = 300_000;
/** Always create WebP alongside JPEG/PNG (UI uses preferWebp for all /images/ paths). */
const MIN_BYTES_FOR_WEBP = 0;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function webpPathFor(file) {
  return file.replace(/\.(jpe?g|png)$/i, '.webp');
}

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.error('Install sharp first: npm install -D sharp');
    process.exit(1);
  }

  const files = (await walk(publicImages)).filter((f) =>
    /\.(jpe?g|png)$/i.test(f)
  );

  let savedOriginal = 0;
  let webpCreated = 0;

  for (const file of files) {
    try {
      const { size } = await stat(file);
      const ext = extname(file).toLowerCase();
      const base = sharp(file).rotate().resize({
        width: MAX_WIDTH,
        withoutEnlargement: true,
      });

      if (size >= MIN_BYTES_FOR_WEBP) {
        const webpOut = webpPathFor(file);
        const webpBuffer = await base
          .clone()
          .webp({ quality: WEBP_QUALITY, effort: 4 })
          .toBuffer();
        await sharp(webpBuffer).toFile(webpOut);
        webpCreated++;
        console.log(
          `WebP ${webpOut.replace(publicImages, '')}: ${(webpBuffer.length / 1024).toFixed(0)} KB (from ${(size / 1024 / 1024).toFixed(2)} MB ${ext})`
        );
      }

      if (size < MIN_BYTES_TO_OPTIMIZE) continue;

      const buffer =
        ext === '.png'
          ? await base
              .clone()
              .png({ quality: PNG_QUALITY, compressionLevel: 9 })
              .toBuffer()
          : await base
              .clone()
              .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
              .toBuffer();

      if (buffer.length < size) {
        const tempOut = `${file}.opt.tmp`;
        await sharp(buffer).toFile(tempOut);
        try {
          await unlink(file);
        } catch {
          /* file may be locked; overwrite via temp rename on next line may still fail */
        }
        await rename(tempOut, file);
        savedOriginal += size - buffer.length;
        console.log(
          `Compressed ${file.replace(publicImages, '')}: ${(size / 1024 / 1024).toFixed(2)} MB → ${(buffer.length / 1024 / 1024).toFixed(2)} MB`
        );
      }
    } catch (err) {
      console.warn(`Skip ${file.replace(publicImages, '')}: ${err.message}`);
    }
  }

  console.log('\n--- Summary ---');
  console.log(`WebP files created/updated: ${webpCreated}`);
  console.log(
    savedOriginal > 0
      ? `Originals saved: ~${(savedOriginal / 1024 / 1024).toFixed(2)} MB`
      : 'No large originals needed recompression.'
  );
  console.log('Use SeoImage or <picture> so browsers load .webp when supported.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

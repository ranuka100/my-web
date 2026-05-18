/** Prefer WebP for display when path is under /images/ */
export function getWebpPath(src: string): string | undefined {
  if (!/\/images\//i.test(src)) return undefined;
  if (!/\.(jpe?g|png)$/i.test(src)) return undefined;
  return src.replace(/\.(jpe?g|png)$/i, '.webp');
}

/** Use WebP in UI when available (run npm run optimize-images first). */
export function preferWebp(src: string): string {
  return getWebpPath(src) ?? src;
}

/** Normalize public image paths and prefer WebP (fixes missing leading slash). */
export function resolvePublicImage(src: string): string {
  const trimmed = src.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return preferWebp(withSlash);
}

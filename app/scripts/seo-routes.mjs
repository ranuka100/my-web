import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Routes to include in sitemap and static prerender (SEO). */
export function getSiteRoutes() {
  const productsJson = JSON.parse(
    readFileSync(join(__dirname, '../src/data/Product_Details.json'), 'utf8')
  );

  return [
    '/',
    '/product',
    ...productsJson.products.map((p) => `/product/${p.slug}`),
    '/about',
  ];
}

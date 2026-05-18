import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = process.env.VITE_SITE_URL || 'https://tharangadrums.lk';

const productsJson = JSON.parse(
  readFileSync(join(__dirname, '../src/data/Product_Details.json'), 'utf8')
);

const routes = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/product', changefreq: 'weekly', priority: '0.9' },
  ...productsJson.products.map((p) => ({
    loc: `/product/${p.slug}`,
    changefreq: 'weekly',
    priority: '0.85',
  })),
  { loc: '/about', changefreq: 'monthly', priority: '0.8' },
];

const lastmod = new Date().toISOString().split('T')[0];

const urlset = routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.loc === '/' ? '' : r.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`;

const out = join(__dirname, '../public/sitemap.xml');
writeFileSync(out, xml, 'utf8');
console.log(`Wrote ${out} (${routes.length} URLs)`);

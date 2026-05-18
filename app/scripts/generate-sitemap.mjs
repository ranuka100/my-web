import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getSiteRoutes } from './seo-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = process.env.VITE_SITE_URL || 'https://tharangadrums.lk';

const priorityByPath = (loc) => {
  if (loc === '/') return { changefreq: 'weekly', priority: '1.0' };
  if (loc === '/product') return { changefreq: 'weekly', priority: '0.9' };
  if (loc.startsWith('/product/')) return { changefreq: 'weekly', priority: '0.85' };
  if (loc === '/about') return { changefreq: 'monthly', priority: '0.8' };
  return { changefreq: 'weekly', priority: '0.5' };
};

const routes = getSiteRoutes().map((loc) => ({ loc, ...priorityByPath(loc) }));

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

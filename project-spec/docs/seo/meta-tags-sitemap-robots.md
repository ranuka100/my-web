# Meta Tags, Open Graph, Sitemap & Robots

---

## 1. Environment config

**`app/.env.production`:**

```env
VITE_SITE_URL=https://tharangadrums.lk
VITE_GSC_VERIFICATION=
VITE_BING_VERIFICATION=
```

**`app/src/seo/siteConfig.ts`:**

```ts
export const SITE_URL =
  import.meta.env.VITE_SITE_URL ?? 'https://tharangadrums.lk';

export const SITE = {
  name: 'Tharanga Drums',
  brand: 'Beats of Heritage',
  legalName: 'New Tharanga Musical Instruments',
  url: SITE_URL,
  defaultOgImage: `${SITE_URL}/images/og/default-og.jpg`,
  locale: 'en_LK',
};
```

---

## 2. Page meta registry

**`app/src/seo/pageMeta.ts`:**

```ts
import { SITE_URL } from './siteConfig';

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
};

export const PAGE_META: Record<string, PageMeta> = {
  '/': {
    path: '/',
    title: 'Handcrafted Sri Lankan Drum Souvenirs | Tharanga Drums',
    description:
      'Award-winning miniature traditional drums from Sri Lanka. Davula, Geta Beraya, Thammattama & more — perfect gifts and décor.',
    ogImage: `${SITE_URL}/images/og/home-og.jpg`,
  },
  '/product': {
    path: '/product',
    title: 'Traditional Drum Souvenirs & Keepsakes | Tharanga Drums',
    description:
      'Explore handcrafted drum souvenirs: Davula Keepsake, Thammattama, Pahatharata Beraya & Geta Beraya. Premium mahogany, artisan-made in Sri Lanka.',
    ogImage: `${SITE_URL}/images/og/product-og.jpg`,
  },
  '/about': {
    path: '/about',
    title: 'About Us — Sri Lankan Drum Craftsmanship | Tharanga Drums',
    description:
      '2,500 years of tradition. Presidential Award–winning drum makers in Nittambuwa. National Crafts Council partner.',
    ogImage: `${SITE_URL}/images/og/about-og.jpg`,
  },
};
```

---

## 3. PageSeo component (reference implementation)

```tsx
// app/src/seo/PageSeo.tsx
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { PAGE_META } from './pageMeta';
import { SITE, SITE_URL } from './siteConfig';

export function PageSeo() {
  const { pathname } = useLocation();
  const meta = PAGE_META[pathname] ?? PAGE_META['/'];
  const canonical = `${SITE_URL}${meta.path === '/' ? '' : meta.path}`;
  const ogImage = meta.ogImage ?? SITE.defaultOgImage;
  const robots = meta.noindex ? 'noindex, nofollow' : 'index, follow';

  return (
    <Helmet>
      <html lang="en" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={meta.ogType ?? 'website'} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={SITE.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={ogImage} />

      {import.meta.env.VITE_GSC_VERIFICATION && (
        <meta
          name="google-site-verification"
          content={import.meta.env.VITE_GSC_VERIFICATION}
        />
      )}
      {import.meta.env.VITE_BING_VERIFICATION && (
        <meta
          name="msvalidate.01"
          content={import.meta.env.VITE_BING_VERIFICATION}
        />
      )}
    </Helmet>
  );
}
```

**Usage:** Render `<PageSeo />` inside `DefaultLayout` (above `<Outlet />`) so every route updates head tags.

---

## 4. robots.txt

**`app/public/robots.txt`:**

```txt
# https://tharangadrums.lk/robots.txt
User-agent: *
Allow: /

# Block non-public paths if added later
# Disallow: /admin/
# Disallow: /api/

Sitemap: https://tharangadrums.lk/sitemap.xml
```

For staging, use `Disallow: /` or HTTP auth — do not submit staging sitemap to GSC.

---

## 5. Sitemap generation script

**`app/scripts/generate-sitemap.mjs`:**

```js
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = process.env.VITE_SITE_URL || 'https://tharangadrums.lk';

const routes = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/product', changefreq: 'weekly', priority: '0.9' },
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
console.log('Wrote', out);
```

**`package.json` scripts:**

```json
"prebuild": "node scripts/generate-sitemap.mjs"
```

---

## 6. Dynamic sitemap (Phase 2)

When adding `/product/:slug` or `/blog/:slug`, extend the script to:

1. Read `Product_Details.json` for slugs.
2. Read blog frontmatter or CMS export.
3. Emit one `<url>` per slug.

Example slug from product name: `davula-keepsake` → `/product/davula-keepsake`.

---

## 7. OG image guidelines

| File | Content suggestion | Size |
|------|-------------------|------|
| `home-og.jpg` | Hero drum + logo text "Beats of Heritage" | 1200×630 |
| `product-og.jpg` | Product lineup or Davula hero | 1200×630 |
| `about-og.jpg` | Workshop / award imagery | 1200×630 |
| `default-og.jpg` | Brand lockup fallback | 1200×630 |

Keep text in safe zone (center 80%) for social crops.

---

## 8. Verification checklist

```bash
curl -s https://tharangadrums.lk/robots.txt
curl -s https://tharangadrums.lk/sitemap.xml
```

After deploy, use GSC → Sitemaps → add `https://tharangadrums.lk/sitemap.xml`.

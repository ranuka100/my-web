# SEO — Remaining Tasks & Post-Launch Guide

What is **already implemented in code** is in [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md) (checked items).

This document covers everything **still to do**: manual steps, assets, performance, and Phase 2.

---

## Quick summary

| Category                                | Who                | When                        |
| --------------------------------------- | ------------------ | --------------------------- |
| Deploy + Search Console                 | You / marketing    | After site is live          |
| OG images + social links                | Design / marketing | Before major ad campaigns   |
| Image compression                       | Dev or design      | Before launch (recommended) |
| GSC / Bing tokens                       | You                | After property created      |
| Lighthouse audit                        | Dev                | After deploy                |
| Phase 2 (prerender, product URLs, blog) | Dev                | When you need more traffic  |

---

## 1. After deploy (required)

### 1.1 Confirm live URLs work

Replace `tharangadrums.lk` with your real domain if different.

| URL                                    | Expected                          |
| -------------------------------------- | --------------------------------- |
| `https://tharangadrums.lk/robots.txt`  | Shows `Allow: /` and Sitemap line |
| `https://tharangadrums.lk/sitemap.xml` | Lists `/`, `/product`, `/about`   |
| `https://tharangadrums.lk/`            | Home loads                        |
| `https://tharangadrums.lk/product`     | Products (direct URL, refresh OK) |
| `https://tharangadrums.lk/about`       | About (direct URL, refresh OK)    |

Netlify SPA redirect is already in `app/netlify.toml` (`/*` → `index.html`).

---

### 1.2 Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add property: **URL prefix** → `https://tharangadrums.lk`
3. Choose verification method: **HTML tag**
4. Copy the `content="..."` value from the meta tag.
5. In `app/.env` (or Netlify env vars), set:

```env
VITE_GSC_VERIFICATION=paste-your-token-here
```

6. Redeploy the site.
7. Click **Verify** in Search Console.
8. Go to **Sitemaps** → submit: `https://tharangadrums.lk/sitemap.xml`
9. After a few days, check **Pages** → indexing status for `/`, `/product`, `/about`.

**Ongoing (monthly):** Coverage errors, Core Web Vitals, mobile usability.

---

### 1.3 Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Add site or **import from Google Search Console** (fastest).
3. If using HTML tag, set in env:

```env
VITE_BING_VERIFICATION=paste-bing-token-here
```

4. Redeploy and verify.
5. Submit the same sitemap URL.

---

### 1.4 Validate structured data

Test each live URL:

| Tool                                                             | URLs to test              |
| ---------------------------------------------------------------- | ------------------------- |
| [Rich Results Test](https://search.google.com/test/rich-results) | `/`, `/product`, `/about` |

**Expected schemas:**

| Page       | Schema types                                      |
| ---------- | ------------------------------------------------- |
| `/`        | WebSite, LocalBusiness                            |
| `/product` | LocalBusiness, ItemList (Product), BreadcrumbList |
| `/about`   | LocalBusiness, BreadcrumbList                     |

Fix any errors in `app/src/seo/schema/` and redeploy.

---

### 1.5 Check meta tags in production

1. Open each route in the browser.
2. **View Page Source** (or DevTools → Elements → `<head>`).
3. Confirm you see (from React Helmet after JS runs; for crawlers, consider prerender in Phase 2):

| Tag                              | Example (home)                                          |
| -------------------------------- | ------------------------------------------------------- |
| `<title>`                        | Handcrafted Sri Lankan Drum Souvenirs \| Tharanga Drums |
| `meta name="description"`        | Award-winning miniature...                              |
| `link rel="canonical"`           | `https://tharangadrums.lk`                              |
| `og:title`, `og:image`, `og:url` | Present                                                 |

**Tip:** Use [Meta Tags Debugger](https://developers.facebook.com/tools/debug/) for OG preview after deploy.

---

## 2. Assets & content (recommended)

### 2.1 Dedicated Open Graph images

**Current:** OG images use existing product photos from `pageMeta.ts`.  
**Target:** Custom 1200×630 JPG/PNG per main page.

| File to create                        | Suggested content               |
| ------------------------------------- | ------------------------------- |
| `app/public/images/og/home-og.jpg`    | Hero + logo “Beats of Heritage” |
| `app/public/images/og/product-og.jpg` | Product lineup or Davula hero   |
| `app/public/images/og/about-og.jpg`   | Workshop / awards               |
| `app/public/images/og/default-og.jpg` | Brand fallback                  |

Then update `app/src/seo/pageMeta.ts`:

```ts
ogImage: `${SITE_URL}/images/og/home-og.jpg`,  // per route
```

---

### 2.2 Social profile URLs

**Current:** Footer social icons link to `#`.

**Action:** In `app/src/components/common/Footer.tsx`, replace:

```ts
{ icon: <Facebook />, link: '#' },
```

with real URLs, e.g. `https://www.facebook.com/yourpage`.

Also add the same URLs to `app/src/seo/schema/LocalBusinessJsonLd.tsx` → `sameAs: [...]`.

---

### 2.3 Google Business Profile (local SEO)

1. Create or claim [Google Business Profile](https://business.google.com).
2. Use **exact** NAP (name, address, phone) as on the website:

| Field   | Site value                                        |
| ------- | ------------------------------------------------- |
| Name    | New Tharanga Musical Instruments / Tharanga Drums |
| Address | NO. 34, Kandy Road, Nittambuwa, Sri Lanka         |
| Phone   | +94 77 338 8998                                   |
| Email   | info@tharangadrums.lk                             |
| Website | https://tharangadrums.lk                          |

3. Add photos, hours, and category (e.g. Musical instrument store / Artisan).

---

## 3. Performance (high impact)

Large files in `public/images/` hurt LCP. Compress before or right after launch.

### 3.1 Priority files to compress

| Path (approx.)                               | Issue               |
| -------------------------------------------- | ------------------- |
| `public/images/home/hero_bg_pic_2.jpeg`      | Very large (~9MB+)  |
| `public/images/home/Untitled design.svg`     | Very large SVG      |
| `public/images/home/hero_bg_pic_1.png`       | Large PNG           |
| Product JPGs under `public/images/products/` | Many multi-MB files |

### 3.2 How to compress

**Option A — Manual**

1. [Squoosh](https://squoosh.app) → WebP or optimized JPEG.
2. Keep filenames or add `.webp` variants.
3. Update component `src` if paths change.

**Option B — Script (dev)**

```bash
# Example using sharp-cli (install once)
npx sharp-cli -i public/images/home/hero_bg_pic_2.jpeg -o public/images/home/hero_bg_pic_2.webp -f webp -q 80
```

Use `<picture>` or WebP with JPEG fallback in `HeroSection.tsx` when ready.

### 3.3 Image dimensions (CLS)

Add `width` and `height` (or fixed `aspect-ratio` in `sx`) on hero and product images to reduce layout shift.

**Files:** `HeroSection.tsx`, `ProductInfor.tsx`, `About.tsx`.

---

### 3.4 Lighthouse audit (after deploy)

```bash
cd app
npm run build
npm run preview
# New terminal:
npx lighthouse http://localhost:4173/ --only-categories=performance,seo,accessibility --view
npx lighthouse http://localhost:4173/product --only-categories=seo --view
npx lighthouse http://localhost:4173/about --only-categories=seo --view
```

**Targets (mobile):**

| Metric    | Good     |
| --------- | -------- |
| LCP       | ≤ 2.5 s  |
| INP       | ≤ 200 ms |
| CLS       | ≤ 0.1    |
| SEO score | ≥ 90     |

Save reports to `project-spec/docs/seo/reports/` (create folder) with date in filename, e.g. `lighthouse-2026-05-18-home.json`.

---

## 4. Optional analytics

### 4.1 Google Analytics 4

1. Create GA4 property at [analytics.google.com](https://analytics.google.com).
2. Add gtag snippet via Helmet in `PageSeo.tsx` or `index.html` (only after privacy/cookie policy if required).
3. Track: page views, outbound clicks, newsletter (if form is wired later).

### 4.2 Environment variables reference

| Variable                 | Purpose                        | Required                       |
| ------------------------ | ------------------------------ | ------------------------------ |
| `VITE_SITE_URL`          | Canonical, sitemap, JSON-LD    | Yes (set in `.env.production`) |
| `VITE_GSC_VERIFICATION`  | Google Search Console HTML tag | After GSC setup                |
| `VITE_BING_VERIFICATION` | Bing Webmaster HTML tag        | Optional                       |

Copy from `app/.env.example` → `app/.env` for local; set same keys in **Netlify → Environment variables** for production.

---

## 5. Phase 2 — When you need more SEO growth

### 5.1 Prerender / SSR (better for crawlers)

**Why:** SPA serves one `index.html`; meta/JSON-LD appear after JavaScript. Prerender bakes HTML per route at build time.

**Options:**

| Approach                | Effort                                       |
| ----------------------- | -------------------------------------------- |
| `vite-plugin-prerender` | Medium — prerender `/`, `/product`, `/about` |
| Migrate to Next.js      | High — full SSR/SSG                          |

See [react-spec/SEO.md](../../react-spec/SEO.md) §2.

---

### 5.2 Product detail URLs

**Routes:** `/product/davula-keepsake`, `/product/thammattama`, etc.

**Work:**

1. Add slugs to `Product_Details.json`.
2. Extend `AppRoutingSetup.tsx` with `/product/:slug`.
3. One **Product** JSON-LD per URL (not only ItemList).
4. Add each URL to `scripts/generate-sitemap.mjs`.

---

### 5.3 Blog + Article schema

When you add `/blog` and `/blog/:slug`:

1. Article meta in `pageMeta.ts`.
2. `BlogPosting` JSON-LD component.
3. Sitemap entries with `changefreq: weekly`.
4. Internal links from Home/Footer.

---

### 5.4 hreflang (multilingual)

Only if you add Sinhala (`si`) or Tamil (`ta`) pages:

```html
<link rel="alternate" hreflang="en-LK" href="https://tharangadrums.lk/" />
<link rel="alternate" hreflang="si-LK" href="https://tharangadrums.lk/si/" />
```

---

## 6. Launch checklist (printable)

```
[ ] Production domain points to Netlify (or host)
[ ] VITE_SITE_URL matches live domain
[ ] npm run build succeeds; sitemap.xml in deploy output
[ ] /robots.txt and /sitemap.xml load on live site
[ ] All 3 routes work on hard refresh
[ ] Rich Results Test passes for /, /product, /about
[ ] Google Search Console verified + sitemap submitted
[ ] Bing Webmaster (optional) + sitemap submitted
[ ] OG images look correct when sharing links
[ ] Hero/product images compressed
[ ] Lighthouse SEO ≥ 90 on production URL
[ ] Google Business Profile matches site NAP
[ ] Social links in footer are real URLs
```

---

## 7. Who does what

| Task                             | Owner             |
| -------------------------------- | ----------------- |
| Deploy, env vars, sitemap submit | Dev / hosting     |
| GSC, Bing, Business Profile      | Marketing / owner |
| OG image design                  | Design            |
| Image compression                | Dev or design     |
| Social URLs, copy updates        | Marketing         |
| Phase 2 prerender / product URLs | Dev               |
| Monthly GSC review               | Marketing         |

---

## 8. Related docs

| Document                                                           | Purpose                |
| ------------------------------------------------------------------ | ---------------------- |
| [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)       | What’s done in code    |
| [AUDIT_REPORT.md](./AUDIT_REPORT.md)                               | Baseline audit         |
| [meta-tags-sitemap-robots.md](./meta-tags-sitemap-robots.md)       | Technical reference    |
| [structured-data.md](./structured-data.md)                         | JSON-LD reference      |
| [performance-headings-images.md](./performance-headings-images.md) | CWV & images           |
| [../../react-spec/SEO.md](../../react-spec/SEO.md)                 | Full SEO specification |

---

_Update this file when tasks are completed or scope changes._

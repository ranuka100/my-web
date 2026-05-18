# SEO Implementation Checklist

Use with [react-spec/SEO.md](../../react-spec/SEO.md). Check off as completed.

---

## Setup

- [x] Add `VITE_SITE_URL=https://tharangadrums.lk` to `app/.env.production`
- [x] Install `react-helmet-async`
- [x] Create `app/src/seo/siteConfig.ts`
- [x] Create `app/src/seo/pageMeta.ts` (record per route)
- [x] Create `app/src/seo/PageSeo.tsx`
- [x] Wrap `HelmetProvider` in `main.tsx`
- [x] Add `<SeoLayout />` in `DefaultLayout`

---

## Meta & OG (per route)

- [x] `/` — title, description, canonical, og:image
- [x] `/product` — title, description, canonical, og:image
- [x] `/about` — title, description, canonical, og:image
- [ ] Create dedicated `public/images/og/*.jpg` (1200×630) — using product images for now

---

## robots.txt & sitemap

- [x] Add `app/public/robots.txt`
- [x] Add `app/scripts/generate-sitemap.mjs`
- [x] Add `"prebuild": "node scripts/generate-sitemap.mjs"` to `package.json`
- [x] Verify `public/sitemap.xml` generated on build
- [ ] Submit sitemap in Google Search Console (manual)

---

## Structured data (JSON-LD)

- [x] `LocalBusinessJsonLd.tsx` — site-wide in `SeoLayout`
- [x] `ProductListJsonLd.tsx` — on `/product`
- [x] `BreadcrumbJsonLd.tsx` — per page
- [ ] Validate in Rich Results Test after deploy

---

## Headings (one h1 per page)

- [x] **Home** — h1 in `HeroSection` / `HeroSection_mobile`
- [x] **Home** — demote `HomeProductSection` h1 → h2
- [x] **Home** — demote `DrumsSection` h1 → h2
- [x] **Product** — h1 on product name in `ProductInfor` / mobile
- [x] **Product** — demote `productTypes` h1 → h2
- [x] **About** — `About Us` as `component="h1"`

---

## Images

- [x] `HeroSection.tsx` — descriptive alts; LCP preload via Helmet
- [x] `HeroSection_mobile.tsx` — single h1 headline
- [x] `ProductInfor.tsx` — product alts; lazy thumbnails
- [x] `ProductInfor_mobile.tsx` — same
- [x] `productTypes.tsx` — lazy on drum image
- [x] `About.tsx` — descriptive alts

---

## Breadcrumbs

- [x] Create `Breadcrumbs.tsx` component
- [x] Show on `/product` and `/about`
- [x] Match `BreadcrumbList` JSON-LD URLs

---

## Internal linking & footer fixes

- [x] Fix footer `mailto:` href → `info@tharangadrums.lk`
- [x] Remove duplicate phone row
- [ ] Replace `#` social URLs with real profiles when available
- [x] Add Home → Product CTA in `HomeProductSection`
- [x] Remove `console.log` from `Footer.tsx`

---

## Performance

- [x] Move Swiper CDN from `index.html` to npm import in `Carousel.tsx`
- [ ] Add `width`/`height` on all layout images
- [ ] Compress hero images (WebP)
- [ ] Run Lighthouse mobile after deploy

---

## Analytics & verification

- [ ] Add GSC verification meta (`VITE_GSC_VERIFICATION` in `.env`)
- [ ] Add Bing verification meta (`VITE_BING_VERIFICATION`)
- [ ] Optional: GA4

---

## NavBar bug

- [x] Fix `drums-section"` → `drums-section` in `NavBar.tsx`

---

## Phase 2 (partial — done in code)

- [x] Route `/product/:slug` + individual `ProductJsonLd` schema
- [x] Sitemap includes product slug URLs
- [x] `SeoImage` component + hero dimensions
- [x] `npm run optimize-images` script (requires `sharp`)
- [ ] Prerender `/`, `/product`, `/about` at build
- [ ] Blog routes + Article schema

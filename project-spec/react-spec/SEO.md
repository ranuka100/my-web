# SEO Specification — Tharanga Drums (my-web)

> **Project:** Beats of Heritage / New Tharanga Musical Instruments  
> **Stack:** React 18 + Vite 6 + React Router 7 (SPA, Netlify)  
> **Primary domain (configure):** `https://tharangadrums.lk`  
> **Status:** Specification — implementation pending  
> **Related docs:** [`docs/seo/README.md`](../docs/seo/README.md) · [`docs/seo/AUDIT_REPORT.md`](../docs/seo/AUDIT_REPORT.md) · [`docs/seo/IMPLEMENTATION_CHECKLIST.md`](../docs/seo/IMPLEMENTATION_CHECKLIST.md) · [`PROJECT_REFERENCE.md`](../PROJECT_REFERENCE.md)

---

## 1. Objectives

1. Make all public routes discoverable and indexable by Google and Bing.
2. Provide accurate **title**, **meta description**, and **Open Graph** data per route.
3. Ship **JSON-LD** for LocalBusiness and Products (Articles when blog exists).
4. Publish **`sitemap.xml`** and **`robots.txt`** aligned with production URL.
5. Improve **Core Web Vitals** (LCP, INP, CLS) via images, code-splitting, and lazy loading.
6. Fix **semantic HTML** (one `<h1>` per page, logical heading order).
7. Enable **Search Console / Bing** verification and ongoing monitoring.

---

## 2. Architecture decision (Vite SPA vs SSR)

| Approach | Fit for this project | Notes |
|----------|----------------------|-------|
| **Stay on Vite SPA + prerender** | ✅ Recommended first phase | Lower risk; add `vite-plugin-prerender` or build-time HTML for `/`, `/product`, `/about` |
| **Vite SSR (`vite-plugin-ssr` / custom)** | Medium effort | Full control without leaving Vite |
| **Migrate to Next.js / Gatsby** | High effort | Only if blog + CMS + frequent SEO changes justify rebuild |

**Recommendation:** Phase 1 = SPA + **react-helmet-async** + **static prerender** of 3 routes at build time. Phase 2 = product deep URLs (`/product/davula-keepsake`) if marketing needs individual product landing pages.

Crawlers execute JavaScript for React SPAs, but prerender + correct meta in initial HTML improves reliability and LCP.

---

## 3. Requirements (mapped to deliverables)

### 3.1 Crawlability & indexation

| Item | Requirement |
|------|-------------|
| `robots.txt` | Allow `/`; disallow `/api`, build artifacts, admin (if added later) |
| `sitemap.xml` | List all indexable URLs with `<lastmod>`, optional `<priority>` |
| SPA routing | Netlify `/* → /index.html` (already in `app/netlify.toml`) |
| Canonical URLs | One canonical per page; avoid duplicate `www` / non-www |

**Indexable routes (v1):**

| URL | Page | Priority |
|-----|------|----------|
| `/` | Home | 1.0 |
| `/product` | Products & souvenirs | 0.9 |
| `/about` | About Us | 0.8 |

**Future (v2):** `/blog`, `/blog/:slug`, `/product/:slug`

---

### 3.2 Meta tags & Open Graph (per page)

Use **react-helmet-async** (Helmet is maintenance mode; Async is the maintained fork).

Install:

```bash
cd app && npm install react-helmet-async
```

Wrap app in `HelmetProvider` (`main.tsx`). Create `src/seo/PageSeo.tsx` + `src/seo/siteConfig.ts`.

**Global defaults (`siteConfig.ts`):**

```ts
export const SITE = {
  name: 'Tharanga Drums',
  brand: 'Beats of Heritage',
  legalName: 'New Tharanga Musical Instruments',
  url: 'https://tharangadrums.lk', // production
  defaultImage: '/images/og/default-og.jpg', // 1200×630
  locale: 'en_LK',
  twitterHandle: '@tharangadrums', // if exists
};
```

#### Page-level meta (copy-ready)

| Route | `<title>` (≤60 chars) | Meta description (≤160 chars) |
|-------|------------------------|-------------------------------|
| `/` | Handcrafted Sri Lankan Drum Souvenirs \| Tharanga Drums | Award-winning miniature traditional drums from Sri Lanka. Davula, Geta Beraya, Thammattama & more — perfect gifts and décor. |
| `/product` | Traditional Drum Souvenirs & Keepsakes \| Tharanga Drums | Explore handcrafted drum souvenirs: Davula Keepsake, Thammattama, Pahatharata Beraya & Geta Beraya. Premium mahogany, artisan-made in Sri Lanka. |
| `/about` | About Us — Sri Lankan Drum Craftsmanship \| Tharanga Drums | 2,500 years of tradition. Presidential Award–winning drum makers in Nittambuwa. National Crafts Council partner. |

**Open Graph (each page):** `og:title`, `og:description`, `og:url`, `og:type` (`website`), `og:image`, `og:locale`, `og:site_name`  
**Twitter Card:** `summary_large_image`, same title/description/image  
**Technical:** `<link rel="canonical" href="...">`, `<meta name="robots" content="index, follow">`

See [`docs/seo/meta-tags-sitemap-robots.md`](../docs/seo/meta-tags-sitemap-robots.md) for full tag list and `PageSeo` component API.

---

### 3.3 Structured data (Schema.org JSON-LD)

Inject via `<script type="application/ld+json">` in `PageSeo` or dedicated components.

| Schema | Where | Source data |
|--------|-------|-------------|
| **LocalBusiness** + **Organization** | All pages (site-wide in layout) | Footer address, phone, email |
| **Product** | `/product` | `src/data/Product_Details.json` |
| **WebSite** + **SearchAction** | Home only (optional) | Site URL |
| **BreadcrumbList** | All pages | Route → label map |
| **Article / BlogPosting** | `/blog/:slug` when blog ships | CMS or MDX frontmatter |

**LocalBusiness (baseline):**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "New Tharanga Musical Instruments",
  "alternateName": "Tharanga Drums",
  "url": "https://tharangadrums.lk",
  "image": "https://tharangadrums.lk/images/og/default-og.jpg",
  "telephone": "+94-77-338-8998",
  "email": "info@tharangadrums.lk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "NO. 34, Kandy Road",
    "addressLocality": "Nittambuwa",
    "addressCountry": "LK"
  },
  "description": "Handcrafted Sri Lankan traditional drum souvenirs and musical instruments.",
  "priceRange": "$$"
}
```

**Product (one script per product or ItemList):** Use `Product` with `name`, `description`, `image`, `brand`, `material`, `weight` from JSON. Prefer **ItemList** on `/product` listing all four SKUs.

Full schemas: [`docs/seo/structured-data.md`](../docs/seo/structured-data.md)

---

### 3.4 Sitemap & robots.txt

**`app/public/robots.txt`:**

```txt
User-agent: *
Allow: /

Sitemap: https://tharangadrums.lk/sitemap.xml
```

**Sitemap generation (build-time):**

- Option A: Vite plugin / small Node script `scripts/generate-sitemap.mjs` run in `prebuild`
- Option B: `vite-plugin-sitemap` with `dynamicRoutes: ['/', '/product', '/about']`

Output: `app/public/sitemap.xml` (copied to dist root on build).

See [`docs/seo/meta-tags-sitemap-robots.md`](../docs/seo/meta-tags-sitemap-robots.md).

---

### 3.5 Lazy loading & image optimization

| Rule | Implementation |
|------|----------------|
| **alt** | Descriptive: `{product.name} — handcrafted Sri Lankan drum souvenir` |
| **loading** | `loading="lazy"` on below-fold images; `fetchpriority="high"` on LCP hero only |
| **dimensions** | `width` / `height` or aspect-ratio to reduce CLS |
| **format** | WebP/AVIF variants in `public/images/`; fallback JPG/PNG |
| **size** | Hero ≤200KB; product thumbs ≤80KB; compress with Squoosh/ImageOptim |

**Audit hotspots:** `HeroSection.tsx` (duplicate alt "Drumming 1"), `ProductInfor.tsx` ("Main Image"), About grid (generic alts).

---

### 3.6 Heading hierarchy

**Rule:** Exactly **one** visible `<h1>` per route (MUI `Typography component="h1"` or native `<h1>`).

| Page | Recommended `<h1>` | Demote current extra h1 to h2 |
|------|-------------------|-------------------------------|
| Home | e.g. "Handcrafted Sri Lankan Drum Souvenirs" (hero) | `HomeProductSection`, `DrumsSection` → `h2` |
| Product | "Traditional Drum Souvenirs" (top of ProductInfor) | `productTypes` title → `h2` |
| About | "About Us" | section titles → `h2` / `h3` |

Use `component="h1"` explicitly; default MUI `variant="h3"` is not a heading for SEO.

---

### 3.7 Performance optimization

**Already in project:**

- Vite `manualChunks` per npm package (`vite.config.ts`)
- Terser minify, `drop_console` in production

**Add / verify:**

| Task | Tool / approach |
|------|-----------------|
| Preload LCP image | `<link rel="preload" as="image" href="...">` in Helmet for home hero |
| Font subsetting | Self-host or `font-display: swap` for Raleway/Poppins |
| Defer Swiper CDN | Move from `index.html` to npm import or async load |
| Compression | Netlify automatic gzip/brotli |
| INP | Reduce main-thread work from framer-motion on mobile |
| Lighthouse CI | `npm run build && npx lighthouse https://...` in CI optional |

**Targets (mobile):** LCP &lt; 2.5s · INP &lt; 200ms · CLS &lt; 0.1

---

### 3.8 Internal linking & breadcrumbs

**Internal links (existing):** NavBar + Footer quick links cover all routes ✅

**Add:**

- Breadcrumb component in `DefaultLayout` or per-page:
  - Home → Products → (future product name)
  - Home → About Us
- Contextual links: Home product section → `/product`; About copy → `/product`
- Footer: fix `mailto` href mismatch (`info@music.com.lk` → `info@tharangadrums.lk`)

**BreadcrumbList JSON-LD** must match visible breadcrumb UI.

---

### 3.9 Analytics & Search Console

| Tool | Action |
|------|--------|
| **Google Search Console** | Verify via HTML meta tag or DNS; submit `sitemap.xml` |
| **Bing Webmaster Tools** | Import from GSC or separate verification meta |
| **GA4** (optional) | `gtag.js` with consent banner if EU/LK privacy requires |
| **Monitoring** | Monthly: coverage, Core Web Vitals, mobile usability |

**Verification meta (Helmet, env-driven):**

```html
<meta name="google-site-verification" content="REPLACE_WITH_TOKEN" />
<meta name="msvalidate.01" content="REPLACE_WITH_BING_TOKEN" />
```

Store tokens in `VITE_GSC_VERIFICATION`, `VITE_BING_VERIFICATION` — never commit real tokens to public repos.

---

## 4. Recommended libraries (this stack)

| Need | Library | Why not Next.js now |
|------|---------|---------------------|
| Meta / OG | `react-helmet-async` | Works with Vite SPA |
| Sitemap | Build script or `vite-plugin-sitemap` | Static routes only in v1 |
| JSON-LD | Custom React components | No framework lock-in |
| Prerender | `vite-plugin-prerender` or `@prerenderer/rollup-plugin` | SEO HTML without migration |
| Audit | Lighthouse, PageSpeed Insights | Manual + CI |

---

## 5. Deliverables checklist

| # | Deliverable | Doc / location |
|---|-------------|----------------|
| 1 | SEO-optimized app (meta, headings, lazy images) | Implementation in `app/src/seo/` |
| 2 | Dynamic meta per route | `PageSeo.tsx` + route config |
| 3 | `sitemap.xml` + `robots.txt` | `app/public/` |
| 4 | JSON-LD (LocalBusiness, Product, Breadcrumb) | `app/src/seo/schema/` |
| 5 | SEO audit report | [`docs/seo/AUDIT_REPORT.md`](../docs/seo/AUDIT_REPORT.md) |
| 6 | Implementation checklist | [`docs/seo/IMPLEMENTATION_CHECKLIST.md`](../docs/seo/IMPLEMENTATION_CHECKLIST.md) |

---

## 6. Timeline (adjusted for Vite SPA — no full Next migration)

| Task | Duration | Owner |
|------|----------|-------|
| Meta tags + Helmet + siteConfig | 2–3 days | Dev |
| robots.txt + sitemap build script | 1 day | Dev |
| JSON-LD (LocalBusiness + Product ItemList) | 2–3 days | Dev |
| Heading + alt + lazy-load pass | 2 days | Dev |
| Breadcrumbs UI + schema | 1–2 days | Dev |
| Prerender 3 routes (optional) | 2–3 days | Dev |
| Search Console + sitemap submit | 0.5 day | Marketing |
| Lighthouse audit + fixes | 2–3 days | Dev |
| **Total (Phase 1)** | **~2 weeks** | |

Blog/Article schema and SSR migration are **Phase 2** (+1–2 weeks when blog launches).

---

## 7. File structure (proposed)

```
app/
├── public/
│   ├── robots.txt
│   ├── sitemap.xml          # generated at build
│   └── images/og/           # 1200×630 OG images per page
├── scripts/
│   └── generate-sitemap.mjs
└── src/
    └── seo/
        ├── siteConfig.ts
        ├── pageMeta.ts        # title, description, og per route
        ├── PageSeo.tsx
        ├── Breadcrumbs.tsx
        └── schema/
            ├── LocalBusinessJsonLd.tsx
            ├── ProductListJsonLd.tsx
            └── BreadcrumbJsonLd.tsx
```

---

## 8. References

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [react-helmet-async](https://github.com/staylor/react-helmet-async)
- [Schema.org](https://schema.org/docs/gs.html)
- [Web Vitals](https://web.dev/vitals/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

---

*Maintained with [PROJECT_REFERENCE.md](../PROJECT_REFERENCE.md) — update when routes or product data change.*

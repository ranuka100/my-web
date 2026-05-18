# SEO Audit Report — Tharanga Drums (my-web)

**Audit date:** 2026-05-18  
**Scope:** `app/` production build (Vite SPA)  
**Auditor role:** Technical SEO baseline (pre-implementation)  
**Production URL (assumed):** `https://tharangadrums.lk`

---

## Executive summary

The site has a solid content foundation (three clear routes, product JSON, contact details in footer) but **minimal technical SEO**. Search engines can crawl the SPA via Netlify redirects, yet **no meta descriptions, Open Graph, structured data, sitemap, or robots.txt** are present. **Heading structure** and **image accessibility** need fixes before claiming “SEO-ready.”

**Overall readiness:** 🔴 **Not ready for intentional SEO campaigns** — implement Phase 1 from [react-spec/SEO.md](../../react-spec/SEO.md) (~2 weeks).

---

## Scorecard (estimated)

| Category | Score | Notes |
|----------|-------|-------|
| Crawlability | 6/10 | SPA + Netlify OK; missing sitemap/robots |
| On-page meta | 2/10 | Title only; no description/OG/canonical |
| Structured data | 0/10 | No JSON-LD |
| Content & headings | 4/10 | Good copy; multiple h1s; MUI variants misused |
| Images | 5/10 | Some alts; weak/generic text; no lazy on many |
| Performance | 6/10 | Code-split + terser; CDN Swiper in head hurts |
| Internal links | 7/10 | Nav + footer; no breadcrumbs |
| Mobile | 7/10 | Responsive layouts present |
| Analytics / GSC | 0/10 | Not configured |

---

## Findings by section

### 1. `index.html`

| Check | Status | Detail |
|-------|--------|--------|
| `<title>` | ⚠️ Partial | "Tharanga Drums" — not unique per page |
| Meta description | ❌ Missing | |
| OG / Twitter | ❌ Missing | |
| Canonical | ❌ Missing | |
| `lang` | ✅ `en` | Consider `en-LK` if targeting Sri Lanka |
| Favicon | ✅ | `/logo.svg` |
| Render-blocking scripts | ⚠️ | Swiper CSS+JS from CDN in `<head>` |

### 2. Routes & indexation

| URL | In sitemap | Linked internally | Notes |
|-----|------------|-------------------|-------|
| `/` | ❌ | ✅ Nav, footer | |
| `/product` | ❌ | ✅ | |
| `/about` | ❌ | ✅ | |

No `noindex` pages identified. No blog routes yet.

### 3. Meta tags (per page)

All routes share the single `index.html` title. **Client-side route changes do not update document title** unless Helmet is added.

Recommended titles/descriptions: see [meta-tags-sitemap-robots.md](./meta-tags-sitemap-robots.md).

### 4. Structured data

| Schema | Status |
|--------|--------|
| LocalBusiness | ❌ |
| Organization | ❌ |
| Product / ItemList | ❌ |
| BreadcrumbList | ❌ |
| Article | N/A (no blog) |

Rich result eligibility: **none** until JSON-LD is deployed.

### 5. Sitemap & robots

| File | Status |
|------|--------|
| `/sitemap.xml` | ❌ Not found |
| `/robots.txt` | ❌ Not found |

### 6. Images

| Location | alt | lazy | Issue |
|----------|-----|------|-------|
| `HeroSection.tsx` | ⚠️ | ❌ | All three images `alt="Drumming 1"` |
| `ProductInfor.tsx` | ⚠️ | ❌ | Main image `alt="Main Image"` |
| `productTypes.tsx` | ✅ name | ❌ | |
| `About.tsx` | ⚠️ Generic | ❌ | "Drums", "Culture", etc. |
| `CarouselItem.tsx` | ✅ title | — | |
| `ImpactSection.tsx` | ✅ | — | |

**Recommendation:** Centralize image props in a small `SeoImage` component.

### 7. Heading hierarchy

| Page | h1 count (effective) | Issue |
|------|----------------------|-------|
| Home | **2+** | `HomeProductSection` `variant="h1"`; `DrumsSection` `variant="h1"`; hero uses large Typography without `component="h1"` |
| Product | **2** | `productTypes` `variant="h1"` + product title as h5 |
| About | **1** | `variant="h3"` for "About Us" — should be h1 |

### 8. Performance (build config)

| Item | Status |
|------|--------|
| JS code splitting | ✅ `manualChunks` in vite.config |
| Minification | ✅ terser |
| Console dropped in prod | ✅ |
| Image optimization pipeline | ❌ No WebP/AVIF build step |
| LCP element | Likely hero background — not preloaded |
| CLS | Risk from images without dimensions |

**Action:** Run Lighthouse on deployed URL after meta + image fixes.

### 9. Internal linking

| Check | Status |
|-------|--------|
| Main nav | ✅ Home, Products, About |
| Footer quick links | ✅ |
| Breadcrumbs | ❌ |
| Cross-links in body | ⚠️ Limited (add CTA links Home → Product) |

### 10. Footer / NAP consistency (Local SEO)

| Field | Value | Issue |
|-------|-------|-------|
| Address | NO. 34, Kandy Road, Nittambuwa | ✅ |
| Email display | info@tharangadrums.lk | ✅ |
| Email href | mailto:info@music.com.lk | ❌ Mismatch |
| Phone | +94 77 338 8998 | ⚠️ Duplicate rows in footer |

Use identical NAP in JSON-LD and footer.

### 11. Analytics & verification

| Tool | Status |
|------|--------|
| Google Search Console | ❌ |
| Bing Webmaster | ❌ |
| GA4 | ❌ |

### 12. Known code issues affecting SEO/UX

| Issue | File | SEO impact |
|-------|------|------------|
| `drums-section"` typo in observer id | `NavBar.tsx` | Navbar contrast on section (UX) |
| `console.log` in footer | `Footer.tsx` | Minor perf |
| Social links `#` | `Footer.tsx` | Missed authority signals |

---

## Priority recommendations

### P0 — Before launch / ad campaigns

1. Add `react-helmet-async` + per-route title, description, canonical, OG.
2. Add `robots.txt` and `sitemap.xml` (build script).
3. Deploy LocalBusiness + Product ItemList JSON-LD.
4. Fix single h1 per page and improve image `alt` text.

### P1 — Within 2 weeks

5. Lazy-load below-fold images; preload LCP hero.
6. Breadcrumbs + BreadcrumbList schema.
7. Register GSC + Bing; submit sitemap.
8. Create OG images (1200×630) per main route.

### P2 — Phase 2

9. Prerender or SSR for critical routes.
10. Product detail URLs `/product/:slug` for long-tail SEO.
11. Blog + Article schema when content exists.
12. Lighthouse CI gate on PRs.

---

## Post-implementation verification

- [ ] [Rich Results Test](https://search.google.com/test/rich-results) — Product + LocalBusiness
- [ ] [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [ ] PageSpeed Insights — LCP, INP, CLS in “Good” range
- [ ] GSC → URL inspection for `/`, `/product`, `/about`
- [ ] View rendered HTML (curl or “View Page Source” after prerender) contains meta + JSON-LD

---

## Metrics to track (monthly)

| Metric | Tool |
|--------|------|
| Indexed pages | Google Search Console |
| Average position (brand + product keywords) | GSC |
| Core Web Vitals | GSC + PageSpeed |
| Crawl errors | GSC |
| Referring domains | GSC / Bing |

---

*Re-run this audit after Phase 1 implementation and attach Lighthouse JSON exports to `project-spec/docs/seo/reports/` if desired.*

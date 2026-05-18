# SEO Documentation — Tharanga Drums

Documentation for SEO implementation on the **my-web** (Vite + React) project.

## Documents

| Document | Purpose |
|----------|---------|
| [react-spec/SEO.md](../../react-spec/SEO.md) | **Master specification** — objectives, timeline, deliverables |
| [PROJECT_REFERENCE.md](../../PROJECT_REFERENCE.md) | Architecture, routes, components |
| [AUDIT_REPORT.md](./AUDIT_REPORT.md) | Baseline audit (current vs target) |
| [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md) | File-by-file tasks for developers |
| [meta-tags-sitemap-robots.md](./meta-tags-sitemap-robots.md) | Meta tags, OG, sitemap, robots |
| [structured-data.md](./structured-data.md) | JSON-LD schemas and examples |
| [performance-headings-images.md](./performance-headings-images.md) | Core Web Vitals, headings, images |
| [**REMAINING_TASKS.md**](./REMAINING_TASKS.md) | **Post-launch & todo: GSC, OG images, compression, Phase 2** |

## Quick status (updated after Phase 1 implementation)

| Area | Status |
|------|--------|
| Meta / OG | Done — `app/src/seo/PageSeo.tsx` + react-helmet-async |
| sitemap.xml | Done — `scripts/generate-sitemap.mjs` on prebuild |
| robots.txt | Done — `public/robots.txt` |
| JSON-LD | Done — LocalBusiness, WebSite, Product ItemList, BreadcrumbList |
| h1 per page | Done — one h1 per route |
| Image alt / lazy | Done — hero, product, about |
| Breadcrumbs | Done — UI + schema on /product, /about |
| Analytics / GSC | Pending — set `VITE_GSC_VERIFICATION` in `.env` |

## Production URL

Set once and use everywhere (`siteConfig`, sitemap, canonical, JSON-LD):

```
https://tharangadrums.lk
```

Use `VITE_SITE_URL` in `.env` for staging vs production.

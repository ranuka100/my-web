# Performance, Headings & Images

Covers requirements **3.6**, **3.7**, and **3.8** from the SEO spec.

---

## 1. Core Web Vitals targets

| Metric | Good | Focus on this project |
|--------|------|------------------------|
| **LCP** | ≤ 2.5s | Home hero background / largest product image |
| **INP** | ≤ 200ms | Framer Motion, scroll handlers in NavBar |
| **CLS** | ≤ 0.1 | Images without dimensions, late-loading fonts |

---

## 2. Performance — current vs planned

### Already implemented (`vite.config.ts`)

- Terser minification
- `drop_console` in production
- `manualChunks` per npm package

### Recommended additions

| Task | File / area | Impact |
|------|-------------|--------|
| Remove blocking Swiper CDN | `index.html` | FCP, LCP |
| Import Swiper from npm in carousel only | `Carousel.tsx` | Smaller initial bundle |
| Preload LCP image | `PageSeo` / `index.html` | LCP |
| `font-display: swap` | Google Fonts or self-host | CLS |
| Responsive images `srcset` | Hero, product gallery | LCP, bandwidth |
| Compress assets | `public/images/**` | LCP |
| Prerender static HTML | build plugin | SEO + perceived LCP |

### Preload example (home hero)

```tsx
<Helmet>
  <link
    rel="preload"
    as="image"
    href="/images/home/hero_bg_pic_1.png"
    fetchPriority="high"
  />
</Helmet>
```

### SeoImage component (recommended)

```tsx
type SeoImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean; // LCP candidate
  className?: string;
};

export function SeoImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
}: SeoImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
    />
  );
}
```

---

## 3. Image optimization workflow

1. Export masters at 2× display size max.
2. Run through [Squoosh](https://squoosh.app) or `sharp` CLI → WebP + JPEG fallback.
3. Store under `public/images/` preserving folder structure.
4. Target sizes:
   - Hero: ≤ 200 KB
   - Product main: ≤ 150 KB
   - Thumbnails: ≤ 40 KB

### Alt text templates

| Context | Template | Example |
|---------|----------|---------|
| Product main | `{name} — handcrafted Sri Lankan drum souvenir` | Davula Keepsake — handcrafted... |
| Product thumb | `{name} detail view {n}` | Thammattama detail view 2 |
| About culture | `{instrument} — Sri Lankan traditional drum` | Geta Beraya — Sri Lankan... |
| Hero decorative | `Traditional Sri Lankan drummer performing with {instrument}` | Specific per image |
| Decorative / BG | `alt=""` + `role="presentation"` if purely decorative | SVG patterns |

---

## 4. Heading hierarchy — page-by-page fix guide

### Home (`/`)

| Component | Current | Target |
|-----------|---------|--------|
| `HeroSection` | Large Typography, no h1 | **`<Typography component="h1">`** — main headline |
| `HomeProductSection` | `variant="h1"` | `component="h2"` |
| `ImpactSection` | h2/h3 style | h2 |
| `DrumsSection` | `variant="h1"` | `component="h2"` |
| `TestimonialsSection` | section title | h2 |

**Single h1 text (example):**  
*"Handcrafted Sri Lankan Drum Souvenirs"*

### Product (`/product`)

| Component | Current | Target |
|-----------|---------|--------|
| `ProductInfor` | h4 "Souvenirs" + h5 product name | **h1** = product name OR page title "Traditional Drum Souvenirs" |
| `productTypes` | `variant="h1"` | **h2** — "The Heartbeat of Sri Lanka..." |
| Subsections Material, etc. | h6 | h3 |

### About (`/about`)

| Component | Current | Target |
|-----------|---------|--------|
| "About Us" | `variant="h3"` | **`component="h1"`** |
| Achievements | card titles | h2 / h3 |
| Gallery | section title | h2 |

### MUI pattern

```tsx
<Typography component="h1" variant="h3" sx={{ ... }}>
  About Us
</Typography>
```

`variant` controls visual size; `component` controls semantic HTML.

---

## 5. Bundle optimization notes

Current `manualChunks` splits by top-level package — good for caching.

**Watch bundle size:**

| Package | SEO/perf note |
|---------|----------------|
| `@mui/material` + icons | Tree-shake imports; avoid barrel imports |
| `framer-motion` | Use only where needed; `LazyMotion` on mobile |
| `swiper` / `react-slick` | Load on routes that need carousel |
| `styled-components` + MUI | Dual styling — acceptable; monitor duplicate CSS |

**Analyze build:**

```bash
cd app && npm run build
npx vite-bundle-visualizer
```

---

## 6. Netlify / hosting

- **Brotli/gzip:** Enabled by default on Netlify.
- **Cache headers:** Long cache for `/assets/*` hashed files; short for `index.html`.
- **Headers** (optional `netlify.toml`):

```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 7. Lighthouse run procedure

```bash
cd app && npm run build && npm run preview
# In another terminal:
npx lighthouse http://localhost:4173/ --only-categories=performance,seo,accessibility --view
npx lighthouse http://localhost:4173/product --only-categories=seo --view
npx lighthouse http://localhost:4173/about --only-categories=seo --view
```

Record scores in `AUDIT_REPORT.md` after Phase 1.

---

## 8. Accessibility overlap (SEO benefit)

- Color contrast on NavBar (dynamic white/black text) — verify WCAG AA on all sections.
- Focus states on mobile menu links.
- Video iframe: `title` attribute present ✅ on About page.

---

## 9. File change summary

| File | Changes |
|------|---------|
| `index.html` | Defer/remove CDN Swiper; default meta fallback |
| `HeroSection.tsx` / `_mobile.tsx` | h1, alt, preload |
| `HomeProductSection.tsx` | h1 → h2 |
| `DrumsSection.tsx` | h1 → h2 |
| `productTypes.tsx` | h1 → h2, lazy image |
| `ProductInfor.tsx` / `_mobile.tsx` | alts, lazy, h1 |
| `About.tsx` | h1, alts |
| `vite.config.ts` | Optional bundle visualizer plugin |

# my-web — Project Reference

Marketing website for **New Tharanga Musical Instruments** (“Beats of Heritage”) — handcrafted Sri Lankan traditional drum souvenirs. Built with React 18, TypeScript, Vite, and MUI.

> **Specs:** [`react-spec/SEO.md`](react-spec/SEO.md) · **SEO docs:** [`docs/seo/README.md`](docs/seo/README.md)

---

## Quick start

| Command | Location | Purpose |
|---------|----------|---------|
| `npm install` | `app/` | Install dependencies |
| `npm run dev` | `app/` | Local dev server (Vite) |
| `npm run build` | `app/` | Type-check + production build |
| `npm run lint:fix` | `app/` | ESLint with auto-fix |
| `npm run format` | `app/` | Prettier format |

**Deploy:** Netlify (`app/netlify.toml`) — SPA redirect `/*` → `/index.html`.

---

## Repository layout

```
my-web/
├── README.md                 # Root readme → points here
├── project-spec/             # All project documentation
│   ├── PROJECT_REFERENCE.md  # This file
│   ├── react-spec/           # React feature specs (SEO, etc.)
│   └── docs/seo/             # SEO guides & audit
├── LICENSE
└── app/                      # Vite + React application
    ├── public/               # Static assets (images under /images/...)
    ├── src/
    │   ├── main.tsx          # Entry: ThemeProvider + App
    │   ├── App.tsx           # BrowserRouter wrapper
    │   ├── routes/           # Route definitions
    │   ├── pages/            # Page-level views
    │   ├── Layout/           # DefaultLayout (Nav + Outlet + Footer)
    │   ├── components/       # UI building blocks
    │   ├── data/             # Product JSON
    │   ├── assets/           # Theme, SVG backgrounds
    │   └── utils/            # Hooks (breakpoints)
    ├── package.json
    ├── vite.config.ts
    └── netlify.toml
```

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | React 18.3 |
| Language | TypeScript ~5.6 |
| Build | Vite 6 |
| Routing | react-router-dom 7 |
| UI | MUI 6 (`@mui/material`, icons) |
| Styling | MUI `sx`, styled-components, SCSS (carousel), CSS |
| Animation | framer-motion, @react-spring/web |
| Carousels | react-slick, slick-carousel, swiper |
| Lint/format | ESLint 9, Prettier, Husky + lint-staged |

---

## Application flow

```
main.tsx
  └── ThemeProvider (MUI theme from assets/theme)
        └── App
              └── BrowserRouter
                    └── AppRoutingSetup
                          └── DefaultLayout (NavBar + Outlet + Footer)
                                ├── /         → Home
                                ├── /product  → Product
                                └── /about    → About
```

---

## Routes

| Path | Page | Main sections |
|------|------|----------------|
| `/` | `pages/Home/Home.tsx` | Hero, HomeProduct carousel, Impact, Drums, Testimonials |
| `/product` | `pages/product/Product.tsx` | `ProductInfor` (souvenir gallery), `productTypes` (traditional drums carousel) |
| `/about` | `pages/About/About.tsx` | Story, image grid, Achievements, video, ImageGallery |

All routes share `Layout/DefaultLayout.tsx`: fixed `NavBar`, scrollable `main`, `Footer`.

---

## Pages & components map

### Home (`/`)

| Section ID | Component | Navbar text color (intended) |
|------------|-----------|------------------------------|
| `hero-section` | `landingPage/HeroSection` (+ mobile variant) | white |
| `home-product-section` | `Sections/HomeProductSection` + `Slider/Carousel` | black |
| `impact-section` | `landingPage/ImpactSection` | white |
| `drums-section` | `landingPage/DrumsSection` | black |
| `testimonials-section` | `landingPage/TestimonialsSection` | black |

`NavBar` uses `IntersectionObserver` on Home to switch link color by visible section.

### Product (`/product`)

| Component | Role |
|-----------|------|
| `products/ProductInfor.tsx` | Desktop: image thumbnails, main image, specs, prev/next, “Other Products” cards |
| `products/ProductInfor_mobile.tsx` | Mobile layout (via `useMediaQuery`) |
| `products/productTypes.tsx` | “Traditional Drums” educational carousel (name, reason, image) |
| `products/ProductCards.tsx` | Present but commented out in `Product.tsx` |

### About (`/about`)

| Component | Data source |
|-----------|-------------|
| Inline copy + 4 product images | Hardcoded imports from `/images/products/...` |
| `Achievements.tsx` | `pages/About/AchievementsData.json` |
| `common/ImageGallery.tsx` | `pages/About/ImageGalleryData.json` |
| Video block | Google Drive embed on hover; thumbnail `images/aboutUs/vedio_thumbmail.png` |

### Shared

| Component | Role |
|-----------|------|
| `common/NavBar.tsx` | Fixed app bar, scroll hide/show, mobile menu (framer-motion), dynamic colors |
| `common/Footer.tsx` | Contact, quick links, newsletter UI, curved top on main routes |
| `common/ImageGallery.tsx` | About page gallery |

---

## Data model

### Products — `src/data/Product_Details.json`

Array key: `products`. Each item:

| Field | Usage |
|-------|--------|
| `product_id` | Identifier |
| `name`, `desc`, `size`, `reason` | Display copy |
| `home_imageSrc` | Home carousel / cards |
| `main_imageSrc`, `img1_src` … `img4_src` | Product detail gallery |
| `Material`, `Dimensions`, `Weight`, `Craftsmanship` | Spec blocks |

**Products (4):** Davula Keepsake, Thammattama, Pahatharata Beraya (Yak Beraya), Geta Beraya.

### Achievements — `pages/About/AchievementsData.json`

Array of `{ title, description, images[] }` (paths relative to `public/`).

### Image gallery — `pages/About/ImageGalleryData.json`

Gallery metadata for About page.

---

## Theming (`src/assets/theme/index.ts`)

- **Font:** Ubuntu (MUI typography)
- **Palette:** dark backgrounds (`#282828`), primary `#116`, focus accent `#dd2126` on inputs
- **Exports:** `theme`, `StyledButton`, `StyledInput`, `StyledAppBar`
- **Page fonts (inline):** Raleway, Poppins, Nunito used in section-specific `sx`

---

## Static assets

- Served from `app/public/` — referenced as `/images/...` in JSON and components
- SVG backgrounds in `src/assets/backgroundImages/` (e.g. `productsBackGround.svg`, `Group.svg`)
- Product photos: `public/images/products/{davula,Thammattama,pahatharata_beraya,getaberaya}/`
- Home hero: `public/images/home/`

---

## Key utilities

### `utils/useBreakpointMode.ts`

Returns current MUI breakpoint mode: `xs` | `sm` | `md` | `lg` | `xl` plus boolean flags (`isXs`, `isSm`, …).

---

## Build & Vite notes

- **Minify:** terser; `drop_console: true` in production
- **Code splitting:** `manualChunks` per top-level `node_modules` package
- **Dev server:** `middlewareMode: true` (comment notes toggling `historyApiFallback` for local SPA routing)

---

## Brand / content reference

| Item | Value |
|------|--------|
| Business | New Tharanga Musical Instruments |
| Site title / logo text | DRUMS |
| Footer brand | Beats of Heritage |
| Address | NO. 34, Kandy Road, Nittambuwa, Sri Lanka |
| Email | info@tharangadrums.lk |
| Phone | +94 77 338 8998 |

---

## Conventions for new work

1. **Pages** live under `src/pages/<Name>/`; route in `routes/AppRoutingSetup.tsx`.
2. **Reusable UI** under `src/components/` grouped by domain (`landingPage`, `products`, `common`, `Sections`, `Slider`).
3. **Static copy + lists** prefer JSON in `src/data/` or next to the page (like Achievements).
4. **Images** go in `public/images/...`; reference with leading `/images/...`.
5. **Responsive:** use MUI `sx` breakpoints; extract mobile components when layouts diverge strongly (see `HeroSection` / `HeroSection_mobile`, `ProductInfor` / `ProductInfor_mobile`).
6. **Animations:** framer-motion `motion.*` for entrances; `react-intersection-observer` where scroll-triggered behavior is needed.
7. **Navbar on Home:** add matching `id` on section wrapper in `Home.tsx` and entry in `NavBar` `sections` array with `color`.

---

## Known issues / tech debt

| Issue | Location | Detail |
|-------|----------|--------|
| Typo in section id | `NavBar.tsx` ~L99 | `'drums-section"'` has extra quote — observer may not match `drums-section` |
| Home vs NavBar color comments | `Home.tsx` vs `NavBar` | Some section color comments disagree (e.g. impact-section) |
| `console.log` in Footer | `Footer.tsx` | Debug log left in production path |
| Duplicate phone display | `Footer.tsx` | Two entries show same number |
| Email href mismatch | `Footer.tsx` | `mailto:info@music.com.lk` vs displayed `info@tharangadrums.lk` |
| `package.json` script | `"lint": "lint"` | Likely should be `eslint .` |
| Product JSON | Several products | Some `img2_src` / `img3_src` paths may be duplicated across products |

---

## File index (source)

```
src/
├── App.tsx, App.css, main.tsx, index.css
├── routes/AppRoutingSetup.tsx
├── Layout/DefaultLayout.tsx, DefaultLayout.css
├── pages/
│   ├── Home/Home.tsx
│   ├── product/Product.tsx
│   └── About/About.tsx, AchievementsData.json, ImageGalleryData.json
├── components/
│   ├── common/NavBar.tsx, Footer.tsx, footer.css, ImageGallery.tsx
│   ├── landingPage/HeroSection.tsx, HeroSection_mobile.tsx,
│   │   ImpactSection.tsx, DrumsSection.tsx, TestimonialsSection.tsx
│   ├── Sections/HomeProductSection.tsx, ProductGallery.tsx
│   ├── Slider/Carousel.tsx, CarouselItem.tsx, styles.scss
│   ├── products/ProductInfor.tsx, ProductInfor_mobile.tsx,
│   │   productTypes.tsx, ProductCards.tsx
│   └── Achievements.tsx
├── data/Product_Details.json
├── assets/theme/index.ts, assets/index.ts, backgroundImages/
└── utils/useBreakpointMode.ts
```

---

## SEO (status: Phase 1 implemented)

| Doc | Purpose |
|-----|---------|
| [`react-spec/SEO.md`](react-spec/SEO.md) | Master SEO spec, timeline, deliverables |
| [`docs/seo/README.md`](docs/seo/README.md) | SEO doc index & quick status |
| [`docs/seo/AUDIT_REPORT.md`](docs/seo/AUDIT_REPORT.md) | Baseline audit (2026-05-18) |
| [`docs/seo/IMPLEMENTATION_CHECKLIST.md`](docs/seo/IMPLEMENTATION_CHECKLIST.md) | Developer task list |
| [`docs/seo/meta-tags-sitemap-robots.md`](docs/seo/meta-tags-sitemap-robots.md) | Helmet, OG, sitemap, robots |
| [`docs/seo/structured-data.md`](docs/seo/structured-data.md) | JSON-LD schemas |
| [`docs/seo/performance-headings-images.md`](docs/seo/performance-headings-images.md) | CWV, h1 hierarchy, images |
| [`docs/seo/REMAINING_TASKS.md`](docs/seo/REMAINING_TASKS.md) | Post-launch todos, GSC, assets, Phase 2 |

**Implemented in `app/src/seo/`:** react-helmet-async meta/OG, `robots.txt`, build-time `sitemap.xml`, JSON-LD (LocalBusiness, Product ItemList, Breadcrumbs, WebSite), breadcrumb UI, heading fixes, image alt/lazy.

**Still to do:** See [`docs/seo/REMAINING_TASKS.md`](docs/seo/REMAINING_TASKS.md) (GSC, OG images, compression, launch checklist, Phase 2).

---

## Related docs

| File | Content |
|------|---------|
| [`../README.md`](../README.md) | Root readme |
| [`README.md`](README.md) | Project-spec index |
| `PROJECT_REFERENCE.md` | Full project reference (this file) |
| `react-spec/SEO.md` | SEO specification |
| `docs/seo/*` | SEO guides and audit |
| `../app/README.md` | Vite + React template (ESLint notes) |

When adding features, update this reference if routes, data shapes, or architecture change.

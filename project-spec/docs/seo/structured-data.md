# Structured Data (Schema.org JSON-LD)

Implementation guide for **Tharanga Drums** using data already in the repo.

---

## 1. Principles

- One `@context`: `https://schema.org` per script block (or combine graphs in `@graph`).
- URLs must be **absolute** (`https://tharangadrums.lk/...`).
- JSON-LD must match **visible** page content (NAP, product names, breadcrumbs).
- Validate: [Google Rich Results Test](https://search.google.com/test/rich-results).

---

## 2. LocalBusiness (site-wide)

**Mount in:** `DefaultLayout.tsx`  
**Data source:** Footer + brand copy

```tsx
// app/src/seo/schema/LocalBusinessJsonLd.tsx
import { SITE_URL } from '../siteConfig';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#organization`,
  name: 'New Tharanga Musical Instruments',
  alternateName: ['Tharanga Drums', 'Beats of Heritage'],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: `${SITE_URL}/images/og/default-og.jpg`,
  description:
    'Handcrafted Sri Lankan traditional drum souvenirs and musical instruments with 2,500 years of heritage.',
  telephone: '+94-77-338-8998',
  email: 'info@tharangadrums.lk',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'NO. 34, Kandy Road',
    addressLocality: 'Nittambuwa',
    addressRegion: 'Western Province',
    addressCountry: 'LK',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 7.1724,
    longitude: 80.1031,
  },
  priceRange: '$$',
  areaServed: {
    '@type': 'Country',
    name: 'Sri Lanka',
  },
  sameAs: [
    // Add when live:
    // 'https://www.facebook.com/...',
    // 'https://www.instagram.com/...',
  ],
};

export function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

> Update `geo` with exact coordinates from Google Business Profile when available.

---

## 3. WebSite (home page)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://tharangadrums.lk/#website",
  "url": "https://tharangadrums.lk",
  "name": "Tharanga Drums",
  "publisher": { "@id": "https://tharangadrums.lk/#organization" }
}
```

Optional `potentialAction` SearchAction only if site search exists.

---

## 4. Product / ItemList (`/product`)

**Data source:** `app/src/data/Product_Details.json`

### Option A — ItemList (recommended for single `/product` page)

```tsx
import productsData from '../../data/Product_Details.json';
import { SITE_URL } from '../siteConfig';

export function ProductListJsonLd() {
  const items = productsData.products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      '@id': `${SITE_URL}/product#${p.product_id}`,
      name: p.name,
      description: p.desc,
      image: `${SITE_URL}${p.main_imageSrc}`,
      brand: {
        '@type': 'Brand',
        name: 'New Tharanga Musical Instruments',
      },
      material: p.Material,
      weight: {
        '@type': 'QuantitativeValue',
        value: p.Weight,
      },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Dimensions', value: p.Dimensions },
        { '@type': 'PropertyValue', name: 'Craftsmanship', value: p.Craftsmanship },
      ],
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'LKR',
        url: `${SITE_URL}/product`,
      },
    },
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sri Lankan Traditional Drum Souvenirs',
    itemListElement: items,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

### Option B — Single Product (when `/product/:slug` exists)

One `Product` block per URL with unique `url` and `sku` (`product_id`).

---

## 5. BreadcrumbList

| Page | Breadcrumb trail |
|------|------------------|
| `/` | Home |
| `/product` | Home → Products |
| `/about` | Home → About Us |

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://tharangadrums.lk/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://tharangadrums.lk/product"
    }
  ]
}
```

Generate from a shared `getBreadcrumbs(pathname)` helper used by UI + JSON-LD.

---

## 6. Articles / Blog (Phase 2)

When blog routes are added (`/blog`, `/blog/:slug`):

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article title",
  "description": "Meta description",
  "image": "https://tharangadrums.lk/images/blog/....jpg",
  "datePublished": "2026-01-15",
  "dateModified": "2026-01-20",
  "author": {
    "@type": "Organization",
    "name": "New Tharanga Musical Instruments"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Tharanga Drums",
    "logo": {
      "@type": "ImageObject",
      "url": "https://tharangadrums.lk/logo.svg"
    }
  },
  "mainEntityOfPage": "https://tharangadrums.lk/blog/slug"
}
```

Also add `/blog` URLs to sitemap with `changefreq: weekly`.

---

## 7. FAQ (optional, home or product)

If FAQ sections are added to the UI, use `FAQPage` with `Question` / `Answer` entities. Do not add FAQ schema without visible FAQ content.

---

## 8. Product mapping reference

| product_id | name | Image (main) |
|------------|------|--------------|
| 1 | DAVULA KEEPSAKE | `/images/products/davula/Davula_main.png` |
| 2 | Thammattama | `/images/products/Thammattama/Thammattama_main.jpg` |
| 3 | Pahatharata Beraya (Yak Beraya) | `/images/products/pahatharata_beraya/pahatharata_bereaya_main.png` |
| 4 | Geta Beraya | `/images/products/getaberaya/getaberaya_main.png` |

---

## 9. Testing matrix

| Page | Schemas to test |
|------|-----------------|
| `/` | WebSite, LocalBusiness |
| `/product` | LocalBusiness, ItemList (Product) |
| `/about` | LocalBusiness, BreadcrumbList |

---

## 10. Common errors to avoid

- Using relative URLs in `image` or `url` fields.
- Multiple conflicting `Product` names on one URL.
- `AggregateRating` without real verified reviews.
- Breadcrumb URLs that 404 or differ from canonical paths.

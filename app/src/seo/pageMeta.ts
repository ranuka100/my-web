import { SITE_URL } from './siteConfig';
import { getProductBySlug } from '../data/productUtils';
import { preferWebp } from '../utils/imagePaths';

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
    ogImage: `${SITE_URL}${preferWebp('/images/products/davula/davula_home.png')}`,
  },
  '/product': {
    path: '/product',
    title: 'Traditional Drum Souvenirs & Keepsakes | Tharanga Drums',
    description:
      'Explore handcrafted drum souvenirs: Davula Keepsake, Thammattama, Pahatharata Beraya & Geta Beraya. Premium mahogany, artisan-made in Sri Lanka.',
    ogImage: `${SITE_URL}${preferWebp('/images/products/davula/Davula_main.png')}`,
  },
  '/about': {
    path: '/about',
    title: 'About Us — Sri Lankan Drum Craftsmanship | Tharanga Drums',
    description:
      '2,500 years of tradition. Presidential Award–winning drum makers in Nittambuwa. National Crafts Council partner.',
    ogImage: `${SITE_URL}${preferWebp('/images/products/getaberaya/getaberaya_aboutus.png')}`,
  },
};

export function getPageMeta(pathname: string, productSlug?: string): PageMeta {
  if (productSlug) {
    const product = getProductBySlug(productSlug);
    if (product) {
      const path = `/product/${product.slug}`;
      return {
        path,
        title: `${product.name} | Sri Lankan Drum Souvenir | Tharanga Drums`,
        description:
          product.desc.length > 160 ? `${product.desc.slice(0, 157)}...` : product.desc,
        ogImage: `${SITE_URL}${preferWebp(product.main_imageSrc)}`,
      };
    }
  }

  return PAGE_META[pathname] ?? PAGE_META['/'];
}

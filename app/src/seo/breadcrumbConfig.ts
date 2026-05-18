import { getProductBySlug } from '../data/productUtils';

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ name: 'Home', path: '/' }];

  const productMatch = pathname.match(/^\/product\/([^/]+)$/);
  if (productMatch) {
    const slug = productMatch[1];
    const product = getProductBySlug(slug);
    items.push({ name: 'Products', path: '/product' });
    if (product) {
      items.push({ name: product.name, path: `/product/${slug}` });
    }
    return items;
  }

  if (pathname === '/product') {
    items.push({ name: 'Products', path: '/product' });
  } else if (pathname === '/about') {
    items.push({ name: 'About Us', path: '/about' });
  }

  return items;
}

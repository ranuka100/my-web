import productsData from './Product_Details.json';

export type Product = (typeof productsData.products)[number];

export const products: Product[] = productsData.products;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductIndexBySlug(slug: string): number {
  return products.findIndex((p) => p.slug === slug);
}

export function getProductPath(slug: string): string {
  return `/product/${slug}`;
}

import JsonLd from './JsonLd';
import type { Product } from '../../data/productUtils';
import { preferWebp } from '../../utils/imagePaths';
import { SITE, SITE_URL } from '../siteConfig';

type ProductJsonLdProps = {
  product: Product;
};

const ProductJsonLd = ({ product }: ProductJsonLdProps) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/product/${product.slug}`,
    name: product.name,
    description: product.desc,
    image: `${SITE_URL}${preferWebp(product.main_imageSrc)}`,
    brand: {
      '@type': 'Brand',
      name: SITE.legalName,
    },
    material: product.Material,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'LKR',
      url: `${SITE_URL}/product/${product.slug}`,
    },
  };

  return <JsonLd data={data} />;
};

export default ProductJsonLd;

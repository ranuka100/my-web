import JsonLd from './JsonLd';
import productsData from '../../data/Product_Details.json';
import { preferWebp } from '../../utils/imagePaths';
import { SITE, SITE_URL } from '../siteConfig';

const ProductListJsonLd = () => {
  const items = productsData.products.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
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
    },
  }));

  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sri Lankan Traditional Drum Souvenirs',
    itemListElement: items,
  };

  return <JsonLd data={data} />;
};

export default ProductListJsonLd;

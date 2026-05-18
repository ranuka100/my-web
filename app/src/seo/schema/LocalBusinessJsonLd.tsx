import JsonLd from './JsonLd';
import { SITE, SITE_URL } from '../siteConfig';

const LocalBusinessJsonLd = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: SITE.legalName,
    alternateName: [SITE.name, SITE.brand],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: SITE.defaultOgImage,
    description:
      'Handcrafted Sri Lankan traditional drum souvenirs and musical instruments with 2,500 years of heritage.',
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Sri Lanka',
    },
  };

  return <JsonLd data={data} />;
};

export default LocalBusinessJsonLd;

import JsonLd from './JsonLd';
import { SITE, SITE_URL } from '../siteConfig';

const WebSiteJsonLd = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  return <JsonLd data={data} />;
};

export default WebSiteJsonLd;

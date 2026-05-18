import { useLocation } from 'react-router-dom';
import JsonLd from './JsonLd';
import { getBreadcrumbs } from '../breadcrumbConfig';
import { SITE_URL } from '../siteConfig';

const BreadcrumbJsonLd = () => {
  const { pathname } = useLocation();
  const crumbs = getBreadcrumbs(pathname);

  if (crumbs.length <= 1) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };

  return <JsonLd data={data} />;
};

export default BreadcrumbJsonLd;

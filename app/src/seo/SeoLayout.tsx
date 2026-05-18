import { useLocation } from 'react-router-dom';
import PageSeo from './PageSeo';
import BreadcrumbNav from './BreadcrumbNav';
import LocalBusinessJsonLd from './schema/LocalBusinessJsonLd';
import BreadcrumbJsonLd from './schema/BreadcrumbJsonLd';
import WebSiteJsonLd from './schema/WebSiteJsonLd';

/** Site-wide SEO: meta tags, JSON-LD, breadcrumbs */
const SeoLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <PageSeo />
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd />
      {pathname === '/' && <WebSiteJsonLd />}
      <BreadcrumbNav />
    </>
  );
};

export default SeoLayout;

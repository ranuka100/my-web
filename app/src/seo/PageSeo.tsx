import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router-dom';
import { getPageMeta } from './pageMeta';
import { SITE, SITE_URL } from './siteConfig';

const PageSeo = () => {
  const { pathname } = useLocation();
  const { slug } = useParams<{ slug?: string }>();
  const meta = getPageMeta(pathname, slug);
  const canonical = `${SITE_URL}${meta.path === '/' ? '' : meta.path}`;
  const ogImage = meta.ogImage ?? SITE.defaultOgImage;
  const robots = meta.noindex ? 'noindex, nofollow' : 'index, follow';

  const gscVerification = import.meta.env.VITE_GSC_VERIFICATION;
  const bingVerification = import.meta.env.VITE_BING_VERIFICATION;

  return (
    <Helmet>
      <html lang="en" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={meta.ogType ?? 'website'} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={SITE.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={ogImage} />

      {gscVerification && (
        <meta name="google-site-verification" content={gscVerification} />
      )}
      {bingVerification && (
        <meta name="msvalidate.01" content={bingVerification} />
      )}
    </Helmet>
  );
};

export default PageSeo;

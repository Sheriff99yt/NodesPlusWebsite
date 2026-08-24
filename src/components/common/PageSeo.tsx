import { Helmet } from 'react-helmet';
import { OG_IMAGE, SITE_NAME } from '../../utils/site';
import { absoluteUrl } from '../../utils/site';

interface PageSeoProps {
  title: string;
  description: string;
  path?: string;
  type?: string;
  noIndex?: boolean;
}

const PageSeo = ({ title, description, path = '/', type = 'website', noIndex = false }: PageSeoProps) => {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:url" content={url} />
      {noIndex ? <meta name="robots" content="noindex, follow" /> : null}
    </Helmet>
  );
};

export default PageSeo;

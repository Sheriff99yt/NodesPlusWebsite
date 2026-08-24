import { Helmet } from 'react-helmet';
import {
  AUTHOR_NAME,
  DISCORD_URL,
  FAB_URL,
  GITHUB_URL,
  LOGO_URL,
  OG_IMAGE,
  ORG_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from '../../utils/site';

export interface FaqItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface StructuredDataProps {
  pageType: 'home' | 'documentation' | 'architecture' | 'notfound';
  title?: string;
  description?: string;
  path?: string;
  breadcrumbs?: BreadcrumbItem[];
  faq?: FaqItem[];
}

const organization = {
  '@type': 'Organization',
  name: `${AUTHOR_NAME} / ${ORG_NAME}`,
  url: SITE_URL,
  logo: LOGO_URL,
  sameAs: [FAB_URL, DISCORD_URL, GITHUB_URL],
};

const website = {
  '@type': 'WebSite',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  description: SITE_DESCRIPTION,
  publisher: organization,
  inLanguage: 'en',
};

const software = {
  '@type': 'SoftwareApplication',
  name: `${SITE_NAME} for Unreal Engine`,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Windows, macOS, Linux',
  description: SITE_DESCRIPTION,
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  author: organization,
  publisher: organization,
  offers: {
    '@type': 'Offer',
    url: FAB_URL,
    availability: 'https://schema.org/InStock',
  },
};

const StructuredData = ({
  pageType,
  title,
  description,
  path = '/',
  breadcrumbs,
  faq,
}: StructuredDataProps) => {
  const graph: object[] = [organization, website];

  if (pageType === 'home') {
    graph.push(software);
  }

  if (pageType === 'documentation') {
    graph.push({
      '@type': 'TechArticle',
      headline: title || 'Nodes Plus Documentation',
      description:
        description ||
        'Documentation for the Nodes Plus Unreal Engine Blueprint library, including categories and individual nodes.',
      author: organization,
      publisher: organization,
      url: absoluteUrl(path),
      image: OG_IMAGE,
      mainEntityOfPage: absoluteUrl(path),
    });
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    });
  }

  if (faq && faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default StructuredData;

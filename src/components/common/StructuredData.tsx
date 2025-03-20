import React from 'react';
import { Helmet } from 'react-helmet';

interface StructuredDataProps {
  pageType: 'home' | 'documentation' | 'product';
}

const StructuredData: React.FC<StructuredDataProps> = ({ pageType }) => {
  const baseUrl = 'https://sherifu.github.io/NodesPlusWebsite';
  
  // Generate structured data based on page type
  const generateJsonLd = (): string => {
    if (pageType === 'home') {
      // Home page structured data
      const homeJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'NodesPlus for Unreal Engine',
        'applicationCategory': 'DesignApplication',
        'operatingSystem': 'Windows, macOS, Linux',
        'description': 'A collection of custom Blueprint nodes that extend Unreal Engine\'s functionality, providing simplified solutions for complex operations in Blueprint scripting.',
        'offers': {
          '@type': 'Offer',
          'price': '24.99',
          'priceCurrency': 'USD',
          'availability': 'https://schema.org/InStock'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.8',
          'ratingCount': '127'
        },
        'developer': {
          '@type': 'Organization',
          'name': 'NodesPlus Team',
          'url': 'https://sherifu.github.io/NodesPlusWebsite'
        },
        'url': baseUrl,
        'screenshot': `${baseUrl}/images/showcase/array_slice_example.jpg`,
        'softwareVersion': '1.4.2',
        'releaseNotes': 'Added new string formatting nodes and improved error handling.'
      };
      return JSON.stringify(homeJsonLd);
    } else if (pageType === 'documentation') {
      // Documentation page structured data
      const docsJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        'headline': 'NodesPlus Documentation',
        'description': 'Comprehensive documentation for Nodes Plus Blueprint nodes, including usage examples and performance considerations.',
        'author': {
          '@type': 'Organization',
          'name': 'NodesPlus Team'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'NodesPlus Team',
          'logo': {
            '@type': 'ImageObject',
            'url': `${baseUrl}/images/branding/Logo.png`
          }
        },
        'datePublished': '2023-09-15',
        'dateModified': new Date().toISOString().split('T')[0]
      };
      return JSON.stringify(docsJsonLd);
    } else if (pageType === 'product') {
      // Product page structured data
      const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': 'NodesPlus for Unreal Engine',
        'description': 'A collection of custom Blueprint nodes that extend Unreal Engine\'s functionality, providing simplified solutions for complex operations in Blueprint scripting.',
        'image': `${baseUrl}/images/branding/Logo.png`,
        'brand': {
          '@type': 'Brand',
          'name': 'NodesPlus'
        },
        'offers': {
          '@type': 'Offer',
          'price': '24.99',
          'priceCurrency': 'USD',
          'availability': 'https://schema.org/InStock',
          'url': 'https://www.fab.com/sellers/Sherif%20Hany'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.8',
          'reviewCount': '127'
        }
      };
      return JSON.stringify(productJsonLd);
    }
    
    return '';
  };

  return (
    <Helmet>
      <script type="application/ld+json">{generateJsonLd()}</script>
    </Helmet>
  );
};

export default StructuredData; 
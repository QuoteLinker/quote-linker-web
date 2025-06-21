import { Metadata } from 'next';

export interface InsuranceProduct {
  name: string;
  description: string;
  url: string;
  image?: string;
}

export interface OrganizationDetails {
  name: string;
  legalName?: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleDetails {
  title: string;
  description: string;
  url: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  category?: string;
  keywords?: string[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Creates JSON-LD schema.org markup for insurance products
 */
export function generateInsuranceProductSchema(products: InsuranceProduct[]): string {
  const items = products.map((product) => {
    return {
      '@type': 'Service',
      '@id': `${product.url}#service`,
      name: product.name,
      description: product.description,
      url: product.url,
      ...(product.image && { image: product.image })
    };
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item
    }))
  };

  return JSON.stringify(schema);
}

/**
 * Creates JSON-LD schema.org markup for the organization
 */
export function generateOrganizationSchema(details: OrganizationDetails): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${details.url}#organization`,
    name: details.name,
    ...(details.legalName && { legalName: details.legalName }),
    url: details.url,
    logo: {
      '@type': 'ImageObject',
      url: details.logo
    },
    description: details.description,
    ...(details.sameAs && { sameAs: details.sameAs })
  };

  return JSON.stringify(schema);
}

/**
 * Creates JSON-LD schema.org markup for FAQ page
 */
export function generateFAQSchema(questions: FAQItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return JSON.stringify(schema);
}

/**
 * Creates JSON-LD schema.org markup for LocalBusiness (for agents)
 */
export function generateLocalBusinessSchema(
  name: string,
  description: string,
  url: string,
  telephone: string,
  image: string,
  address: {
    streetAddress: string,
    addressLocality: string,
    addressRegion: string,
    postalCode: string,
    addressCountry: string
  },
  geo?: {
    latitude: number,
    longitude: number
  },
  priceRange?: string
): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name,
    description,
    url,
    telephone,
    image,
    address: {
      '@type': 'PostalAddress',
      ...address
    },
    ...(geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude
      }
    }),
    ...(priceRange && { priceRange })
  };

  return JSON.stringify(schema);
}

/**
 * Creates JSON-LD schema.org markup for articles
 */
export function generateArticleSchema(details: ArticleDetails): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: details.title,
    description: details.description,
    url: details.url,
    author: {
      '@type': 'Person',
      name: details.author
    },
    datePublished: details.datePublished,
    dateModified: details.dateModified || details.datePublished,
    publisher: {
      '@type': 'Organization',
      name: 'QuoteLinker',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com'}/logo.svg`
      }
    },
    ...(details.image && { image: details.image }),
    ...(details.category && { articleSection: details.category }),
    ...(details.keywords && { keywords: details.keywords.join(', ') })
  };

  return JSON.stringify(schema);
}

/**
 * Creates JSON-LD schema.org markup for breadcrumbs
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.name,
        url: item.url
      }
    }))
  };

  return JSON.stringify(schema);
}

/**
 * Helper to add canonical URL and other essential SEO metadata
 */
export function getBaseMetadata(
  title: string,
  description: string,
  path: string,
  imageUrl = '/og-image.png'
): Metadata {
  const url = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.quotelinker.com';
  const canonical = `${url}${path}`;
  
  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      images: [
        {
          url: `${url}${imageUrl}`,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      siteName: 'QuoteLinker'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${url}${imageUrl}`],
      creator: '@QuoteLinker'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true
      }
    }
  };
}

import Script from 'next/script';
import { getProductContent } from '@/utils/insuranceCopy';
import { InsuranceType } from '@/types/insurance';

interface InsuranceProductSchemaProps {
  insuranceType: InsuranceType;
}

// This is a simplified mapping. A more robust solution might get the path from getProductContent.
const insuranceTypeToPathMap: Record<string, string> = {
    AUTO: 'auto',
    HOME: 'home',
    LIFE: 'life',
    HEALTH: 'health',
    DISABILITY: 'disability',
};

export default function InsuranceProductSchema({ insuranceType }: InsuranceProductSchemaProps) {
  const content = getProductContent(insuranceType);
  if (!content) {
    return null;
  }

  // Assuming content contains title and metaDescription for the schema.
  const { title, metaDescription } = content;
  const productPath = insuranceTypeToPathMap[insuranceType] || insuranceType.toLowerCase();
  const productUrl = `https://www.quotelinker.com/${productPath}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title.replace(' | QuoteLinker', ''), // Clean up title
    description: metaDescription,
    url: productUrl,
    provider: {
      '@type': 'Organization',
      name: 'QuoteLinker',
      url: 'https://www.quotelinker.com',
    },
    areaServed: 'US',
    serviceType: 'Insurance',
  };

  return (
    <Script
      id={`insurance-product-schema-${insuranceType}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

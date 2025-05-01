import { Metadata } from 'next';
import { InsuranceType } from './insuranceCopy';

interface ProductMetadata {
  title: string;
  description: string;
  schema: any;
  altText: {
    [key: string]: string;
  };
}

const productMetadata: Record<InsuranceType, ProductMetadata> = {
  AUTO: {
    title: 'Minnesota Auto Insurance Quotes | Compare Rates & Save | QuoteLinker',
    description: 'Get competitive Minnesota auto insurance quotes with comprehensive coverage options. Compare rates from top carriers and save on your policy. Licensed agents available to help.',
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Minnesota Auto Insurance",
      "description": "Comprehensive auto insurance coverage for Minnesota drivers",
      "brand": {
        "@type": "Brand",
        "name": "QuoteLinker"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "offerCount": "5"
      },
      "areaServed": {
        "@type": "State",
        "name": "Minnesota"
      }
    },
    altText: {
      "shield": "Auto insurance protection icon",
      "clock": "Fast quote process icon",
      "dollar": "Competitive rates icon",
      "star": "Top-rated service icon"
    }
  },
  HOME: {
    title: 'Minnesota Home Insurance Quotes | Protect Your Property | QuoteLinker',
    description: 'Get comprehensive Minnesota home insurance quotes with coverage for winter damage, theft, and liability. Compare rates from trusted providers and protect your property.',
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Minnesota Home Insurance",
      "description": "Comprehensive home insurance coverage for Minnesota properties",
      "brand": {
        "@type": "Brand",
        "name": "QuoteLinker"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "offerCount": "5"
      },
      "areaServed": {
        "@type": "State",
        "name": "Minnesota"
      }
    },
    altText: {
      "shield": "Home insurance protection icon",
      "clock": "Quick quote process icon",
      "dollar": "Affordable rates icon",
      "star": "Top-rated service icon"
    }
  },
  LIFE_TERM: {
    title: 'Minnesota Term Life Insurance Quotes | Affordable Protection | QuoteLinker',
    description: 'Get affordable Minnesota term life insurance quotes with flexible coverage options. Protect your family\'s future with competitive rates from top carriers.',
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Minnesota Term Life Insurance",
      "description": "Affordable term life insurance coverage for Minnesota residents",
      "brand": {
        "@type": "Brand",
        "name": "QuoteLinker"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "offerCount": "5"
      },
      "areaServed": {
        "@type": "State",
        "name": "Minnesota"
      }
    },
    altText: {
      "shield": "Life insurance protection icon",
      "clock": "Simple application process icon",
      "dollar": "Affordable premiums icon",
      "star": "Top-rated service icon"
    }
  },
  LIFE_PERMANENT: {
    title: 'Minnesota Whole Life Insurance Quotes | Lifetime Protection | QuoteLinker',
    description: 'Get Minnesota whole life insurance quotes with guaranteed cash value growth. Build lifelong protection and wealth with competitive rates from top carriers.',
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Minnesota Whole Life Insurance",
      "description": "Permanent life insurance with cash value growth for Minnesota residents",
      "brand": {
        "@type": "Brand",
        "name": "QuoteLinker"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "offerCount": "5"
      },
      "areaServed": {
        "@type": "State",
        "name": "Minnesota"
      }
    },
    altText: {
      "shield": "Permanent life insurance protection icon",
      "clock": "Lifetime coverage icon",
      "dollar": "Cash value growth icon",
      "star": "Top-rated service icon"
    }
  },
  HEALTH_SHORT_TERM_DISABILITY: {
    title: 'Minnesota Short-Term Disability Insurance | Income Protection | QuoteLinker',
    description: 'Get Minnesota short-term disability insurance quotes to protect your income during recovery. Compare rates and coverage options from top providers.',
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Minnesota Short-Term Disability Insurance",
      "description": "Income protection coverage for Minnesota residents",
      "brand": {
        "@type": "Brand",
        "name": "QuoteLinker"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "offerCount": "5"
      },
      "areaServed": {
        "@type": "State",
        "name": "Minnesota"
      }
    },
    altText: {
      "shield": "Disability insurance protection icon",
      "clock": "Quick benefits icon",
      "dollar": "Income replacement icon",
      "star": "Top-rated service icon"
    }
  },
  HEALTH_SUPPLEMENTAL: {
    title: 'Minnesota Supplemental Health Insurance | Extra Protection | QuoteLinker',
    description: 'Get Minnesota supplemental health insurance quotes for additional coverage. Compare rates and options to protect against unexpected medical expenses.',
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Minnesota Supplemental Health Insurance",
      "description": "Additional health coverage options for Minnesota residents",
      "brand": {
        "@type": "Brand",
        "name": "QuoteLinker"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "offerCount": "5"
      },
      "areaServed": {
        "@type": "State",
        "name": "Minnesota"
      }
    },
    altText: {
      "shield": "Supplemental health insurance protection icon",
      "clock": "Easy enrollment icon",
      "dollar": "Fixed benefits icon",
      "star": "Top-rated service icon"
    }
  }
};

export function generateProductMetadata(insuranceType: InsuranceType): Metadata {
  const metadata = productMetadata[insuranceType];
  
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: [
      `${insuranceType.toLowerCase()} insurance`,
      'Minnesota insurance',
      'insurance quotes',
      'insurance rates',
      'insurance coverage'
    ],
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'website',
      url: `https://quotelinker.com/${insuranceType.toLowerCase()}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
    },
  };
}

export function generateProductSchema(insuranceType: InsuranceType): string {
  return JSON.stringify(productMetadata[insuranceType].schema);
}

export function getAltText(insuranceType: InsuranceType, iconName: string): string {
  return productMetadata[insuranceType].altText[iconName] || '';
} 
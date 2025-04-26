import { Metadata } from 'next';
import { InsuranceType } from './insuranceCopy';

export function generateInsuranceMetadata(
  insuranceType: InsuranceType,
  title: string,
  description: string,
  keywords: string[]
): Metadata {
  const formattedType = insuranceType.charAt(0).toUpperCase() + insuranceType.slice(1);
  
  return {
    title: `${formattedType} Insurance Quotes | QuoteLinker`,
    description,
    keywords: [...keywords, `${insuranceType} insurance`, `${formattedType} insurance quotes`, 'Minnesota insurance', 'insurance quotes'],
    openGraph: {
      title: `${formattedType} Insurance Quotes | QuoteLinker`,
      description,
      type: 'website',
      url: `https://quotelinker.com/${insuranceType}`,
    },
  };
}

export function generateInsuranceStructuredData(
  insuranceType: InsuranceType,
  description: string
): string {
  const formattedType = insuranceType.charAt(0).toUpperCase() + insuranceType.slice(1);
  
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "QuoteLinker",
    "description": `Connect with licensed insurance agents in your area and get personalized quotes for ${insuranceType} insurance.`,
    "url": `https://quotelinker.com/${insuranceType}`,
    "areaServed": {
      "@type": "State",
      "name": "Minnesota"
    },
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "InsuranceAgency",
        "name": `${formattedType} Insurance`,
        "description": description
      }
    }
  });
} 
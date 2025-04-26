import { insuranceProducts } from '@/utils/insuranceCopy';
import { Metadata } from 'next';
import Script from 'next/script';
import { generateInsuranceMetadata, generateInsuranceStructuredData } from '@/utils/seoUtils';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = generateInsuranceMetadata(
  'disability',
  'Disability Insurance Quotes | QuoteLinker',
  'Get personalized disability insurance quotes from a licensed agent. Protect your income if you become unable to work due to illness or injury.',
  ['disability insurance', 'income protection', 'short-term disability', 'long-term disability', 'Minnesota disability insurance', 'insurance quotes']
);

export default function DisabilityInsurancePage() {
  const product = insuranceProducts.disability;

  return (
    <div className="bg-white">
      <Script id="structured-data" type="application/ld+json">
        {generateInsuranceStructuredData(
          'disability',
          'Comprehensive disability insurance coverage options'
        )}
      </Script>

      <ProductPage insuranceType="disability" product={product} />
    </div>
  );
} 
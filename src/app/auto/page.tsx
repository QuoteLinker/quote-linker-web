import { insuranceProducts } from '@/utils/insuranceCopy';
import { Metadata } from 'next';
import Script from 'next/script';
import { generateInsuranceMetadata, generateInsuranceStructuredData } from '@/utils/seoUtils';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = generateInsuranceMetadata(
  'auto',
  'Auto Insurance Quotes | QuoteLinker',
  'Get personalized auto insurance quotes from licensed agents in Minnesota. Compare coverage options and find the best rates for your vehicle.',
  ['auto insurance', 'car insurance', 'vehicle insurance', 'Minnesota auto insurance', 'insurance quotes']
);

export default function AutoInsurancePage() {
  const product = insuranceProducts.auto;

  return (
    <div className="bg-white">
      <Script id="structured-data" type="application/ld+json">
        {generateInsuranceStructuredData(
          'auto',
          'Comprehensive auto insurance coverage options'
        )}
      </Script>

      <ProductPage insuranceType="auto" product={product} />
    </div>
  );
} 
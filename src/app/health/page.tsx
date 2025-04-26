import { insuranceProducts } from '@/utils/insuranceCopy';
import { Metadata } from 'next';
import Script from 'next/script';
import { generateInsuranceMetadata, generateInsuranceStructuredData } from '@/utils/seoUtils';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = generateInsuranceMetadata(
  'health',
  'Health Insurance Quotes | QuoteLinker',
  'Get personalized health insurance quotes from a licensed agent. Find the right coverage for your medical needs and budget.',
  ['health insurance', 'medical insurance', 'healthcare coverage', 'Minnesota health insurance', 'insurance quotes']
);

export default function HealthInsurancePage() {
  const product = insuranceProducts.health;

  return (
    <div className="bg-white">
      <Script id="structured-data" type="application/ld+json">
        {generateInsuranceStructuredData(
          'health',
          'Comprehensive health insurance coverage options'
        )}
      </Script>

      <ProductPage insuranceType="health" product={product} />
    </div>
  );
} 
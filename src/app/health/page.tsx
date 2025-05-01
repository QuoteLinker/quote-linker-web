import ProductPage from '@/components/ProductPage';
import type { InsuranceType } from '@/utils/insuranceCopy';

export default function HealthInsurancePage() {
  return <ProductPage params={{ type: 'HEALTH' as InsuranceType }} />;
}

export const metadata = {
  title: 'Health Insurance | QuoteLinker',
  description: 'Find the right health insurance coverage for your needs with QuoteLinker. Compare quotes from top-rated carriers and get expert guidance.',
}; 
import ProductPage from '@/components/ProductPage';
import type { InsuranceType } from '@/utils/insuranceCopy';

export default function SupplementalHealthPage() {
  return <ProductPage params={{ type: 'HEALTH_SUPPLEMENTAL' as InsuranceType }} />;
}

export const metadata = {
  title: 'Supplemental Health Insurance | QuoteLinker',
  description: 'Get extra protection with supplemental health insurance from QuoteLinker. Compare quotes from top-rated carriers and get expert guidance.',
}; 
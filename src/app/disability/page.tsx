import ProductPage from '@/components/ProductPage';
import type { InsuranceType } from '@/utils/insuranceCopy';

export default function DisabilityInsurancePage() {
  return <ProductPage params={{ type: 'DISABILITY' as InsuranceType }} />;
} 
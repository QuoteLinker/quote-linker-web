import ProductPage from '@/components/ProductPage';
import type { InsuranceType } from '@/utils/insuranceCopy';

export default function AutoInsurancePage() {
  return <ProductPage params={{ type: 'AUTO' as InsuranceType }} />;
} 
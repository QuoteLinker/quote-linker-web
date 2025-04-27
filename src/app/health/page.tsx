import ProductPage from '@/components/ProductPage';
import { InsuranceType } from '@/utils/insuranceCopy';

export default function HealthInsurancePage() {
  return <ProductPage insuranceType="SUPPLEMENTAL_HEALTH" />;
}

export const metadata = {
  title: 'Health Insurance - QuoteLinker',
  description: 'Get the health coverage you need to stay protected and worry-free.',
}; 
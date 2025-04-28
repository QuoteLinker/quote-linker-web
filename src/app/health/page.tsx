import ProductPage from '@/components/ProductPage';
import { InsuranceType } from '@/utils/insuranceCopy';

export default function HealthInsurancePage() {
  return <ProductPage insuranceType="HEALTH_SUPPLEMENTAL" />;
}

export const metadata = {
  title: 'Health Insurance - QuoteLinker',
  description: 'Get the health coverage you need to stay protected and worry-free.',
}; 
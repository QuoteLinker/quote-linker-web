import ProductPage from '@/components/ProductPage';
import { InsuranceType } from '@/utils/insuranceCopy';

export default function SupplementalHealthInsurancePage() {
  return <ProductPage insuranceType="SUPPLEMENTAL_HEALTH" />;
}

export const metadata = {
  title: 'Supplemental Health Insurance - QuoteLinker',
  description: 'Get additional health coverage with supplemental health insurance.',
}; 
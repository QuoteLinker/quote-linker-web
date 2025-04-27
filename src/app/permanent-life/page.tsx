import ProductPage from '@/components/ProductPage';
import { InsuranceType } from '@/utils/insuranceCopy';

export default function PermanentLifeInsurancePage() {
  return <ProductPage insuranceType="PERMANENT_LIFE" />;
}

export const metadata = {
  title: 'Permanent Life Insurance - QuoteLinker',
  description: 'Secure lifelong protection with permanent life insurance coverage.',
}; 
import ProductPage from '@/components/ProductPage';
import { InsuranceType } from '@/utils/insuranceCopy';

export default function LifeInsurancePage() {
  return <ProductPage insuranceType="TERM_LIFE" />;
}

export const metadata = {
  title: 'Life Insurance - QuoteLinker',
  description: 'Get the life insurance coverage you need to protect your loved ones.',
}; 
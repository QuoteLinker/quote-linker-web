import ProductPage from '@/components/ProductPage';
import { InsuranceType } from '@/utils/insuranceCopy';

export default function AutoInsurancePage() {
  return <ProductPage params={{ type: InsuranceType.AUTO }} />;
} 
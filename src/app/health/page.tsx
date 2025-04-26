'use client';

import { useState } from 'react';
import QuoteForm from '@/components/QuoteForm';
import ProductPageLayout from '@/components/ProductPageLayout';

export default function HealthInsurancePage() {
  const [subType, setSubType] = useState<'std' | 'supplemental'>('std');

  return (
    <ProductPageLayout 
      productType="health" 
      subType={subType} 
      setSubType={setSubType}
    >
      <QuoteForm productType="health" subType={subType} />
    </ProductPageLayout>
  );
} 
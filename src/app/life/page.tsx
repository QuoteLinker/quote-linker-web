'use client';

import { useState } from 'react';
import QuoteForm from '@/components/QuoteForm';
import ProductPageLayout from '@/components/ProductPageLayout';

export default function LifeInsurancePage() {
  const [subType, setSubType] = useState<'term' | 'permanent'>('term');

  return (
    <ProductPageLayout 
      productType="life" 
      subType={subType} 
      setSubType={setSubType}
    >
      <QuoteForm productType="life" subType={subType} />
    </ProductPageLayout>
  );
} 
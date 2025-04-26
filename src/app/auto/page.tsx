'use client';

import QuoteForm from '@/components/QuoteForm';

export default function AutoInsurancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Auto Insurance Quotes</h1>
      
      <div className="flex justify-center items-center mx-auto max-w-lg pb-8">
        <QuoteForm productType="auto" subType="auto" />
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Auto Insurance - QuoteLinker',
  description: 'Get competitive auto insurance quotes tailored to your needs.',
}; 
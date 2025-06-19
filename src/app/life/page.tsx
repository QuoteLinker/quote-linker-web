import { Metadata } from 'next';
import Hero from '@/components/Hero';
import QuoteForm from '@/components/QuoteForm';
import BenefitsSection from '@/components/BenefitsSection';
import FAQSection from '../../components/FAQSection';
import { getProductContent } from '@/utils/insuranceCopy';
import InsuranceProductSchema from '../../components/seo/InsuranceProductSchema';

export const metadata: Metadata = {
  title: 'Life Insurance | QuoteLinker',
  description: 'Protect your loved ones with the right life insurance coverage.',
};

export default function LifeInsurancePage() {
  const content = getProductContent('LIFE');

  return (
    <main className="min-h-screen bg-gray-50">
      <InsuranceProductSchema insuranceType="LIFE" />
      <Hero insuranceType="LIFE" />
      <div id="quote-form" className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Get Your Free Life Insurance Quote</h2>
          <QuoteForm productType="Life" />
        </div>
      </div>
      {content.benefits && <BenefitsSection benefits={content.benefits} />}
      {content.faqs && <FAQSection faqs={content.faqs} />}
    </main>
  );
}
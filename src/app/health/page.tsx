import { Metadata } from 'next';
import Hero from '@/components/Hero';
import QuoteForm from '@/components/QuoteForm';
import BenefitsSection from '@/components/BenefitsSection';
import FAQSection from '../../components/FAQSection';
import { getProductContent } from '@/utils/insuranceCopy';

export const metadata: Metadata = {
  title: 'Health Insurance | QuoteLinker',
  description: 'Find the right health insurance coverage for your needs with QuoteLinker. Compare quotes from top-rated carriers and get expert guidance.',
};

export default function HealthInsurancePage() {
  const content = getProductContent('HEALTH');

  return (
    <main className="min-h-screen bg-gray-50">
      <Hero insuranceType="HEALTH" />
      <div id="quote-form" className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Get Your Free Health Insurance Quote</h2>
          <QuoteForm productType="Health" />
        </div>
      </div>
      {content.benefits && <BenefitsSection benefits={content.benefits} />}
      {content.faqs && <FAQSection faqs={content.faqs} />}
    </main>
  );
}
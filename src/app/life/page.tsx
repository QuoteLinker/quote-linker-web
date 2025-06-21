import { Metadata } from 'next';
import BenefitsSection from '@/components/BenefitsSection';
import FAQSection from '@/components/FAQSection';
import { getProductContent } from '@/utils/insuranceCopy';
import { QuoteFlow } from '@/components/QuoteFlow';
import InsuranceProductSchema from '@/components/seo/InsuranceProductSchema';

export const metadata: Metadata = {
  title: 'Life Insurance | QuoteLinker',
  description: 'Protect your loved ones with the right life insurance coverage.',
};

export default function LifeInsurancePage() {
  const content = getProductContent('LIFE');

  return (
    <>
      <InsuranceProductSchema insuranceType="LIFE" />
      <QuoteFlow 
        type="LIFE"
        title="Life Insurance Quotes"
        description="Protect your loved ones with the right life insurance coverage."
        hero={{
          heading: "Secure Your Family's Future",
          subheading: "Compare life insurance quotes and find the right coverage for your loved ones.",
          image: "/images/life-insurance-hero.jpg"
        }}
      />
      {content.benefits && <BenefitsSection benefits={content.benefits} />}
      {content.faqs && <FAQSection faqs={content.faqs} />}
    </>
  );
}
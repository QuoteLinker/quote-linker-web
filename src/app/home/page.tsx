import { Metadata } from 'next';
import BenefitsSection from '@/components/BenefitsSection';
import FAQSection from '@/components/FAQSection';
import { getProductContent } from '@/utils/insuranceCopy';
import { QuoteFlow } from '@/components/QuoteFlow';

export const metadata: Metadata = {
  title: 'Home Insurance | QuoteLinker',
  description: 'Protect your home with comprehensive coverage from trusted providers.',
};

export default function HomeInsurancePage() {
  const content = getProductContent('HOME');

  return (
    <>
      <QuoteFlow 
        type="HOME"
        title="Home Insurance Quotes"
        description="Protect your home with comprehensive coverage from trusted providers."
        hero={{
          heading: "Protect Your Home with the Right Coverage",
          subheading: "Compare home insurance quotes from leading providers and save.",
          image: "/images/home-insurance-hero.jpg"
        }}
      />
      {content.benefits && <BenefitsSection benefits={content.benefits} />}
      {content.faqs && <FAQSection faqs={content.faqs} />}
    </>
  );
}

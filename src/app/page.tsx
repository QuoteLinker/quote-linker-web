import HeroSection from '@/components/HeroSection';
import QuoteForm from '@/components/QuoteForm';
import TrustIndicators from '@/components/TrustIndicators';

export default function Home() {
  return (
    <>
      <HeroSection
        title="Find Your Perfect Insurance Match"
        subtitle="Compare quotes from top providers and get expert guidance from licensed agents"
        ctaText="Get Started"
        ctaLink="#quote-form"
        insuranceType="auto"
      />
      
      <TrustIndicators />

      <div id="quote-form" className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Get Your Free Quote</h2>
            <QuoteForm insuranceType="auto" />
          </div>
        </div>
      </div>
    </>
  );
} 
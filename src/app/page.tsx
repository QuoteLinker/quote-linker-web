import HeroSection from '@/components/HeroSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import ProductsSection from '@/components/ProductsSection';
import QuoteForm from '@/components/QuoteForm';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Find Your Perfect Insurance Match"
        subtitle="Get personalized quotes from licensed local agents—faster, easier, and tailored to you"
        ctaText="Get My Free Quote"
        ctaHref="#quote-form"
      />

      <WhyChooseSection />
      
      <ProductsSection />

      <section id="quote-form" className="py-24 px-6 bg-[#F9FBFC]">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#0A0A0A] mb-4">
                Get Your Free Quote Today
              </h2>
              <p className="text-lg text-[#1A1A1A] opacity-80">
                Fill out the form below and we'll connect you with a licensed agent who can help.
              </p>
            </div>
            <QuoteForm insuranceType="auto" />
          </div>
        </div>
      </section>
    </div>
  );
} 
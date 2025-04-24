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
        ctaText="Get Started"
        ctaHref="#quote-form"
      />

      <WhyChooseSection />
      
      <ProductsSection />

      <section id="quote-form" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-background">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-headline mb-4">
                Get Your Free Quote Today
              </h2>
              <p className="text-lg text-brand-body">
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
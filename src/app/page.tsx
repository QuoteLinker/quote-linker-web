import HeroSection from '@/components/HeroSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import ProductsSection from '@/components/ProductsSection';
import QuoteForm from '@/components/QuoteForm';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection
        title="Smarter Insurance Starts Here"
        subtitle="Get personalized quotes from licensed local agents—faster, easier, and tailored to you."
        ctaText="Get My Free Quote"
        ctaLink="#quote-form"
      />
      <WhyChooseSection />
      <ProductsSection />
      <section id="quote-form" className="py-24 px-6 bg-gradient-to-b from-brand-background to-brand-card relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-5"></div>
        <div className="container relative mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-brand-headline mb-4">
                Get Your Free Quote Today
              </h2>
              <p className="text-lg text-brand-body opacity-80">
                Fill out the form below and we'll connect you with a licensed agent who can help.
              </p>
            </div>
            <QuoteForm insuranceType="auto" />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
} 
import Link from 'next/link';
import Script from 'next/script';
import { Metadata } from 'next';
import { ShieldCheck, Car, Home, HeartHandshake } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';

export const metadata: Metadata = {
  title: 'QuoteLinker - The Smart Way to Find Insurance',
  description: 'Connect with trusted, local insurance agents for auto, home, life, and health quotes. QuoteLinker makes comparing insurance simple, fast, and free.',
  keywords: [
    'compare insurance quotes',
    'auto insurance',
    'home insurance',
    'life insurance',
    'health insurance',
    'local insurance agents',
    'insurance marketplace',
  ],
  openGraph: {
    title: 'QuoteLinker - The Smart Way to Find Insurance',
    description: 'Connect with trusted, local insurance agents for auto, home, life, and health quotes.',
    type: 'website',
    url: 'https://quotelinker.com',
  },
};

const InsuranceCard = ({ icon, title, href }: { icon: React.ReactNode, title: string, href: string }) => (
  <Link href={href}>
    <div className="group block text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
      <div className="flex justify-center items-center h-16 w-16 mx-auto mb-4 bg-cyan-100 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
  </Link>
);

export default function Home() {
  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Corporation',
          name: 'QuoteLinker',
          url: 'https://quotelinker.com',
          logo: 'https://quotelinker.com/logo.png', // You should add a logo URL here
          description: 'A marketplace connecting consumers with local insurance agents for various types of insurance quotes.',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-763-292-3692',
            contactType: 'Customer Service'
          }
        })}
      </Script>

      <Header />

      <main className="flex-grow">
        <HeroSection
          title="Your Link to Smarter Insurance."
          subtitle="Get free, no-obligation quotes from experienced local agents in minutes. We make shopping for insurance easy."
          ctaText="Get a Free Quote"
          ctaLink="/get-quote"
        />

        <section className="py-20 md:py-24">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Compare All Your Insurance Needs</h2>
                <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto mb-12">
                  Select a the coverage you need below to get started and see how much you could save.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <InsuranceCard icon={<Car size={32} className="text-cyan-600" />} title="Auto Insurance" href="/get-quote/auto" />
                    <InsuranceCard icon={<Home size={32} className="text-cyan-600" />} title="Home Insurance" href="/get-quote/home" />
                    <InsuranceCard icon={<HeartHandshake size={32} className="text-cyan-600" />} title="Life Insurance" href="/get-quote/life" />
                    <InsuranceCard icon={<ShieldCheck size={32} className="text-cyan-600" />} title="Health Insurance" href="/get-quote/health" />
                </div>
            </div>
        </section>
        
        <BenefitsSection />

      </main>

      <Footer />
    </div>
  );
}
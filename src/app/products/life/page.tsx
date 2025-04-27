import HeroSection from '@/components/HeroSection';
import FeatureGrid from '@/components/FeatureGrid';
import QuoteForm from '@/components/QuoteForm';
import { FaHeart, FaLock, FaChartLine, FaHandHoldingUsd } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

export default function LifeInsurancePage() {
  const searchParams = useSearchParams();
  const subType = searchParams.get('subType') || 'term';

  const features = [
    {
      icon: <FaHeart />,
      title: 'Family Protection',
      description: 'Ensure your loved ones are financially secure'
    },
    {
      icon: <FaLock />,
      title: 'Guaranteed Coverage',
      description: 'Lock in your rate for the duration of your policy'
    },
    {
      icon: <FaChartLine />,
      title: 'Flexible Terms',
      description: 'Choose coverage that fits your needs and budget'
    },
    {
      icon: <FaHandHoldingUsd />,
      title: 'Tax Benefits',
      description: 'Death benefits are generally income tax-free'
    }
  ];

  return (
    <main>
      <HeroSection
        title="Life Insurance"
        subtitle="Protect your family's future"
        ctaText="Get My Life Quote"
        ctaLink="#quote-form"
      />
      
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            <a
              href="?subType=term"
              className={`px-6 py-2 rounded-lg ${
                subType === 'term'
                  ? 'bg-[#00EEFD] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Term Life
            </a>
            <a
              href="?subType=permanent"
              className={`px-6 py-2 rounded-lg ${
                subType === 'permanent'
                  ? 'bg-[#00EEFD] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Permanent Life
            </a>
          </div>
        </div>
      </div>
      
      <FeatureGrid items={features} />
      
      <section id="quote-form" className="py-16">
        <div className="container mx-auto px-4">
          <QuoteForm productType="life" subType={subType} />
        </div>
      </section>
    </main>
  );
} 
'use client';

import { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import FeatureGrid from '@/components/FeatureGrid';
import QuoteForm from '@/components/QuoteForm';
import { FaMedkit, FaHospital, FaUserMd, FaFileMedical } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

function HealthInsuranceContent() {
  const searchParams = useSearchParams();
  const subType = searchParams.get('subType') || 'std';

  const features = [
    {
      icon: <FaMedkit />,
      title: 'Comprehensive Coverage',
      description: 'Protection for medical expenses and healthcare needs'
    },
    {
      icon: <FaHospital />,
      title: 'Network Access',
      description: 'Access to a wide network of healthcare providers'
    },
    {
      icon: <FaUserMd />,
      title: 'Expert Support',
      description: 'Guidance from licensed health insurance specialists'
    },
    {
      icon: <FaFileMedical />,
      title: 'Easy Claims',
      description: 'Simple and straightforward claims process'
    }
  ];

  return (
    <main>
      <HeroSection
        title="Health Insurance"
        subtitle="Protect your health and financial future"
        ctaText="Get My Health Quote"
        ctaLink="#quote-form"
      />
      
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            <a
              href="?subType=std"
              className={`px-6 py-2 rounded-lg ${
                subType === 'std'
                  ? 'bg-[#00EEFD] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Short Term Disability
            </a>
            <button
              onClick={() => setSelectedType('SUPPLEMENTAL_HEALTH')}
              className={`px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                selectedType === 'SUPPLEMENTAL_HEALTH'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              Supplemental Health
            </button>
          </div>
        </div>
      </div>
      
      <FeatureGrid items={features} />
      
      <section id="quote-form" className="py-16">
        <div className="container mx-auto px-4">
          <QuoteForm productType="health" subType={subType} />
        </div>
      </section>
    </main>
  );
}

export default function HealthInsurancePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HealthInsuranceContent />
    </Suspense>
  );
} 
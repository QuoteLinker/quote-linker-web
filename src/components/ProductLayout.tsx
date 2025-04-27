'use client';

import { ReactNode } from 'react';
import HeroSection from './HeroSection';
import QuoteForm from './QuoteForm';
import BenefitsSection from './BenefitsSection';
import WhyChooseSection from './WhyChooseSection';

type SubType = 'term' | 'permanent' | 'std' | 'supplemental' | 'auto' | 'home';

interface ProductLayoutProps {
  productType: 'life' | 'health' | 'auto' | 'home';
  subType?: SubType;
  heroTitle: string;
  heroSubtitle: string;
  heroCTA: string;
  heroIconItems: Array<{
    icon: ReactNode;
    text: string;
  }>;
  benefitsTitle: string;
  benefits: Array<{
    icon: ReactNode;
    title: string;
    description: string;
  }>;
  showToggle?: boolean;
  toggleOptions?: Array<{
    value: string;
    label: string;
  }>;
  onToggleChange?: (value: string) => void;
}

export default function ProductLayout({
  productType,
  subType,
  heroTitle,
  heroSubtitle,
  heroCTA,
  heroIconItems,
  benefitsTitle,
  benefits,
  showToggle,
  toggleOptions,
  onToggleChange,
}: ProductLayoutProps) {
  return (
    <div className="min-h-screen">
      <HeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
        ctaText={heroCTA}
        ctaLink="#quote-form"
        iconItems={heroIconItems}
      />
      
      <section id="quote-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {showToggle && toggleOptions && (
              <div className="flex justify-center gap-4 mb-8">
                {toggleOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onToggleChange?.(option.value)}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      subType === option.value
                        ? 'bg-[#00EEFD] text-blue-900'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
            <QuoteForm productType={productType} subType={subType as SubType} />
          </div>
        </div>
      </section>

      <BenefitsSection title={benefitsTitle} benefits={benefits} />
      
      <WhyChooseSection />
    </div>
  );
} 
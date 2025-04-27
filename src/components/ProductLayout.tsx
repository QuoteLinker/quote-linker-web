'use client';

import { ReactNode } from 'react';
import HeroSection from './HeroSection';
import QuoteForm from './QuoteForm';
import BenefitsSection from './BenefitsSection';
import WhyChooseSection from './WhyChooseSection';
import { InsuranceType } from '@/utils/insuranceCopy';

type SubType = 'term' | 'permanent' | 'std' | 'supplemental' | 'auto' | 'home';

interface ProductLayoutProps {
  insuranceType: InsuranceType;
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
  insuranceType,
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
              {heroTitle}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-sm sm:text-base text-gray-500 md:text-lg lg:text-xl md:max-w-2xl lg:max-w-3xl">
              {heroSubtitle}
            </p>
            <div className="mt-4 sm:mt-6 max-w-md mx-auto">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#00EEFD] hover:bg-[#00d4e1] transition-colors duration-200"
              >
                {heroCTA}
              </button>
            </div>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {heroIconItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="text-[#00EEFD] w-6 h-6">{item.icon}</div>
                  <span className="text-xs sm:text-sm text-gray-500">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form and Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Toggle Section */}
        {showToggle && toggleOptions && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm">
              {toggleOptions.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onToggleChange?.(option.value)}
                  className={`
                    ${index === 0 ? 'rounded-l-md' : ''} 
                    ${index === toggleOptions.length - 1 ? 'rounded-r-md' : ''}
                    ${subType === option.value ? 'bg-[#00EEFD] text-white' : 'bg-white text-gray-700'}
                    px-4 py-2 text-sm font-medium border border-gray-200 hover:bg-gray-50
                    focus:z-10 focus:outline-none focus:ring-2 focus:ring-[#00EEFD]
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Form Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
              <QuoteForm insuranceType={insuranceType} subType={subType} />
            </div>
          </div>

          {/* Benefits Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{benefitsTitle}</h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="text-[#00EEFD] w-6 h-6">{benefit.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-900">{benefit.title}</h3>
                      <p className="mt-1 text-sm sm:text-base text-gray-500">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
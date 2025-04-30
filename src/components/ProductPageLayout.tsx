'use client';

import React, { ReactNode } from 'react';
import TrustIndicators from './TrustIndicators';
import { ShieldCheckIcon, ClockIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/outline';

interface ProductPageLayoutProps {
  productType: 'auto' | 'home' | 'life' | 'health';
  subType?: string;
  setSubType?: (subType: any) => void;
  children: ReactNode;
}

const productIcons = {
  auto: ShieldCheckIcon,
  home: ShieldCheckIcon,
  life: StarIcon,
  health: ClockIcon,
};

const productDescriptions = {
  auto: 'Find the perfect auto insurance coverage tailored to your needs and budget.',
  home: 'Protect your home with comprehensive coverage from trusted providers.',
  life: 'Secure your family\'s future with the right life insurance policy.',
  health: 'Get the health coverage you need to stay protected and worry-free.',
};

export default function ProductPageLayout({
  productType,
  subType,
  setSubType,
  children,
}: ProductPageLayoutProps) {
  const Icon = productIcons[productType];
  const productName = productType.charAt(0).toUpperCase() + productType.slice(1);
  const subTypeDisplay = subType ? 
    (subType === 'term' ? 'Term' : 
     subType === 'permanent' ? 'Permanent' : 
     subType === 'std' ? 'Short-Term Disability' : 
     subType === 'supplemental' ? 'Supplemental Health' : 
     subType.charAt(0).toUpperCase() + subType.slice(1)) : 
    productName;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Why Trust QuoteLinker Section */}
      <section className="bg-[#F5F7FA] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#0B0B45] mb-8">
            Why Trust QuoteLinker?
          </h2>
          <TrustIndicators />
        </div>
      </section>

      {/* Two-Column Layout */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Column - Text Content */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-[#0B0B45] mb-4">
                Ready to find your perfect {subTypeDisplay} insurance match?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {productDescriptions[productType]}
              </p>
              
              {/* Product Type Toggle for Life and Health */}
              {(productType === 'life' || productType === 'health') && setSubType && (
                <div className="flex justify-center md:justify-start mb-8">
                  <div className="inline-flex rounded-lg shadow-sm" role="group">
                    {productType === 'life' ? (
                      <>
                        <button
                          type="button"
                          className={`px-6 py-3 text-sm font-bold rounded-l-lg ${
                            subType === 'term'
                              ? 'bg-[#00EEFD] text-white'
                              : 'bg-white text-[#00EEFD] border border-[#00EEFD] hover:bg-[#00EEFD] hover:text-white'
                          }`}
                          onClick={() => setSubType('term')}
                        >
                          Term Life
                        </button>
                        <button
                          type="button"
                          className={`px-6 py-3 text-sm font-bold rounded-r-lg ${
                            subType === 'permanent'
                              ? 'bg-[#00EEFD] text-white'
                              : 'bg-white text-[#00EEFD] border border-[#00EEFD] hover:bg-[#00EEFD] hover:text-white'
                          }`}
                          onClick={() => setSubType('permanent')}
                        >
                          Permanent Life
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className={`px-6 py-3 text-sm font-bold rounded-l-lg ${
                            subType === 'std'
                              ? 'bg-[#00EEFD] text-white'
                              : 'bg-white text-[#00EEFD] border border-[#00EEFD] hover:bg-[#00EEFD] hover:text-white'
                          }`}
                          onClick={() => setSubType('std')}
                        >
                          Short-Term Disability
                        </button>
                        <button
                          type="button"
                          className={`px-6 py-3 text-sm font-bold rounded-r-lg ${
                            subType === 'supplemental'
                              ? 'bg-[#00EEFD] text-white'
                              : 'bg-white text-[#00EEFD] border border-[#00EEFD] hover:bg-[#00EEFD] hover:text-white'
                          }`}
                          onClick={() => setSubType('supplemental')}
                        >
                          Supplemental Health
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
              
              {/* Feature Icons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8">
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-6 w-6 text-[#00EEFD] mr-2" />
                  <span className="text-sm font-medium">Licensed Agents</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-6 w-6 text-[#00EEFD] mr-2" />
                  <span className="text-sm font-medium">Fast Quotes</span>
                </div>
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-6 w-6 text-[#00EEFD] mr-2" />
                  <span className="text-sm font-medium">Best Rates</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-6 w-6 text-[#00EEFD] mr-2" />
                  <span className="text-sm font-medium">Top Carriers</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Quote Form */}
            <div className="flex justify-center md:justify-end pb-8">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
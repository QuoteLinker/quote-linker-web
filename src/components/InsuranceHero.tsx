'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { InsuranceType } from '@/utils/insuranceCopy';

export interface InsuranceHeroProps {
  insuranceType: InsuranceType;
}

// Product titles mapped by insurance type
const productTitles: Record<InsuranceType, string> = {
  AUTO: 'Auto Insurance',
  HOME: 'Home Insurance',
  LIFE_TERM: 'Term Life Insurance',
  LIFE_PERMANENT: 'Permanent Life Insurance',
  HEALTH_SHORT_TERM_DISABILITY: 'Short-Term Disability Insurance',
  HEALTH_SUPPLEMENTAL: 'Supplemental Health Insurance',
  LIFE: 'Life Insurance',
  HEALTH: 'Health Insurance',
  DISABILITY: 'Disability Insurance',
};

// Product subtitles mapped by insurance type
const productSubtitles: Record<InsuranceType, string> = {
  AUTO: 'Find the perfect auto insurance coverage tailored to your needs and budget.',
  HOME: 'Protect your home with comprehensive coverage from trusted providers.',
  LIFE_TERM: 'Secure your family\'s future with the right term life insurance policy.',
  LIFE_PERMANENT: 'Build lifelong protection and wealth with permanent life insurance.',
  HEALTH_SHORT_TERM_DISABILITY: 'Protect your income with short-term disability coverage.',
  HEALTH_SUPPLEMENTAL: 'Get additional health coverage for extra peace of mind.',
  LIFE: 'Protect your loved ones with the right life insurance coverage.',
  HEALTH: 'Find comprehensive health insurance that fits your needs and budget.',
  DISABILITY: 'Protect your income with comprehensive disability coverage.',
};

// Background gradients for each insurance type
const bgGradients: Record<InsuranceType, string> = {
  AUTO: 'from-blue-800 to-blue-900',
  HOME: 'from-emerald-700 to-emerald-900',
  LIFE: 'from-violet-800 to-purple-900',
  HEALTH: 'from-sky-700 to-cyan-900',
  DISABILITY: 'from-indigo-700 to-indigo-900',
  LIFE_TERM: 'from-violet-700 to-violet-900',
  LIFE_PERMANENT: 'from-purple-800 to-purple-950',
  HEALTH_SHORT_TERM_DISABILITY: 'from-teal-700 to-teal-900',
  HEALTH_SUPPLEMENTAL: 'from-cyan-700 to-blue-900',
};

// Hero images for each insurance type
const heroImages: Partial<Record<InsuranceType, string>> = {
  AUTO: '/images/auto-hero-graphic.svg',
  HOME: '/images/home-hero-graphic.svg',
  LIFE: '/images/life-hero-graphic.svg',
  HEALTH: '/images/health-hero-graphic.svg',
  DISABILITY: '/images/disability-hero-graphic.svg',
};

// Button styles for each insurance type
const buttonStyles: Record<InsuranceType, string> = {
  AUTO: 'bg-blue-500 text-white hover:bg-blue-600',
  HOME: 'bg-emerald-500 text-white hover:bg-emerald-600',
  LIFE: 'bg-violet-500 text-white hover:bg-violet-600',
  HEALTH: 'bg-sky-500 text-white hover:bg-sky-600',
  DISABILITY: 'bg-indigo-500 text-white hover:bg-indigo-600',
  LIFE_TERM: 'bg-violet-500 text-white hover:bg-violet-600',
  LIFE_PERMANENT: 'bg-purple-500 text-white hover:bg-purple-600',
  HEALTH_SHORT_TERM_DISABILITY: 'bg-teal-500 text-white hover:bg-teal-600',
  HEALTH_SUPPLEMENTAL: 'bg-cyan-500 text-white hover:bg-cyan-600',
};

// Background pattern image for each insurance type
const bgPatterns: Record<InsuranceType, string> = {
  AUTO: '/hero-pattern.svg',
  HOME: '/hero-pattern.svg',
  LIFE: '/hero-pattern.svg',
  HEALTH: '/hero-pattern.svg',
  DISABILITY: '/hero-pattern.svg',
  LIFE_TERM: '/hero-pattern.svg',
  LIFE_PERMANENT: '/hero-pattern.svg',
  HEALTH_SHORT_TERM_DISABILITY: '/hero-pattern.svg',
  HEALTH_SUPPLEMENTAL: '/hero-pattern.svg',
};

export default function InsuranceHero({ insuranceType }: InsuranceHeroProps) {
  if (!insuranceType || !productTitles[insuranceType]) {
    console.error('InsuranceHero: Invalid or missing insuranceType:', insuranceType);
    return (
      <div className="bg-gradient-to-b from-[#0B0B45] to-[#1A1A6C] text-white py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Insurance Product Not Found</h1>
        <p className="text-lg">Sorry, we couldn't load the hero section for this insurance type.</p>
      </div>
    );
  }

  const title = productTitles[insuranceType];
  const subtitle = productSubtitles[insuranceType];
  const gradient = bgGradients[insuranceType];
  const buttonStyle = buttonStyles[insuranceType];
  const patternImg = bgPatterns[insuranceType];
  const heroImage = heroImages[insuranceType];

  const scrollToForm = () => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Define custom styles
  const styles = {
    shadowText: {
      textShadow: '0 2px 4px rgba(0,0,0,0.2)'
    }
  };

  return (
    <div className={`relative bg-gradient-to-b ${gradient} text-white pt-28 md:pt-36 lg:pt-44 pb-16 overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: `url(${patternImg})`, backgroundSize: 'cover' }}></div>
      
      {/* Background circles/shapes for visual interest */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32"></div>
      <div className="absolute bottom-0 left-1/5 w-96 h-96 bg-white opacity-5 rounded-full -mb-48"></div>
      
      {/* Hero image */}
      {heroImage && (
        <div className="absolute inset-0 opacity-20">
          <Image src={heroImage} alt="" layout="fill" objectFit="cover" priority className="z-0" />
        </div>
      )}
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight shadow-text">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto">
            {subtitle}
          </p>
          <div className="flex justify-center w-full">
            <button
              onClick={scrollToForm}
              className={`inline-flex items-center justify-center px-8 py-4 ${buttonStyle} rounded-lg font-extrabold text-lg md:text-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-opacity-50 transition-colors duration-200 w-full max-w-xs mx-auto mb-4 md:mb-0`}
              aria-label="Get My Free Quote"
            >
              Get My Free Quote
              <ArrowDownIcon className="ml-2 h-5 w-5" />
            </button>
          </div>
          
          {/* Optional hero image */}
          {heroImages[insuranceType] && (
            <div className="mt-8 max-w-md mx-auto">
              <Image 
                src={heroImages[insuranceType] || ''}
                alt={`${title} illustration`}
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          )}
          
          {/* Optional decorative elements for premium look */}
          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

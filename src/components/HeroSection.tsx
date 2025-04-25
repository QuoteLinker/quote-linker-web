import React from 'react';
import { ShieldCheckIcon, StarIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { InsuranceType } from '@/utils/insuranceCopy';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  insuranceType: InsuranceType;
}

export default function HeroSection({ title, subtitle, ctaText, ctaLink, insuranceType }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-r from-brand-primary to-brand-primary-dark overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-5" />
      
      {/* Content container */}
      <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white opacity-90 mb-6 sm:mb-8 px-4">
            {subtitle}
          </p>
          
          {/* CTA Button */}
          <a
            href={ctaLink}
            className="inline-flex items-center justify-center bg-white text-brand-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 font-semibold text-base sm:text-lg"
          >
            {ctaText}
          </a>

          {/* Trust indicators */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <ShieldCheckIcon className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              <span className="text-white text-sm sm:text-base font-medium">Licensed Agents</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <StarIcon className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              <span className="text-white text-sm sm:text-base font-medium">5-Star Service</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <UserGroupIcon className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              <span className="text-white text-sm sm:text-base font-medium">10K+ Customers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
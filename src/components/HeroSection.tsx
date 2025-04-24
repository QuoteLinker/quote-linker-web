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
    <section className="bg-gradient-to-r from-[#00e8ff] to-[#00cce6] py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-6">{title}</h1>
          <p className="text-xl text-white opacity-90 mb-8">{subtitle}</p>
          <a
            href={ctaLink}
            className="inline-flex bg-white text-[#00e8ff] px-8 py-4 rounded-xl shadow-brand hover:shadow-2xl transition-all duration-200 transform hover:scale-105 font-semibold"
          >
            {ctaText}
          </a>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <ShieldCheckIcon className="w-12 h-12 text-white mb-3" />
              <span className="text-white text-sm font-medium">Licensed Agents</span>
            </div>
            <div className="flex flex-col items-center">
              <StarIcon className="w-12 h-12 text-white mb-3" />
              <span className="text-white text-sm font-medium">5-Star Service</span>
            </div>
            <div className="flex flex-col items-center">
              <UserGroupIcon className="w-12 h-12 text-white mb-3" />
              <span className="text-white text-sm font-medium">10K+ Customers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
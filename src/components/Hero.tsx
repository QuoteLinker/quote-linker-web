'use client';

import React from 'react';
import { ArrowRightIcon, HomeIcon, LifebuoyIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/outline';
import { InsuranceType, getProductContent } from '@/utils/insuranceCopy';
import Image from 'next/image';
import Link from 'next/link';

export interface HeroProps {
  insuranceType: InsuranceType;
}

const insuranceTypeMap: Record<InsuranceType, string> = {
  AUTO: 'auto',
  HOME: 'home',
  LIFE: 'life',
  HEALTH: 'health',
  DISABILITY: 'disability',
  LIFE_TERM: 'term-life',
  LIFE_PERMANENT: 'permanent-life',
  HEALTH_SHORT_TERM_DISABILITY: 'short-term-disability',
  HEALTH_SUPPLEMENTAL: 'supplemental-health',
};

const heroIcons: Record<InsuranceType, React.ElementType> = {
  AUTO: TruckIcon,
  HOME: HomeIcon,
  LIFE: LifebuoyIcon,
  HEALTH: ShieldCheckIcon,
  DISABILITY: ShieldCheckIcon,
  LIFE_TERM: LifebuoyIcon,
  LIFE_PERMANENT: LifebuoyIcon,
  HEALTH_SHORT_TERM_DISABILITY: ShieldCheckIcon,
  HEALTH_SUPPLEMENTAL: ShieldCheckIcon,
};

export default function Hero({ insuranceType }: HeroProps) {
  const content = getProductContent(insuranceType);
  if (!content) {
    console.error('Hero: Invalid or missing insuranceType:', insuranceType);
    return (
      <div className="bg-[#0B0B45] text-white py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Insurance Product Not Found</h1>
        <p className="text-lg">Sorry, we couldn't load the hero section for this insurance type.</p>
      </div>
    );
  }
  const { title, subtitle } = content;
  const HeroIcon = heroIcons[insuranceType];
  const quoteUrl = `/quote?product=${insuranceType}`;

  return (
    <div className="relative bg-[#0B0B45] text-white pt-32 md:pt-44 pb-16">
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              {subtitle}
            </p>
            <div className="flex justify-center md:justify-start w-full">
              <Link
                href={quoteUrl}
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-extrabold text-lg md:text-xl shadow-lg transition-colors duration-200 w-full max-w-xs mx-auto md:mx-0 bg-[#00EEFD] text-black hover:bg-[#00D4E5] focus:ring-4 focus:ring-[#00EEFD]/50"
                aria-label="Get My Free Quote"
              >
                Get My Free Quote
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <HeroIcon className="w-64 h-64 text-white opacity-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
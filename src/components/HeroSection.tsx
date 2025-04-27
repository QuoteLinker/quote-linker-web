'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface IconItem {
  icon: ReactNode;
  label?: string;
  text?: string;
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  iconItems: IconItem[];
}

export default function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  iconItems,
}: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl md:text-2xl mb-8">{subtitle}</p>
          
          <Link
            href={ctaLink}
            className="inline-block bg-[#00EEFD] text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            {ctaText}
          </Link>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {iconItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-[#00EEFD] mb-2">{item.icon}</div>
                <span className="text-sm font-medium">{item.text || item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
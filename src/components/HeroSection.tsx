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
  bgColor?: string;
}

export default function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  bgColor = 'bg-[#00EEFD]'
}: HeroSectionProps) {
  return (
    <section className={`${bgColor} py-12 md:py-16`}>
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8">
          {subtitle}
        </p>
        <Link
          href={ctaLink}
          className="inline-block bg-[#00EEFD] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#00D4E5] transition-all"
          aria-label={ctaText}
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
} 
import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref?: string;
  ctaLink?: string;
  insuranceType?: string;
}

export default function HeroSection({ 
  title, 
  subtitle, 
  ctaText, 
  ctaHref, 
  ctaLink,
  insuranceType 
}: HeroSectionProps) {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <div className="bg-white rounded-xl shadow-md p-12 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#0A0A0A] leading-tight">
            {title}
          </h1>
          <p className="text-lg text-[#1A1A1A] opacity-80 mt-4 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="mt-8">
            <a
              href={ctaLink || ctaHref || "#quote-form"}
              className="inline-block bg-[#00F6FF] text-black text-lg font-semibold px-8 py-4 rounded-xl hover:bg-[#4DF9FF] transform hover:scale-105 transition-all duration-200 shadow-[0_4px_16px_rgba(0,246,255,0.25)] w-full sm:w-auto"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 
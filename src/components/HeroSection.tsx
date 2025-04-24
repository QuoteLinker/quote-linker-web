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
    <section className="relative min-h-screen bg-gradient-to-b from-[#F9FBFC] to-white flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5"></div>
      <div className="container relative mx-auto px-6 py-32">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-[#0A0A0A] leading-tight">
            {title}
          </h1>
          <p className="text-xl text-[#1A1A1A] opacity-80 mt-6 max-w-xl mx-auto">
            {subtitle}
          </p>
          <div className="mt-10">
            <a
              href={ctaLink || ctaHref || "#quote-form"}
              className="inline-flex items-center justify-center bg-[#00F6FF] text-black font-semibold px-8 py-4 rounded-xl shadow-[0_8px_16px_rgba(0,246,255,0.25)] hover:bg-[#4DF9FF] transform hover:scale-105 transition-all duration-200 group"
            >
              {ctaText}
              <svg 
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 
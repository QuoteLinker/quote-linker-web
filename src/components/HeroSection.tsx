import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref?: string;
  insuranceType?: string;
}

export default function HeroSection({ 
  title, 
  subtitle, 
  ctaText, 
  ctaHref,
  insuranceType 
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-brand-background to-brand-card flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5"></div>
      <div className="container mx-auto px-6 py-32">
        <div className="bg-brand-card rounded-xl shadow-brand py-24 px-6 max-w-2xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-brand-headline leading-tight">
            {title}
          </h1>
          <p className="text-xl text-brand-body opacity-80 mt-4">
            {subtitle}
          </p>
          <div className="mt-8">
            <a
              href={ctaHref || "#quote-form"}
              className="inline-block w-full sm:w-auto bg-brand-primary text-black font-semibold px-8 py-4 rounded-xl shadow-brand hover:bg-brand-secondary transform hover:scale-105 transition-all duration-200 group"
            >
              {ctaText}
              <svg 
                className="inline-block w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
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
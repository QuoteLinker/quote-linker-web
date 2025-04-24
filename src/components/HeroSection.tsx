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
        <div className="bg-brand-card rounded-xl shadow-brand py-24 px-6 max-w-3xl mx-auto text-center">
          <h1 className="text-6xl sm:text-7xl font-bold text-brand-headline leading-tight">
            {title}
          </h1>
          <p className="text-xl text-brand-body opacity-80 mt-6 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="mt-8">
            <a
              href={ctaLink || ctaHref || "#quote-form"}
              className="inline-flex w-full sm:w-auto bg-brand-primary text-black font-semibold px-8 py-4 rounded-xl shadow-brand hover:bg-brand-secondary transition-all duration-200 transform hover:scale-105 items-center justify-center group"
            >
              {ctaText}
              <svg 
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
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
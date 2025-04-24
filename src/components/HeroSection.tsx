import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink?: string;
}

export default function HeroSection({ title, subtitle, ctaText, ctaLink }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-r from-brand-primary to-brand-secondary py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-brand-primary/20 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-secondary/20 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container relative mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
          {title}
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
          {subtitle}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={ctaLink || "#quote-form"}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl shadow-brand bg-white text-brand-primary hover:bg-white/90 transition-all duration-200 transform hover:scale-105"
          >
            {ctaText}
            <svg 
              className="ml-2 -mr-1 w-5 h-5" 
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
    </section>
  );
} 
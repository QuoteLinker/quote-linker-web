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
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="bg-brand-card rounded-2xl shadow-brand p-6 sm:p-12 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-headline leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-brand-body mt-4 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="mt-8">
            <a
              href={ctaLink || ctaHref || "#quote-form"}
              className="inline-flex items-center justify-center bg-brand-primary text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-brand-secondary transform hover:scale-105 transition-all duration-200 shadow-brand w-full sm:w-auto"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 
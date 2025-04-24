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
        <div className="bg-brand-card rounded-xl shadow-brand p-12 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-headline leading-tight">
            {title}
          </h1>
          <p className="text-lg text-brand-body opacity-80 mt-4 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="mt-8">
            <a
              href={ctaLink || ctaHref || "#quote-form"}
              className="inline-block bg-brand-primary text-black text-lg font-semibold px-8 py-4 rounded-xl hover:bg-brand-secondary transform hover:scale-105 transition-all duration-200 shadow-brand w-full sm:w-auto"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 
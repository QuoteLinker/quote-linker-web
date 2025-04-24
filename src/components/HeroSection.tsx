import Link from 'next/link';
import { InsuranceType } from '@/utils/insuranceCopy';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  insuranceType?: string;
  className?: string;
}

export default function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  insuranceType,
  className = '',
}: HeroSectionProps) {
  return (
    <div className={`relative bg-brand-background py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-brand-card rounded-xl shadow-brand p-8 sm:p-12 lg:p-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center lg:text-left lg:col-span-7">
              <h1 className="text-4xl tracking-tight font-bold text-brand-headline sm:text-5xl md:text-6xl">
                <span className="block">
                  {title}
                </span>
                <span className="block mt-3 text-3xl sm:text-4xl md:text-5xl text-brand-body opacity-80">
                  {subtitle}
                </span>
              </h1>
              <p className="mt-3 text-lg text-brand-body opacity-70 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Get personalized quotes from licensed local agents—faster, easier, and tailored to you
              </p>
              <div className="mt-8 sm:mt-12">
                <a
                  href={ctaLink}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl text-brand-headline bg-brand-primary hover:bg-brand-secondary transform hover:scale-105 transition-all duration-200 shadow-brand hover:shadow-brand-lg sm:text-lg"
                >
                  {ctaText}
                </a>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-5 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-brand overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
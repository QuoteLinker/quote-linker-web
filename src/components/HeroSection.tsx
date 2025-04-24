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
    <div className={`relative bg-white overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                <span className="block text-brand-primary drop-shadow-glow">
                  {title}
                </span>
                <span className="block text-gray-600 mt-3 text-3xl sm:text-4xl md:text-5xl">
                  {subtitle}
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Get personalized quotes from licensed local agents—faster, easier, and tailored to you
              </p>
              <div className="mt-8 sm:mt-10">
                <a
                  href={ctaLink}
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl text-white bg-brand-primary hover:bg-brand-dark transition-all duration-200 shadow-glow hover:shadow-glow-lg md:text-lg md:px-10"
                >
                  {ctaText}
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-br from-brand-glow to-transparent"></div>
      </div>
    </div>
  );
} 
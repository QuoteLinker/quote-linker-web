'use client';

import Link from 'next/link';
import { 
  ShieldCheckIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

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
  bgColor = 'bg-gradient-to-br from-electric-blue to-primary-600',
}: HeroSectionProps) {
  return (
    <section className={`${bgColor} py-16 md:py-24 overflow-hidden`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Turn Old Leads Into New Premium
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
              Connect with qualified insurance leads and grow your business with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href={ctaLink}
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-lg font-bold text-electric-blue shadow-brand hover:bg-white/90 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-electric-blue"
                aria-label={ctaText}
              >
                {ctaText}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/agent"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/20 bg-transparent px-8 py-3 text-lg font-semibold text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-electric-blue"
              >
                For Agents
              </Link>
            </div>
          </div>

          {/* Right Column: Feature Icons */}
          <div className="grid grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <ShieldCheckIcon className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Trusted Platform</h3>
              <p className="text-white/80">Verified agents and secure lead management</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <UserGroupIcon className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Qualified Leads</h3>
              <p className="text-white/80">Pre-screened prospects ready to convert</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <ChartBarIcon className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Growth Analytics</h3>
              <p className="text-white/80">Track performance and optimize ROI</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <ShieldCheckIcon className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
              <p className="text-white/80">Smart matching and automated workflows</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

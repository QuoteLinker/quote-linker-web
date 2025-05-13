'use client';

import Link from 'next/link';
import { FaShieldAlt, FaUserTie, FaCar, FaHome, FaHeartbeat } from 'react-icons/fa';

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
  bgColor = 'bg-[#00EEFD]',
}: HeroSectionProps) {
  return (
    <section className={`${bgColor} py-16 md:py-24`}>
      <div className="container mx-auto px-4 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          Insurance Quotes You Can Trust
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
          Get matched with real, licensed agents—no robocalls, no spam. Powered by AI, built for trust.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex flex-col items-center">
            <FaCar className="w-10 h-10 text-white bg-[#007BFF] rounded-full p-2 mb-2 shadow-md" />
            <span className="text-white text-sm font-medium">Auto</span>
          </div>
          <div className="flex flex-col items-center">
            <FaHome className="w-10 h-10 text-white bg-[#28A745] rounded-full p-2 mb-2 shadow-md" />
            <span className="text-white text-sm font-medium">Home</span>
          </div>
          <div className="flex flex-col items-center">
            <FaShieldAlt className="w-10 h-10 text-white bg-[#FFC107] rounded-full p-2 mb-2 shadow-md" />
            <span className="text-white text-sm font-medium">Life</span>
          </div>
          <div className="flex flex-col items-center">
            <FaHeartbeat className="w-10 h-10 text-white bg-[#E83E8C] rounded-full p-2 mb-2 shadow-md" />
            <span className="text-white text-sm font-medium">Disability</span>
          </div>
        </div>
        <Link
          href={ctaLink}
          className="inline-block bg-[#007BFF] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#0056b3] transition-all focus:ring-4 focus:ring-white focus:ring-offset-2"
          aria-label={ctaText}
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}

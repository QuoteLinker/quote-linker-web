'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-50 transform transition-transform duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:block">
          <p className="text-lg font-semibold text-gray-900">Ready to save on your insurance?</p>
          <p className="text-sm text-gray-600">Get your free quote in minutes!</p>
        </div>
        <button
          onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full md:w-auto px-6 py-3 bg-[#00ECFF] hover:bg-[#00D4E5] text-gray-900 font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Get Your Quote</span>
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
} 
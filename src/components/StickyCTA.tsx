'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { trackNavClick } from '@/utils/gtm';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const quoteForm = document.getElementById('quote-form');
      if (!quoteForm) return;

      const rect = quoteForm.getBoundingClientRect();
      const isFormVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      setIsVisible(!isFormVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
      trackNavClick('Sticky CTA', '#quote-form');
      quoteForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } md:hidden z-50`}
    >
      <div className="container mx-auto px-4 py-3">
        <button
          onClick={handleClick}
          className="w-full bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          Get Your Quote
        </button>
      </div>
    </div>
  );
} 
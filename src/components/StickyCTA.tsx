'use client';

import React, { useState, useEffect } from 'react';

interface StickyCTAProps {
  ctaText: string;
}

export default function StickyCTA({ ctaText }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const formElement = document.getElementById('quote-form');
      if (!formElement) return;

      const formRect = formElement.getBoundingClientRect();
      const isFormInView = formRect.top <= window.innerHeight;
      
      // Show the CTA when we've scrolled past the hero (approximately 100px)
      // and hide it when the form is in view
      setIsVisible(window.scrollY > 100 && !isFormInView);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg transform transition-transform duration-300 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">Ready to get started?</h3>
          <p className="text-sm text-gray-600">Get your free quote in minutes</p>
        </div>
        <button
          onClick={scrollToForm}
          className="ml-4 px-6 py-3 bg-[#00EEFD] text-white rounded-lg font-medium hover:bg-[#00D4E5] transition-colors duration-200"
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
} 
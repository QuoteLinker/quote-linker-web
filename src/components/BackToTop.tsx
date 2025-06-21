'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Check if the user has scrolled down 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-[60px] right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-all duration-300 hover:bg-[#00D4E5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          aria-label="Back to top"
        >
          <ChevronUpIcon className="h-6 w-6" />
        </button>
      )}
    </>
  );
} 
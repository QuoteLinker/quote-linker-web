'use client';

import React from 'react';
import Link from 'next/link';

export default function StickyCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <a
        href="#quote-form"
        className="block bg-brand-primary p-4 text-center text-black font-semibold shadow-lg"
      >
        Get Your Free Quote
      </a>
    </div>
  );
} 
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/auto" className="text-brand-body hover:text-brand-primary transition-colors">
              Auto Insurance
            </Link>
            <Link href="/home" className="text-brand-body hover:text-brand-primary transition-colors">
              Home Insurance
            </Link>
            <Link href="/life" className="text-brand-body hover:text-brand-primary transition-colors">
              Life Insurance
            </Link>
            <Link href="/disability" className="text-brand-body hover:text-brand-primary transition-colors">
              Disability Insurance
            </Link>
          </div>

          <Link
            href="#quote-form"
            className="hidden md:inline-block bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-primary-dark transition-colors"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/auto" className="text-brand-body hover:text-brand-primary transition-colors">
                Auto Insurance
              </Link>
              <Link href="/home" className="text-brand-body hover:text-brand-primary transition-colors">
                Home Insurance
              </Link>
              <Link href="/life" className="text-brand-body hover:text-brand-primary transition-colors">
                Life Insurance
              </Link>
              <Link href="/disability" className="text-brand-body hover:text-brand-primary transition-colors">
                Disability Insurance
              </Link>
              <Link
                href="#quote-form"
                className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-primary-dark transition-colors text-center"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 
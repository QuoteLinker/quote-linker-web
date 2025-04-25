'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { trackNavClick } from '@/utils/gtm';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleNavClick = (text: string, path: string) => {
    trackNavClick(text, path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-3" aria-label="Main navigation">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center"
            onClick={() => handleNavClick('Logo', '/')}
            aria-label="QuoteLinker Home"
          >
            <Logo showText={false} className="md:hidden" />
            <Logo showText={true} className="hidden md:flex" />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
          <div className="hidden md:flex space-x-6" role="navigation">
            <Link 
              href="/auto" 
              className={`text-brand-body hover:text-brand-primary transition-colors ${pathname === '/auto' ? 'text-brand-primary font-medium' : ''}`}
              onClick={() => handleNavClick('Auto Insurance', '/auto')}
            >
              Auto Insurance
            </Link>
            <Link 
              href="/home"
              className={`text-brand-body hover:text-brand-primary transition-colors ${pathname === '/home' ? 'text-brand-primary font-medium' : ''}`}
              onClick={() => handleNavClick('Home Insurance', '/home')}
            >
              Home Insurance
            </Link>
            <Link 
              href="/life"
              className={`text-brand-body hover:text-brand-primary transition-colors ${pathname === '/life' ? 'text-brand-primary font-medium' : ''}`}
              onClick={() => handleNavClick('Life Insurance', '/life')}
            >
              Life Insurance
            </Link>
            <Link 
              href="/disability"
              className={`text-brand-body hover:text-brand-primary transition-colors ${pathname === '/disability' ? 'text-brand-primary font-medium' : ''}`}
              onClick={() => handleNavClick('Disability Insurance', '/disability')}
            >
              Disability Insurance
            </Link>
          </div>

          <Link
            href="#quote-form"
            className="hidden md:inline-block bg-brand-primary text-white px-5 py-2 rounded-lg hover:bg-brand-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            onClick={() => handleNavClick('Get a Quote', '#quote-form')}
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile navigation */}
        <div
          id="mobile-menu"
          className={`transform transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen
              ? 'max-h-96 opacity-100 mt-3 pb-3 border-t border-gray-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
          role="navigation"
        >
          <div className="flex flex-col space-y-3 pt-3">
            <Link 
              href="/auto"
              className={`text-brand-body hover:text-brand-primary active:text-brand-primary-dark transition-colors ${
                pathname === '/auto' ? 'text-brand-primary font-medium' : ''
              }`}
              onClick={() => handleNavClick('Auto Insurance', '/auto')}
            >
              Auto Insurance
            </Link>
            <Link 
              href="/home"
              className={`text-brand-body hover:text-brand-primary active:text-brand-primary-dark transition-colors ${
                pathname === '/home' ? 'text-brand-primary font-medium' : ''
              }`}
              onClick={() => handleNavClick('Home Insurance', '/home')}
            >
              Home Insurance
            </Link>
            <Link 
              href="/life"
              className={`text-brand-body hover:text-brand-primary active:text-brand-primary-dark transition-colors ${
                pathname === '/life' ? 'text-brand-primary font-medium' : ''
              }`}
              onClick={() => handleNavClick('Life Insurance', '/life')}
            >
              Life Insurance
            </Link>
            <Link 
              href="/disability"
              className={`text-brand-body hover:text-brand-primary active:text-brand-primary-dark transition-colors ${
                pathname === '/disability' ? 'text-brand-primary font-medium' : ''
              }`}
              onClick={() => handleNavClick('Disability Insurance', '/disability')}
            >
              Disability Insurance
            </Link>
            <Link
              href="#quote-form"
              className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary-dark active:bg-brand-primary-darker transition-colors text-center focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
              onClick={() => handleNavClick('Get a Quote', '#quote-form')}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 
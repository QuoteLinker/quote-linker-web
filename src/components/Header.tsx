'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import { trackNavClick } from '@/utils/gtm';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Agent', href: '/agent' },
    { name: 'Education', href: '/education' },
  ];

  const handleNavClick = (text: string, path: string) => {
    trackNavClick(text, path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center gap-2 transform transition-transform hover:scale-105 duration-200 focus:outline-none focus:ring-2 focus:ring-electric-blue rounded"
              onClick={() => handleNavClick('Logo', '/')}
              aria-label="QuoteLinker Home"
            >
              <Logo showText={true} className="h-8 w-auto" />
            </Link>
          </div>

          {/* Center: Nav links */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-900 hover:text-electric-blue transition-all duration-200 text-base font-semibold hover:scale-105 transform px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-electric-blue"
                onClick={() => handleNavClick(item.name, item.href)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right: CTA */}
          <div className="flex items-center gap-x-4">
            <Link
              href="/quote"
              className="hidden md:inline-flex items-center justify-center rounded-lg bg-electric-blue px-6 py-2.5 text-base font-bold text-white shadow-brand hover:bg-electric-blue/90 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 transition-all duration-200 whitespace-nowrap"
              onClick={() => handleNavClick('Get a Quote', '/quote')}
              style={{ minHeight: '44px' }}
            >
              Get a Quote
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-electric-blue hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-blue md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">
                {mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-electric-blue"
                  onClick={() => handleNavClick(item.name, item.href)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/quote"
                className="mt-4 block w-full rounded-lg bg-electric-blue px-4 py-2.5 text-center text-base font-bold text-white shadow-brand hover:bg-electric-blue/90"
                onClick={() => handleNavClick('Get a Quote', '/quote')}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        )}
      </header>
      {/* Add padding to account for fixed header */}
      <div className="h-16" />
    </>
  );
} 
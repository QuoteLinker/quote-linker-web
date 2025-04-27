'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import { trackNavClick } from '@/utils/gtm';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const insuranceTypes = [
    { name: 'Auto Insurance', href: '/auto' },
    { name: 'Home Insurance', href: '/home' },
    { name: 'Life Insurance', href: '/life' },
    { name: 'Health Insurance', href: '/health' },
  ];

  const handleNavClick = (text: string, path: string) => {
    trackNavClick(text, path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="block transform transition-transform hover:scale-105 duration-200" 
                onClick={() => handleNavClick('Logo', '/')}
              >
                <Logo showText={true} className="h-8 w-auto" />
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-x-6">
              {/* Insurance Types - More Prominent */}
              {insuranceTypes.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-900 hover:text-[#00ECFF] transition-all duration-200 text-base font-medium hover:scale-105 transform"
                  onClick={() => handleNavClick(item.name, item.href)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-5 w-px bg-gray-200" />
              {/* About and Contact - Less Prominent */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-[#00ECFF] transition-all duration-200 text-sm hover:scale-105 transform"
                  onClick={() => handleNavClick(item.name, item.href)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-5 w-px bg-gray-200 ml-6" />
              <Link
                href="/life"
                className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-[#00ECFF] hover:bg-[#00D4E5] transition-all duration-200 hover:scale-105 transform shadow-sm hover:shadow-md"
                onClick={() => handleNavClick('Get a Quote', '/life')}
              >
                Get My Free Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <Link
                href="/life"
                className="mr-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-[#00ECFF] hover:bg-[#00D4E5] transition-all duration-200 hover:scale-105 transform shadow-sm hover:shadow-md"
                onClick={() => handleNavClick('Get a Quote', '/life')}
              >
                Get Quote
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-[#00ECFF] hover:bg-gray-100 transition-all duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div 
            className={`lg:hidden fixed left-0 right-0 bg-white/95 backdrop-blur-sm transition-all duration-300 z-50 ${
              mobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
            }`}
            style={{
              top: '64px', // Height of the header
              maxHeight: 'calc(100vh - 64px)',
              overflowY: 'auto',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col space-y-2">
              {/* Insurance Types First */}
              {insuranceTypes.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-lg text-gray-900 hover:text-[#00ECFF] hover:bg-gray-100 transition-all duration-200 font-medium"
                  onClick={() => handleNavClick(item.name, item.href)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-px bg-gray-200 my-2" />
              {/* About and Contact Last */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-lg text-gray-500 hover:text-[#00ECFF] hover:bg-gray-100 transition-all duration-200"
                  onClick={() => handleNavClick(item.name, item.href)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>
      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-[64px]" />
    </>
  );
} 
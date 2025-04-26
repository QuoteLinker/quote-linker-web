'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import { trackNavClick } from '@/utils/gtm';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
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
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block" onClick={() => handleNavClick('Logo', '/')}>
                <Logo showText={!mobileMenuOpen} className="h-8 w-auto" />
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#00ECFF] transition-colors duration-200 text-sm font-medium"
                  onClick={() => handleNavClick(item.name, item.href)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-5 w-px bg-gray-200" />
              {insuranceTypes.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#00ECFF] transition-colors duration-200 text-sm font-medium"
                  onClick={() => handleNavClick(item.name, item.href)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-[#00ECFF] hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pb-3 border-t border-gray-200">
              <div className="flex flex-col space-y-2 pt-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:text-[#00ECFF] hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => handleNavClick(item.name, item.href)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="h-px bg-gray-200 my-2" />
                {insuranceTypes.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:text-[#00ECFF] hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => handleNavClick(item.name, item.href)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-16" /> {/* Adjust height to match header height */}
    </>
  );
} 
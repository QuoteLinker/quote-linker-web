'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import { trackNavClick } from '@/utils/gtm';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lifeDropdownOpen, setLifeDropdownOpen] = useState(false);
  const [healthDropdownOpen, setHealthDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Add timeouts for dropdown menus
  const [lifeTimeout, setLifeTimeout] = useState<NodeJS.Timeout>();
  const [healthTimeout, setHealthTimeout] = useState<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (lifeTimeout) clearTimeout(lifeTimeout);
      if (healthTimeout) clearTimeout(healthTimeout);
    };
  }, [lifeTimeout, healthTimeout]);

  const handleLifeMouseEnter = () => {
    if (lifeTimeout) clearTimeout(lifeTimeout);
    setLifeDropdownOpen(true);
  };

  const handleLifeMouseLeave = () => {
    const timeout = setTimeout(() => {
      setLifeDropdownOpen(false);
    }, 500); // Increased to 500ms
    setLifeTimeout(timeout);
  };

  const handleHealthMouseEnter = () => {
    if (healthTimeout) clearTimeout(healthTimeout);
    setHealthDropdownOpen(true);
  };

  const handleHealthMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHealthDropdownOpen(false);
    }, 500); // Increased to 500ms
    setHealthTimeout(timeout);
  };

  const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const insuranceTypes = [
    { name: 'Auto Insurance', href: '/auto' },
    { name: 'Home Insurance', href: '/home' },
  ];

  const lifeInsuranceTypes = [
    { name: 'Term Life Insurance', href: '/term-life' },
    { name: 'Permanent Life Insurance', href: '/permanent-life' },
  ];

  const healthInsuranceTypes = [
    { name: 'Short-Term Disability', href: '/short-term-disability' },
    { name: 'Supplemental Health', href: '/supplemental-health' },
  ];

  const handleNavClick = (text: string, path: string) => {
    trackNavClick(text, path);
    setMobileMenuOpen(false);
  };

  // Get the current insurance type from the pathname
  const getCurrentInsuranceType = () => {
    const path = pathname.split('/')[1];
    if (path === 'auto' || path === 'home') return path;
    if (path === 'term-life' || path === 'permanent-life') return 'life';
    if (path === 'short-term-disability' || path === 'supplemental-health') return 'health';
    return 'auto'; // default to auto insurance
  };

  const currentInsuranceType = getCurrentInsuranceType();

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
              
              {/* Life Insurance Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center text-gray-900 hover:text-[#00ECFF] transition-all duration-200 text-base font-medium hover:scale-105 transform"
                  onMouseEnter={handleLifeMouseEnter}
                  onMouseLeave={handleLifeMouseLeave}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setLifeDropdownOpen(!lifeDropdownOpen);
                    }
                  }}
                  aria-expanded={lifeDropdownOpen}
                  aria-haspopup="true"
                  tabIndex={0}
                >
                  Life Insurance
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                
                {lifeDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg py-1 z-10"
                    onMouseEnter={handleLifeMouseEnter}
                    onMouseLeave={handleLifeMouseLeave}
                  >
                    {lifeInsuranceTypes.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#00ECFF]"
                        onClick={() => handleNavClick(item.name, item.href)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Health Insurance Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center text-gray-900 hover:text-[#00ECFF] transition-all duration-200 text-base font-medium hover:scale-105 transform"
                  onMouseEnter={handleHealthMouseEnter}
                  onMouseLeave={handleHealthMouseLeave}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setHealthDropdownOpen(!healthDropdownOpen);
                    }
                  }}
                  aria-expanded={healthDropdownOpen}
                  aria-haspopup="true"
                  tabIndex={0}
                >
                  Health Insurance
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                
                {healthDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg py-1 z-10"
                    onMouseEnter={handleHealthMouseEnter}
                    onMouseLeave={handleHealthMouseLeave}
                  >
                    {healthInsuranceTypes.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#00ECFF]"
                        onClick={() => handleNavClick(item.name, item.href)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
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
                href={`/${currentInsuranceType}?quote=true`}
                className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#00EEFD] hover:bg-[#00D4E5] transition-all duration-200 hover:scale-105 transform shadow-sm hover:shadow-md"
                onClick={() => handleNavClick('Get a Quote', `/${currentInsuranceType}`)}
              >
                Get My Free Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <Link
                href={`/${currentInsuranceType}?quote=true`}
                className="mr-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#00EEFD] hover:bg-[#00D4E5] transition-all duration-200 hover:scale-105 transform shadow-sm hover:shadow-md"
                onClick={() => handleNavClick('Get a Quote', `/${currentInsuranceType}`)}
              >
                Get Quote
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-[#00ECFF] hover:bg-gray-100 transition-all duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setMobileMenuOpen(!mobileMenuOpen);
                  }
                }}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
                tabIndex={0}
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

          {/* Mobile menu backdrop */}
          {mobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/30 z-[90] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          {/* Mobile menu */}
          <div 
            className={`lg:hidden fixed left-0 right-0 bg-white/95 backdrop-blur-sm transition-all duration-300 z-[100] ${
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
              
              {/* Life Insurance Mobile */}
              <div className="px-3 py-2">
                <div className="font-medium text-gray-900">Life Insurance</div>
                <div className="mt-1 pl-4 space-y-1">
                  {lifeInsuranceTypes.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-1 text-gray-600 hover:text-[#00ECFF] transition-all duration-200"
                      onClick={() => handleNavClick(item.name, item.href)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Health Insurance Mobile */}
              <div className="px-3 py-2">
                <div className="font-medium text-gray-900">Health Insurance</div>
                <div className="mt-1 pl-4 space-y-1">
                  {healthInsuranceTypes.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-1 text-gray-600 hover:text-[#00ECFF] transition-all duration-200"
                      onClick={() => handleNavClick(item.name, item.href)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
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
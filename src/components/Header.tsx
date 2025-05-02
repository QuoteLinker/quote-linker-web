'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import { trackNavClick } from '@/utils/gtm';

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lifeDropdownOpen, setLifeDropdownOpen] = useState(false);
  const [healthDropdownOpen, setHealthDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Add timeouts for dropdown menus
  const [lifeTimeout, setLifeTimeout] = useState<NodeJS.Timeout>();
  const [healthTimeout, setHealthTimeout] = useState<NodeJS.Timeout>();

  // Close dropdowns when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setLifeDropdownOpen(false);
    setHealthDropdownOpen(false);
  }, [pathname]);

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
    }, 500);
    setLifeTimeout(timeout);
  };

  const handleHealthMouseEnter = () => {
    if (healthTimeout) clearTimeout(healthTimeout);
    setHealthDropdownOpen(true);
  };

  const handleHealthMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHealthDropdownOpen(false);
    }, 500);
    setHealthTimeout(timeout);
  };

  const navigation = [
    { name: 'Education', href: '/education' },
    { name: 'For Agents', href: '/agents' },
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
    // Use router.push for programmatic navigation if needed
    router.push(path);
  };

  // Get the current insurance type from the pathname
  const getCurrentInsuranceType = () => {
    const path = pathname.split('/')[1];
    if (path === 'auto' || path === 'home') return path;
    if (path === 'term-life' || path === 'permanent-life') return 'life';
    if (path === 'short-term-disability' || path === 'supplemental-health') return 'health';
    return 'life'; // default to life insurance
  };

  const currentInsuranceType = getCurrentInsuranceType();

  return (
    <>
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="container max-w-screen-xl mx-auto px-4 py-3" aria-label="Main navigation">
          <div className="relative flex items-center justify-between gap-x-8 w-full">
            {/* Logo left */}
            <div className="flex-shrink-0 flex items-center justify-start w-auto">
              <Link 
                href="/" 
                className="block transform transition-transform hover:scale-105 duration-200" 
                onClick={() => handleNavClick('Logo', '/')}
                aria-label="QuoteLinker Home"
              >
                <Logo showText={true} className="h-8 w-auto" />
              </Link>
            </div>

            {/* Centered nav */}
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-x-8 flex-1">
              <div className="flex items-center gap-x-8">
                {insuranceTypes.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-900 hover:text-electric-blue transition-all duration-200 text-base font-semibold hover:scale-105 transform px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-electric-blue"
                    onClick={() => handleNavClick(item.name, item.href)}
                  >
                    {item.name}
                  </Link>
                ))}
                {/* Life Insurance Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center text-gray-900 hover:text-electric-blue transition-all duration-200 text-base font-semibold hover:scale-105 transform px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-electric-blue"
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
                    <ChevronDownIcon className="h-4 w-4 ml-1" aria-hidden="true" />
                  </button>
                  {lifeDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-card py-1 z-10"
                      onMouseEnter={handleLifeMouseEnter}
                      onMouseLeave={handleLifeMouseLeave}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="life-insurance-menu"
                    >
                      {lifeInsuranceTypes.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-electric-blue rounded"
                          onClick={() => handleNavClick(item.name, item.href)}
                          role="menuitem"
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
                    className="flex items-center text-gray-900 hover:text-electric-blue transition-all duration-200 text-base font-semibold hover:scale-105 transform px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-electric-blue"
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
                    <ChevronDownIcon className="h-4 w-4 ml-1" aria-hidden="true" />
                  </button>
                  {healthDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-card py-1 z-10"
                      onMouseEnter={handleHealthMouseEnter}
                      onMouseLeave={handleHealthMouseLeave}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="health-insurance-menu"
                    >
                      {healthInsuranceTypes.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-electric-blue rounded"
                          onClick={() => handleNavClick(item.name, item.href)}
                          role="menuitem"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="h-5 w-px bg-gray-200 mx-4" />
              <div className="flex items-center gap-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-500 hover:text-electric-blue transition-all duration-200 text-sm font-medium hover:scale-105 transform px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-electric-blue"
                    onClick={() => handleNavClick(item.name, item.href)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA right */}
            <div className="flex items-center justify-end flex-shrink-0 w-auto min-w-[180px]">
              <Link
                href="/life"
                className="rounded-lg bg-electric-blue px-6 py-2.5 text-base font-bold text-white shadow-brand hover:bg-electric-blue/90 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 transition-all duration-200 ml-2 whitespace-nowrap"
                onClick={() => handleNavClick('Get My Free Quote', '/life')}
                style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}
              >
                Get My Free Quote
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-x-4 lg:hidden">
            <Link
              href={`/${currentInsuranceType}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-electric-blue hover:bg-electric-blue/90 transition-all duration-200 transform shadow-brand hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-blue"
              onClick={() => handleNavClick('Get a Quote', `/${currentInsuranceType}`)}
            >
              Get Quote
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-electric-blue hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-blue"
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

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div 
              className="lg:hidden"
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {insuranceTypes.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-electric-blue"
                    onClick={() => handleNavClick(item.name, item.href)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Life Insurance Section */}
                <div className="px-3 py-2">
                  <div className="font-medium text-gray-900 mb-2">Life Insurance</div>
                  {lifeInsuranceTypes.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-electric-blue rounded-md"
                      onClick={() => handleNavClick(item.name, item.href)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                {/* Health Insurance Section */}
                <div className="px-3 py-2">
                  <div className="font-medium text-gray-900 mb-2">Health Insurance</div>
                  {healthInsuranceTypes.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-electric-blue rounded-md"
                      onClick={() => handleNavClick(item.name, item.href)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 my-2" />
                
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base text-gray-500 hover:bg-gray-50 hover:text-electric-blue"
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
      <div className="h-14" />
    </>
  );
} 
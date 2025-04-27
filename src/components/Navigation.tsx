'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { InsuranceDropdown } from './InsuranceDropdown';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Navigation() {
  const [lifeDropdownOpen, setLifeDropdownOpen] = useState(false);
  const [healthDropdownOpen, setHealthDropdownOpen] = useState(false);

  const lifeInsuranceItems = [
    { name: 'Term Life', href: '/term-life' },
    { name: 'Permanent Life', href: '/permanent-life' },
  ];

  const healthInsuranceItems = [
    { name: 'Short-Term Disability', href: '/short-term-disability' },
    { name: 'Supplemental Health', href: '/supplemental-health' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/quotelinker_logo.png"
                alt="QuoteLinker"
                width={180}
                height={40}
                priority
              />
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link 
              href="/auto"
              className="text-gray-700 hover:text-primary-600"
            >
              Auto Insurance
            </Link>
            
            <Link 
              href="/home"
              className="text-gray-700 hover:text-primary-600"
            >
              Home Insurance
            </Link>

            <div className="relative">
              <button
                className="flex items-center text-gray-700 hover:text-[#00EEFD] transition-colors"
                onMouseEnter={() => setLifeDropdownOpen(true)}
                onMouseLeave={() => setLifeDropdownOpen(false)}
              >
                Life Insurance
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
              
              {lifeDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  onMouseEnter={() => setLifeDropdownOpen(true)}
                  onMouseLeave={() => setLifeDropdownOpen(false)}
                >
                  <Link 
                    href="/products/life?subType=term" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Term Life
                  </Link>
                  <Link 
                    href="/products/life?subType=permanent" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Permanent Life
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="flex items-center text-gray-700 hover:text-[#00EEFD] transition-colors"
                onMouseEnter={() => setHealthDropdownOpen(true)}
                onMouseLeave={() => setHealthDropdownOpen(false)}
              >
                Health Insurance
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
              
              {healthDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  onMouseEnter={() => setHealthDropdownOpen(true)}
                  onMouseLeave={() => setHealthDropdownOpen(false)}
                >
                  <Link 
                    href="/products/health?subType=std" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Short-Term Disability
                  </Link>
                  <Link 
                    href="/products/health?subType=supplemental" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Supplemental Health
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/about"
              className="text-gray-700 hover:text-primary-600"
            >
              About
            </Link>

            <Link 
              href="/contact"
              className="text-gray-700 hover:text-primary-600"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 
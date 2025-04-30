'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function Navigation() {
  const [lifeDropdownOpen, setLifeDropdownOpen] = useState(false);
  const [healthDropdownOpen, setHealthDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/quotelinker_logo.png"
                alt="QuoteLinker"
                width={180}
                height={40}
                priority
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
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

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/auto" className="text-gray-700 hover:text-primary-600">
              Auto Insurance
            </Link>

            <Link href="/home" className="text-gray-700 hover:text-primary-600">
              Home Insurance
            </Link>

            <div className="relative">
              <button
                className="flex items-center text-gray-700 hover:text-primary-600"
                onClick={() => setLifeDropdownOpen(!lifeDropdownOpen)}
              >
                Life Insurance
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>

              {lifeDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link
                    href="/term-life"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Term Life
                  </Link>
                  <Link
                    href="/permanent-life"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Permanent Life
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="flex items-center text-gray-700 hover:text-primary-600"
                onClick={() => setHealthDropdownOpen(!healthDropdownOpen)}
              >
                Health Insurance
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>

              {healthDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link
                    href="/short-term-disability"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Short-Term Disability
                  </Link>
                  <Link
                    href="/supplemental-health"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Supplemental Health
                  </Link>
                </div>
              )}
            </div>

            <Link href="/about" className="text-gray-700 hover:text-primary-600">
              About
            </Link>

            <Link href="/contact" className="text-gray-700 hover:text-primary-600">
              Contact
            </Link>

            <Link href="/agents" className="flex items-center text-gray-700 hover:text-primary-600">
              <BriefcaseIcon className="h-5 w-5 mr-1" />
              Agents
            </Link>

            <Link
              href="/education"
              className="flex items-center text-gray-700 hover:text-primary-600"
            >
              <AcademicCapIcon className="h-5 w-5 mr-1" />
              Education
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/auto"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            Auto Insurance
          </Link>
          <Link
            href="/home"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            Home Insurance
          </Link>
          <div className="relative">
            <button
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              onClick={() => setLifeDropdownOpen(!lifeDropdownOpen)}
            >
              <div className="flex items-center justify-between">
                <span>Life Insurance</span>
                <ChevronDownIcon
                  className={`h-4 w-4 transform ${lifeDropdownOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </button>
            {lifeDropdownOpen && (
              <div className="pl-4 space-y-1">
                <Link
                  href="/term-life"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                >
                  Term Life
                </Link>
                <Link
                  href="/permanent-life"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                >
                  Permanent Life
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              onClick={() => setHealthDropdownOpen(!healthDropdownOpen)}
            >
              <div className="flex items-center justify-between">
                <span>Health Insurance</span>
                <ChevronDownIcon
                  className={`h-4 w-4 transform ${healthDropdownOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </button>
            {healthDropdownOpen && (
              <div className="pl-4 space-y-1">
                <Link
                  href="/short-term-disability"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                >
                  Short-Term Disability
                </Link>
                <Link
                  href="/supplemental-health"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                >
                  Supplemental Health
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            Contact
          </Link>
          <Link
            href="/agents"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            <BriefcaseIcon className="h-5 w-5 mr-2" />
            Agents
          </Link>
          <Link
            href="/education"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            <AcademicCapIcon className="h-5 w-5 mr-2" />
            Education
          </Link>
        </div>
      </div>
    </nav>
  );
}

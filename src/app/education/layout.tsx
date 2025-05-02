'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const categories = [
  { name: 'Life Insurance', slug: 'life-insurance' },
  { name: 'Health Insurance', slug: 'health-insurance' },
  { name: 'Auto & Home', slug: 'auto-home' },
];

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky sidebar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Category Menu */}
      <div className="md:hidden sticky top-0 z-30 bg-white border-b border-gray-200">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full px-4 py-3 flex items-center justify-between text-gray-700 hover:bg-gray-50"
        >
          <span className="font-medium">Categories</span>
          <ChevronDownIcon
            className={`h-5 w-5 transform transition-transform duration-200 ${
              isMobileMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        {isMobileMenuOpen && (
          <nav className="border-t border-gray-100">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/education/${category.slug}`}
                className={`block px-4 py-3 text-sm ${
                  pathname === `/education/${category.slug}`
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        )}
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <nav
              className={`${
                isScrolled ? 'sticky top-4 transition-all duration-200' : ''
              }`}
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <h2 className="text-lg font-semibold p-4 border-b border-gray-100">
                  Categories
                </h2>
                <ul className="p-2">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/education/${category.slug}`}
                        className={`block px-4 py-2 rounded-md text-sm transition-colors ${
                          pathname === `/education/${category.slug}`
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Script from 'next/script';

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
    <>
      <Script
        id="education-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': 'https://www.quotelinker.com/education#webpage',
            name: 'Insurance Education Hub',
            description: 'Learn everything you need to know about insurance coverage. Compare products, understand policy types, and make informed decisions.',
            isPartOf: {
              '@type': 'WebSite',
              '@id': 'https://www.quotelinker.com/#website',
              name: 'QuoteLinker',
              url: 'https://www.quotelinker.com'
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  item: {
                    '@id': 'https://www.quotelinker.com',
                    name: 'Home'
                  }
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  item: {
                    '@id': 'https://www.quotelinker.com/education',
                    name: 'Education'
                  }
                }
              ]
            }
          })
        }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Category Menu */}
        <div className="md:hidden sticky top-0 z-30 bg-white shadow-sm">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full px-4 py-3 flex items-center justify-between text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-categories"
          >
            <span className="font-medium">Categories</span>
            <ChevronDownIcon
              className={`h-5 w-5 transform transition-transform duration-200 ${
                isMobileMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          {isMobileMenuOpen && (
            <nav id="mobile-categories" className="border-t border-gray-100">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/education/${category.slug}`}
                  className={`block px-4 py-3 text-sm transition-colors ${
                    pathname === `/education/${category.slug}`
                      ? 'bg-blue-50 text-electric-blue font-medium'
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

        <div className="container max-w-screen-xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <nav
                className={`transition-all duration-200 ${
                  isScrolled ? 'sticky top-4' : ''
                }`}
                aria-label="Categories"
              >
                <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover border border-gray-100 overflow-hidden">
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
                              ? 'bg-blue-50 text-electric-blue font-medium'
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
    </>
  );
} 
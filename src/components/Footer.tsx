'use client';

import React, { SVGProps } from 'react';
import Link from 'next/link';

const navigation = {
  products: [
    { name: 'Auto Insurance', href: '/auto' },
    { name: 'Home Insurance', href: '/home' },
    { name: 'Life Insurance', href: '/life' },
    { name: 'Disability Insurance', href: '/disability' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'For Agents', href: '/agents' },
  ],
  resources: [
    { name: 'Education Hub', href: '/education' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQs', href: '/faqs' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
};

const socialLinks = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@quotelinker',
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/quotelinker',
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-cool-gray border-t border-gray-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container max-w-screen-xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-dark-gray">Products</h3>
            <ul role="list" className="mt-4 space-y-3">
              {navigation.products.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-muted-foreground hover:text-electric-blue transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-dark-gray">Company</h3>
            <ul role="list" className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-muted-foreground hover:text-electric-blue transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-dark-gray">Resources</h3>
            <ul role="list" className="mt-4 space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-muted-foreground hover:text-electric-blue transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-dark-gray">Support</h3>
            <ul role="list" className="mt-4 space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-muted-foreground hover:text-electric-blue transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <a 
                  href="mailto:support@quotelinker.com" 
                  className="text-sm text-muted-foreground hover:text-electric-blue transition-colors"
                >
                  support@quotelinker.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex flex-col items-center space-y-2 md:items-start">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} QuoteLinker LLC. All rights reserved.
              </p>
              <div className="flex flex-col items-center md:items-start space-y-1">
                <p className="text-sm text-muted-foreground">
                  400 S 4th St Ste 410 PMB 629080
                </p>
                <p className="text-sm text-muted-foreground">
                  Minneapolis, MN 55415
                </p>
              </div>
            </div>
            <div className="flex space-x-6">
              {socialLinks.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-electric-blue transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                >
                  <item.icon className="h-6 w-6 hover:opacity-80" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

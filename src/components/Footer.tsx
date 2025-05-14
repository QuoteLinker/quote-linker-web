'use client';

import React from 'react';
import Link from 'next/link';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const navigation = {
  quickLinks: [
    { name: 'Home', href: '/' },
    { name: 'Agent', href: '/agent' },
    { name: 'Education', href: '/education' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  social: [
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@quotelinker',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/quotelinker',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-cool-gray border-t border-gray-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-dark-gray">Quick Links</h3>
            <ul role="list" className="mt-4 space-y-3">
              {navigation.quickLinks.map((item) => (
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

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-dark-gray">Legal</h3>
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
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm font-semibold text-dark-gray">Contact Us</h3>
            <ul role="list" className="mt-4 space-y-3">
              <li>
                <a 
                  href="mailto:support@quotelinker.com" 
                  className="flex items-center text-sm text-muted-foreground hover:text-electric-blue transition-colors"
                >
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  support@quotelinker.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+18005551234" 
                  className="flex items-center text-sm text-muted-foreground hover:text-electric-blue transition-colors"
                >
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  (800) 555-1234
                </a>
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <MapPinIcon className="h-5 w-5 mr-2" />
                400 S 4th St Ste 410 PMB 629080
                <br />
                Minneapolis, MN 55415
              </li>
            </ul>
            <div className="mt-6 flex space-x-6">
              {navigation.social.map((item) => (
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

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} QuoteLinker LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

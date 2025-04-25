'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/auto" className="text-brand-body hover:text-brand-primary transition-colors">
              Auto Insurance
            </Link>
            <Link href="/home" className="text-brand-body hover:text-brand-primary transition-colors">
              Home Insurance
            </Link>
            <Link href="/life" className="text-brand-body hover:text-brand-primary transition-colors">
              Life Insurance
            </Link>
            <Link href="/disability" className="text-brand-body hover:text-brand-primary transition-colors">
              Disability Insurance
            </Link>
          </div>

          <Link
            href="#quote-form"
            className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-primary-dark transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </nav>
    </header>
  );
} 
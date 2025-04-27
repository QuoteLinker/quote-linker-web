'use client';

import Link from 'next/link';
import Logo from './Logo';

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Logo showText={true} className="h-8 w-auto" />
            </Link>
          </div>
          <div className="hidden sm:flex sm:space-x-8 items-center">
            <Link href="/products/auto" className="text-gray-700 hover:text-gray-900">Auto</Link>
            <Link href="/products/home" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link href="/products/life" className="text-gray-700 hover:text-gray-900">Life</Link>
            <Link href="/products/health" className="text-gray-700 hover:text-gray-900">Health</Link>
            <Link href="/products/life?subType=term" className="bg-[#00EEFD] text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
              Get My Free Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 
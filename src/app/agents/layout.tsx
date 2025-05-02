'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

function isAuthenticatedPath(pathname: string) {
  return pathname.includes('/signup') || pathname.includes('/login');
}

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if we're not on signup/login pages
    if (!isAuthenticatedPath(pathname)) {
      router.push('/agents/signup');
    }
  }, [pathname, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Agent Portal</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
} 
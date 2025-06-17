'use client';

import React, { useEffect } from 'react'; // Ensure useEffect is imported
import { useRouter, usePathname } from 'next/navigation'; // Ensure these are imported

function isAuthenticatedPath(pathname: string) {
  // Allow access to signup, login, and the base /agents path itself
  return pathname === '/agents' || pathname.includes('/signup') || pathname.includes('/login');
}

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if the user is authenticated by looking for a token in localStorage
    const agentToken = typeof window !== 'undefined' ? localStorage.getItem('agentToken') : null;
    const IS_AUTHENTICATED = !!agentToken;

    if (!IS_AUTHENTICATED && !isAuthenticatedPath(pathname)) {
      router.push('/agents/login');
    }
  }, [pathname, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Agent Portal</h1>
        </div>
      </header>
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        {children}
      </main>
      <footer className="bg-gray-100 border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          Powered by Stripe
        </div>
      </footer>
    </div>
  );
}
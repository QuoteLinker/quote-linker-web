'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ThankYouPage() {
  const router = useRouter();

  // Redirect to home page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0B0B45] to-[#1A1A6C] text-white p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <svg className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          We'll reach out to you shortly with your personalized insurance quotes.
        </p>
        
        <div className="text-sm text-gray-500 mb-6">
          <p>You will be redirected to the home page in a few seconds.</p>
        </div>
        
        <Link 
          href="/" 
          className="inline-block bg-[#00EEFD] text-[#0B0B45] font-medium py-2 px-6 rounded-md hover:bg-[#00D4E5] transition-colors duration-200"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
} 
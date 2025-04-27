'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

export default function SuccessPage() {
  const router = useRouter();

  // Redirect to home page after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <FaCheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Thank You!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Your quote request has been submitted successfully. One of our insurance specialists will contact you shortly.
        </p>
        <div className="mt-5">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#00EEFD] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00EEFD]"
          >
            <FaArrowLeft className="mr-2" />
            Return to Home
          </Link>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          You will be automatically redirected to the home page in 10 seconds.
        </p>
      </div>
    </div>
  );
} 
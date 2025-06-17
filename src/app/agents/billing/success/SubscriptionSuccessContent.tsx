'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Define a type for subscription details
interface SubscriptionDetails {
  packageName: string;
  amount: number;
  interval: string;
  startDate: string;
  status: string;
}

export default function SubscriptionSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      if (!sessionId) {
        setError('No session ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/stripe/subscription-details?sessionId=${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch subscription details');
        }
        
        const data = await response.json();
        setSubscriptionDetails(data);
      } catch (err) {
        setError('Could not retrieve your subscription details. Please contact support.');
        console.error('Error fetching subscription details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading subscription details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Something went wrong</h2>
          <p className="text-red-700 mb-6">{error}</p>
          <Link 
            href="/agents/dashboard"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Display subscription confirmation and details
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white border border-green-200 rounded-lg shadow-xl p-8">
        <div className="flex items-center justify-center bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 animate-[pulse_2s_ease-in-out_1]">
          <svg 
            className="w-10 h-10 text-green-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Subscription Confirmed!
        </h1>
        
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 mb-2">
            Thank you for subscribing to QuoteLinker&apos;s Agent Portal
          </p>
          <p className="text-lg font-medium text-gray-700">
            Your account has been successfully activated
          </p>
        </div>
        
        {subscriptionDetails && (
          <div className="border-t border-gray-200 pt-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Subscription Details</h2>
            
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <div>
                <dt className="text-gray-500">Package</dt>
                <dd className="font-medium text-gray-800 mt-1">{subscriptionDetails.packageName}</dd>
              </div>
              
              <div>
                <dt className="text-gray-500">Status</dt>
                <dd className="font-medium text-green-600 mt-1 capitalize">{subscriptionDetails.status}</dd>
              </div>
              
              <div>
                <dt className="text-gray-500">Amount</dt>
                <dd className="font-medium text-gray-800 mt-1">${subscriptionDetails.amount}/
                  {subscriptionDetails.interval}</dd>
              </div>
              
              <div>
                <dt className="text-gray-500">Start Date</dt>
                <dd className="font-medium text-gray-800 mt-1">
                  {new Date(subscriptionDetails.startDate).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link 
            href="/agents/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
          
          <Link 
            href="/agents/billing"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-md border border-blue-300 hover:bg-blue-50 transition"
          >
            Manage Subscription
          </Link>
        </div>
      </div>
    </div>
  );
}

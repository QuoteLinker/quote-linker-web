import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agent Dashboard | QuoteLinker',
  description: 'Access your leads, monitor performance, and manage your QuoteLinker account.',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Agent Dashboard</h1>
          <p className="text-xl text-gray-600 mb-8">
            Coming soon: Your comprehensive platform for managing leads and growing your business.
          </p>
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features Coming Soon</h2>
            <ul className="space-y-4 text-left">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-[#00EEFD]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="ml-3 text-gray-600">View and manage your leads</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-[#00EEFD]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="ml-3 text-gray-600">
                  Monitor conversion rates and performance metrics
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-[#00EEFD]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="ml-3 text-gray-600">Update your profile and preferences</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-[#00EEFD]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="ml-3 text-gray-600">Purchase leads and manage subscriptions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

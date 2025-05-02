import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Hero Section Loading */}
      <div className="bg-gradient-to-r from-[#00EEFD] to-[#00D4E5] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="h-8 sm:h-10 bg-white/20 rounded-lg w-3/4 max-w-lg mx-auto mb-4"></div>
            <div className="h-4 sm:h-5 bg-white/20 rounded w-2/3 max-w-md mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Articles Grid Loading */}
      <div className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 sm:p-5">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section Loading */}
      <div className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full max-w-md mx-auto mb-6"></div>
          <div className="h-10 bg-gray-200 rounded w-40 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

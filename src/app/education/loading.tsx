import React from 'react';

export default function Loading() {
  return (
    <div className="space-y-12 animate-pulse">
      <header className="text-center mb-12">
        <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </header>

      {[1, 2, 3].map(categoryIndex => (
        <section key={categoryIndex} className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(postIndex => (
              <article key={postIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

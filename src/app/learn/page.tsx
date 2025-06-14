import React from 'react';
import Link from 'next/link';
import { BookOpenIcon, ShieldCheckIcon, UserGroupIcon, AcademicCapIcon, ClockIcon } from '@heroicons/react/24/outline';
import { getArticles } from '@/utils/getArticles';

// Enable static generation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

function getCategoryIcon(category: string) {
  if (category.toLowerCase().includes('life')) return <BookOpenIcon className="h-10 w-10 text-electric-blue mx-auto" aria-hidden="true" />;
  if (category.toLowerCase().includes('property') || category.toLowerCase().includes('auto') || category.toLowerCase().includes('home')) return <ShieldCheckIcon className="h-10 w-10 text-electric-blue mx-auto" aria-hidden="true" />;
  if (category.toLowerCase().includes('health')) return <UserGroupIcon className="h-10 w-10 text-electric-blue mx-auto" aria-hidden="true" />;
  return <AcademicCapIcon className="h-10 w-10 text-electric-blue mx-auto" aria-hidden="true" />;
}

export default async function EducationPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Reduced height */}
      <div className="bg-gradient-to-r from-[#00EEFD] to-[#00D4E5] py-8 sm:py-12">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Insurance Learning Hub
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Learn everything you need to know about insurance to make informed decisions for you
              and your family.
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="py-6 sm:py-8">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {articles.map(article => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`} // Changed from /education/ to /learn/
                className="group bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
              >
                <div className="relative h-48 w-full flex items-center justify-center bg-gradient-to-r from-[#00EEFD]/10 to-[#00D4E5]/10">
                  {getCategoryIcon(article.category)}
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                  <div className="mb-auto">
                    <span className="inline-block px-2.5 py-1 text-xs font-medium text-electric-blue bg-[#00EEFD]/10 rounded-full mb-3">
                      {article.category}
                    </span>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-electric-blue transition-colors duration-200">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {article.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-3 border-t border-gray-100">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    {article.readingTime && (
                      <span className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                        {article.readingTime}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-12">
        <div className="container max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need Help Choosing Insurance?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team of experts is here to help you find the right coverage for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-electric-blue hover:bg-[#00D4E5] transition-colors duration-200 shadow-brand hover:shadow-lg"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

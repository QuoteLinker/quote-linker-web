import React from 'react';
import Link from 'next/link';
// Will restore when needed: import { getArticles } from '@/utils/getArticles';
import { CarIcon, HomeIcon, HeartPulse, Activity, Umbrella, Clock, HelpCircle, Gauge, FileText } from 'lucide-react';

interface ArticleDisplayInfo {
  slug: string;
  title: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

// Define the main categories with enhanced info
const mainCategories: ArticleDisplayInfo[] = [
  { 
    slug: 'auto', 
    title: 'Auto Insurance', 
    icon: CarIcon, 
    description: 'Find the right coverage to protect your vehicle and financial well-being on the road.',
    color: 'from-blue-50 to-blue-100 border-blue-200'
  },
  { 
    slug: 'home', 
    title: 'Home Insurance', 
    icon: HomeIcon, 
    description: 'Secure your most valuable asset with the right homeowners insurance policy.',
    color: 'from-green-50 to-green-100 border-green-200'
  },
  { 
    slug: 'term_life', 
    title: 'Term Life Insurance', 
    icon: Clock, 
    description: 'Protect your family\'s financial future with affordable term life coverage.',
    color: 'from-amber-50 to-amber-100 border-amber-200'
  },
  { 
    slug: 'whole_life', 
    title: 'Whole Life Insurance', 
    icon: HeartPulse, 
    description: 'Build lifelong protection and cash value with permanent life insurance.',
    color: 'from-purple-50 to-purple-100 border-purple-200'
  },
  { 
    slug: 'disability', 
    title: 'Disability Insurance', 
    icon: Activity, 
    description: 'Safeguard your income and lifestyle if you become unable to work.',
    color: 'from-red-50 to-red-100 border-red-200'
  },
  { 
    slug: 'supplemental_health', 
    title: 'Supplemental Health', 
    icon: Umbrella, 
    description: 'Get additional protection beyond your primary health insurance plan.',
    color: 'from-cyan-50 to-cyan-100 border-cyan-200'
  }
];

// Define additional educational resources
const additionalResources = [
  {
    title: 'Insurance Basics',
    icon: HelpCircle,
    articles: [
      { title: 'Understanding Deductibles', slug: 'understanding-deductibles' },
      { title: 'How to Compare Insurance Quotes', slug: 'comparing-insurance-quotes' }
    ]
  },
  {
    title: 'Claims & Coverage',
    icon: FileText,
    articles: [
      { title: 'Step-by-Step Guide to Filing Claims', slug: 'step-by-step-guide-to-filing-a-car-insurance-claim' },
      { title: 'What Your Policy Covers', slug: 'understanding-insurance-coverage' }
    ]
  },
  {
    title: 'Savings Tips',
    icon: Gauge,
    articles: [
      { title: 'Lower Your Insurance Bill', slug: 'smart-ways-to-lower-your-auto-insurance-bill' },
      { title: 'Bundle and Save', slug: 'auto-home-bundles' }
    ]
  }
];

export default async function LearnIndexPage() {
  // Fetch all articles (for potential additional listing)
  // Commenting out until needed to avoid unused variable warning
  // const allArticles = await getArticles();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Insurance Learning Center</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our educational resources to help you make informed decisions about your insurance needs.
          </p>
        </div>
        
        {/* Main Insurance Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Insurance Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainCategories.map(({ slug, title, icon: Icon, description, color }) => (
              <Link key={slug} href={`/learn/${slug}`}>
                <div className={`h-full rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border bg-gradient-to-br ${color} p-6`}>
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full shadow-sm">
                      <Icon className="h-7 w-7 text-gray-700" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                      <p className="mt-2 text-gray-600">{description}</p>
                      <div className="mt-4 inline-flex items-center text-sm font-medium text-cyan-600 hover:text-cyan-800">
                        Learn more
                        <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Additional Resources Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <Icon className="h-6 w-6 text-cyan-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {resource.articles.map((article, idx) => (
                      <li key={idx}>
                        <Link 
                          href={`/learn/${article.slug}`}
                          className="text-gray-700 hover:text-cyan-600 flex items-center"
                        >
                          <span className="mr-2">•</span>
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Covered?</h2>
            <p className="text-lg mb-6">
              Compare personalized quotes and find the right insurance for your needs.
            </p>
            <Link 
              href="/quote" 
              className="inline-block bg-white text-cyan-700 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
            >
              Get Your Free Quote
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

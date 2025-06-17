import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getArticles } from '@/utils/getArticles';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowRight } from 'lucide-react';

type Props = {
  params: { slug: string };
};

// Enable static generation for all article slugs
export async function generateStaticParams() {
  const articles = await getArticles(); // Assuming getArticles is async or remove await
  return articles.map(article => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug); // Assuming getArticleBySlug is async or remove await

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.description, // Used for meta tags
    keywords: article.keywords, // Used for meta tags
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: `/learn/${article.slug}`,
    },
  };
}

// Helper function to determine related quote type based on slug or keywords
function getRelatedQuoteType(slug: string, article: ReturnType<typeof getArticleBySlug>): string {
  // Map slugs directly to quote types
  const slugMappings: Record<string, string> = {
    'auto': 'auto',
    'home': 'home',
    'term_life': 'life',
    'whole_life': 'life',
    'disability': 'disability',
    'supplemental_health': 'health'
  };
  
  // Check if we have a direct slug mapping
  if (slug in slugMappings) {
    return slugMappings[slug];
  }
  
  // Otherwise infer from content if possible
  const content = article?.content?.toLowerCase() || '';
  const keywords = article?.keywords || [];
  const keywordsStr = Array.isArray(keywords) ? keywords.join(' ').toLowerCase() : '';
  
  if (slug.includes('auto') || content.includes('auto insurance') || keywordsStr.includes('auto')) {
    return 'auto';
  } else if (slug.includes('home') || content.includes('home insurance') || keywordsStr.includes('home')) {
    return 'home';
  } else if (slug.includes('life') || content.includes('life insurance') || keywordsStr.includes('life')) {
    return 'life';
  } else if (slug.includes('disability') || content.includes('disability insurance') || keywordsStr.includes('disability')) {
    return 'disability';
  } else if (slug.includes('health') || content.includes('health insurance') || keywordsStr.includes('health')) {
    return 'health';
  }
  
  // Default to a general quote if we can't determine type
  return '';
}

// Helper function to get display name for the quote type
function getQuoteTypeDisplayName(quoteType: string): string {
  const displayNames: Record<string, string> = {
    'auto': 'Auto Insurance',
    'home': 'Home Insurance',
    'life': 'Life Insurance',
    'disability': 'Disability Insurance',
    'health': 'Health Insurance'
  };
  
  return displayNames[quoteType] || 'Insurance';
}

export default async function LearnArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug); // Assuming getArticleBySlug is async or remove await

  if (!article || !article.content) {
    notFound(); // This will render the not-found.tsx page
  }
  
  // Determine the related quote type
  const quoteType = getRelatedQuoteType(params.slug, article);
  const quoteTypeDisplay = getQuoteTypeDisplayName(quoteType);

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <article className="bg-white shadow-sm rounded-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          
          {article.date && (
            <p className="text-gray-500 text-sm mb-6">
              Published on {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
          
          {/* Main content */}
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={article.content} />
          </div>
          
          {/* Action section with quote CTA */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            {quoteType ? (
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg border border-cyan-100">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to explore your options?</h2>
                <p className="text-gray-700 mb-4">
                  Get personalized {quoteTypeDisplay.toLowerCase()} quotes from top-rated providers. Our licensed agents will help you find the perfect coverage for your needs and budget.
                </p>
                <Link
                  href={`/quote${quoteType ? `?type=${quoteType}` : ''}`}
                  className="inline-flex items-center px-5 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Get Your Free {quoteTypeDisplay} Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg border border-cyan-100">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Have questions about insurance?</h2>
                <p className="text-gray-700 mb-4">
                  Our team of licensed agents is ready to help you find the right coverage for your unique needs.
                </p>
                <Link
                  href="/quote"
                  className="inline-flex items-center px-5 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Get a Free Insurance Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            )}
            
            <div className="mt-8 flex flex-col sm:flex-row sm:justify-between items-center">
              <Link
                href="/learn"
                className="text-cyan-600 hover:text-cyan-800 mb-4 sm:mb-0"
              >
                ← Back to Insurance Learning Center
              </Link>
              
              <Link
                href="/contact"
                className="text-cyan-600 hover:text-cyan-800"
              >
                Questions? Contact our team →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

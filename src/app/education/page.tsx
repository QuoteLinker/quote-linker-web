'use client';

import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Insurance Education Hub | Learn About Coverage | QuoteLinker',
  description:
    'Learn everything you need to know about insurance coverage. Compare products, understand policy types, and make informed decisions for your family.',
  openGraph: {
    title: 'Insurance Education Hub | QuoteLinker',
    description: 'Learn about insurance coverage, compare products, and make informed decisions.',
    images: [{ url: '/images/education-hub-og.png', width: 1200, height: 630 }],
  },
};

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage?: string;
  readingTime?: string;
  category: string;
}

// Pre-fetch articles at build time
const articles = getArticles();

function getArticles(): Article[] {
  try {
    const articlesDirectory = path.join(process.cwd(), 'src/content/education');
    const fileNames = fs.readdirSync(articlesDirectory);

    const articles = fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title,
          description: data.description,
          date: data.date,
          coverImage: data.coverImage,
          readingTime: data.readingTime,
          category: data.category,
        };
      });

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}

function EducationPageSchema({ articles }: { articles: Article[] }) {
  return (
    <Script
      id="education-page-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': 'https://www.quotelinker.com/education#webpage',
          name: 'Insurance Education Hub',
          description: 'Learn everything you need to know about insurance coverage. Compare products, understand policy types, and make informed decisions.',
          isPartOf: {
            '@type': 'WebSite',
            '@id': 'https://www.quotelinker.com/#website',
            name: 'QuoteLinker',
            url: 'https://www.quotelinker.com'
          },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  '@id': 'https://www.quotelinker.com',
                  name: 'Home'
                }
              },
              {
                '@type': 'ListItem',
                position: 2,
                item: {
                  '@id': 'https://www.quotelinker.com/education',
                  name: 'Education'
                }
              }
            ]
          },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: articles.map((article, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'EducationalArticle',
                '@id': `https://www.quotelinker.com/education/${article.slug}`,
                headline: article.title,
                description: article.description,
                author: {
                  '@type': 'Organization',
                  name: 'QuoteLinker Team'
                },
                publisher: {
                  '@type': 'Organization',
                  name: 'QuoteLinker',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.quotelinker.com/logo.png'
                  }
                },
                datePublished: article.date,
                image: article.coverImage ? `https://www.quotelinker.com${article.coverImage}` : undefined,
                articleSection: article.category
              }
            }))
          }
        })
      }}
    />
  );
}

const DEFAULT_COVER_IMAGE = '/images/education/default-article.jpg';

export default function EducationPage() {
  return (
    <>
      <EducationPageSchema articles={articles} />
      <div className="min-h-screen bg-white">
        {/* Hero Section - Reduced height */}
        <div className="bg-gradient-to-r from-[#00EEFD] to-[#00D4E5] py-8 sm:py-12">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Insurance Education Hub
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
                  href={`/education/${article.slug}`}
                  className="group bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full bg-gradient-to-r from-[#00EEFD]/10 to-[#00D4E5]/10">
                    <Image
                      src={article.coverImage || DEFAULT_COVER_IMAGE}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={!article.coverImage}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = DEFAULT_COVER_IMAGE;
                      }}
                    />
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
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
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
    </>
  );
}

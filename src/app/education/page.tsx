import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Insurance Education Hub | QuoteLinker - Learn About Insurance',
  description:
    'Comprehensive insurance education resources. Learn about term life insurance, auto & home bundles, disability insurance, and more.',
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

function getArticles(): Article[] {
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
}

export default function EducationPage() {
  const articles = getArticles();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#00EEFD] to-[#00D4E5] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Insurance Education Hub
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Learn everything you need to know about insurance to make informed decisions for you
              and your family.
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <Link
                key={article.slug}
                href={`/education/${article.slug}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                {article.coverImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-[#00EEFD] bg-[#00EEFD]/10 rounded-full mb-4">
                    {article.category}
                  </span>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#00EEFD] transition-colors duration-200">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    {article.readingTime && <span>{article.readingTime}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Choosing Insurance?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Our team of experts is here to help you find the right coverage for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#00EEFD] hover:bg-[#00D4E5] transition-colors duration-200"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage?: string;
  readingTime?: string;
  category: string;
  content: string;
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const filePath = path.join(process.cwd(), 'src/content/education', `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      coverImage: data.coverImage,
      readingTime: data.readingTime,
      category: data.category,
      content,
    };
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
    },
  };
}

// Enable static generation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Generate static params for all articles
export async function generateStaticParams() {
  const articlesDirectory = path.join(process.cwd(), 'src/content/education');
  const files = fs.readdirSync(articlesDirectory);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace(/\.mdx$/, ''),
    }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Article Header */}
      <header className="bg-gradient-to-r from-[#00EEFD] to-[#00D4E5] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-[#00EEFD] bg-white/20 rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">{article.title}</h1>
            <div className="flex items-center justify-center space-x-4 text-white/90">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {article.readingTime && <span>• {article.readingTime}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {article.coverImage && (
            <div className="mb-8">
              <Image
                src={article.coverImage}
                alt={article.title}
                width={1200}
                height={630}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <MDXRemote source={article.content} />
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link
                href="/education"
                className="inline-flex items-center text-[#00EEFD] hover:text-[#00D4E5]"
                aria-label="Back to Education Hub"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                Back to Education Hub
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-[#00EEFD] hover:bg-[#00D4E5] transition-colors duration-200"
              >
                Get a Quote
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}

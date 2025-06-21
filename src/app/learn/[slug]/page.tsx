import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getArticles, Article } from '@/utils/getArticles';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Script from 'next/script';
import ClientProviders from '@/components/ClientProviders';
import { MdxClient } from '@/components/MdxClient';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/utils/schema';

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
  const article = await getArticleBySlug(params.slug);
  const allArticles = await getArticles();
  
  if (!article) {
    return { title: 'Article Not Found' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com';
  const currentIndex = allArticles.findIndex(a => a.slug === params.slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: article.author || 'QuoteLinker Team' }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: `${baseUrl}/learn/${article.slug}`,
      images: article.coverImage ? [
        {
          url: `${baseUrl}${article.coverImage}`,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ] : undefined,
      siteName: 'QuoteLinker',
      publishedTime: article.date,
      modifiedTime: article.modifiedDate,
      authors: [article.author || 'QuoteLinker Team'],
      section: article.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: article.coverImage ? [`${baseUrl}${article.coverImage}`] : undefined,
      site: '@QuoteLinker',
      creator: '@QuoteLinker',
    },
    alternates: {
      canonical: article.canonical,
      ...(prevArticle && { prev: `${baseUrl}/learn/${prevArticle.slug}` }),
      ...(nextArticle && { next: `${baseUrl}/learn/${nextArticle.slug}` }),
    },
  };
}

// Helper function to generate article JSON-LD
function getArticleJsonLd(article: Article) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com';
  
  return generateArticleSchema({
    title: article.title,
    description: article.description,
    url: `${baseUrl}/learn/${article.slug}`,
    author: article.author || 'QuoteLinker Team',
    datePublished: article.date,
    dateModified: article.modifiedDate,
    image: article.coverImage ? `${baseUrl}${article.coverImage}` : undefined,
    category: article.category,
    keywords: article.keywords,
  });
}

// Helper function to generate breadcrumb JSON-LD
function getBreadcrumbJsonLd(article: Article) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com';
  
  return generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Learn', url: `${baseUrl}/learn` },
    { name: article.category, url: `${baseUrl}/learn/category/${article.category.toLowerCase()}` },
    { name: article.title, url: `${baseUrl}/learn/${article.slug}` },
  ]);
}

export default async function LearnArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }

  const allArticles = await getArticles();
  const currentIndex = allArticles.findIndex(a => a.slug === params.slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
  
  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getArticleJsonLd(article) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getBreadcrumbJsonLd(article) }}
      />
      <article className="prose prose-blue max-w-none">
        <nav className="text-sm mb-4 text-gray-600" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="hover:text-accent-500">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link href="/learn" className="hover:text-accent-500">Learn</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link href={`/learn/category/${article.category.toLowerCase()}`} className="hover:text-accent-500">
                {article.category}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-800">{article.title}</li>
          </ol>
        </nav>
        
        <MdxClient source={article.content} />

        <nav className="mt-8 flex justify-between items-center border-t border-gray-200 pt-4">
          {prevArticle ? (
            <Link 
              href={`/learn/${prevArticle.slug}`}
              className="group flex items-center text-accent-500 hover:text-accent-600"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              <span>
                <span className="block text-sm text-gray-600">Previous</span>
                {prevArticle.title}
              </span>
            </Link>
          ) : <div />}
          
          {nextArticle && (
            <Link 
              href={`/learn/${nextArticle.slug}`}
              className="group flex items-center text-accent-500 hover:text-accent-600 ml-auto"
            >
              <span>
                <span className="block text-sm text-gray-600">Next</span>
                {nextArticle.title}
              </span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </nav>
      </article>
    </>
  );
}

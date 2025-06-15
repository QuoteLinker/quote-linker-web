import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getArticles } from '@/utils/getArticles';
import { MDXRemote } from 'next-mdx-remote/rsc'; // Updated import

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
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: `/learn/${article.slug}`,
    },
  };
}

export default async function LearnArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug); // Assuming getArticleBySlug is async or remove await

  if (!article || !article.content) {
    notFound(); // This will render the not-found.tsx page
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl max-w-none">
        <h1>{article.title}</h1>
        <p className="text-gray-600 text-sm">
          Published on {new Date(article.date).toLocaleDateString()}
          {article.readingTime && ` • ${article.readingTime}`}
        </p>
        <p className="lead">{article.description}</p>

        {/* Render MDX content */}
        <div className="mt-8">
          <MDXRemote source={article.content} />
        </div>

        <div className="mt-12 pt-8 border-t">
          <h3 className="text-xl font-semibold mb-4">
            Related Insurance Products
          </h3>
          {/* Example: Dynamically link to relevant quote funnels based on article category or tags */}
          {article.category.toLowerCase().includes('auto') && (
            <p>
              <Link
                href="/quote?type=auto"
                className="text-cyan-600 hover:text-cyan-700"
              >
                Get an Auto Insurance Quote
              </Link>
            </p>
          )}
          {article.category.toLowerCase().includes('home') && (
            <p>
              <Link
                href="/quote?type=home"
                className="text-cyan-600 hover:text-cyan-700"
              >
                Get a Home Insurance Quote
              </Link>
            </p>
          )}
          {article.category.toLowerCase().includes('life') && (
            <p>
              <Link
                href="/quote?type=life"
                className="text-cyan-600 hover:text-cyan-700"
              >
                Get a Life Insurance Quote
              </Link>
            </p>
          )}
          {article.category.toLowerCase().includes('health') && (
            <p>
              <Link
                href="/quote?type=health"
                className="text-cyan-600 hover:text-cyan-700"
              >
                Get a Health Insurance Quote
              </Link>
            </p>
          )}
          {/* Add more conditions for other categories as needed */}
        </div>

        <div className="mt-8">
          <Link href="/learn" className="text-cyan-600 hover:text-cyan-700">
            &larr; Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}

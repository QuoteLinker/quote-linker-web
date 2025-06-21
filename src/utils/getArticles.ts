import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface Article {
  slug: string;
  title: string;
  description?: string;
  date: string;
  coverImage?: string;
  readingTime?: string;
  category?: string;
  content?: MDXRemoteSerializeResult | string;
  keywords?: string[];
  faq?: Array<{ question: string; answer: string }>;
  // New fields for improved SEO
  author?: string;
  canonical?: string;
  modifiedDate?: string;
  prevPost?: { slug: string; title: string };
  nextPost?: { slug: string; title: string };
  jsonLd?: {
    articleBody?: string;
    wordCount?: number;
    articleSection?: string;
    thumbnailUrl?: string;
  };
}

// Format date for the schema
function formatSchemaDate(date: string): string {
  return new Date(date).toISOString();
}

export function getArticles(): Article[] {
  try {
    const articlesDirectory = path.join(process.cwd(), 'src/content/learn');
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
          keywords: data.keywords,
          author: data.author || 'QuoteLinker Team',
          modifiedDate: data.modifiedDate || data.date,
        };
      });

    // Sort articles by date descending
    const sortedArticles = articles.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Add prev/next links
    return sortedArticles.map((article, index) => ({
      ...article,
      prevPost: index > 0 ? {
        slug: sortedArticles[index - 1].slug,
        title: sortedArticles[index - 1].title
      } : undefined,
      nextPost: index < sortedArticles.length - 1 ? {
        slug: sortedArticles[index + 1].slug,
        title: sortedArticles[index + 1].title
      } : undefined,
    }));

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error loading articles:', error);
    }
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const articlesDirectory = path.join(process.cwd(), 'src/content/learn');
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`Article not found for slug: ${slug} at path ${fullPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { data, content } = matter(fileContents);
    
    try {    
      // Serialize MDX content
      const mdxSource = await serialize(content, {
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
        scope: data,
      });

      // Calculate word count for schema
      const wordCount = content.split(/\s+/).length;
      
      // Get all articles to determine prev/next
      const allArticles = getArticles();
      const currentIndex = allArticles.findIndex(a => a.slug === slug);
      
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com';
      
      return {
        slug,
        title: data.title || slug,
        description: data.description,
        date: data.date,
        coverImage: data.coverImage,
        readingTime: data.readingTime,
        category: data.category,
        keywords: data.keywords,
        author: data.author || 'QuoteLinker Team',
        modifiedDate: data.modifiedDate || data.date,
        content: mdxSource,
        faq: data.faq,
        canonical: `${baseUrl}/learn/${slug}`,
        prevPost: currentIndex > 0 ? {
          slug: allArticles[currentIndex - 1].slug,
          title: allArticles[currentIndex - 1].title
        } : undefined,
        nextPost: currentIndex < allArticles.length - 1 ? {
          slug: allArticles[currentIndex + 1].slug,
          title: allArticles[currentIndex + 1].title
        } : undefined,
        jsonLd: {
          articleBody: content,
          wordCount,
          articleSection: data.category,
          thumbnailUrl: data.coverImage && `${baseUrl}${data.coverImage}`
        }
      };
      
    } catch (parseError) {
      console.error(`Error parsing MDX for ${slug}:`, parseError);
      return null;
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error loading article by slug ${slug}:`, error);
    }
    return null;
  }
}
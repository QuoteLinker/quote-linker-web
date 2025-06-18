import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Article {
  slug: string;
  title: string;
  description?: string;
  date: string;
  coverImage?: string;
  readingTime?: string;
  category?: string;
  content?: string;
  keywords?: string[]; // Added keywords field for SEO
  faq?: Array<{ question: string; answer: string }>; // Support for FAQ schema
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
          keywords: data.keywords, // Include keywords for SEO
        };
      });

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error loading articles:', error);
    }
    return [];
  }
}

// New function to get a single article by slug
export function getArticleBySlug(slug: string): Article | null {
  try {
    const articlesDirectory = path.join(process.cwd(), 'src/content/learn');
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`Article not found for slug: ${slug} at path ${fullPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Handle potential parsing errors in frontmatter
    try {
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        title: data.title || slug,
        description: data.description,
        date: data.date,
        coverImage: data.coverImage,
        readingTime: data.readingTime,
        category: data.category,
        keywords: data.keywords,
        content: content,
        faq: data.faq,
      };
    } catch (parseError) {
      console.error(`Error parsing frontmatter for ${slug}:`, parseError);
      return null;
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error loading article by slug ${slug}:`, error);
    }
    return null;
  }
}
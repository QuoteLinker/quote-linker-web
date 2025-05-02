import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage?: string;
  readingTime?: string;
  category: string;
}

export function getArticles(): Article[] {
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
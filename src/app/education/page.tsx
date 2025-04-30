import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'src/content/education');
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        category: data.category,
        excerpt: data.excerpt,
      };
    });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function EducationPage() {
  const posts = getPosts();
  const postsByCategory = posts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  return (
    <div className="space-y-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Insurance Education Center</h1>
        <p className="text-xl text-gray-600">
          Learn about different types of insurance and make informed decisions
        </p>
      </header>

      {Object.entries(postsByCategory).map(([category, categoryPosts]) => (
        <section key={category} className="space-y-6">
          <h2 className="text-2xl font-semibold">{category}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoryPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link
                      href={`/education/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <time
                    dateTime={post.date}
                    className="text-sm text-gray-500 block mb-3"
                  >
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link
                    href={`/education/${post.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
} 
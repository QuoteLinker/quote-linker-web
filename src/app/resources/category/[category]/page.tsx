import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// This would typically come from a CMS or database
const blogPosts = [
  {
    id: 1,
    title: 'Understanding Auto Insurance Coverage Types',
    category: 'Consumer Guides',
    subCategory: 'Auto',
    excerpt: 'Learn about the different types of auto insurance coverage and how to choose the right policy for your needs.',
    date: '2024-04-01',
    slug: 'understanding-auto-insurance-coverage-types',
  },
  // Add more blog posts here
];

const categories = [
  {
    name: 'Consumer Guides',
    subcategories: ['Auto', 'Home', 'Life', 'Health'],
  },
  {
    name: 'Industry News',
    subcategories: ['Market Trends', 'Policy Updates', 'Company News'],
  },
  {
    name: 'Tips & Advice',
    subcategories: ['Saving Money', 'Claims', 'Policy Management'],
  },
];

type Props = {
  params: { category: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categories.find(
    (cat) => cat.name.toLowerCase() === params.category.toLowerCase()
  );

  if (!category) {
    return {
      title: 'Category Not Found | QuoteLinker',
      description: 'The requested category could not be found.',
    };
  }

  return {
    title: `${category.name} | QuoteLinker Resources`,
    description: `Browse our ${category.name.toLowerCase()} articles and guides to help you make informed insurance decisions.`,
  };
}

export default function CategoryPage({ params }: Props) {
  const category = categories.find(
    (cat) => cat.name.toLowerCase() === params.category.toLowerCase()
  );

  if (!category) {
    notFound();
  }

  const posts = blogPosts.filter(
    (post) => post.category.toLowerCase() === params.category.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white shadow sm:rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Categories
                </h2>
                <nav className="space-y-1">
                  {categories.map((cat) => (
                    <div key={cat.name}>
                      <Link
                        href={`/resources/category/${cat.name.toLowerCase()}`}
                        className={`block px-3 py-2 rounded-md text-sm font-medium ${
                          cat.name.toLowerCase() === params.category.toLowerCase()
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {cat.name}
                      </Link>
                      <div className="ml-4 mt-1 space-y-1">
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub}
                            href={`/resources/category/${cat.name.toLowerCase()}/${sub.toLowerCase()}`}
                            className="block px-3 py-2 rounded-md text-sm text-gray-500 hover:bg-gray-50"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="bg-white shadow sm:rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Link
                    href="/resources"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Resources
                  </Link>
                  <span className="mx-2">→</span>
                  <span className="text-gray-500">{category.name}</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                  {category.name}
                </h1>

                <div className="space-y-8">
                  {posts.map((post) => (
                    <article key={post.id} className="border-b border-gray-200 pb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        <Link
                          href={`/resources/${post.slug}`}
                          className="hover:text-blue-600"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span>{post.subCategory}</span>
                        <span className="mx-2">•</span>
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <Link
                        href={`/resources/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Read more →
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
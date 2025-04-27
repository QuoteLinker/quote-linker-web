import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Insurance Resources & Guides | QuoteLinker',
  description: 'Expert insurance guides, tips, and resources to help you make informed decisions about your coverage needs.',
};

// Example blog posts (replace with actual content later)
const blogPosts = [
  {
    id: 1,
    title: 'Understanding Auto Insurance Coverage Types',
    category: 'Consumer Guides',
    subCategory: 'Auto',
    excerpt: 'Learn about the different types of auto insurance coverage and what they protect.',
    date: '2024-04-01',
    slug: 'understanding-auto-insurance-coverage-types',
  },
  {
    id: 2,
    title: 'Home Insurance: What You Need to Know',
    category: 'Consumer Guides',
    subCategory: 'Home',
    excerpt: 'A comprehensive guide to home insurance coverage and how to choose the right policy.',
    date: '2024-04-15',
    slug: 'home-insurance-guide',
  },
  {
    id: 3,
    title: 'Life Insurance Basics: Term vs. Permanent',
    category: 'Consumer Guides',
    subCategory: 'Life',
    excerpt: 'Compare term and permanent life insurance to find the right coverage for your needs.',
    date: '2024-04-30',
    slug: 'life-insurance-basics',
  },
  {
    id: 4,
    title: 'Health Insurance Marketplace Guide',
    category: 'Consumer Guides',
    subCategory: 'Health',
    excerpt: 'Navigate the health insurance marketplace with confidence using our comprehensive guide.',
    date: '2024-05-15',
    slug: 'health-insurance-marketplace-guide',
  },
  {
    id: 5,
    title: 'Effective Lead Follow-Up Strategies',
    category: 'Agent Training',
    subCategory: 'Selling Leads',
    excerpt: 'Learn proven strategies for following up with insurance leads to increase conversion rates.',
    date: '2024-05-30',
    slug: 'lead-follow-up-strategies',
  },
  {
    id: 6,
    title: 'Handling Common Insurance Objections',
    category: 'Agent Training',
    subCategory: 'Handling Objections',
    excerpt: 'Master the art of handling common insurance objections with confidence and professionalism.',
    date: '2024-06-15',
    slug: 'handling-insurance-objections',
  },
];

const categories = [
  {
    name: 'Consumer Guides',
    subCategories: ['Auto', 'Home', 'Life', 'Health'],
  },
  {
    name: 'Agent Training',
    subCategories: ['Selling Leads', 'Handling Objections', 'Follow Up'],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Insurance Resources
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Expert guides, tips, and resources to help you make informed decisions about your insurance needs.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <div className="bg-white shadow sm:rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Categories</h2>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.name}>
                      <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
                      <ul className="mt-2 space-y-2">
                        {category.subCategories.map((subCategory) => (
                          <li key={subCategory}>
                            <Link
                              href={`/resources/category/${category.name.toLowerCase()}/${subCategory.toLowerCase()}`}
                              className="text-sm text-gray-600 hover:text-gray-900"
                            >
                              {subCategory}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-9">
              <div className="grid gap-6 md:grid-cols-2">
                {blogPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white shadow sm:rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span className="font-medium text-blue-600">{post.category}</span>
                        <span className="mx-2">•</span>
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        <Link href={`/resources/${post.slug}`} className="hover:text-blue-600">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-500 mb-4">{post.excerpt}</p>
                      <Link
                        href={`/resources/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Read more →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
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
    content: `
      <h2>Introduction to Auto Insurance Coverage</h2>
      <p>Auto insurance is a crucial protection for drivers, but understanding the different types of coverage can be overwhelming. This guide will help you navigate the various options available.</p>

      <h2>Liability Coverage</h2>
      <p>Liability coverage is the foundation of auto insurance. It protects you when you're at fault in an accident and covers:</p>
      <ul>
        <li>Bodily injury to others</li>
        <li>Property damage to others' vehicles or property</li>
        <li>Legal defense costs</li>
      </ul>

      <h2>Collision Coverage</h2>
      <p>Collision coverage pays for damage to your vehicle when:</p>
      <ul>
        <li>You hit another vehicle</li>
        <li>You hit an object (like a tree or guardrail)</li>
        <li>Your vehicle rolls over</li>
      </ul>

      <h2>Comprehensive Coverage</h2>
      <p>Comprehensive coverage protects against non-collision incidents such as:</p>
      <ul>
        <li>Theft</li>
        <li>Vandalism</li>
        <li>Natural disasters</li>
        <li>Animal collisions</li>
      </ul>

      <h2>Personal Injury Protection (PIP)</h2>
      <p>PIP covers medical expenses and lost wages for you and your passengers, regardless of fault.</p>

      <h2>Uninsured/Underinsured Motorist Coverage</h2>
      <p>This coverage protects you when:</p>
      <ul>
        <li>The at-fault driver has no insurance</li>
        <li>The at-fault driver's insurance is insufficient</li>
      </ul>

      <h2>How to Choose the Right Coverage</h2>
      <p>Consider these factors when selecting coverage:</p>
      <ul>
        <li>Your state's minimum requirements</li>
        <li>Your vehicle's value</li>
        <li>Your personal financial situation</li>
        <li>Your risk tolerance</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Understanding auto insurance coverage types is essential for making informed decisions about your policy. Remember to review your coverage regularly and adjust it as your needs change.</p>
    `,
    date: '2024-04-01',
    slug: 'understanding-auto-insurance-coverage-types',
  },
  // Add more blog posts here
];

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | QuoteLinker',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | QuoteLinker Resources`,
    description: post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
  };
}

export default function BlogPost({ params }: Props) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
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
              <Link
                href={`/resources/category/${post.category.toLowerCase()}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {post.category}
              </Link>
              <span className="mx-2">→</span>
              <span className="text-gray-500">{post.title}</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

            <div className="flex items-center text-sm text-gray-500 mb-8">
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

            <div
              className="prose prose-blue max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-gray-600 mb-4">
                Get personalized insurance quotes tailored to your needs.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Get Your Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
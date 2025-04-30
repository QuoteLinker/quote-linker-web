'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = [
  { name: 'Life Insurance', slug: 'life-insurance' },
  { name: 'Health Insurance', slug: 'health-insurance' },
  { name: 'Auto & Home', slug: 'auto-home' },
];

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="sticky top-8">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/education/${category.slug}`}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      pathname === `/education/${category.slug}`
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
} 
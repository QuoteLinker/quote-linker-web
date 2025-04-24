import Link from 'next/link';

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Terms', href: '/terms' },
    { name: 'Privacy', href: '/privacy' },
  ],
  products: [
    { name: 'Auto Insurance', href: '/auto' },
    { name: 'Home Insurance', href: '/home' },
    { name: 'Life Insurance', href: '/life' },
    { name: 'Disability Insurance', href: '/disability' },
    { name: 'Health Insurance', href: '/health' },
  ],
  agents: [
    { name: 'Join Our Network', href: '/agents' },
    { name: 'Agent Login', href: '/agents/login' },
    { name: 'Agent Resources', href: '/agents/resources' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <Link
                href={item.href}
                className="text-base text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Products</h3>
            <ul className="mt-4 space-y-4">
              {navigation.products.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">For Agents</h3>
            <ul className="mt-4 space-y-4">
              {navigation.agents.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="tel:1-800-555-0123" className="text-base text-gray-500 hover:text-gray-900">
                  1-800-555-0123
                </a>
              </li>
              <li>
                <a href="mailto:support@quotelinker.com" className="text-base text-gray-500 hover:text-gray-900">
                  support@quotelinker.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} QuoteLinker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 
import Link from 'next/link';
import Image from 'next/image';
import { InsuranceDropdown } from './InsuranceDropdown';

export function Navigation() {
  const lifeInsuranceItems = [
    { name: 'Term Life', href: '/term-life' },
    { name: 'Permanent Life', href: '/permanent-life' },
  ];

  const healthInsuranceItems = [
    { name: 'Short-Term Disability', href: '/short-term-disability' },
    { name: 'Supplemental Health', href: '/supplemental-health' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/quotelinker_logo.png"
                alt="QuoteLinker"
                width={180}
                height={40}
                priority
              />
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link 
              href="/auto"
              className="text-gray-700 hover:text-primary-600"
            >
              Auto Insurance
            </Link>
            
            <Link 
              href="/home"
              className="text-gray-700 hover:text-primary-600"
            >
              Home Insurance
            </Link>

            <InsuranceDropdown 
              title="Life Insurance"
              items={lifeInsuranceItems}
            />

            <InsuranceDropdown 
              title="Health Insurance"
              items={healthInsuranceItems}
            />

            <Link 
              href="/about"
              className="text-gray-700 hover:text-primary-600"
            >
              About
            </Link>

            <Link 
              href="/contact"
              className="text-gray-700 hover:text-primary-600"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 
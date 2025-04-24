import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-brand-card">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-brand-body max-w-md">
              QuoteLinker connects you with licensed local insurance agents who can provide personalized quotes tailored to your needs.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-brand-headline uppercase tracking-wider">Insurance</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/auto" className="text-sm text-brand-body hover:text-brand-primary transition-colors">
                  Auto Insurance
                </a>
              </li>
              <li>
                <a href="/home" className="text-sm text-brand-body hover:text-brand-primary transition-colors">
                  Home Insurance
                </a>
              </li>
              <li>
                <a href="/life" className="text-sm text-brand-body hover:text-brand-primary transition-colors">
                  Life Insurance
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand-headline uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/about" className="text-sm text-brand-body hover:text-brand-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/agents" className="text-sm text-brand-body hover:text-brand-primary transition-colors">
                  For Agents
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-brand-body hover:text-brand-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-brand-body">
              © {new Date().getFullYear()} QuoteLinker. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="/privacy" className="text-xs text-brand-body hover:text-brand-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-xs text-brand-body hover:text-brand-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
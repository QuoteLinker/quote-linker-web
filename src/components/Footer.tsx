import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-[#1A1A1A] max-w-md">
              QuoteLinker connects you with licensed local insurance agents who can provide personalized quotes tailored to your needs.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-[#0A0A0A] uppercase tracking-wider">Insurance</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/auto" className="text-sm text-[#1A1A1A] hover:text-[#00F6FF] transition-colors">
                  Auto Insurance
                </a>
              </li>
              <li>
                <a href="/home" className="text-sm text-[#1A1A1A] hover:text-[#00F6FF] transition-colors">
                  Home Insurance
                </a>
              </li>
              <li>
                <a href="/life" className="text-sm text-[#1A1A1A] hover:text-[#00F6FF] transition-colors">
                  Life Insurance
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#0A0A0A] uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/about" className="text-sm text-[#1A1A1A] hover:text-[#00F6FF] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/agents" className="text-sm text-[#1A1A1A] hover:text-[#00F6FF] transition-colors">
                  For Agents
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-[#1A1A1A] hover:text-[#00F6FF] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-[#1A1A1A]">
              © {new Date().getFullYear()} QuoteLinker. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="/privacy" className="text-xs text-[#1A1A1A] hover:text-[#00F6FF] transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-xs text-[#1A1A1A] hover:text-[#00F6FF] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
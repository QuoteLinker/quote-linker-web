'use client';

import Link from 'next/link';
// import Image from 'next/image'; // Commented out unused import
import { Youtube, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

// const SITE_NAME = "QuoteLinker"; // Commented out unused variable
// const COMPANY_INFO = { // Commented out unused variable
//   name: "QuoteLinker LLC",
//   email: "support@quotelinker.com",
//   phone: "+1 (763) 292-3692",
//   legalAddress: "18388 60th Avenue North, Plymouth, MN 55446, USA",
//   mailingAddress: "QuoteLinker LLC • 400 S 4th St Ste 410 PMB 629080 • Minneapolis, MN 55415-1419",
// };

// interface SocialLink { // Commented out unused interface
//   name: string;
//   href: string;
//   icon: React.ElementType;
// }

// const SOCIAL_LINKS: SocialLink[] = [ // Commented out unused variable
//   {
//     name: 'YouTube',
//     href: 'https://www.youtube.com',
//     icon: Youtube,
//   },
//   {
//     name: 'LinkedIn',
//     href: 'https://www.linkedin.com',
//     icon: Linkedin,
//   },
// ];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-800 text-secondary-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About QuoteLinker */}
          <div>
            <h3 className="text-h3 font-semibold text-white mb-3">About QuoteLinker</h3>
            <p className="text-body mb-3">
              QuoteLinker helps you find the best insurance rates by connecting you with trusted local agents. Get your free, no-obligation quote today.
            </p>
            <Link href="/about" passHref>
              <span className="text-body text-accent-400 hover:text-accent-300 transition-colors cursor-pointer">Learn More &rarr;</span>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-h3 font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-body">
              <li><Link href="/get-quote" passHref><span className="hover:text-accent-400 transition-colors cursor-pointer">Get a Quote</span></Link></li>
              <li><Link href="/get-quote?type=auto" passHref><span className="hover:text-accent-400 transition-colors cursor-pointer">Auto Insurance</span></Link></li>
              <li><Link href="/get-quote?type=home" passHref><span className="hover:text-accent-400 transition-colors cursor-pointer">Home Insurance</span></Link></li>
              <li><Link href="/get-quote?type=life" passHref><span className="hover:text-accent-400 transition-colors cursor-pointer">Life Insurance</span></Link></li>
              <li><Link href="/get-quote?type=health" passHref><span className="hover:text-accent-400 transition-colors cursor-pointer">Health Insurance</span></Link></li>
              <li><Link href="/learn" passHref><span className="hover:text-accent-400 transition-colors cursor-pointer">Learn</span></Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-h3 font-semibold text-white mb-3">Legal</h3>
            <ul className="space-y-2 text-body">
              <li><Link href="/privacy" passHref><span className="hover:text-accent-400 transition-colors cursor-pointer">Privacy</span></Link></li>
              <li><Link href="/terms" passHref><span className="hover:text-accent-400 transition-colors cursor-pointer">Terms</span></Link></li>
              <li><Link href="/data-and-cookies" passHref><span className="hover:text-accent-400 transition-colors cursor-pointer">Data & Cookies</span></Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-h3 font-semibold text-white mb-3">Contact Us</h3>
            <ul className="space-y-3 text-body">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-accent-400" />
                <a href="mailto:support@quotelinker.com" className="hover:text-accent-400 transition-colors">support@quotelinker.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-accent-400" />
                <a href="tel:+17632923692" className="hover:text-accent-400 transition-colors">+1 (763) 292-3692</a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-accent-400 flex-shrink-0" />
                <div>
                  QuoteLinker LLC<br />
                  400 S 4th St Ste 410 PMB 629080<br />
                  Minneapolis, MN 55415-1419
                </div>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.youtube.com/@QuoteLinker" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-accent-400 transition-colors p-2 rounded-full hover:bg-secondary-700">
                <Youtube size={28} /> {/* Increased size and added padding for better visibility */}
              </a>
              <a href="https://www.linkedin.com/company/quotelinker" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-accent-400 transition-colors p-2 rounded-full hover:bg-secondary-700">
                <Linkedin size={28} /> {/* Increased size and added padding for better visibility */}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-sm">
          <p>&copy; {currentYear} QuoteLinker LLC. All rights reserved.</p>
          <p className="mt-1 text-xs text-gray-500">
            QuoteLinker is a digital lead generation platform. We are not an insurance agency or broker or carrier. Insurance products are offered through a network of licensed agents.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            QuoteLinker LLC legal Address: 18388 60th Avenue North, Plymouth, MN 55446, USA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-brand-card">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-4 text-brand-body opacity-75 text-sm">
              QuoteLinker connects you with licensed local insurance agents who can provide personalized quotes tailored to your needs.
            </p>
          </div>
          
          <div>
            <h4 className="text-brand-headline font-semibold mb-4">Insurance</h4>
            <ul className="space-y-2">
              <li>
                <a href="/auto" className="text-brand-body hover:text-brand-primary transition-colors">
                  Auto Insurance
                </a>
              </li>
              <li>
                <a href="/home" className="text-brand-body hover:text-brand-primary transition-colors">
                  Home Insurance
                </a>
              </li>
              <li>
                <a href="/life" className="text-brand-body hover:text-brand-primary transition-colors">
                  Life Insurance
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-brand-headline font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-brand-body hover:text-brand-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/agents" className="text-brand-body hover:text-brand-primary transition-colors">
                  For Agents
                </a>
              </li>
              <li>
                <a href="/contact" className="text-brand-body hover:text-brand-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-brand-headline font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-brand-body hover:text-brand-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-brand-body hover:text-brand-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-brand-body opacity-75 text-sm text-center">
            © {new Date().getFullYear()} QuoteLinker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 
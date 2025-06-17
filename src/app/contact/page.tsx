import { Metadata } from 'next';
import { SUPPORT } from '@/lib/config';
import { Mail, Phone, MapPin, Building, Award, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us - Insurance Experts at QuoteLinker',
  description: 'Get in touch with the QuoteLinker team for personalized insurance guidance. Our licensed agents are ready to help you find the best coverage for your unique needs.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-white min-h-[calc(100vh-var(--header-height,4rem)-var(--footer-height,10rem))]">
      <article className="prose prose-lg prose-blue mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact QuoteLinker</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">About QuoteLinker</h2>
          <p className="text-gray-700 leading-relaxed">
            Founded in 2023, QuoteLinker is revolutionizing the insurance industry by connecting consumers directly with trusted local agents who can provide personalized guidance. Our mission is to simplify the insurance buying process while ensuring you get the coverage that truly meets your needs at competitive rates.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8">
            <div className="bg-cyan-50 rounded-lg p-6 flex flex-col items-center text-center">
              <Award className="h-12 w-12 text-cyan-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900">Our Expertise</h3>
              <p className="text-gray-700">
                Our network includes only licensed, experienced agents with proven track records of exceptional customer service. We carefully vet each partner to ensure you receive expert guidance.
              </p>
            </div>
            
            <div className="bg-cyan-50 rounded-lg p-6 flex flex-col items-center text-center">
              <Clock className="h-12 w-12 text-cyan-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900">Time & Money Savings</h3>
              <p className="text-gray-700">
                Our proprietary matching algorithm connects you with the right agents in minutes, saving you hours of research and helping you find competitive rates tailored to your situation.
              </p>
            </div>
            
            <div className="bg-cyan-50 rounded-lg p-6 flex flex-col items-center text-center">
              <ShieldCheck className="h-12 w-12 text-cyan-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900">Security & Privacy</h3>
              <p className="text-gray-700">
                Your information is protected with industry-leading security protocols. We never sell your data to third parties and only share what&apos;s necessary with matched agents.
              </p>
            </div>
            
            <div className="bg-cyan-50 rounded-lg p-6 flex flex-col items-center text-center">
              <HeartHandshake className="h-12 w-12 text-cyan-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900">Customer Commitment</h3>
              <p className="text-gray-700">
                We don&apos;t just match you with agents—we follow up to ensure you&apos;re satisfied with the service and coverage options provided. Your satisfaction is our top priority.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Insurance Solutions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900">Personal Insurance:</h4>
                <ul className="list-disc list-inside text-gray-700 ml-2">
                  <li>Auto Insurance</li>
                  <li>Home Insurance</li>
                  <li>Term Life Insurance</li>
                  <li>Whole Life Insurance</li>
                  <li>Disability Insurance</li>
                  <li>Supplemental Health Insurance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Business Insurance:</h4>
                <ul className="list-disc list-inside text-gray-700 ml-2">
                  <li>Commercial Auto</li>
                  <li>General Liability</li>
                  <li>Professional Liability</li>
                  <li>Workers&apos; Compensation</li>
                  <li>Business Owners Policies</li>
                  <li>Cyber Insurance</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link href="/quote" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700">
                Get Free Insurance Quotes
              </Link>
            </div>
          </div>
        </section>
        
        <div className="bg-gray-50 rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Get In Touch</h2>
          
          <div className="flex items-start space-x-3">
            <Mail className="h-6 w-6 text-cyan-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-0.5">Email Us</h3>
              {SUPPORT.email ? (
                <a href={`mailto:${SUPPORT.email}`} className="text-cyan-700 hover:text-cyan-800 break-all">
                  {SUPPORT.email}
                </a>
              ) : (
                <p className="text-gray-500">Email information not available.</p>
              )}
              <p className="text-sm text-gray-600 mt-1">For general inquiries and support. We typically respond within 24 hours.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Phone className="h-6 w-6 text-cyan-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-0.5">Call Us</h3>
              {SUPPORT.phone ? (
                <a href={`tel:${SUPPORT.phone}`} className="text-cyan-700 hover:text-cyan-800">
                  {SUPPORT.phone}
                </a>
              ) : (
                <p className="text-gray-500">Phone number not available.</p>
              )}
              <p className="text-sm text-gray-600 mt-1">Available Monday-Friday, 8am-6pm CT for immediate assistance.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Building className="h-6 w-6 text-cyan-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-0.5">Legal Address</h3>
              <p className="text-gray-700">{SUPPORT.address?.legal || 'Legal address not available.'}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <MapPin className="h-6 w-6 text-cyan-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-0.5">Mailing Address</h3>
              <p className="text-gray-700">{SUPPORT.address?.mailing || 'Mailing address not available.'}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Get Started?</h3>
            <p className="text-gray-700 mb-4">Compare insurance quotes from top providers and get matched with the best options for your unique needs.</p>
            <Link href="/quote" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700">
              Get Your Free Quote
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
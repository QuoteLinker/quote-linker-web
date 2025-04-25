'use client';

import { useState } from 'react';

export const metadata = {
  title: 'Contact Us - QuoteLinker',
  description: 'Get in touch with QuoteLinker for any questions about insurance quotes or our services.',
};

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setFormStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="mb-6">
                Have questions about insurance coverage or need assistance? We're here to help!
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href="mailto:support@quotelinker.com" className="text-brand-primary hover:text-brand-primary-dark">
                    support@quotelinker.com
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Office Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 5:00 PM CST</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p>Minneapolis, Minnesota</p>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-brand-primary text-white py-2 px-6 rounded-lg hover:bg-brand-primary-dark transition-colors disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>

                {formStatus === 'success' && (
                  <p className="text-green-600 text-sm">Message sent successfully!</p>
                )}
                {formStatus === 'error' && (
                  <p className="text-red-600 text-sm">Failed to send message. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
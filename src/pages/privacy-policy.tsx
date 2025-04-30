import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

const PrivacyPolicy: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Layout>
      <Head>
        <title>Privacy Policy | QuoteLinker</title>
        <meta name="description" content="QuoteLinker Privacy Policy" />
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <p className="text-gray-600 mb-6">Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <div className="prose prose-blue max-w-none">
          <p>
            At QuoteLinker, we respect your privacy and are committed to protecting your personal information. 
            This policy explains what information we collect, how we use it, and your rights regarding your data.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h2>
          <p>
            We collect personal information you voluntarily provide through our quote forms, including your name, 
            contact details, zip code, and insurance preferences. We may also collect usage data through cookies 
            and analytics tools.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>To provide you with insurance quote options based on your input</li>
            <li>To follow up with you regarding your interest in coverage</li>
            <li>To improve our website and user experience</li>
            <li>To comply with legal obligations</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Consent to Contact</h2>
          <p>
            By submitting your information through our website, you consent to receive communications from a 
            licensed insurance representative by phone, SMS, or email. Standard messaging rates may apply. 
            You may opt out at any time.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Data Sharing</h2>
          <p>
            We do not sell your data. We may share your information with our licensed insurance partners or 
            tools (such as CRMs or analytics platforms) solely for the purpose of providing services and 
            improving QuoteLinker.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Security</h2>
          <p>
            We use industry-standard security measures to protect your data.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Your Rights</h2>
          <p>
            You may request access to or deletion of your data at any time by contacting us at 
            <a href="mailto:support@quotelinker.com" className="text-blue-600 hover:text-blue-800 ml-1">support@quotelinker.com</a>.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Contact</h2>
          <p>
            If you have any questions about this policy, email us at 
            <a href="mailto:support@quotelinker.com" className="text-blue-600 hover:text-blue-800 ml-1">support@quotelinker.com</a>.
          </p>
          
          <p className="text-gray-600 mt-8">
            © {currentYear} QuoteLinker LLC. All rights reserved.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy; 
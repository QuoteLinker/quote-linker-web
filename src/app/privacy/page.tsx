import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-6">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md prose lg:prose-lg max-w-none">
          <h1>Privacy Policy</h1>
          <p className="text-sm text-gray-500">Last Updated: October 26, 2023</p>
          <p>QuoteLinker LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, https://quotelinker.com (the &quot;Site&quot;).</p>
          
          <h2>Collection of Your Information</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes personal data you voluntarily provide to us when you request an insurance quote, such as your name, mailing address, email address, and telephone number.</p>

          <h2>Use of Your Information</h2>
          <p>Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
          <ul>
            <li>Connect you with licensed insurance agents who can provide you with the quotes you requested.</li>
            <li>Respond to your inquiries and fulfill your requests.</li>
            <li>Send you administrative information, such as changes to our terms, conditions, and policies.</li>
            <li>Improve our website and services.</li>
          </ul>

          <h2>Disclosure of Your Information</h2>
          <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
          <ul>
            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
            <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
          </ul>

          <h2>Tracking Technologies (Cookies)</h2>
          <p>We use cookies and other tracking technologies to help customize the Site and improve your experience. For more information on how we use cookies, please refer to our <Link href="/data-and-cookies">Data & Cookies Policy</Link>.</p>

          <h2>Security of Your Information</h2>
          <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

           <h2>Policy for Children</h2>
          <p>We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>

          <h2>Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us at: <Link href="mailto:privacy@quotelinker.com">privacy@quotelinker.com</Link>.</p>
        </div>
      </div>
    </div>
  );
}
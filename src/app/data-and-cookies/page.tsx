import { Metadata } from 'next';

export const metadata: Metadata = { title: 'How We Use Your Data & Cookies' };

export default function DataAndCookiesPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-6">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md prose lg:prose-lg max-w-none">
            <h1>How We Use Your Data & Cookies</h1>
            <p>This page explains how QuoteLinker LLC collects, uses, and protects your information, and how we use cookies to improve your experience on our website.</p>
            
            <h2>Data Usage</h2>
            <p>When you submit a request for an insurance quote, we collect personal information necessary to connect you with licensed insurance agents in our network. This information is used solely for the purpose of providing you with insurance quotes and related services. We do not sell your personal information to third-party marketing lists.</p>

            <h2>Cookies</h2>
            <p>A cookie is a small file placed on your device. We use cookies for several purposes:</p>
            <ul>
                <li><strong>Essential Cookies:</strong> To operate our site, such as remembering your form progress.</li>
                <li><strong>Performance Cookies:</strong> To analyze traffic and user behavior (e.g., via Google Analytics) to improve our service.</li>
                <li><strong>Marketing Cookies:</strong> To track the effectiveness of our advertising campaigns (e.g., via Google Ads).</li>
            </ul>
            <p>By using our website, you consent to the use of cookies in accordance with this policy. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
        </div>
      </div>
    </div>
  );
}
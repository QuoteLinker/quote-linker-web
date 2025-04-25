export const metadata = {
  title: 'Privacy Policy - QuoteLinker',
  description: 'Learn how QuoteLinker protects and handles your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Name and contact information</li>
            <li>Insurance preferences and requirements</li>
            <li>Information about your insurance needs</li>
            <li>Communication preferences</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Connect you with licensed insurance agents</li>
            <li>Provide insurance quotes and recommendations</li>
            <li>Improve our services</li>
            <li>Communicate with you about our services</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Information Sharing</h2>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Licensed insurance agents in our network</li>
            <li>Service providers who assist in our operations</li>
            <li>As required by law or to protect our rights</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>Email: privacy@quotelinker.com</p>
        </div>
      </div>
    </div>
  );
} 
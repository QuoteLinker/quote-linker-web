export const metadata = {
  title: 'Terms of Service - QuoteLinker',
  description: 'Read about the terms and conditions for using QuoteLinker services.',
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
          <p>By accessing or using QuoteLinker's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
          <p>QuoteLinker provides an online platform connecting users with licensed insurance agents. We do not provide insurance directly but facilitate connections with licensed providers.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Responsibilities</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Provide accurate and complete information</li>
            <li>Maintain the confidentiality of your account</li>
            <li>Use the service for lawful purposes only</li>
            <li>Not interfere with the proper working of the service</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Insurance Quotes</h2>
          <p>Insurance quotes provided through our service:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Are estimates only and subject to change</li>
            <li>Require verification by licensed agents</li>
            <li>May vary based on additional information</li>
            <li>Are not guaranteed until confirmed by an insurance provider</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
          <p>QuoteLinker is not responsible for:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Actions of third-party insurance providers</li>
            <li>Accuracy of quotes provided by insurers</li>
            <li>Service interruptions or technical issues</li>
            <li>Any damages arising from use of our service</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of new terms.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Information</h2>
          <p>For questions about these Terms of Service, please contact us at:</p>
          <p>Email: support@@quotelinker.com</p>
        </div>
      </div>
    </div>
  );
} 
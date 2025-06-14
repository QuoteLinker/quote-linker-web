import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-6">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md prose lg:prose-lg max-w-none">
          <h1>Terms of Service</h1>
          <p className="text-sm text-gray-500">Last Updated: October 26, 2023</p>

          <h2>1. Agreement to Terms</h2>
          <p>By using our services, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the services.</p>

          <h2>2. Description of Service</h2>
          <p>QuoteLinker provides a marketplace that connects consumers seeking insurance quotes with our network of licensed insurance professionals (&quot;Agents&quot;). We are not an insurance provider and do not underwrite any insurance policies.</p>

          <h2>3. Consent to be Contacted (TCPA & CAN-SPAM)</h2>
          <p>By submitting a quote request through our Service, you are providing your express written consent to be contacted by us and our network of Agents at the telephone number and email address you provided. You consent to receive communications via live telephone calls, automated dialers, pre-recorded messages, text messages (SMS), and email. You understand that your telephone company may charge you for these communications. You understand that your consent is not a condition of any purchase.</p>

          <h2>4. Disclaimers</h2>
          <p>The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. QuoteLinker LLC makes no warranties, express or implied, regarding the operation of the service or the information, content, or materials included therein.</p>
          
          <h2>5. Limitation of Liability</h2>
          <p>In no event shall QuoteLinker LLC, nor its directors or employees, be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our service.</p>
        </div>
      </div>
    </div>
  );
}
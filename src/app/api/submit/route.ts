import { NextResponse } from 'next/server';
import { InsuranceType } from '@/utils/insuranceCopy';
import { validatePhone, validateZip } from '@/utils/validation';
import { trackQuoteSubmission } from '@/utils/gtm';

interface FormData {
  name: string;
  email: string;
  phone: string;
  zip: string;
  insuranceType: InsuranceType;
  comments?: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { insuranceType, name, email, phone, zip } = data;

    // Validate required fields
    const phoneError = validatePhone(phone);
    const zipError = validateZip(zip);

    if (phoneError || zipError) {
      return NextResponse.json(
        { 
          success: false, 
          errors: {
            ...(phoneError && { phone: phoneError }),
            ...(zipError && { zip: zipError })
          }
        },
        { status: 400 }
      );
    }

    // Track successful submission
    trackQuoteSubmission(insuranceType, zip);

    // Send to Zapier webhook
    const zapierResponse = await fetch(process.env.ZAPIER_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        insuranceType,
        name,
        email,
        phone,
        zip,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!zapierResponse.ok) {
      throw new Error('Failed to send data to Zapier');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 
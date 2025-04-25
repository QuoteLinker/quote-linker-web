import { NextResponse } from 'next/server';
import { InsuranceType } from '@/utils/insuranceCopy';

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

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?1?\d{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

const validateZip = (zip: string): boolean => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
};

export async function POST(request: Request) {
  try {
    const data: FormData = await request.json();
    
    // Log non-sensitive form data
    console.log(`[Quote Submission] Type: ${data.insuranceType}, ZIP: ${data.zip}, Timestamp: ${new Date().toISOString()}`);

    // Validate required fields
    if (!data.name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!data.email?.trim() || !validateEmail(data.email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!data.phone?.trim() || !validatePhone(data.phone)) {
      return NextResponse.json({ error: 'Valid phone number is required' }, { status: 400 });
    }
    if (!data.zip?.trim() || !validateZip(data.zip)) {
      return NextResponse.json({ error: 'Valid ZIP code is required' }, { status: 400 });
    }
    if (!data.insuranceType) {
      return NextResponse.json({ error: 'Insurance type is required' }, { status: 400 });
    }

    // Send to Zapier webhook
    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('[Quote Submission Error] Zapier webhook URL not configured');
      throw new Error('Zapier webhook URL not configured');
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`[Quote Submission Error] Zapier response status: ${response.status}`);
      throw new Error('Failed to submit to Zapier');
    }

    console.log(`[Quote Submission Success] Type: ${data.insuranceType}, ZIP: ${data.zip}`);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(`[Quote Submission Error] ${error instanceof Error ? error.message : 'Unknown error'}`);
    return NextResponse.json(
      { error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
} 
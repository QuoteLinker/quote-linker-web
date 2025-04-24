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

export async function POST(request: Request) {
  try {
    const data: FormData = await request.json();

    // TODO: Implement Salesforce integration
    console.log('Form submission received:', data);

    // For now, just return a success response
    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { message: 'Error processing form submission' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { validateName, validateEmail, validateMessage } from '@/utils/validation';
import { trackContactSubmission } from '@/utils/gtm';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // Validate required fields
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const messageError = validateMessage(message);

    if (nameError || emailError || messageError) {
      return NextResponse.json(
        {
          success: false,
          errors: {
            ...(nameError && { name: nameError }),
            ...(emailError && { email: emailError }),
            ...(messageError && { message: messageError }),
          },
        },
        { status: 400 }
      );
    }

    // Track successful submission
    trackContactSubmission(subject);

    // Send to Zapier webhook
    const zapierResponse = await fetch(process.env.ZAPIER_CONTACT_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
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
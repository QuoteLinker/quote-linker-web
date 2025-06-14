import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// This checks if Firebase Admin is already initialized
if (!admin.apps.length) {
  // This securely initializes the app using credentials set in the Cloud Run environment
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

export async function POST(request: Request) {
  try {
    const leadData = await request.json();

    if (!leadData.name || !leadData.email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const leadWithTimestamp = {
      ...leadData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'new',
    };

    const leadRef = await db.collection('leads').add(leadWithTimestamp);

    return NextResponse.json({ 
      message: 'Lead submitted successfully!',
      leadId: leadRef.id 
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting lead:', error);
    return NextResponse.json({ error: 'An error occurred while submitting the lead.' }, { status: 500 });
  }
}
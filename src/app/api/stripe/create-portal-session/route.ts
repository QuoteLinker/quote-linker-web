import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import * as admin from 'firebase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

const db = admin.firestore();

export async function POST(request: Request) {
  try {
    const { agentId } = await request.json();
    
    if (!agentId) {
      return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 });
    }

    // Get the agent's data from Firestore
    const agentDoc = await db.collection('agents').doc(agentId).get();
    
    if (!agentDoc.exists) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }
    
    const agentData = agentDoc.data();
    
    // Check if agent has a Stripe customer ID
    if (!agentData?.customerId) {
      return NextResponse.json({ error: 'No Stripe customer found for this agent' }, { status: 400 });
    }
    
    // Create a Stripe customer portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: agentData.customerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/agents/billing`,
    });
    
    return NextResponse.json({ url: session.url });
    
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    return NextResponse.json({ 
      error: 'Failed to create customer portal session' 
    }, { status: 500 });
  }
}

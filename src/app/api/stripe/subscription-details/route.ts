import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10', // Updated to latest version
});

// Define types for subscription details
interface SubscriptionDetails {
  packageName: string;
  amount: number;
  interval: string;
  startDate: string;
  status: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Retrieve checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'line_items']
    });

    if (!session || !session.subscription) {
      return NextResponse.json({ error: 'Invalid session or no subscription found' }, { status: 404 });
    }

    // Get subscription details
    const subscription = typeof session.subscription === 'string' 
      ? await stripe.subscriptions.retrieve(session.subscription)
      : session.subscription;

    // Get the product name from the line items
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
    const packageName = lineItems.data[0]?.description || 'Lead Package';

    // Format subscription details for response
    const subscriptionDetails: SubscriptionDetails = {
      packageName,
      amount: subscription.items.data[0].price.unit_amount ? 
        subscription.items.data[0].price.unit_amount / 100 : 0,
      interval: subscription.items.data[0].price.recurring?.interval || 'month',
      startDate: new Date(subscription.current_period_start * 1000).toLocaleDateString(),
      status: subscription.status
    };

    return NextResponse.json(subscriptionDetails);
    
  } catch (error) {
    console.error('Error retrieving subscription details:', error);
    return NextResponse.json({ 
      error: 'Failed to retrieve subscription details' 
    }, { status: 500 });
  }
}

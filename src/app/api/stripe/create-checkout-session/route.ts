import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10', // Updated to latest version
});

export async function POST(request: Request) {
  try {
    const { packageId, agentId } = await request.json();
    
    // Map packageId to Stripe price ID (you would configure these in Stripe dashboard)
    const packagePriceMap: { [key: string]: string } = {
      'auto_basic': process.env.STRIPE_PRICE_AUTO_BASIC || '',
      'auto_premium': process.env.STRIPE_PRICE_AUTO_PREMIUM || '',
      'home_basic': process.env.STRIPE_PRICE_HOME_BASIC || '',
      'home_premium': process.env.STRIPE_PRICE_HOME_PREMIUM || '',
      'life_standard': process.env.STRIPE_PRICE_LIFE_STANDARD || '',
      'life_pro': process.env.STRIPE_PRICE_LIFE_PRO || '',
      'health_plus': process.env.STRIPE_PRICE_HEALTH_PLUS || '',
      'bundle_pro': process.env.STRIPE_PRICE_BUNDLE_PRO || '',
    };

    const priceId = packagePriceMap[packageId];
    
    if (!priceId) {
      return NextResponse.json({ 
        error: 'Invalid package selected' 
      }, { status: 400 });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/agents/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/agents/packages`,
      client_reference_id: agentId,
      subscription_data: {
        metadata: {
          agentId,
          packageId
        }
      },
      customer_email: undefined, // This would be filled with the agent's email from authentication
    });

    return NextResponse.json({ sessionUrl: session.url });
    
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    return NextResponse.json({ 
      error: 'Failed to create checkout session' 
    }, { status: 500 });
  }
}

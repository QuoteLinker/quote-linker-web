import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import * as admin from 'firebase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

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

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature') || '';

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Webhook signature verification failed: ${errorMessage}`);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${errorMessage}` },
        { status: 400 }
      );
    }

    // Handle specific events
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = session.subscription as string;
        const agentId = session.client_reference_id;

        if (!agentId) {
          console.error('No agent ID provided in the session');
          break;
        }

        // Update agent document with subscription information
        await db.collection('agents').doc(agentId).update({
          subscription: {
            id: subscriptionId,
            status: 'active',
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          }
        });

        // Log successful subscription
        await db.collection('subscriptionLogs').add({
          agentId,
          subscriptionId,
          event: 'checkout.session.completed',
          status: 'active',
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
        
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const metadata = subscription.metadata || {};
        const agentId = metadata.agentId;

        if (!agentId) {
          // Try to find agent by subscription ID
          const agentQuery = await db.collection('agents')
            .where('subscription.id', '==', subscription.id)
            .get();
          
          if (agentQuery.empty) {
            console.error('Could not find agent for subscription:', subscription.id);
            break;
          }
          
          const agentDoc = agentQuery.docs[0];
          
          // Update subscription status
          await agentDoc.ref.update({
            'subscription.status': subscription.status,
            'subscription.updatedAt': admin.firestore.FieldValue.serverTimestamp(),
          });
          
          await db.collection('subscriptionLogs').add({
            agentId: agentDoc.id,
            subscriptionId: subscription.id,
            event: 'customer.subscription.updated',
            status: subscription.status,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          });
        } else {
          // Update subscription status
          await db.collection('agents').doc(agentId).update({
            'subscription.status': subscription.status,
            'subscription.updatedAt': admin.firestore.FieldValue.serverTimestamp(),
          });
          
          await db.collection('subscriptionLogs').add({
            agentId,
            subscriptionId: subscription.id,
            event: 'customer.subscription.updated',
            status: subscription.status,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          });
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const metadata = subscription.metadata || {};
        const agentId = metadata.agentId;
        
        if (agentId) {
          // Update agent's subscription status
          await db.collection('agents').doc(agentId).update({
            'subscription.status': 'canceled',
            'subscription.updatedAt': admin.firestore.FieldValue.serverTimestamp(),
          });
          
          await db.collection('subscriptionLogs').add({
            agentId,
            subscriptionId: subscription.id,
            event: 'customer.subscription.deleted',
            status: 'canceled',
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          });
        } else {
          // Try to find agent by subscription ID
          const agentQuery = await db.collection('agents')
            .where('subscription.id', '==', subscription.id)
            .get();
          
          if (!agentQuery.empty) {
            const agentDoc = agentQuery.docs[0];
            
            // Update subscription status
            await agentDoc.ref.update({
              'subscription.status': 'canceled',
              'subscription.updatedAt': admin.firestore.FieldValue.serverTimestamp(),
            });
            
            await db.collection('subscriptionLogs').add({
              agentId: agentDoc.id,
              subscriptionId: subscription.id,
              event: 'customer.subscription.deleted',
              status: 'canceled',
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
            });
          }
        }
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed.' },
      { status: 500 }
    );
  }
}

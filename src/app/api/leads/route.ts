import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Define types for the lead data
interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zip: string;
  insuranceTypes: string[];
  additionalInfo?: string;
  consent: boolean;
}

interface LeadRecord extends LeadFormData {
  fullName: string;
  createdAt: admin.firestore.FieldValue;
  status: string;
  source: string;
  userAgent: string;
}

// This checks if Firebase Admin is already initialized
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
    const leadData = await request.json() as LeadFormData;
    
    // Validate required fields from the form
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'zip', 'insuranceTypes'];
    const missingFields = requiredFields.filter(field => !leadData[field as keyof LeadFormData]);
    
    if (missingFields.length > 0 || !leadData.consent) {
      return NextResponse.json({ 
        error: `Missing required fields: ${missingFields.join(', ')}${!leadData.consent ? ', consent' : ''}` 
      }, { status: 400 });
    }

    // Format the lead data for Firestore
    const leadWithTimestamp: LeadRecord = {
      ...leadData,
      fullName: `${leadData.firstName} ${leadData.lastName}`,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'new',
      source: request.headers.get('referer') || 'direct',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // Save to Firestore
    const leadRef = await db.collection('leads').add(leadWithTimestamp);
    
    // Send lead to Salesforce (if enabled)
    // This would be implemented in a separate service/function
    await sendToSalesforce(leadWithTimestamp, leadRef.id);

    // Send notification email
    await sendNotificationEmail(leadWithTimestamp);

    return NextResponse.json({ 
      message: 'Lead submitted successfully!',
      leadId: leadRef.id 
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting lead:', error);
    return NextResponse.json({ 
      error: 'An error occurred while submitting the lead.' 
    }, { status: 500 });
  }
}

// Salesforce integration
async function sendToSalesforce(leadData: LeadRecord, leadId: string) {
  try {
    // Import the Salesforce utility dynamically to avoid server component issues
    const { authenticateWithSalesforce, createSalesforceLead } = await import('@/utils/salesforce');
    
    // Check if Salesforce integration is enabled
    if (!process.env.SALESFORCE_ENABLED || process.env.SALESFORCE_ENABLED !== 'true') {
      console.log('Salesforce integration is disabled. Would have sent:', leadData.fullName);
      return true;
    }

    // Map our lead data to Salesforce lead structure
    let productType = '';
    let subType = '';
    
    // Get the first insurance type as the main product type
    if (leadData.insuranceTypes && leadData.insuranceTypes.length > 0) {
      productType = leadData.insuranceTypes[0].toLowerCase();
      
      // If multiple types, add additional ones to sub-type
      if (leadData.insuranceTypes.length > 1) {
        subType = leadData.insuranceTypes.slice(1).join(', ').toLowerCase();
      }
    }
    
    // Authenticate with Salesforce
    const { access_token, instance_url } = await authenticateWithSalesforce();
    
    // Prepare lead data for Salesforce
    const sfLeadData = {
      FirstName: leadData.firstName,
      LastName: leadData.lastName,
      Email: leadData.email,
      Phone: leadData.phone,
      Company: `${leadData.firstName} ${leadData.lastName}`, // Required by Salesforce
      PostalCode: leadData.zip,
      LeadSource: 'QuoteLinker Website',
      Product_Type__c: productType,
      Sub_Type__c: subType,
      Status: 'New',
      Description: leadData.additionalInfo || '',
      QuoteLinker_Lead_ID__c: leadId // Custom field to track our internal ID
    };
    
    // Create the lead in Salesforce
    await createSalesforceLead(sfLeadData, access_token, instance_url);
    
    console.log(`Successfully sent lead ${leadId} to Salesforce`);
    
    // Update the lead record in Firestore with Salesforce status
    await db.collection('leads').doc(leadId).update({
      salesforceStatus: 'sent',
      salesforceSentAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return true;
  } catch (error) {
    console.error(`Failed to send lead ${leadId} to Salesforce:`, error);
    
    // Update the lead record in Firestore with error status
    await db.collection('leads').doc(leadId).update({
      salesforceStatus: 'error',
      salesforceError: error instanceof Error ? error.message : String(error)
    });
    
    // Don't throw, we don't want to fail the lead submission
    return false;
  }
}

// Email notification using SendGrid
async function sendNotificationEmail(leadData: LeadRecord) {
  try {
    // Check if email notifications are enabled
    if (!process.env.EMAIL_NOTIFICATIONS_ENABLED || process.env.EMAIL_NOTIFICATIONS_ENABLED !== 'true') {
      console.log(`Email notifications disabled. Would have notified about:`, leadData.fullName);
      return true;
    }
    
    // Check if SendGrid API key is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key is not configured');
      return false;
    }
    
    // Import SendGrid only when needed
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    // Format insurance types as a comma-separated list
    const insuranceTypesText = leadData.insuranceTypes.join(', ');
    
    // Prepare notification email for admin
    const adminMsg = {
      to: process.env.ADMIN_EMAIL || 'admin@quotelinker.com',
      from: process.env.NOTIFICATION_FROM_EMAIL || 'noreply@quotelinker.com',
      subject: `New Lead Submission: ${leadData.fullName}`,
      text: `
        New lead submitted on QuoteLinker:
        
        Name: ${leadData.fullName}
        Email: ${leadData.email}
        Phone: ${leadData.phone}
        ZIP Code: ${leadData.zip}
        Insurance Types: ${insuranceTypesText}
        
        ${leadData.additionalInfo ? `Additional Information: ${leadData.additionalInfo}` : ''}
        
        Source: ${leadData.source}
        Submitted: ${new Date().toLocaleString()}
      `,
      html: `
        <h2>New Lead Submission</h2>
        <p>A new lead has been submitted on QuoteLinker:</p>
        
        <table border="0" cellpadding="5">
          <tr>
            <td><strong>Name:</strong></td>
            <td>${leadData.fullName}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>${leadData.email}</td>
          </tr>
          <tr>
            <td><strong>Phone:</strong></td>
            <td>${leadData.phone}</td>
          </tr>
          <tr>
            <td><strong>ZIP Code:</strong></td>
            <td>${leadData.zip}</td>
          </tr>
          <tr>
            <td><strong>Insurance Types:</strong></td>
            <td>${insuranceTypesText}</td>
          </tr>
          ${leadData.additionalInfo ? `
          <tr>
            <td><strong>Additional Info:</strong></td>
            <td>${leadData.additionalInfo}</td>
          </tr>
          ` : ''}
          <tr>
            <td><strong>Source:</strong></td>
            <td>${leadData.source}</td>
          </tr>
          <tr>
            <td><strong>Submitted:</strong></td>
            <td>${new Date().toLocaleString()}</td>
          </tr>
        </table>
        
        <p>View this lead in the <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/leads">QuoteLinker Dashboard</a>.</p>
      `
    };
    
    // Send admin notification
    await sgMail.send(adminMsg);
    
    // Send confirmation email to the user
    const userMsg = {
      to: leadData.email,
      from: process.env.NOTIFICATION_FROM_EMAIL || 'noreply@quotelinker.com',
      subject: 'Thank you for your insurance quote request - QuoteLinker',
      text: `
        Hi ${leadData.firstName},
        
        Thank you for submitting your insurance quote request with QuoteLinker.
        
        We've received your request for ${insuranceTypesText} insurance quotes.
        
        What happens next:
        
        1. Our system is matching you with licensed insurance agents in your area.
        2. You'll be contacted by phone at ${leadData.phone} within 24-48 hours by one of our trusted partners.
        3. They'll help you explore your options and find the best coverage at the best price.
        
        If you have any questions or need assistance, please reply to this email or call our customer support at (888) 555-1212.
        
        Best regards,
        The QuoteLinker Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <img src="${process.env.NEXT_PUBLIC_BASE_URL}/logo.svg" alt="QuoteLinker Logo" style="max-width: 200px; margin: 20px 0;">
          
          <h2>Thank You for Your Quote Request</h2>
          
          <p>Hi ${leadData.firstName},</p>
          
          <p>Thank you for submitting your insurance quote request with QuoteLinker.</p>
          
          <p>We've received your request for <strong>${insuranceTypesText} insurance</strong> quotes.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">What happens next:</h3>
            <ol>
              <li>Our system is matching you with licensed insurance agents in your area.</li>
              <li>You'll be contacted by phone at ${leadData.phone} within 24-48 hours by one of our trusted partners.</li>
              <li>They'll help you explore your options and find the best coverage at the best price.</li>
            </ol>
          </div>
          
          <p>If you have any questions or need assistance, please reply to this email or call our customer support at (888) 555-1212.</p>
          
          <p>Best regards,<br>The QuoteLinker Team</p>
          
          <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; font-size: 12px; color: #666;">
            <p>© ${new Date().getFullYear()} QuoteLinker. All rights reserved.</p>
            <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/privacy">Privacy Policy</a> | <a href="${process.env.NEXT_PUBLIC_BASE_URL}/terms">Terms of Service</a></p>
          </div>
        </div>
      `
    };
    
    // Send confirmation to user
    await sgMail.send(userMsg);
    
    console.log(`Notification emails sent for: ${leadData.fullName}`);
    return true;
  } catch (error) {
    console.error('Failed to send notification emails:', error);
    return false;
  }
}
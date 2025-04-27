import { NextResponse } from 'next/server';
import { z } from 'zod';

// Base schema for common fields
const baseFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  productType: z.enum(['auto', 'home', 'life', 'health']),
  subType: z.string().optional(),
});

// Type-specific schemas
const autoSchema = baseFormSchema.extend({
  vehicleYear: z.string().min(4, 'Valid vehicle year required'),
  vehicleMake: z.string().min(1, 'Vehicle make is required'),
  vehicleModel: z.string().min(1, 'Vehicle model is required'),
});

const homeSchema = baseFormSchema.extend({
  address: z.string().min(1, 'Property address is required'),
  propertyType: z.enum(['single', 'multi', 'condo']),
  yearBuilt: z.string().min(4, 'Valid year built required'),
});

const lifeSchema = baseFormSchema.extend({
  age: z.string().min(1, 'Age is required'),
  coverageAmount: z.string().min(1, 'Coverage amount is required'),
  termLength: z.string().optional(),
});

const healthSchema = baseFormSchema.extend({
  age: z.string().min(1, 'Age is required'),
  coverageType: z.string().min(1, 'Coverage type is required'),
  occupation: z.string().optional(),
  income: z.string().optional(),
  preExistingConditions: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received form submission:', {
      productType: body.productType,
      subType: body.subType,
      fields: Object.keys(body),
      data: body
    });

    let validatedData;

    // Validate based on product type
    try {
      switch (body.productType) {
        case 'auto':
          validatedData = autoSchema.parse(body);
          break;
        case 'home':
          validatedData = homeSchema.parse(body);
          break;
        case 'life':
          validatedData = lifeSchema.parse(body);
          break;
        case 'health':
          validatedData = healthSchema.parse(body);
          break;
        default:
          validatedData = baseFormSchema.parse(body);
      }
      console.log('Form validation successful:', validatedData);
    } catch (validationError) {
      console.error('Form validation failed:', {
        error: validationError,
        receivedData: body
      });
      throw validationError;
    }

    // Get Salesforce credentials from environment variables
    const SF_INSTANCE_URL = process.env.SF_INSTANCE_URL;
    const SF_CLIENT_ID = process.env.SF_CLIENT_ID;
    const SF_CLIENT_SECRET = process.env.SF_CLIENT_SECRET;
    const SF_USERNAME = process.env.SF_USERNAME;
    const SF_PASSWORD = process.env.SF_PASSWORD;
    const SF_SECURITY_TOKEN = process.env.SF_SECURITY_TOKEN;
    const SF_API_VERSION = process.env.SF_API_VERSION || 'v57.0';
    const SF_LOGIN_URL = 'https://login.salesforce.com';

    // If Salesforce credentials are not configured, log warning and return mock success
    if (!SF_INSTANCE_URL || !SF_CLIENT_ID || !SF_CLIENT_SECRET || !SF_USERNAME || !SF_PASSWORD || !SF_SECURITY_TOKEN) {
      console.warn('WARNING: Salesforce credentials not configured. Running in mock mode.');
      const mockLeadData = {
        FirstName: validatedData.firstName,
        LastName: validatedData.lastName,
        Email: validatedData.email,
        Phone: validatedData.phone,
        PostalCode: validatedData.zipCode,
        LeadSource: "QuoteLinker Web",
        Product_Type__c: validatedData.productType,
        Sub_Type__c: validatedData.subType || '',
        // Include type-specific fields
        ...(validatedData.vehicleYear && {
          Vehicle_Year__c: validatedData.vehicleYear,
          Vehicle_Make__c: validatedData.vehicleMake,
          Vehicle_Model__c: validatedData.vehicleModel,
        }),
        ...(validatedData.propertyType && {
          Property_Type__c: validatedData.propertyType,
          Property_Address__c: validatedData.address,
          Year_Built__c: validatedData.yearBuilt,
        }),
        ...(validatedData.age && {
          Age__c: validatedData.age,
          Coverage_Amount__c: validatedData.coverageAmount,
          Term_Length__c: validatedData.termLength,
        }),
        ...(validatedData.coverageType && {
          Coverage_Type__c: validatedData.coverageType,
          Occupation__c: validatedData.occupation,
          Income__c: validatedData.income,
          Pre_Existing_Conditions__c: validatedData.preExistingConditions,
        }),
      };

      console.log('MOCK MODE: Lead data:', mockLeadData);
      return NextResponse.json({ success: true, mockMode: true, mockData: mockLeadData });
    }

    // Authenticate with Salesforce
    console.log('Authenticating with Salesforce...');
    const authResponse = await fetch(`${SF_LOGIN_URL}/services/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'password',
        client_id: SF_CLIENT_ID,
        client_secret: SF_CLIENT_SECRET,
        username: SF_USERNAME,
        password: `${SF_PASSWORD}${SF_SECURITY_TOKEN}`,
      }),
    });

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      console.error('Salesforce authentication failed:', {
        status: authResponse.status,
        statusText: authResponse.statusText,
        error: errorText,
        headers: Object.fromEntries(authResponse.headers.entries())
      });
      throw new Error(`Authentication failed: ${authResponse.status} - ${errorText}`);
    }

    const authData = await authResponse.json();
    console.log('Salesforce authentication successful:', {
      access_token: authData.access_token ? '***' : undefined,
      instance_url: authData.instance_url,
      token_type: authData.token_type,
      scope: authData.scope
    });

    // Prepare lead data based on product type
    const leadData = {
      FirstName: validatedData.firstName,
      LastName: validatedData.lastName,
      Email: validatedData.email,
      Phone: validatedData.phone,
      PostalCode: validatedData.zipCode,
      LeadSource: "QuoteLinker Web",
      Product_Type__c: validatedData.productType,
      Sub_Type__c: validatedData.subType || '',
      Company: 'Individual', // Required by Salesforce
      Status: 'New',
    };

    // Add product-specific fields
    switch (validatedData.productType) {
      case 'auto':
        Object.assign(leadData, {
          Vehicle_Year__c: validatedData.vehicleYear,
          Vehicle_Make__c: validatedData.vehicleMake,
          Vehicle_Model__c: validatedData.vehicleModel,
        });
        break;
      case 'home':
        Object.assign(leadData, {
          Property_Type__c: validatedData.propertyType,
          Property_Address__c: validatedData.address,
          Year_Built__c: validatedData.yearBuilt,
        });
        break;
      case 'life':
        Object.assign(leadData, {
          Age__c: validatedData.age,
          Coverage_Amount__c: validatedData.coverageAmount,
          Term_Length__c: validatedData.termLength,
        });
        break;
      case 'health':
        Object.assign(leadData, {
          Age__c: validatedData.age,
          Coverage_Type__c: validatedData.coverageType,
          Occupation__c: validatedData.occupation,
          Income__c: validatedData.income,
          Pre_Existing_Conditions__c: validatedData.preExistingConditions,
        });
        break;
    }

    console.log('Preparing to create lead in Salesforce:', {
      ...leadData,
      access_token: '***' // Don't log the actual token
    });

    // Create lead in Salesforce
    const leadResponse = await fetch(
      `${authData.instance_url}/services/data/${SF_API_VERSION}/sobjects/Lead/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.access_token}`,
        },
        body: JSON.stringify(leadData),
      }
    );

    if (!leadResponse.ok) {
      const errorData = await leadResponse.text();
      console.error('Salesforce lead creation failed:', {
        status: leadResponse.status,
        statusText: leadResponse.statusText,
        error: errorData,
        headers: Object.fromEntries(leadResponse.headers.entries()),
        requestData: leadData
      });
      throw new Error(`Failed to create lead: ${leadResponse.status} - ${errorData}`);
    }

    const leadResult = await leadResponse.json();
    console.log('Lead created successfully:', {
      id: leadResult.id,
      productType: validatedData.productType,
      subType: validatedData.subType,
      success: leadResult.success
    });

    return NextResponse.json({ 
      success: true,
      leadId: leadResult.id
    });

  } catch (error) {
    console.error('Lead submission error:', {
      error,
      stack: error instanceof Error ? error.stack : undefined,
      message: error instanceof Error ? error.message : 'Unknown error'
    });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid form data', 
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    const isAuthError = errorMessage.includes('Authentication failed');
    
    return NextResponse.json(
      { 
        success: false, 
        error: isAuthError ? 
          'Service temporarily unavailable' : 
          'Failed to process your request. Please try again later.'
      },
      { status: isAuthError ? 503 : 500 }
    );
  }
} 
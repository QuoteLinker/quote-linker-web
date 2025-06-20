import axios from 'axios';

export interface SalesforceAuthResponse {
  access_token: string;
  instance_url: string;
}

export interface SalesforceLeadData {
  FirstName: string;
  LastName: string;
  Phone: string;
  Email: string;
  Company: string;
  PostalCode: string;
  LeadSource: string;
  Product_Type__c: string;
  Sub_Type__c?: string;
  Age__c?: string;
  Term_Length__c?: string;
  Coverage_Amount__c?: string;
  Occupation__c?: string;
  Income__c?: string;
  Coverage_Type__c?: string;
  Pre_Existing_Conditions__c?: string;
  Status: string;
  Description?: string; // Added for additional info
}

interface SalesforceConfig {
  loginUrl: string;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  token: string;
  apiVersion: string;
}

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  insuranceType: string;
  zipCode: string;
  age?: number;
  preExistingConditions?: boolean;
  additionalInfo?: string;
}

class SalesforceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SalesforceError';
  }
}

/**
 * Gets the appropriate callback URL based on the environment
 * @returns The callback URL for the current environment
 */
function getCallbackUrl(): string {
  if (process.env.NODE_ENV === 'production') {
    return 'https://www.quotelinker.com/api/auth/callback/salesforce';
  }
  return 'http://localhost:3000/oauth/callback';
}

/**
 * Authenticates with Salesforce using OAuth password flow
 * @returns Promise containing access token and instance URL
 */
export async function authenticateWithSalesforce(): Promise<SalesforceAuthResponse> {
  try {
    console.log('Attempting to authenticate with Salesforce...');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Using login URL:', process.env.SALESFORCE_LOGIN_URL);
    console.log('Using callback URL:', getCallbackUrl());
    
    const response = await axios.post<SalesforceAuthResponse>(
      `${process.env.SALESFORCE_LOGIN_URL}/services/oauth2/token`,
      null,
      {
        params: {
          grant_type: 'password',
          client_id: process.env.SALESFORCE_CLIENT_ID,
          client_secret: process.env.SALESFORCE_CLIENT_SECRET,
          username: process.env.SALESFORCE_USERNAME,
          password: `${process.env.SALESFORCE_PASSWORD}${process.env.SALESFORCE_TOKEN}`,
          redirect_uri: getCallbackUrl()
        }
      }
    );

    console.log('Salesforce authentication successful');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Salesforce Authentication Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
    } else {
      console.error('Salesforce Authentication Error:', error);
    }
    throw new Error('Failed to authenticate with Salesforce');
  }
}

/**
 * Creates a new Lead in Salesforce
 * @param leadData - The lead data to be created
 * @param accessToken - Salesforce access token
 * @param instanceUrl - Salesforce instance URL
 * @returns Promise that resolves when lead is created
 */
export async function createSalesforceLead(
  leadData: SalesforceLeadData,
  accessToken: string,
  instanceUrl: string
): Promise<void> {
  try {
    console.log('Attempting to create lead in Salesforce...');
    console.log('Instance URL:', instanceUrl);
    
    const response = await axios.post(
      `${instanceUrl}/services/data/v57.0/sobjects/Lead`,
      leadData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Lead creation response:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Salesforce Lead Creation Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
    } else {
      console.error('Salesforce Lead Creation Error:', error);
    }
    throw new Error('Failed to create lead in Salesforce');
  }
}

function validateConfig(): SalesforceConfig {
  const requiredEnvVars = {
    loginUrl: process.env.SALESFORCE_LOGIN_URL,
    clientId: process.env.SALESFORCE_CLIENT_ID,
    clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
    username: process.env.SALESFORCE_USERNAME,
    password: process.env.SALESFORCE_PASSWORD,
    token: process.env.SALESFORCE_TOKEN,
    apiVersion: process.env.SF_API_VERSION || '57.0'
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new SalesforceError(
      `Missing required Salesforce environment variables: ${missingVars.join(', ')}`
    );
  }

  return requiredEnvVars as SalesforceConfig;
}

export async function submitToSalesforce(leadData: LeadData): Promise<void> {
  try {
    // Validate configuration first
    validateConfig(); // Just validate but don't need the result directly
    
    // Authenticate with Salesforce
    const { access_token, instance_url } = await authenticateWithSalesforce();
    
    // Map lead data to Salesforce format
    const sfLeadData: SalesforceLeadData = {
      FirstName: leadData.firstName,
      LastName: leadData.lastName,
      Email: leadData.email,
      Phone: leadData.phone,
      Company: `${leadData.firstName} ${leadData.lastName}`, // Required by Salesforce
      PostalCode: leadData.zipCode,
      LeadSource: 'QuoteLinker Website',
      Product_Type__c: leadData.insuranceType,
      Status: 'New'
    };
    
    // Add optional fields if available
    if (leadData.age) {
      sfLeadData.Age__c = leadData.age.toString();
    }
    
    if (leadData.preExistingConditions !== undefined) {
      sfLeadData.Pre_Existing_Conditions__c = leadData.preExistingConditions ? 'Yes' : 'No';
    }
    
    if (leadData.additionalInfo) {
      sfLeadData.Description = leadData.additionalInfo;
    }
    
    // Send to Salesforce
    await createSalesforceLead(sfLeadData, access_token, instance_url);
    
    console.log('Successfully submitted lead to Salesforce');
  } catch (error) {
    console.error('Failed to submit lead to Salesforce:', error);
    throw new SalesforceError(error instanceof Error ? error.message : 'Unknown error occurred');
  }
}

// Export types for use in other files
export type { LeadData, SalesforceConfig };
export { SalesforceError }; 
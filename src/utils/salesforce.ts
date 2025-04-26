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
  Street?: string;
  PostalCode: string;
  LeadSource: string;
  Description?: string;
  Custom_Insurance_Type__c: string;
  Custom_Sub_Line__c?: string;
  Custom_Heard_About_Us__c?: string;
  Status: string;
}

/**
 * Authenticates with Salesforce using OAuth password flow
 * @returns Promise containing access token and instance URL
 */
export async function authenticateWithSalesforce(): Promise<SalesforceAuthResponse> {
  try {
    const response = await axios.post<SalesforceAuthResponse>(
      `${process.env.SALESFORCE_LOGIN_URL}/services/oauth2/token`,
      null,
      {
        params: {
          grant_type: 'password',
          client_id: process.env.SALESFORCE_CLIENT_ID,
          client_secret: process.env.SALESFORCE_CLIENT_SECRET,
          username: process.env.SALESFORCE_USERNAME,
          password: `${process.env.SALESFORCE_PASSWORD}${process.env.SALESFORCE_TOKEN}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Salesforce Authentication Error:', error);
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
    await axios.post(
      `${instanceUrl}/services/data/v57.0/sobjects/Lead`,
      leadData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Salesforce Lead Creation Error:', error);
    throw new Error('Failed to create lead in Salesforce');
  }
} 
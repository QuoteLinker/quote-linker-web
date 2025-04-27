/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Enable mock mode in development
    SF_INSTANCE_URL: process.env.NODE_ENV === 'development' ? '' : process.env.SF_INSTANCE_URL,
    SF_CLIENT_ID: process.env.NODE_ENV === 'development' ? '' : process.env.SF_CLIENT_ID,
    SF_CLIENT_SECRET: process.env.NODE_ENV === 'development' ? '' : process.env.SF_CLIENT_SECRET,
    SF_API_VERSION: process.env.SF_API_VERSION || 'v57.0',
    SALESFORCE_LOGIN_URL: process.env.SALESFORCE_LOGIN_URL,
    SALESFORCE_CLIENT_ID: process.env.SALESFORCE_CLIENT_ID,
    SALESFORCE_CLIENT_SECRET: process.env.SALESFORCE_CLIENT_SECRET,
    SALESFORCE_USERNAME: process.env.SALESFORCE_USERNAME,
    SALESFORCE_PASSWORD: process.env.SALESFORCE_PASSWORD,
    SALESFORCE_TOKEN: process.env.SALESFORCE_TOKEN,
  },
  async redirects() {
    return [
      {
        source: '/api/auth/callback/salesforce',
        destination: '/api/auth/callback/salesforce',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig 
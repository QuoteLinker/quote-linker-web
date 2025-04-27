/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Enable mock mode in development
    SF_INSTANCE_URL: process.env.NODE_ENV === 'development' ? '' : process.env.SF_INSTANCE_URL,
    SF_CLIENT_ID: process.env.NODE_ENV === 'development' ? '' : process.env.SF_CLIENT_ID,
    SF_CLIENT_SECRET: process.env.NODE_ENV === 'development' ? '' : process.env.SF_CLIENT_SECRET,
    SF_API_VERSION: process.env.SF_API_VERSION || 'v57.0',
  },
}

module.exports = nextConfig 
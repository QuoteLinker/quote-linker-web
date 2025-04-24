# Deployment Guide for QuoteLinker Web

This guide will help you deploy the QuoteLinker Web application to Vercel.

## Prerequisites

- A GitHub account with the QuoteLinker Web repository
- A Vercel account (you can sign up at [vercel.com](https://vercel.com))

## Deploying to Vercel

1. **Connect to GitHub**

   - Log in to your Vercel account
   - Click on "Add New..." and select "Project"
   - Connect your GitHub account if you haven't already
   - Select the `quotelinker-web` repository

2. **Configure Project Settings**

   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `next build`
   - **Output Directory**: .next
   - **Install Command**: `npm install` or `yarn install`

3. **Environment Variables**

   - No environment variables are required for initial deployment
   - For future integrations (Salesforce, Google Analytics), you'll add environment variables here

4. **Deploy**

   - Click "Deploy" to start the deployment process
   - Vercel will automatically build and deploy your application

## Post-Deployment

1. **Verify Deployment**

   - Check that all pages load correctly
   - Test the form submission functionality
   - Verify that the `/api/submit` route works as expected

2. **Connect Custom Domain**

   - In the Vercel dashboard, go to your project settings
   - Navigate to the "Domains" section
   - Add your custom domain (e.g., quotelinker.com)
   - Follow the instructions to configure DNS settings with your domain provider

3. **Set Up Continuous Deployment**

   - Vercel automatically sets up continuous deployment
   - Any changes pushed to the main branch will trigger a new deployment

## Troubleshooting

- **Build Failures**: Check the build logs in the Vercel dashboard
- **API Route Issues**: Verify that the `/api/submit` route is correctly implemented
- **Domain Issues**: Ensure DNS settings are correctly configured

## Next Steps

After successful deployment, you can proceed with:

1. **Salesforce Integration**
   - Update the `/api/submit` route to send form data to Salesforce
   - Add necessary environment variables for Salesforce authentication

2. **Google Analytics + Tag Manager**
   - Add Google Analytics tracking code
   - Set up Google Tag Manager for more advanced tracking 
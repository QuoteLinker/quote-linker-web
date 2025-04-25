# QuoteLinker Web

QuoteLinker is a modern insurance quote platform that helps users find the right insurance coverage for their needs. The platform provides quotes for various insurance types including auto, home, life, health, and disability insurance.

## Features

- **Multiple Insurance Types**: Support for auto, home, life, health, and disability insurance
- **Streamlined Quote Process**: Simple form to collect user information and insurance needs
- **Mobile-Friendly Design**: Responsive layout with sticky CTAs for better mobile conversion
- **Modern UI**: Clean, professional design with improved spacing and visual elements

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Form Handling**: Client-side form submission with API routes

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/quotelinker-web.git
   cd quotelinker-web
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   ```bash
   # Create a .env.local file and add the following variables:
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/xxx
   ```

   ⚠️ **IMPORTANT: Security Warning**
   - Never commit sensitive keys to version control
   - Keep your .env.local file private
   - Only use NEXT_PUBLIC_ prefix for variables needed on the client side
   - Store sensitive API keys and webhooks securely
   - Regularly rotate production keys

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `/src/app`: Next.js App Router pages and API routes
- `/src/components`: Reusable UI components
- `/src/utils`: Utility functions and data

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables on Vercel

1. Go to Vercel > Project Settings > Environment Variables
2. Add the required environment variables:
   - `NEXT_PUBLIC_GTM_ID`: Your Google Tag Manager container ID
   - `NEXT_PUBLIC_GA_ID`: Your Google Analytics measurement ID
   - `ZAPIER_WEBHOOK_URL`: Your Zapier webhook URL for form submissions

### Security Best Practices

- Use environment variables for all sensitive data
- Implement rate limiting on API routes
- Validate form submissions server-side
- Keep dependencies updated
- Follow security advisories
- Monitor for unusual activity

## Build

```bash
npm run build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support, please contact:
- Email: support@quotelinker.com
- Phone: 1-800-555-0123 
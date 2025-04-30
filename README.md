# QuoteLinker Web

QuoteLinker is a modern web application that connects users with licensed insurance agents to get personalized quotes for auto, home, life, and health insurance.

## Features

- **Multi-step Quote Forms**: User-friendly forms for different insurance types
- **Page Transitions**: Smooth animations between pages using Framer Motion
- **Responsive Design**: Fully responsive layout for all device sizes
- **SEO Optimized**: Proper metadata, structured data, and sitemap
- **Accessibility**: WCAG AA compliant with proper ARIA attributes
- **Performance**: Optimized images, fonts, and bundle size
- **Analytics**: Google Tag Manager and Google Analytics integration
- **Error Tracking**: Sentry integration for client-side error tracking
- **PWA Support**: Installable as a Progressive Web App

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Testing**: Jest and React Testing Library
- **CI/CD**: GitHub Actions and Vercel

## Getting Started

### Prerequisites

- Node.js 20.x
- npm 10.x

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/QuoteLinker/quote-linker-web.git
   cd quote-linker-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_GTM_ID=your-gtm-id
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
   NEXT_PUBLIC_API_URL=your-api-url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Code Quality

- **Linting**: `npm run lint`
- **Formatting**: `npm run format`
- **Type Checking**: `npm run type-check`

### Testing

- **Unit Tests**: `npm run test`
- **Watch Mode**: `npm run test:watch`
- **Coverage**: `npm run test:coverage`
- **Smoke Tests**: `npm run smoke-test`

### Building for Production

```bash
npm run build
npm start
```

## Deployment

The application is automatically deployed to Vercel when changes are pushed to the `main` branch. The deployment process includes:

1. Linting
2. Type checking
3. Unit testing
4. Building
5. Deployment to Vercel

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vercel](https://vercel.com/) 
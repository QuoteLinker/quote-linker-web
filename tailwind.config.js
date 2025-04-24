/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#00F6FF',    // Primary accent
          secondary: '#4DF9FF',  // Secondary accent/hover
          headline: '#0A0A0A',   // Headline text
          body: '#1A1A1A',       // Body text
          background: '#F9FBFC', // Site background
          card: '#FFFFFF',       // Card background
        },
      },
      boxShadow: {
        'brand': '0 4px 12px rgba(0, 246, 255, 0.25)',
        'brand-lg': '0 8px 24px rgba(0, 246, 255, 0.25)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.brand.body'),
            h1: {
              color: theme('colors.brand.headline'),
            },
            h2: {
              color: theme('colors.brand.headline'),
            },
            h3: {
              color: theme('colors.brand.headline'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 
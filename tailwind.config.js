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
          primary: '#00F6FF',    // Primary accent for CTAs and brand elements
          secondary: '#4DF9FF',  // Hover state and secondary accents
          headline: '#0A0A0A',   // Main headlines
          body: '#1A1A1A',       // Body text
          background: '#F9FBFC', // Site background
          card: '#FFFFFF',       // Card/container background
        },
      },
      boxShadow: {
        'brand': '0 8px 16px rgba(0, 246, 255, 0.25)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
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
    require('@tailwindcss/forms'),
  ],
} 
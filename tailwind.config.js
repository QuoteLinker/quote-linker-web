/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#00e8ff',
        'brand-primary-dark': '#00cce6',
        'brand-secondary': '#0070f3',
        'brand-background': '#ffffff',
        'brand-card': '#ffffff',
        'brand-headline': '#1a1a1a',
        'brand-body': '#4a5568',
      },
      boxShadow: {
        'brand': '0 4px 14px 0 rgba(0, 118, 255, 0.1)',
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
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 
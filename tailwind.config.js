/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#00EEFD',
        'deep-navy': '#0B0B45',
        'cool-gray': '#F5F7FA',
        'dark-gray': '#333333',
        'white': '#FFFFFF',
      },
      boxShadow: {
        'brand': '0 4px 14px 0 rgba(0, 238, 253, 0.2)',
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
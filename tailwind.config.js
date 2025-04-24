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
          primary: '#00FFFF', // Neon aqua/cyan
          glow: 'rgba(0, 255, 255, 0.15)', // Glow effect color
          dark: '#00CCCC', // Darker shade for hover states
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 255, 255, 0.3)',
        'glow-lg': '0 0 30px rgba(0, 255, 255, 0.4)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 
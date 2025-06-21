var defaultTheme = require('tailwindcss/defaultTheme');

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
        primary: {
          '50': '#e8f0fe',
          '100': '#d2e1fd',
          '200': '#a5c3fb',
          '300': '#78a4f9',
          '400': '#4b86f7',
          '500': '#1A73E8',
          '600': '#155cba',
          '700': '#10458b',
          '800': '#0b2e5d',
          '900': '#05172e',
          '950': '#030b17'
        },
        accent: {
          '50': '#fff9e6',
          '100': '#fff3cc',
          '200': '#ffe799',
          '300': '#ffdb66',
          '400': '#ffcf33',
          '500': '#FFC107',
          '600': '#cc9a06',
          '700': '#997404',
          '800': '#664d03',
          '900': '#332701',
          '950': '#1a1401'
        },
        text: {
          primary: '#333333',
          body: '#555555',
        },
        background: {
          primary: '#FFFFFF',
          secondary: '#F8FAFB',
          accent: '#F0F4F8',
        },
        gray: {
          50: '#F8FAFB',
          100: '#F0F4F8',
          200: '#E9ECF2',
          300: '#DAE0E9',
          400: '#B3BFCF',
          500: '#8C9AAF',
          600: '#677489',
          700: '#4F5A6E',
          800: '#374151',
          900: '#1F2937',
        },
      },
      ring: {
        primary: '#1A73E8',
        accent: '#FFC107',
      },
      fontFamily: {
        sans: ['var(--font-inter)'].concat(defaultTheme.fontFamily.sans),
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
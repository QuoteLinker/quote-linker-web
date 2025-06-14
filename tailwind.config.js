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
        cyan: {
          50: '#e0fcff',
          100: '#befaff',
          200: '#9ef8ff',
          300: '#7df6ff',
          400: '#5cf3ff', // Lighter variant for hover if needed
          DEFAULT: '#00EEFD', // Main brand color
          500: '#00EEFD',     // Main brand color
          600: '#00D4E5',     // Hover/darker variant
          700: '#00b8c9',     // Adjusted darker shades
          800: '#009dad',
          900: '#008191',
          950: '#006575',
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: '#00EEFD', // Use for highlights and CTAs
        'electric-blue': '#00EEFD', // Main CTA color
        'deep-navy': '#0B0B45', // For hero backgrounds
        'cool-gray': '#F5F7FA', // For section backgrounds
        'dark-gray': '#212529', // For main text
        'white': '#FFFFFF',
        muted: {
          foreground: '#64748b', // For muted text
        },
      },
      fontFamily: {
        sans: ['Inter', 'Inter var', 'sans-serif'],
      },
      screens: {
        'xs': '375px', // iPhone 12 width
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'brand': '0 4px 14px 0 rgba(0, 238, 253, 0.2)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-fade': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
      },
      ringColor: {
        DEFAULT: '#00EEFD',
      },
      ringOffsetColor: {
        DEFAULT: '#FFFFFF',
      },
      ringOffsetWidth: {
        DEFAULT: '2px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: theme('colors.dark-gray'),
            a: {
              color: theme('colors.electric-blue'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
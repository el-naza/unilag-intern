/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
  prefix: '',
  safelist: ['lg:col-span-4', 'lg:col-span-6', 'lg:col-span-8', 'lg:col-span-12'],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        accent: {
          orange: '#FF9500',
          teal: '#5AC8FA',
          blue: '#007AFF',
        },
        primary: {
          DEFAULT: '#0B7077',
          foreground: 'white',
        },
        secondary: {
          DEFAULT: '#195F7E',
          foreground: 'white',
        },
        gray: {
          light: {
            1: '#8E8E93',
            2: '#ECECEC',
            5: '#F1F1F1',
          },
          dark: {
            2: '#454545',
            3: '#48484A',
          },
        },
        black: {
          1: '#1A1A1A',
          2: '#0B0B0B',
        },
      },
      fontFamily: {
        sans: ['var(--font-open-sans)'],
        poppins: ['var(--font-poppins)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
}

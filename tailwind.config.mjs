/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
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
      }
    },
    screens: {
      xs: '320px',   // extra small phones
      sm: '480px',   // small phones
      md: '768px',   // tablets
      lg: '1024px',  // laptops
      xl: '1280px',  // desktops
      '2xl': '1536px', // large desktops / wide screens
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        ring: '#5AC8FABC',
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
        tertiary: {
          DEFAULT: '#c5e0ed',
          foreground: 'black',
        },
        gray: {
          light: {
            2: '#ECECEC',
            5: '#F1F1F1',
          },
          dark: {
            2: '#454545',
            3: '#48484A',
            DEFAULT: '#8E8E93',
          },
        },
        black: {
          1: '#1A1A1A',
          2: '#0B0B0B',
          DEFAULT: 'black',
        },
        error: '#FF3B30',
        popover: {
          DEFAULT: 'white',
          foreground: 'black',
        },
        muted: {
          foreground: '#ECECEC',
        },
        input: '#F1F1F1',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)'],
        poppins: ['var(--font-poppins)'],
        inter: ['var(--font-inter)'],
        nunito: ['var(--font-nunito)'],
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
    },
  },
}

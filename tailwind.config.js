/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: '#2A3F5F',
        divider: '#1F2F45',
        input: '#1A2942',
        ring: '#FF6B35',
        background: '#0A1628',
        foreground: '#FFFFFF',
        primary: {
          DEFAULT: '#FF6B35',
          foreground: '#FFFFFF',
        },
        primaryHover: '#E55A2B',
        bgDark: '#0A1628',
        bgCard: '#152238',
        bgInput: '#1A2942',
        textPrimary: '#FFFFFF',
        textSecondary: '#8B9BB0',
        textMuted: '#5A6B7F',
        success: '#00D68F',
        warning: '#FFB800',
        error: '#FF4757',
        secondary: {
          DEFAULT: '#8B9BB0',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#FF4757',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#5A6B7F',
          foreground: '#8B9BB0',
        },
        accent: {
          DEFAULT: '#FF6B35',
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT: '#152238',
          foreground: '#FFFFFF',
        },
        card: {
          DEFAULT: '#152238',
          foreground: '#FFFFFF',
        },
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '40px',
        '3xl': '48px',
        '4xl': '64px',
        '5xl': '80px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
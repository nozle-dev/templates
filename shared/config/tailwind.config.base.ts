import type { Config } from 'tailwindcss'

export const baseConfig: Partial<Config> = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        // Primary (Nozle Violet)
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          hover: 'hsl(var(--primary-hover))',
          active: 'hsl(var(--primary-active))',
          soft: 'hsl(var(--primary-soft))',
          muted: 'hsl(var(--primary-muted))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // Semantic States
        success: {
          DEFAULT: 'hsl(var(--success))',
          soft: 'hsl(var(--success-soft))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          soft: 'hsl(var(--warning-soft))',
        },
        error: {
          DEFAULT: 'hsl(var(--error))',
          soft: 'hsl(var(--error-soft))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--error))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // Text
        ink: 'hsl(var(--ink))',
        body: 'hsl(var(--body))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          soft: 'hsl(var(--muted-soft))',
          foreground: 'hsl(var(--muted))',
        },
        // Surfaces
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        canvas: 'hsl(var(--canvas))',
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          soft: 'hsl(var(--surface-soft))',
          strong: 'hsl(var(--surface-strong))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Borders
        border: {
          DEFAULT: 'hsl(var(--border))',
          soft: 'hsl(var(--border-soft))',
          strong: 'hsl(var(--border-strong))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // Legacy shadcn compatibility
        secondary: {
          DEFAULT: 'hsl(var(--surface-soft))',
          foreground: 'hsl(var(--foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--surface-soft))',
          foreground: 'hsl(var(--foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
        xs: '2px',
      },
      fontSize: {
        'display-xl': ['32px', { lineHeight: '1.25', letterSpacing: '-0.64px', fontWeight: '700' }],
        'display-lg': ['28px', { lineHeight: '1.29', letterSpacing: '-0.56px', fontWeight: '600' }],
        'display-md': ['24px', { lineHeight: '1.33', letterSpacing: '-0.48px', fontWeight: '600' }],
        'display-sm': ['20px', { lineHeight: '1.4', letterSpacing: '-0.2px', fontWeight: '600' }],
        'title-lg': ['18px', { lineHeight: '1.44', fontWeight: '600' }],
        'title-md': ['16px', { lineHeight: '1.5', fontWeight: '600' }],
        'title-sm': ['14px', { lineHeight: '1.43', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '1.5' }],
        'body-md': ['14px', { lineHeight: '1.57' }],
        'body-sm': ['13px', { lineHeight: '1.54' }],
        'caption': ['12px', { lineHeight: '1.5', fontWeight: '500' }],
        'caption-sm': ['11px', { lineHeight: '1.45' }],
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['Monaco', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        xl: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
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
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

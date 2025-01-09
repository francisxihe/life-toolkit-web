import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        border: {
          DEFAULT: 'var(--color-border-1)',
          1: 'var(--color-border-1)',
          2: 'var(--color-border-2)',
          3: 'var(--color-border-3)',
        },
        background: {
          DEFAULT: 'var(--color-bg-1)',
          1: 'var(--color-bg-1)',
          2: 'var(--color-bg-2)',
        },
        text: {
          DEFAULT: 'var(--color-text-2)',
          1: 'var(--color-text-1)',
          2: 'var(--color-text-2)',
          3: 'var(--color-text-3)',
          4: 'var(--color-text-4)',
        },
        fill: {
          DEFAULT: 'var(--color-fill-1)',
          1: 'var(--color-fill-1)',
          2: 'var(--color-fill-2)',
          3: 'var(--color-fill-3)',
        },
        danger: {
          DEFAULT: 'rgb(var(--danger-6))',
          1: 'rgb(var(--danger-1))',
          2: 'rgb(var(--danger-2))',
          3: 'rgb(var(--danger-3))',
          4: 'rgb(var(--danger-4))',
          5: 'rgb(var(--danger-5))',
          6: 'rgb(var(--danger-6))',
        },
        success: {
          DEFAULT: 'rgb(var(--success-6))',
          1: 'rgb(var(--success-1))',
          2: 'rgb(var(--success-2))',
          3: 'rgb(var(--success-3))',
          4: 'rgb(var(--success-4))',
          5: 'rgb(var(--success-5))',
          6: 'rgb(var(--success-6))',
        },
        warning: {
          DEFAULT: 'rgb(var(--warning-6))',
          1: 'rgb(var(--warning-1))',
          2: 'rgb(var(--warning-2))',
          3: 'rgb(var(--warning-3))',
          4: 'rgb(var(--warning-4))',
          5: 'rgb(var(--warning-5))',
          6: 'rgb(var(--warning-6))',
        },
        link: {
          DEFAULT: 'rgb(var(--link-6))',
          1: 'var(--link-1)',
          2: 'var(--link-2)',
          3: 'var(--link-3)',
          4: 'var(--link-4)',
          5: 'var(--link-5)',
          6: 'var(--link-6)',
        },

        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontSize: {
        DEFAULT: '14px',
        'body-1': '12px',
        'body-2': '13px',
        'body-3': '14px',
        caption: '12px',
        'title-1': '16px',
        'title-2': '20px',
        'title-3': '24px',
      },
      borderRadius: {
        lg: 'var(--border-radius-large)',
        md: 'var(--border-radius-medium)',
        sm: 'var(--border-radius-small)',
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
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  // plugins: [require('tailwindcss-animate')],
};

export default config;

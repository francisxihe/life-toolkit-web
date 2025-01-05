import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        border: {
          default: 'var(--color-border-1)',
          1: 'var(--color-border-1)',
          2: 'var(--color-border-2)',
          3: 'var(--color-border-3)',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: {
          default: 'var(--color-bg-1)',
          1: 'var(--color-bg-1)',
          2: 'var(--color-bg-2)',
        },
        text: {
          default: 'var(--color-text-1)',
          1: 'var(--color-text-1)',
          2: 'var(--color-text-2)',
          3: 'var(--color-text-3)',
        },

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

        'fill-2': 'var(--color-fill-2)',
        'fill-3': 'var(--color-fill-3)',

        // secondary: 'var(--secondary)',
        danger: 'var(--danger)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        link: 'var(--link)',
        'primary-primary': 'var(--primary-primary)',
        'primary-hover': 'var(--primary-hover)',
        'primary-active': 'var(--primary-active)',
        'primary-disable': 'var(--primary-disable)',
        'primary-selected': 'var(--primary-selected)',
        'primary-selected-2': 'var(--primary-selected-2)',
        'text-title': 'var(--text-title)',
        'text-body': 'var(--text-body)',
        'text-caption': 'var(--text-caption)',
        'text-hint': 'var(--text-hint)',
        'text-disable': 'var(--text-disable)',
        'background-page': 'var(--background-page)',
        'background-card': 'var(--background-card)',
        'background-toptips': 'var(--background-toptips)',
        'line-0': 'var(--line-0)',
        'line-1': 'var(--line-1)',
        'line-2': 'var(--line-2)',
        'line-focus': 'var(--line-focus)',
        'static-background': 'var(--static-background)',
        'static-background-active': 'var(--static-background-active)',
        'static-line-hover': 'var(--static-line-hover)',
        'static-white': 'var(--static-white)',
        'mask-5': 'var(--mask-5)',
        'mask-30': 'var(--mask-30)',
        'mask-50': 'var(--mask-50)',
        'icon-primary': 'var(--icon-primary)',
        'icon-normal': 'var(--icon-normal)',
        'icon-secondary': 'var(--icon-secondary)',
        'icon-disable': 'var(--icon-disable)',
        'fill-press': 'var(--fill-press)',
        'fill-hover': 'var(--fill-hover)',
        'fill-fill': 'var(--fill-fill)',
        'fill-fill-1': 'var(--fill-fill-1)',
        'fill-hover-1': 'var(--fill-hover-1)',
        'fill-press-1': 'var(--fill-press-1)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
  plugins: [require('tailwindcss-animate')],
};

export default config;

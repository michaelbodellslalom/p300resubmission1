import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        primary: {
          600: '#0891B2',
          500: '#06B6D4',
          400: '#22D3EE',
        },
        // Secondary
        accent: {
          500: '#0EA5E9',
        },
        // Status
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
        // Neutrals
        slate: {
          950: '#0F172A',
          900: '#111827',
          800: '#1E293B',
          700: '#334155',
          400: '#94A3B8',
          100: '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;

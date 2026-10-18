import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ['var(--font-script)', 'cursive'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        editorial: {
          bg: '#F6F2EA',
          ink: '#231C18',
          bronze: '#8C6D46',
          stone: '#78756F',
          border: '#E2D9C8',
        },
        darkluxe: {
          bg: '#0D0C0B',
          copper: '#C87D55',
          gold: '#D4AF37',
          ivory: '#F2ECE4',
          muted: '#27272A',
        },
        heritage: {
          sand: '#F4EFEA',
          mauve: '#8E5B52',
          cocoa: '#2B211E',
          brass: '#B08D57',
          clay: '#9E4733',
          espresso: '#231A16',
        },
      },
    },
  },
  plugins: [],
};

export default config;

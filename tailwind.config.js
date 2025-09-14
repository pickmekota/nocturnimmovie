import { ModuleGraph } from 'vite';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        nocturnum: {
          900: '#07060a',
          800: '#0b0a10',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          neon: '#7c3aed',
        },
      },
      boxShadow: {
        neon: '0 6px 24px rgba(124,58,237,0.18), 0 2px 6px rgba(6,182,212,0.08)',
      },
      keyframes: {
        glow: {
          '0%,100%': { boxShadow: '0 0 0px rgba(124,58,237,0.0)' },
          '50%': { boxShadow: '0 0 18px rgba(124,58,237,0.18)' },
        },
      },
      animation: {
        glow: 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

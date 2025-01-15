// Imports:
import daisyui from 'daisyui';

// Plugins:
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html', 
    './src/**/*.{js,jsx}',
    "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-family)"],
      },
      colors: {
        primary: '#008CFF',
        heading_layer: '#151515',
        regular_layer: '#1E1E1E'
      },
      backgroundColor: {
        primary: '#008CFF',
        background: '#F5F7F9',
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
};

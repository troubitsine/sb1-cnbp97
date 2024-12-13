/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'md': '720px', // New breakpoint at 720px
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
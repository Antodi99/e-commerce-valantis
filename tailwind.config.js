/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-black': '#242124',
      },
      height: {
        'main': 'calc(100vh - 5rem)'
      }
    },
  },
  plugins: [],
};

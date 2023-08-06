/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        pri: '#5d4dbf',
        'pri-dark': '#463a8f',
        'pri-light': '#867acf',
        secondary: '#4B5563',
      },
    },
  },
  plugins: [],
};

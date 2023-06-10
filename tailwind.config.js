const { colors } = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1360px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      colors: {
        ...colors,
        'my-color1': '#eef2ff', //indigo
        'my-color2': '#e0e7ff',
        'my-color3': '#c7d2fe',
        'my-color4': '#a5b4fc',
        'my-color5': '#818cf8',
        'my-color6': '#6366f1',
        'my-color7': '#4f46e5',
        'my-color8': '#4338ca',
        'my-color9': '#312e81',
        'my-color10': '#1e1b4b',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

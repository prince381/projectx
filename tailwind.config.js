/** @type {import('tailwindcss').Config} */
import { screens } from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '320px',
        'xs': '450px',
        ...screens
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'tablet': { 'min': '767px', 'max': '1023px' },

      'mobile': { 'min': '390px', 'max': '767px' },
    },
  },
  plugins: [],
}


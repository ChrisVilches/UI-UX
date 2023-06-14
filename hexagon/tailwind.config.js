/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hex-tile': {
          gray: '#222222',
          red: '#220000'
        },
        'background-color': {
          dark: '#0a0a0a',
          light: '#fafafa'
        }
      }
    },
  },
  plugins: [],
}


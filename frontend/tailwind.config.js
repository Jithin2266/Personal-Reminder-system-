/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0a', // Deep black
        card: '#171717', // Slightly lighter black for cards
        primary: '#FFD700', // Bright Premium Yellow
        secondary: '#FBBF24', // Amber/Yellow shade
        accent: '#FDE047', // Light yellow
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

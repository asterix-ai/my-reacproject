/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode using a class (e.g., 'dark' on html or body)
  content: [
    \"./src/**/*.{js,jsx,ts,tsx}\",
    \"./public/index.html\",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        purple: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        cyan: {
          500: '#06b6d4',
        },
        rose: {
          500: '#f43f5e',
        },
        pink: { // Added for the gradient example
          500: '#ec4899',
        },
      },
      fontFamily: {
        // Example custom font if needed
        // sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
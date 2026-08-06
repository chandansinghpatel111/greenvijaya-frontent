/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-burgundy': '#3d1e24',
        'brand-gold': '#e0a973',
      },
    },
  },
  plugins: [],
}
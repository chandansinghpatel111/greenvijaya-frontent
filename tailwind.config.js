/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color:{
        primary: '#d8232',  // Customize the primary color
        secondary: '#ec9322',  // Customize the secondary color
         
      },
    },
  },
  plugins: [],
}
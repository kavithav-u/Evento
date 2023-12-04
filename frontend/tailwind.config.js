/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        adelia: ["ADELIA", "cursive"],
      },
      colors: {
        customColor: '#ff00ff', // Add your custom color here
        primary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          // ... other shades
          900: '#1a202c',
        },
      },
    },
  },
  plugins: [],
}


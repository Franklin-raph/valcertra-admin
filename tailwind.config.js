/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          "primary-color": "var(--primary-color)",
          "secondary-color": "var(--secondary-color)",
          "ascent-color": "var(--ascent-color)",
          "text-color":"var(--text-color)"
      },
    },
  },
  plugins: [],
}
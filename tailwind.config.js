/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#1ebaff",
        "secondary": "#3B82F6",
        "accent": "#2563EB",
      },
    },
  },
  plugins: [],
}
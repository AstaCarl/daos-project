/** @type {import('tailwindcss').Config} */

// tailwind theme configuration
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: "oswald, sans-serif",
        sans: "montserrat, sans-serif",
      },
      fontSize: {
        xs: ["10px", "10px"],
      },
      colors: {
        red: "#BF1E2E",
        blue: "#353A5D",
        grey: "#F0F0F0",
        'light-grey': "#F9F9F9",
        'dark-grey': "#777777",
        'accent-grey': "#DDDDDD"

      },
    },
  },
  plugins: [],
};

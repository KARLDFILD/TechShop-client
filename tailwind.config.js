/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "max-xs": { max: "480px" }, // max-width 480px
        "max-lg": { max: "1200px" },
        "max-md": { max: "780px" },
      },
    },
  },
  plugins: [],
};

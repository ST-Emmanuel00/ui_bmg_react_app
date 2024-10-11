// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        wave: "url('src/assets/wave.svg')",
        'login': "url('src/assets/BMG_loginbg.jpg')",
      },
      colors: {
        customRed: "#9e3030",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"], // Agrega la nueva fuente aquí
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require('daisyui')],
};

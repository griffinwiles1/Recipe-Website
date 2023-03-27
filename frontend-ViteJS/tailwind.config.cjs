/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        light: "#c4d6e0",
        lightMed: "#93a4ad",
        lightHeavy: "#697c86",
        
        dark: "#3b5363",
        darkMed: "#28414d",
        darkHeavy: "#20303b",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "420px",
      ss: "620px",
      sm: "768px",
      md: "1024px",
      lg: "1440px",
      xl: "2000px",
    },
  },
  plugins: [],
};
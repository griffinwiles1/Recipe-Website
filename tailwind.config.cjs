/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primaryWhite: "#c4c1bd",
        secondaryWhite: "#f5f2eb",
        primaryDark: "#20303b",
        secondaryDark: "#415a68",
        primaryBlue: "#1997d4",
        footerPrimary: "#3e525b",
        footerSecondary: "#93a4ad",
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
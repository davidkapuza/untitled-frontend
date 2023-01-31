const colors = require("tailwindcss/colors");

module.exports = {
  content: [`src/**/*.{js,ts,jsx,tsx}`],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", "sans-serif"],
      },
      colors: {
        black: "#1C1E20"
      },
      fontSize: {
        xs: "0.625rem"
      }
    },
  },
  plugins: [],
};

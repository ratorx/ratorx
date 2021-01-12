const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./build/public/web/*.html', './build/public/web/*.js'],
  theme: {
    extend: {
      inset: (theme, { negative }) => ({
        ...theme("spacing"),
        ...negative(theme("spacing")),
      }),
      colors: {
        blue: {
          100: "#EBF8FF",
          200: "#BEE3F8",
          300: "#90CDF4",
          400: "#63B3ED",
          500: "#4299E1",
          600: "#3182CE",
          700: "#2B6CB0",
          800: "#2C5282",
          900: "#2A4365",
        },
        green: {
          100: "#F0FFF4",
          200: "#C6F6D5",
          300: "#9AE6B4",
          400: "#68D391",
          500: "#48BB78",
          600: "#38A169",
          700: "#2F855A",
          800: "#276749",
          900: "#22543D",
        },
        gray: colors.blueGray,
      }
    },
  },
  variants: ["responsive", "hover", "focus", "active", "disabled"],
  plugins: [],
};


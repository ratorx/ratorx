module.exports = {
  purge: false,
  theme: {
    extend: {
      inset: (theme, { negative }) => ({
        ...theme("spacing"),
        ...negative(theme("spacing")),
      }),
    },
  },
  variants: ["responsive", "hover", "focus", "active", "disabled"],
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};

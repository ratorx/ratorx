module.exports = {
  purge: false,
  theme: {
    extend: {},
  },
  variants: ["responsive", "hover", "focus", "active", "disabled"],
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-gray-1": "#646464",
        "custom-gray-2": "#2f2f2f",
        "custom-gray-3": "#1e1e1e",
        "custom-orange": "#FF725E",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    plugin(function ({ addVariant }) {
      addVariant("not-last", "&:not(:last-child)");
    }),
  ],
};

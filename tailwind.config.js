/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
    "./src/config/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: "var(--wp--preset--font-family--aboreto)",
      },
      colors: {
        "slate-steel-color": "var(--wp--preset--color--slate-steel-color)",
        "slate-steel-color-hover":
          "var(--wp--preset--color--slate-steel-color-hover)",
        "green-teal-tym": "var(--wp--preset--color--green-teal-tym)",
        "green-teal-tym-hover":
          "var(--wp--preset--color--green-teal-tym-hover)",
        "amber-yellow": "var(--wp--preset--color--amber-yellow)",
        "amber-yellow-hover": "var(--wp--preset--color--amber-yellow-hover)",
      },
    },
  },
  plugins: [],
};

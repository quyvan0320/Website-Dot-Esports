/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], 
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: {
          lightbold: "#f8f9f9",
          gray: "#dedfe1",
          light: "#fefefe",
          greenpale: "#6399a1",
          bluebold: "#08141e",
          bluepale: "#434c57",
        },
      },
    },
  },
  plugins: [],
};

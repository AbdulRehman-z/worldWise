/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorbrand: {
          1: "#ffb545",
          2: "#00c46a",
        },
        colorDark: {
          0: "#242a2e",
          1: "#2d3439",
          2: "#42484d",
        },
        colorLight: {
          1: "#aaa",
          2: "#ececec",
          3: "#d6dee0",
        },
        gradientColor: "rgba(36, 42, 46, 0.8)",
      },
    },
  },
  plugins: [],
};

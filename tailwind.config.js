/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ccdd35",
        secondary: "#17c9dd",
      },
      gridTemplateRows: {
        "auto-1fr": "auto 1fr",
        "auto-repeat-1fr": "auto repeat(1fr)",
      },
      keyframes: {
        "center-in": {
          "0%": {
            transform: "translateY(-55%) scale(3.5)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "100%": {
            transform: "none",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
      animation: {
        "center-in": "center-in 0.5s linear",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xs: "250px",
        // => @media (min-width: 250px) { ... }
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "bounce-a-bit": "bounce-a-bit 1s infinite",
      },
      keyframes: {
        "bounce-a-bit": {
          "0%": {
            transform: "translateY(-5%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
          "100%": {
            transform: "translateY(-5%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulseGlow: {
          "0%, 100%": {
            opacity: 0.7,
            boxShadow: "0 0 5px 2px rgba(76, 175, 80, 0.5)",
          },
          "50%": {
            opacity: 1,
            boxShadow: "0 0 10px 4px rgba(76, 175, 80, 0.8)",
          },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

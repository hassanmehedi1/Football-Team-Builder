/** @type {import('tailwindcss').Config} */
module.exports = {
  // Important: Point to files using Tailwind classes
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {}, // Add custom theme extensions here if needed
  },
  plugins: [],
  // Optional: Add prefix to avoid clashes with MUI if needed, though often not necessary with careful use
  // prefix: 'tw-',
  // Important: To work nicely with MUI's styling engine
  corePlugins: {
    preflight: false, // Disable Tailwind's base resets if using MUI's CssBaseline
  },
};

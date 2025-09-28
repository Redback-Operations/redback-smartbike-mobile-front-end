/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure this points to your source code
    "./src/**/*.{js,tsx,ts,jsx}",
  ],
  darkMode: 'class', // Enable dark mode support
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "brand-purple": "#340C4C",
        "brand-orange": "#EB7363",
        "brand-port": "#5C244C",
        "brand-rouge": "#9C4454",
        // Dark theme colors
        "dark-bg": "#111827",
        "dark-surface": "#1F2937",
        "dark-card": "#1F2937",
        "dark-text": "#F9FAFB",
        "dark-text-secondary": "#D1D5DB",
        "dark-border": "#374151",
      },
    },
  },
  plugins: [],
};

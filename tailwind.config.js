/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D14444",
        secondary: "#111827",
        accent: "#E6B800",
        background: "#1E1E2E",
        text: "#D0D0D0",
      },
      fontFamily: {
        rpg: ["'MedievalSharp'", "'Press Start 2P'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

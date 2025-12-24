import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        win95: {
          gray: "#C0C0C0",
          darkgray: "#808080",
          lightgray: "#E8E8E8",
          navy: "#000080",
          navyLight: "#1084D0",
          yellow: "#FFFFCC",
        },
      },
      fontFamily: {
        system: ['"MS Sans Serif"', '"Segoe UI"', "Tahoma", "Geneva", "Verdana", "sans-serif"],
        heading: ['"Arial Black"', "Impact", "Haettenschweiler", "sans-serif"],
        mono: ['"Courier New"', "Courier", "monospace"],
      },
      animation: {
        rainbow: "rainbow 4s linear infinite",
        "pulse-glow": "pulse-glow 1.5s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        rainbow: {
          "0%": { color: "#ff0000" },
          "17%": { color: "#ff8000" },
          "33%": { color: "#ffff00" },
          "50%": { color: "#00ff00" },
          "67%": { color: "#0080ff" },
          "83%": { color: "#8000ff" },
          "100%": { color: "#ff0000" },
        },
        "pulse-glow": {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(255, 0, 0, 0.7)",
          },
          "50%": {
            transform: "scale(1.05)",
            boxShadow: "0 0 10px 2px rgba(255, 0, 0, 0.5)",
          },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;


import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0E14",
        surface: "#11161F",
        surfaceLight: "#1A2130",
        border: "#232B3B",
        accent: {
          teal: "#2DD4BF",
          violet: "#8B5CF6",
          amber: "#F59E0B",
          rose: "#F43F5E"
        },
        textPrimary: "#E6EAF2",
        textMuted: "#8B94A8"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      boxShadow: {
        glow: "0 0 40px rgba(45, 212, 191, 0.15)"
      }
    }
  },
  plugins: []
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F2EA",
        card: "#FFFDF9",
        ink: "#211D19",
        muted: "#6F6558",
        line: "#E7DFD1",
        clay: {
          DEFAULT: "#B5572B",
          light: "#F0DCCB",
          dark: "#8C4220",
        },
        sage: {
          DEFAULT: "#5B6B4F",
          light: "#E3E9DA",
        },
        gold: "#C9A15A",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(33,29,25,0.04), 0 8px 24px rgba(33,29,25,0.06)",
      },
      borderRadius: {
        xl2: "1.1rem",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0B0B0D",
          surface: "#14141A",
        },
        ink: {
          primary: "#FFFFFF",
          secondary: "#A8A8B0",
        },
        gold: {
          DEFAULT: "#BA8A4B",
          light: "#E4C08A",
          deep: "#7A5A2E",
        },
        line: "#26262E",
        success: "#3FB950",
        error: "#F85149",
      },
      fontFamily: {
        display: ["var(--font-unbounded)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        // type scale
        caption: ["0.8125rem", { lineHeight: "1.4" }],
        body: ["1rem", { lineHeight: "1.7" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        h6: ["1.125rem", { lineHeight: "1.3", fontWeight: "600" }],
        h5: ["1.375rem", { lineHeight: "1.25", fontWeight: "600" }],
        h4: ["1.75rem", { lineHeight: "1.2", fontWeight: "700" }],
        h3: ["2.25rem", { lineHeight: "1.15", fontWeight: "700" }],
        h2: ["3rem", { lineHeight: "1.08", fontWeight: "700" }],
        h1: ["4rem", { lineHeight: "1.02", fontWeight: "800" }],
        display: ["5rem", { lineHeight: "1.0", fontWeight: "800" }],
      },
      maxWidth: {
        prose: "70ch",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #E4C08A 0%, #BA8A4B 45%, #7A5A2E 100%)",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(186,138,75,0.5), 0 18px 60px -20px rgba(186,138,75,0.35)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

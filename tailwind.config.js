import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./core/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxxs: "355px",
      xxs: "400px",
      xs: "468px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      semiXl: "1404px",
      "2xl": "1536px",
    },

    extend: {
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16",
      },
      gridTemplateColumns: {
        13: "repeat(13, minmax(0, 1fr))",
        14: "repeat(14, minmax(0, 1fr))",
        15: "repeat(15, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        vazirmatn: ["var(--font-vazirmatn)"],
        iranyekan: ["var(--font-iranyekan)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()], // TO GENERATE THEME AND CUSTOMIZE UI KIT => https://www.heroui.com/themes
};

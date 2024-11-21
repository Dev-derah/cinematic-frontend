import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "red-45": "#E50000",
        "red-50": "#FF0000",
        "red-55": "#FF1919",
        "red-60": "#FF3333",
        "red-80": "#FF9999",
        "red-90": "#FFCCCC",
        "red-95": "#FFE5E5",
        "red-99": "#FFFAFA",
        "black-06": "#0F0F0F",
        "black-08": "#141414",
        "black-10": "#1A1A1A",
        "black-12": "#1F1F1F",
        "black-15": "#262626",
        "black-20": "#333333",
        "black-25": "#404040",
        "black-30": "#4C4C4C",
        "grey-60": "#999999",
        "grey-65": "#A6A6A6",
        "grey-70": "#B3B3B3",
        "grey-75": "#BFBFBF",
        "grey-90": "#E4E4E7",
        "grey-95": "#F1F1F3",
        "grey-97": "#F7F7F8",
        "grey-99": "#FCFCFD",
      },
    },
  },
  plugins: [],
};
export default config;

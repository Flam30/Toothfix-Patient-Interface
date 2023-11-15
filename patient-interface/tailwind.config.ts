import type { Config } from "tailwindcss";

const config: Config = {
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      background: "#FFF8F0",
      text: "#0A0A0A",
      primary: "#61B7DB",
      secondary: "#1A5974",
      accent: "#91DCFF",
      darkbackground: "#121212",
      darktext: "#F1F1F1",
      darkprimary: "#61B7DB",
      darksecondary: "#8BCAE5",
      darkaccent: "#004D70",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
      },
      fontFamily: {
        eina: ['var(--font-eina)']
      }
    },
    plugins: [],
  },
};
export default config;

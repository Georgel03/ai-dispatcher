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
        brand: {
          blue: "#5465FF",   // Albastrul electric
          green: "#34D399",  // Verde mentă
          dark: "#0B0F19",   // Negru adânc (Satelit/Footer)
          gray: "#F9FAFB",   // Fundal deschis
        }
      },
      fontFamily: {
        // Asigură-te că ai Inter configurat în layout.tsx!
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 30px -10px rgba(84, 101, 255, 0.5)',
      }
    },
  },
  plugins: [],
};
export default config;
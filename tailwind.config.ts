import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fellowship: {
          blue: {
            light: '#3b82f6',
            DEFAULT: '#1e3a8a', // Deep spiritual blue primary
            dark: '#172554',
          },
          gold: {
            light: '#fde047',
            DEFAULT: '#d97706', // Gold elegant accent
            dark: '#92400e',
          },
          white: '#ffffff',
          slate: '#f8fafc',
        }
      },
    },
  },
  plugins: [],
};
export default config;
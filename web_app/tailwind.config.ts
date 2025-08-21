import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",   
        secondary: "#06B6D4", 
        accent: "#F472B6",   
        danger: "#EF4444",    
        background: {
          light: "#F9FAFB",
          dark: "#111827",
        },
        text: {
          primary: "#1F2937",
          muted: "#6B7280",
        }
      },
      borderRadius: {
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.08)",
      }
    },
  },
  plugins: [],
}
export default config

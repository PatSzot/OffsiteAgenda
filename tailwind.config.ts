import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // AirOps offsite blue palette
        cobalt: {
          DEFAULT: "#1B1DB5",
          dark: "#14169A",
          light: "#2426CC",
        },
        lavender: {
          DEFAULT: "#EAEAF5",
          dark: "#D8D8EE",
        },
        indigo: {
          brand: "#2323A5",
        },
      },
      fontFamily: {
        // Saans — primary sans-serif (body, UI)
        sans: ["Saans", "Helvetica Neue", "sans-serif"],
        // Serrif VF — editorial serif (headlines)
        serif: ["Serrif VF", "Georgia", "serif"],
        // Saans Mono — labels, small caps, code
        mono: ["Saans Mono", "DM Mono", "monospace"],
      },
      fontSize: {
        // Display scale
        "display-xl": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2rem, 5vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        // Body scale
        "body-xl": ["1.25rem", { lineHeight: "1.5" }],
        "body-lg": ["1.125rem", { lineHeight: "1.55" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        // Label / mono scale
        "label-lg": ["0.875rem", { lineHeight: "1.2", letterSpacing: "0.08em" }],
        "label-sm": ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.1em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

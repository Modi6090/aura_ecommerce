/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F5A37",
          hover: "#0c472c",
        },
        accent: {
          DEFAULT: "#F9C80E",
          hover: "#e6b70b",
        },
        background: "#FAFAFA",
        card: "#FFFFFF",
      },
      borderRadius: {
        xl: "24px",
      },
      boxShadow: {
        soft: "0 4px 40px rgba(0, 0, 0, 0.05)",
        premium: "0 10px 50px rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    extend: {
      colors: {
        // Primary Colors
        primary: "#7C5DFA",
        primaryHover: "#9277FF",
        secondary: "#1e2139",
        "secondary-hover": "#252945",
        delete: "#EC5757",
        "delete-hover": "#FF9797",
        draft: "#DFE3FA",
        pending: "#FF8F00",
        paid: "#33D69F",

        // Background Colors
        backgroundlight: "#f5f5fc",
        backgroundDark: "#141625",

        // Nav and Title Colors
        "nav-light": "#373B53",
        "nav-dark": "#1E2139",
        "title-light": "#0C0E16",
        "title-dark": "#FFFFFF",

        // Text Colors
        light: "#7E88C3",
        dark: "#DFE3FA",

        // Input and Border Colors
        "bg-light": "#FFFFFF",
        "bg-dark": "#1E2139",
        "border-light": "#DFE3FA",
        hover: "#9277FF",
        "border-dark": "#1E2139",

        // Default Colors
        "default-light": "#F9FAFE",
        "default-light-hover": "#DFE3FA",
        "default-dark": "#F9FAFE",
        "default-dark-hover": "#DFE3FA",

        // Default Text Colors
        "default-text-light": "#7E88C3",
        "default-text-dark": "#7E88C3",

        // Item and Modal Colors
        "item-light": "#FFFFFF",
        "item-dark": "#1E2139",
        "modal-light": "#FFFFFF",
        "modal-dark": "#141625",

        // Item Content and Footer Colors
        "content-light": "#f5f6fc",
        "content-dark": "var(--secondary-color-hover)",
        "footer-light": "#373B53",
        "footer-dark": "#0C0E16",

        // User Background Colors
        "user-bg-light": "white",
        "user-bg-dark": "var(--secondary-color-hover)",
      },
      fontFamily: {
        sans: ["Spartan", "sans"],
      },
    },
  },
  variants: {},
  plugins: [],
};

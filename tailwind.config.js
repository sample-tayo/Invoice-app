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
        primary: "#7C5DFA",
        delete: "#EC5757",
        "delete-hover": "#FF9797",

        light: {
          body: {
            bg: "#f8f8fb",
          },
          sidebar: {
            bg: "#373b53",
          },
          form: {
            bg: "#ffffff",
            fieldBg: "#ffffff",
            fieldBorder: "#DFE3FA",
          },
          btn: {
            secondary: {
              bg: "#f9fafe",
              hover: "#dfe3fa",
              text: "#7e88c3",
            },
            tertiary: {
              bg: "#363b53",
              hover: "#0c0e16",
              text: "#888eb0",
            },
            quaternary: {
              bg: "#F9FAFE",
              hover: "#DFE3FA",
              text: "#7E88C3",
            },
          },
          invoiceItem: {
            bg: "#ffffff",
          },
          invoiceStatus: {
            bg: "rgba(55, 59, 83, 0.06)",
            text: "#373B53",
          },
          invoiceTable: {
            bg: "#f9fafe",
            footerBg: "#373b53",
          },
          popup: {
            bg: "#ffffff",
          },
          dropdown: {
            bg: "#ffffff",
            shadow: "rgba(72, 84, 159, 0.25)",
          },
          checkbox: {
            bg: "#dfe3fa",
          },
          text: {
            heading: "#0C0E16",
            bodyA: "#888eb0",
            bodyB: "#858BB2",
            formLabel: "#7E88C3",
            link: "#0c0e16",
            linkHover: "#7e88c3",
            // light: "#7E88C3",

            placeholder: "rgba(12, 14, 22)",
          },
        },
        dark: {
          body: {
            bg: "#141625",
          },
          sidebar: {
            bg: "#1e2139",
          },
          form: {
            bg: "#141625",
            fieldBg: "#1e2139",
            fieldBorder: "#252945",
          },
          btn: {
            secondary: {
              bg: "#252945",
              hover: "#ffffff",
              text: "#dfe3fa",
            },
            tertiary: {
              bg: "#363b53",
              hover: "#1e2139",
              text: "#dfe3fa",
            },
            quaternary: {
              bg: "#252945",
              hover: "#1e2139",
              text: "#DFE3FA",
            },
          },
          invoiceItem: {
            bg: "#1e2139",
          },
          invoiceStatus: {
            bg: "rgba(223, 227, 250, .06)",
            text: "#dfe3fa",
          },
          invoiceTable: {
            bg: "#252945",
            footerBg: "#0C0e16",
          },
          popup: {
            bg: "#1e2139",
          },
          dropdown: {
            bg: "#252945",
            shadow: "rgba(0, 0, 0, 0.25)",
          },
          checkbox: {
            bg: "#1e2139",
          },
          text: {
            heading: "#ffffff",
            bodyA: "#dfe3Fa",
            bodyB: "#ffffff",
            formLabel: "#dfe3fa",
            link: "#ffffff",
            linkHover: "#888eb0",
            placeholder: "#fff",
            dark: "#DFE3FA",
          },
        },
      },
      // colors: {
      //   // Primary Colors
      //   primary: "#7C5DFA",
      //   primaryHover: "#9277FF",
      //   secondary: "#1e2139",
      //   "secondary-hover": "#252945",
      //   draft: "#DFE3FA",
      //   pending: "#FF8F00",
      //   paid: "#33D69F",

      //   // Background Colors
      //   backgroundlight: "#f5f5fc",
      //   backgroundDark: "#141625",

      //   // Nav and Title Colors
      //   "nav-light": "#373B53",
      //   "nav-dark": "#1E2139",
      //   "title-light": "#0C0E16",
      //   "title-dark": "#FFFFFF",

      //   // Text Colors
      //   light: "#7E88C3",
      //   dark: "#DFE3FA",

      //   // Input and Border Colors
      //   "bg-light": "#FFFFFF",
      //   "bg-dark": "#1E2139",
      //   "border-light": "#DFE3FA",
      //   hover: "#9277FF",
      //   "border-dark": "#1E2139",

      //   // Default Colors
      //   "default-light": "#F9FAFE",
      //   "default-light-hover": "#DFE3FA",
      //   "default-dark": "#F9FAFE",
      //   "default-dark-hover": "#DFE3FA",

      //   // Default Text Colors
      //   "default-text-light": "#7E88C3",
      //   "default-text-dark": "#7E88C3",

      //   // Item and Modal Colors
      //   "item-light": "#FFFFFF",
      //   "item-dark": "#1E2139",
      //   "modal-light": "#FFFFFF",
      //   "modal-dark": "#141625",

      //   // Item Content and Footer Colors
      //   "content-light": "#f5f6fc",
      //   "content-dark": "var(--secondary-color-hover)",
      //   "footer-light": "#373B53",
      //   "footer-dark": "#0C0E16",

      //   // User Background Colors
      //   "user-bg-light": "white",
      //   "user-bg-dark": "var(--secondary-color-hover)",
      // },
      fontFamily: {
        sans: ["Spartan", "sans"],
      },
    },
  },
  variants: {},
  plugins: [],
};

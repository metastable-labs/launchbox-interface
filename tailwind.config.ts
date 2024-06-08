import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "base-github-button":
          "linear-gradient(180deg, rgba(55, 93, 251, 0.7) 0%, rgba(55, 93, 251, 1) 100%)",
        "optimism-github-button":
          "linear-gradient(180deg, rgba(223, 28, 65, 0.7) 0%, rgba(223, 28, 65, 1) 100%)",
        "mode-github-button":
          "linear-gradient(180deg, rgba(205, 255, 0, 0.7) 0%, rgba(205, 255, 0, 1) 100%)",
        "scroll-github-button":
          "linear-gradient(180deg, rgba(255, 237, 216, 0.7) 0%, rgba(255, 237, 216, 1) 100%)",
        "link-button":
          "linear-gradient(180deg, rgba(20, 20, 20, 0.7) 0%, rgba(32, 35, 45, 1) 100%)",
        "light-button-border":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)",
        "very-light-gray":
          "linear-gradient(180deg, rgba(228, 229, 231, 0.48) 0%, rgba(247, 248, 248, 0.00) 100%, rgba(228, 229, 231, 0.00) 100%)",
        "welcome-button":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.00) 100%), #002132",
      },
      colors: {
        primary: {
          50: "#E2E4E9",
          100: "#002132",
          150: "#0A0D14",
          200: "#F6F8FA",
          250: "#525866",
          300: "#EBF1FF",
          350: "#C2D6FF",
          400: "#131316",
          450: "#38C793",
          500: "#281D11",
          550: "#CDD0D5",
          600: "#FFFFFF33",
          650: "#101828",
          700: "#475467",
          750: "#868C98",
          800: "#F6F6F6",
          850: "#798597",
          900: "#E4E5E7",
          950: "#EAECF0",
          1000: "#375DFB",
          1050: "#DF1C41",
          1100: "#699000",
          1150: "#FFEDD8",
          1200: "#E3E3E8",
          1250: "#162664",
          1300: "#CDFF00",
          1350: "#D9D9D9",
          1400: "#F5F5F5",
          1450: "#163300",
          1500: "#9FE870",
          1550: "#E5E5E5",
          1600: "#ECFAE2",
          1650: "#0A0A0A",
          1700: "#737373",
          1750: "#FAFAFA",
          1800: "#20232D",
          1850: "#666D80",
          1900: "#0D0D12",
          1950: "#D0D5DD",
          2000: "#344054",
          2050: "#98A2B3",
          2100: "#155EEF",
          2150: "#F2F4F7",
          2200: "#667085",
          2250: "#F9FAFB",
          2300: "#004EEB",
          2350: "#164564",
          2400: "#C2EFFF",
        },
        grey: {
          50: "#717184",
        },
      },
      boxShadow: {
        "landing-nav":
          "0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 8px 10px -6px rgba(0, 0, 0, 0.10)",
        "nav-select-shadow": "0px 1px 2px 0px rgba(228, 229, 231, 0.24)",
        "wallet-icon-shadow":
          "0px -8px 16px 0px rgba(197, 199, 201, 0.48) inset",
        "base-github-button":
          "0px 1px 2px 0px rgba(37, 62, 167, 0.48), 0px 0px 0px 1px #375DFB",
        "optimism-github-button":
          "0px 1px 2px 0px rgba(175, 29, 29, 0.48), 0px 0px 0px 1px #E93535",
        "mode-github-button":
          "0px 1px 2px 0px rgba(36, 45, 1, 0.48), 0px 0px 0px 1px #CDFF00",
        "scroll-github-button":
          "0px 1px 2px 0px rgba(228, 195, 160, 0.48), 0px 0px 0px 1px #FFEEDA",
        "bland-new-button":
          "0px 1px 2px 0px rgba(188, 189, 196, 0.48), 0px 0px 0px 1px #EDEFF7",
        "table-cta": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        "fade-light": "0px 1.591px 3.182px 0px rgba(27, 28, 29, 0.04)",
        "fade-dark": "0px 1px 2px 0px rgba(82, 88, 102, 0.06)",
        "small-shadow": "0px 2px 4px 0px rgba(27, 28, 29, 0.04)",
        "hero-header":
          "0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 8px 10px -6px rgba(0, 0, 0, 0.10)",
        "very-light-gray":
          "0px 1.544px 3.089px 0px rgba(164, 172, 185, 0.24), 0px 0px 0px 1.544px rgba(18, 55, 105, 0.08)",
        "hero-header-alt": "0px 0px 10px -6px rgba(0, 0, 0, 0.10)",
        "welcome-button":
          "0px 1px 2px 0px rgba(0, 33, 50, 0.48), 0px 0px 0px 1px #002132",
        "link-button":
          "0px 1px 2px 0px rgba(27, 28, 29, 0.48), 0px 0px 0px 1px #242628",
        "tokenomics-shadow": "0px 4px 11px -1px rgba(10, 10, 10, 0.04)",
        "distribution-card-shadow":
          "0px 1.062px 2.123px 0px rgba(27, 28, 29, 0.04)",
        "preview-shadow": "0px 4px 24px 0px rgba(211, 211, 211, 0.15)",
        "preview-distribution-card-shadow":
          "0px 0.665px 1.33px 0px rgba(27, 28, 29, 0.04)",
      },
      borderRadius: {
        base: "5px",
      },
      fontFamily: {
        Biform: ["Biform"],
        Aeonik: ["Aeonik"],
      },
    },
  },
  plugins: [],
};
export default config;

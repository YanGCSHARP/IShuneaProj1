// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-100": "#2B2C35",
        "primary-blue-100": "#F5F8FF",
        "light-white": "rgba(59,60,152,0.03)",
      },
      backgroundImage: {
        "hero-bg": "url('/hero-bg.png')",
        "pattern": "url('/pattern.png')",
      },
    },
  },
  plugins: [],
}

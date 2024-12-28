/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3D52A0", // Deep blue
        secondary: "#7091E6", // Light blue
        tertiary: "#8697C4", // Soft grayish blue
        quaternary: "#ADBBDA", // Light lavender
        quinary: "#EDE8F5", // Very light lavender
      },
    },
  },
  plugins: [],
};

import animate  from 'tailwindcss-animated'
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors:{
        primary: {
          DEFAULT: "#011C40",
          50: "#E0E6F8",
          100: "#C7D4F5",
          200: "#8EA9E9",
          300: "#567EDF",
          400: "#2C58D3",
          500: "#1347DA", // Reemplazado
          600: "#1243A6",
          700: "#102360",
          800: "#0A163D",
          900: "#060D25",
          950: "#011C40",
          'extra1': "#1D64F2",
          'extra2': "#1243A6",
        },
        secondary: {
          DEFAULT: "#011C40",
          50: "#B0BFF2",
          100: "#9EB1EF",
          200: "#7B95E9",
          300: "#5879E4",
          400: "#355DDE",
          500: "#1347DA",
          600: "#1B3CA6",
          700: "#152F83",
          800: "#102360",
          900: "#0A163D",
          950: "#060D25",
        },
        accent: {
          DEFAULT: "#F24822",
          50: "#FDEBEA",
          100: "#FACDC8",
          200: "#F7AFA5",
          300: "#F48B7F",
          400: "#F3696D",
          500: "#F24822",
          600: "#DA401F",
          700: "#B6351A",
          800: "#912915",
          900: "#6C1D10",
          950: "#410F09",
        },
      },
      height: {
        'header': '4rem', // Altura predeterminada para todas las pantallas
        'header-sm': '64px', // Altura para pantallas pequeñas
        'header-md': '64px', // Altura para pantallas medianas
        'header-lg': '72px', // Altura para pantallas grandes
      },
    },
  },
  plugins: [animate],
}


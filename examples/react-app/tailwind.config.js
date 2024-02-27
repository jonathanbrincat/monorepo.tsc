import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "Commissioner", "Red Hat Display", "-apple-system", "BlinkMacSystemFont", "Helvetica Neue", ...defaultTheme.fontFamily.sans],
        hero: ["Galindo", defaultTheme.fontFamily.sans],
        mono: ["Sometype Mono", defaultTheme.fontFamily.mono],
      },
      fontSize: {
        xs: ["0.75rem", "150%"],
        sm: ["0.875rem", "150%"],
        base: ["1rem", "150%"],
        lg: ["1.125rem", "150%"],
        xl: ["1.25rem", "150%"],
        "2xl": ["1.5rem", "125%"],
        "3xl": ["1.875rem", "150%"],
        "4xl": ["2.25rem", "125%"],
        "5xl": ["3rem", "115%"],
        "6xl": ["4rem", "115%"],
        "7xl": ["4.5rem", "115%"],
        "8xl": ["5.25rem", "115%"],
      },
      colors: {
        "primary": "#6D013F",
      },
    },
  },
  plugins: [],
}


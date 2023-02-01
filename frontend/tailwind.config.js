/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors: {
            blue: 'rgb(var(--blue) / <alpha-value>)',
            red: 'rgb(var(--red) / <alpha-value>)',
            gray: 'rgb(var(--gray) / <alpha-value>)',
            lightBlue: 'rgb(var(--lightBlue) / <alpha-value>)',
    },
    extend: {},
  },
  plugins: [],
}

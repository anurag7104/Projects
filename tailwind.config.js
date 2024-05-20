/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        textPrimary:"#555",
        txtLight:'#999',
        txtDark:"#222",
        bgPrimary:"#f1f1f1",
      },
    },
  },
  plugins: [ require('tailwind-scrollbar'),],
}
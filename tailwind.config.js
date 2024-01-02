/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/components/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif']
      },
      boxShadow: {
        streak: "400px 400px 400px #e11d48, 450px 450px 400px #14b8f8"
      }
    },
  },
  plugins: [],
};

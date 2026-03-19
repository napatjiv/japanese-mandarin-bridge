/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        jp: ['"Noto Sans JP"', 'sans-serif'],
        sc: ['"Noto Sans SC"', 'sans-serif'],
        tc: ['"Noto Sans TC"', 'sans-serif'],
      },
      colors: {
        jp: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        cn: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
}

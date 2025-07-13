/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./blog.html",
    "./cart.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        macaron: {
          50: '#fef7f7',
          100: '#fdeeee',
          200: '#fbdcdc',
          300: '#f7c2c2',
          400: '#f19a9a',
          500: '#e86b6b',
          600: '#d94a4a',
          700: '#b73a3a',
          800: '#963333',
          900: '#7a2f2f',
        },
        pastel: {
          pink: '#fce7f3',
          lavender: '#f3e8ff',
          mint: '#ecfdf5',
          peach: '#fff7ed',
          blue: '#eff6ff',
          yellow: '#fefce8',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Quicksand', 'sans-serif'],
        'elegant': ['Cormorant Garamond', 'serif'],
      },
      boxShadow: {
        'macaron': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'scalloped': '50% 50% 50% 50% / 60% 60% 40% 40%',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 
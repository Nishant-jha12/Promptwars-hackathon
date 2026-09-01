/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        india: {
          saffron: '#FF9933',
          'saffron-dark': '#E07D1C',
          'saffron-light': '#FFF5EB',
          white: '#FFFFFF',
          green: '#138808',
          'green-dark': '#0E6606',
          'green-light': '#EBF7EB',
          blue: '#0B3B60',
          'blue-dark': '#07253D',
          'blue-light': '#E6F0F8',
          navy: '#002B49'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

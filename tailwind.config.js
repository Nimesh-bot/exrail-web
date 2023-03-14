/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontSize: {
      'xs': '0.55vw',
      'sm': '0.825vw',
      'lg': '1.115vw',
      'xl': '1.5vw',
    },
    fontFamily: {
      'heading': ['Tajawal', 'sans-serif'],
      'body': ['Tajawal', 'sans-serif'],
    },
    extend: {
      screens: {
        mf: '1600px',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'light': '#eeeeee',
        'light-plus': '#f7f7f7',
        'dark': '#222831',
        'dark-plus': '#1d242d',
        'primary': '#3B82F6',
        'primary-500': '#3b5df6',
        'primary-800': '#3e3bf6',
        'white': '#ffffff',
        'black': '#181818',
        'navBgDark': '#23293a',
        'fade': '#2B375260',
        'inputBgDark': '#29334d',
        'inputBgLight': '#e7e9e0',
      },
      transition: {
        'ease-in-out': 'all 0.3s ease-in-out',
      },
      keyframes: {
        'slide-up': {
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        'slide-down': {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(100%)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-in-out',
        'slide-down': 'slide-down 0.3s ease-in-out',
        'fade-in': 'fade-in 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
}

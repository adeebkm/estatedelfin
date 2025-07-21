/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(44 24 16 / 0.05)',
          100: 'rgb(44 24 16 / 0.1)',
          200: 'rgb(44 24 16 / 0.2)',
          300: 'rgb(44 24 16 / 0.3)',
          400: 'rgb(44 24 16 / 0.4)',
          500: 'rgb(44 24 16 / 0.5)',
          600: 'rgb(44 24 16 / 0.6)',
          700: 'rgb(44 24 16 / 0.7)',
          800: 'rgb(44 24 16 / 0.8)',
          900: 'rgb(44 24 16 / 0.9)',
          950: 'rgb(44 24 16 / 0.95)',
          DEFAULT: 'rgb(44 24 16 / 1)',
        },
        brown: {
          50: 'rgb(44 24 16 / 0.05)',
          100: 'rgb(44 24 16 / 0.1)',
          200: 'rgb(44 24 16 / 0.2)',
          300: 'rgb(44 24 16 / 0.3)',
          400: 'rgb(44 24 16 / 0.4)',
          500: 'rgb(44 24 16 / 0.5)',
          600: 'rgb(44 24 16 / 0.6)',
          700: 'rgb(44 24 16 / 0.7)',
          800: 'rgb(44 24 16 / 0.8)',
          900: 'rgb(44 24 16 / 0.9)',
          950: 'rgb(44 24 16 / 0.95)',
          DEFAULT: 'rgb(44 24 16 / 1)',
        },
        beige: {
          50: '#fdfcfa',
          100: '#f9f6f0',
          200: '#f2ebe0',
          300: '#e8dcc8',
          400: '#dcc6a6',
          500: '#d0b084',
          600: '#c49a62',
          700: '#b8844a',
          800: '#9a6f3e',
          900: '#7f5b35',
        },
        cream: '#f5f1ea',
        'warm-beige': '#e8dcc8',
        'coffee-brown': 'rgb(44 24 16 / 1)',
        'coffee-light': 'rgb(44 24 16 / 0.1)',
        'coffee-medium': 'rgb(44 24 16 / 0.3)',
        'coffee-dark': 'rgb(44 24 16 / 0.7)',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
        '104': '1.04',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'slide-left': 'slideLeft 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'steam': 'steam 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'parallax': 'parallax 20s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0.7' },
          '50%': { transform: 'translateY(-10px) scaleX(1.2)', opacity: '0.3' },
          '100%': { transform: 'translateY(-20px) scaleX(0.8)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(180deg)' },
        },
        parallax: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '100%': { transform: 'translateX(-100px) translateY(-50px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)' },
        },
      },
      backgroundImage: {
        'coffee-beans': "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"20\" cy=\"20\" r=\"3\" fill=\"%23654321\" opacity=\"0.3\"/><circle cx=\"80\" cy=\"30\" r=\"2\" fill=\"%23654321\" opacity=\"0.2\"/><circle cx=\"50\" cy=\"70\" r=\"4\" fill=\"%23654321\" opacity=\"0.4\"/><circle cx=\"30\" cy=\"80\" r=\"2\" fill=\"%23654321\" opacity=\"0.3\"/><circle cx=\"70\" cy=\"10\" r=\"3\" fill=\"%23654321\" opacity=\"0.2\"/></svg>')",
      },
    },
  },
  plugins: [],
} 
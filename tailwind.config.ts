import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        freaks: {
          yellow: '#E8A917',
          'yellow-light': '#F5C842',
          'yellow-dark': '#C48E0E',
          green: '#00D4A1',
          'green-dark': '#00A67E',
          purple: '#7B2FE0',
          'purple-dark': '#5A1FAF',
        },
        dark: {
          900: '#0A0A0A',
          800: '#111111',
          700: '#1A1A1A',
          600: '#222222',
          500: '#2A2A2A',
        },
      },
      fontFamily: {
        display: ['Permanent Marker', 'cursive'],
        heading: ['Bebas Neue', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232, 169, 23, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(232, 169, 23, 0.6)' },
        },
        'grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '30%': { transform: 'translate(3%, -15%)' },
          '50%': { transform: 'translate(12%, 9%)' },
          '70%': { transform: 'translate(9%, 4%)' },
          '90%': { transform: 'translate(-1%, 7%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
    },
  },
  plugins: [],
}
export default config

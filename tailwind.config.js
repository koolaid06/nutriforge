/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'cursive'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        forge: {
          bg:       '#0a0a0f',
          surface:  '#111118',
          card:     '#16161f',
          border:   '#1e1e2e',
          accent:   '#e8ff47',
          orange:   '#ff6b35',
          red:      '#ff3b5c',
          blue:     '#4facfe',
          muted:    '#4a4a6a',
          text:     '#e2e2f0',
          subtext:  '#7a7a9a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.5s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'ring-fill': 'ringFill 1s ease forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        ringFill: { from: { 'stroke-dashoffset': '100' }, to: { 'stroke-dashoffset': '0' } },
      },
    },
  },
  plugins: [],
}
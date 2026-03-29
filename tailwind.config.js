/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body:    ['Inter',  'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        forge: {
          bg:      '#0f0f0f',
          surface: '#1a1a1a',
          card:    '#222222',
          border:  '#2e2e2e',
          accent:  '#ff7043',   // warm orange
          green:   '#4caf7d',   // success / on-track
          red:     '#ef5350',   // over / danger
          blue:    '#5c9fff',   // info / carbs
          yellow:  '#ffd54f',   // warning / protein
          text:    '#f5f5f5',   // near white — very readable
          subtext: '#a0a0a0',   // medium grey
          muted:   '#555555',   // subtle
        },
      },
      animation: {
        'fade-in':   'fadeIn 0.4s ease forwards',
        'slide-up':  'slideUp 0.45s ease forwards',
        'pulse-slow':'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(14px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
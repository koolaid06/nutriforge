/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          bg: '#0A0A0B',
          surface: '#121317',
          card: '#181A20',
          border: '#262A33',

          text: '#F1F5F9',
          subtext: '#94A3B8',
          muted: '#64748B',

          accent: '#A3FF12',        // ⚡ main highlight
          accent2: '#22D3EE',       // cyan contrast

          success: '#22C55E',
          warning: '#FACC15',
          danger: '#EF4444',
        }
      },

      fontFamily: {
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      boxShadow: {
        glow: '0 0 0 1px rgba(163,255,18,0.25), 0 6px 25px rgba(163,255,18,0.15)',
      },

      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
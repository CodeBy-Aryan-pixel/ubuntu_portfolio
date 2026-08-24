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
        accent: {
          DEFAULT: 'var(--color-accent, #E95420)',
          hover: 'var(--color-accent-hover, #FF6A35)',
          light: 'var(--color-accent-light, rgba(233, 84, 32, 0.15))',
          glow: 'var(--color-accent-glow, rgba(233, 84, 32, 0.45))',
        },
        ubuntu: {
          orange: 'var(--color-accent, #E95420)',
          'orange-hover': 'var(--color-accent-hover, #FF6A35)',
          'orange-dark': '#B83B0E',
          'aubergine-dark': '#2C001E',
          'aubergine-mid': '#5E2750',
          'aubergine-light': '#77216F',
          'warm-grey': '#AEA79F',
          'cool-grey': '#333333',
          'panel-dark': '#111111',
          'dock-dark': 'rgba(17, 17, 17, 0.75)',
        },
        yaru: {
          bg: '#1E1E1E',
          surface: '#242424',
          card: '#2A2A2A',
          header: '#2E2E2E',
          border: '#3D3D3D',
          hover: '#383838',
          active: '#444444',
          text: '#F2F2F2',
          muted: '#A4A4A4',
          'terminal-bg': '#300A24',
          'terminal-header': '#26081D',
          'terminal-green': '#4AF626',
          'terminal-blue': '#34E2E2',
          'terminal-yellow': '#FCE94F',
          'terminal-red': '#EF2929',
          'terminal-purple': '#AD7FA8',
        }
      },
      fontFamily: {
        sans: ['"Ubuntu"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"Ubuntu Mono"', '"Fira Code"', '"JetBrains Mono"', 'monospace'],
        display: ['"Ubuntu Sans"', '"Ubuntu"', 'sans-serif'],
      },
      boxShadow: {
        'ubuntu-window': '0 20px 50px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'ubuntu-window-active': '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(233, 84, 32, 0.4), 0 0 20px rgba(233, 84, 32, 0.15)',
        'ubuntu-dock': '4px 0 24px rgba(0, 0, 0, 0.5)',
        'ubuntu-panel': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'ubuntu-glow': '0 0 15px rgba(233, 84, 32, 0.45)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.25s ease-out forwards',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.25s ease-out forwards',
        'cursor-blink': 'blink 1s step-start infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      }
    },
  },
  plugins: [],
}

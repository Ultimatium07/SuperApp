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
        quantum: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        neon: {
          cyan: '#00ffff',
          magenta: '#ff00ff',
          purple: '#8b5cf6',
          pink: '#ec4899',
          blue: '#3b82f6',
          green: '#10b981',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Outfit', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'quantum': ['Orbitron', 'monospace'],
      },
      animation: {
        'quantum-pulse': 'quantumPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'neon-glow': 'neonGlow 2s ease-in-out infinite alternate',
        'hologram-float': 'hologramFloat 3s ease-in-out infinite',
        'particle-swarm': 'particleSwarm 20s linear infinite',
        'quantum-spin': 'quantumSpin 10s linear infinite',
        'neural-pulse': 'neuralPulse 3s ease-in-out infinite',
        'metaverse-rotate': 'metaverseRotate 30s linear infinite',
      },
      keyframes: {
        quantumPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.05)' },
        },
        neonGlow: {
          '0%': { boxShadow: '0 0 20px #00ffff, 0 0 40px #00ffff' },
          '100%': { boxShadow: '0 0 30px #ff00ff, 0 0 60px #ff00ff' },
        },
        hologramFloat: {
          '0%, 100%': { transform: 'translateY(0) rotateX(0)' },
          '50%': { transform: 'translateY(-20px) rotateX(5deg)' },
        },
        particleSwarm: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(100px, -100px) rotate(360deg)' },
        },
        quantumSpin: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.2)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        neuralPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.5)' },
        },
        metaverseRotate: {
          '0%': { transform: 'rotateX(0) rotateY(0) rotateZ(0)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg) rotateZ(360deg)' },
        },
      },
      backgroundImage: {
        'quantum-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'neon-gradient': 'linear-gradient(45deg, #00ffff, #ff00ff, #8b5cf6)',
        'holographic': 'linear-gradient(45deg, #ff0080, #ff8c00, #ffd700, #00ff00, #00ffff, #0080ff, #8000ff)',
        'metaverse': 'radial-gradient(circle at 20% 50%, #ff00ff 0%, #00ffff 50%, #ffff00 100%)',
      },
      backdropBlur: {
        'quantum': '20px',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff',
        'neon-magenta': '0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 60px #ff00ff',
        'quantum': '0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
        'hologram': '0 0 40px rgba(0, 255, 255, 0.3), 0 0 80px rgba(255, 0, 255, 0.2)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'quantum': '20px',
        'neon': '30px',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}

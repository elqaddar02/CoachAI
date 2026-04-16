export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-card': 'var(--bg-card)',
        'bg-glass': 'var(--bg-glass)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        border: 'var(--border)',
        'border-glass': 'var(--border-glass)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
        },
        accent: {
          DEFAULT: '#D4AF37',
          light: '#F1D37A',
          dark: '#B8962E',
        },
        surface: '#0F1C2E',
        navy: {
          DEFAULT: '#142C54',
          deep: '#0B1F3A',
          darker: '#070F1F',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'login-bg': 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
        'dashboard-bg': 'linear-gradient(135deg, var(--bg) 0%, var(--bg-secondary) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #142C54 0%, #D4AF37 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
        'glass-lg': '0 20px 40px rgba(0,0,0,0.2)',
        'hover': '0 10px 30px rgba(0,0,0,0.15)',
        'gold': '0 10px 30px rgba(212, 175, 55, 0.15)',
        'gold-lg': '0 20px 40px rgba(212, 175, 55, 0.2)',
        'navy': '0 10px 30px rgba(11, 31, 58, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderColor: {
        'gold-subtle': 'rgba(212, 175, 55, 0.2)',
        'gold-medium': 'rgba(212, 175, 55, 0.35)',
      },
    },
  },
  plugins: [],
}

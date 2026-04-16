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
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          50: '#fdf4ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        brand: {
          500: '#6366f1',
        },
        slate: {
          50: '#f8fafc',
          900: '#0f172a',
        },
        gray: {
          50: '#f9fafb',
          900: '#111827',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'login-bg': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'dashboard-bg': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 20px 40px rgba(0,0,0,0.1)',
        'hover': '0 10px 30px rgba(0,0,0,0.1)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

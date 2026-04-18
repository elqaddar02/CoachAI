export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-card': 'var(--bg-card)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        border: 'var(--border)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        primary: {
          DEFAULT: '#1E3A8A', // Oxford Blue
          hover: '#172E6E',
          50: '#F0F5FF',
        },
        accent: {
          DEFAULT: '#B59A57', // Academic Gold
          light: '#CDB784',
          dark: '#927A3F',
        },
        navy: {
          DEFAULT: '#1E3A8A',
          dark: '#112255',
        },
      },
      backgroundImage: {
        'institutional-gradient': 'linear-gradient(to bottom, #FFFFFF 0%, #F9FAFB 100%)',
      },
      boxShadow: {
        'academic': '0 4px 12px rgba(30, 58, 138, 0.08)',
        'academic-lg': '0 8px 24px rgba(30, 58, 138, 0.12)',
        'hover': '0 10px 30px rgba(30, 58, 138, 0.15)',
      },
      borderRadius: {
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

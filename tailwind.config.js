/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Фирменные цвета Delever из гайдлайна
        brand: {
          lightBlue: '#E8FBFF',      // Светло-голубой
          lightTeal: '#CBE1DA',      // Светло-зеленовато-голубой
          lightBeige: '#EEEADF',     // Светло-бежевый
          darkBlue: '#002A47',       // Темно-синий (основной)
          black: '#000000',          // Черный для текста
          // Градиент логотипа
          gradientStart: '#afdbd9',  // Начало градиента
          gradientEnd: '#f3e9dd',    // Конец градиента
        },
        // Обновленная primary палитра на основе бренд-цветов
        primary: {
          50: '#E8FBFF',
          100: '#CBE1DA',
          200: '#EEEADF',
          300: '#afdbd9',
          400: '#7db8b5',
          500: '#002A47',
          600: '#00223a',
          700: '#001a2d',
          800: '#001220',
          900: '#000a13',
        },
      },
      fontFamily: {
        sans: ['Aeronic Pro', 'system-ui', '-apple-system', 'sans-serif'],
        brand: ['Aeronic Pro', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #afdbd9 0%, #f3e9dd 100%)',
        'gradient-logo': 'linear-gradient(180deg, #afdbd9 0%, #f3e9dd 100%)',
        'gradient-subtle': 'linear-gradient(180deg, rgba(232, 251, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)',
        'gradient-accent': 'linear-gradient(135deg, rgba(175, 219, 217, 0.1) 0%, rgba(243, 233, 221, 0.1) 100%)',
        'gradient-dark': 'linear-gradient(135deg, #002A47 0%, #001a2d 100%)',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 42, 71, 0.08)',
        'medium': '0 4px 16px rgba(0, 42, 71, 0.12)',
        'large': '0 8px 32px rgba(0, 42, 71, 0.16)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
}

